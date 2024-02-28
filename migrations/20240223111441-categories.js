/* eslint-disable @typescript-eslint/no-var-requires */
const categoriesData = require('./categories.json')
const gendersData = require('./genders.json')
const subcategoriesData = require('./subcategories.json')

module.exports = {
  async up(db) {
    const { default: slugify } = await import('@sindresorhus/slugify')

    await db.collection('main_categories').insertMany(
      categoriesData.map((category) => ({
        name: category.name,
        slug: slugify(category.name),
        description: '',
        translation: {
          en: {
            name: category.name_en,
            slug: slugify(category.name_en),
          },
        },
      }))
    )

    await db.collection('genders').insertMany(
      gendersData.map((gender) => ({
        name: gender.name,
        slug: slugify(gender.name),
        translation: {
          en: {
            name: gender.name_en,
            slug: slugify(gender.name_en),
          },
        },
      }))
    )

    await db.collection('subcategories').insertMany(
      subcategoriesData.map((subcategory) => ({
        name: subcategory.name,
        slug: slugify(subcategory.name),
        description: '',
        translation: {
          en: {
            name: subcategory.name_en,
            slug: slugify(subcategory.name_en),
          },
        },
      }))
    )

    const categoriesCollection = db.collection('categories')
    const gendersCollection = db.collection('genders')
    const subcategoriesCollection = db.collection('subcategories')

    // Construct and insert documents into the 'categories' collection
    const categoriesPromises = categoriesData.map(async (category) => {
      const genderCategoriesPromises = category.gender_categories.map(
        async (genderCategory) => {
          const subcategoriesPromises = genderCategory.subcategories.map(
            async (subcategory) => {
              const subcategoryDocument = await subcategoriesCollection.findOne(
                { name: subcategory.name }
              )
              return subcategoryDocument
            }
          )

          const subcategories = await Promise.all(subcategoriesPromises)
          const genderDocument = await gendersCollection.findOne({
            name: genderCategory.name,
          })
          return {
            ...genderDocument,
            subcategories,
          }
        }
      )

      const genderCategories = await Promise.all(genderCategoriesPromises)
      const existingCategory = await categoriesCollection.findOne({
        name: category.name,
      })
      if (existingCategory) {
        return { ...existingCategory }
      } else {
        const mainCategory = await db.collection('main_categories').findOne({
          name: category.name,
        })
        return {
          ...mainCategory,
          gender_categories: genderCategories,
        }
      }
    })

    const categories = await Promise.all(categoriesPromises)
    await categoriesCollection.insertMany(categories)
  },
  async down(db) {
    await db.collection('main_categories').deleteMany({})
    await db.collection('genders').deleteMany({})
    await db.collection('subcategories').deleteMany({})
    await db.collection('categories').deleteMany({})
  },
}
