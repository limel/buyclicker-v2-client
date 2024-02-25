const categories = [
  {
    name: 'Взуття',
    name_en: 'Footwear',
    subcategory: [
      {
        name: 'Кросівки',
        name_en: 'Sneakers',
      },
      {
        name: 'Кеди',
        name_en: 'Canvas Shoes',
      },
      {
        name: 'Тапочки',
        name_en: 'Slippers',
      },
      {
        name: 'Cандалі',
        name_en: 'Sandals',
      },
      {
        name: 'Черевики',
        name_en: 'Boots',
      },
      {
        name: 'Футбольні бутси',
        name_en: 'Football Cleats',
      },
      {
        name: 'Футбольні бутси мультигрунт',
        name_en: 'Multi-Ground Football Cleats',
      },
      {
        name: 'Футбольні сороконожки',
        name_en: 'Football Turf Shoes',
      },
      {
        name: 'Футбольні футзалки',
        name_en: 'Indoor Football Shoes',
      },
    ],
  },
  {
    name: 'Одяг',
    name_en: 'Clothing',
    subcategory: [
      {
        name: 'Жилетки',
        name_en: 'Vests',
      },
      {
        name: 'Брюки',
        name_en: 'Pants',
      },
      {
        name: 'Костюми',
        name_en: 'Suits',
      },
      {
        name: 'Кофти',
        name_en: 'Sweaters',
      },
      {
        name: 'Куртки',
        name_en: 'Jackets',
      },
      {
        name: 'Футболки',
        name_en: 'T-shirts',
      },
      {
        name: 'Термобілизна',
        name_en: 'Thermal Underwear',
      },
      {
        name: 'Шорти',
        name_en: 'Shorts',
      },
      {
        name: 'Бомбери',
        name_en: 'Bomber Jackets',
      },
      {
        name: 'Лосіни',
        name_en: 'Leggings',
      },
      {
        name: 'Вітровки',
        name_en: 'Windbreakers',
      },
      {
        name: 'Майки',
        name_en: 'Tank Tops',
      },
      {
        name: 'Топи спортивні',
        name_en: 'Sports Tops',
      },
      {
        name: 'Футбольна форма',
        name_en: 'Football Kit',
      },
      {
        name: 'Футбольні шорти',
        name_en: 'Football Shorts',
      },
    ],
  },
  {
    name: 'Аксесуари',
    name_en: 'Accessories',
    subcategory: [
      {
        name: 'Сумки на пояс',
        name_en: 'Waist Bags',
      },
      {
        name: 'Сумки через плече',
        name_en: 'Shoulder Bags',
      },
      {
        name: 'Шапки',
        name_en: 'Hats',
      },
      {
        name: 'Кепки',
        name_en: 'Caps',
      },
      {
        name: 'Панама',
        name_en: 'Panama Hats',
      },
      {
        name: 'Шкарпетки',
        name_en: 'Socks',
      },
      {
        name: 'Різне',
        name_en: 'Miscellaneous',
      },
      {
        name: 'Рукавиці',
        name_en: 'Gloves',
      },
      {
        name: 'Шарф',
        name_en: 'Scarf',
      },
      {
        name: 'Баф',
        name_en: 'Buff',
      },
      {
        name: 'Спідня білизна',
        name_en: 'Underwear',
      },
      {
        name: 'Футбол для тренувань',
        name_en: 'Training Football',
      },
      {
        name: "Футбольні м'ячі",
        name_en: 'Football Balls',
      },
      {
        name: 'Футбольні гетри',
        name_en: 'Football Socks',
      },
      {
        name: 'Футбольні манішки',
        name_en: 'Football Sleeves',
      },
      {
        name: 'Футбольні щитки',
        name_en: 'Shin Guards',
      },
      {
        name: 'Футбольні рукавиці',
        name_en: 'Football Gloves',
      },
      {
        name: "Баскетбольні м'ячі",
        name_en: 'Basketballs',
      },
      {
        name: 'Свитски',
        name_en: 'Sweatshirts',
      },
      {
        name: 'Повязка на голову',
        name_en: 'Headband',
      },
      {
        name: 'Напульсники',
        name_en: 'Wristbands',
      },
      {
        name: 'Пляшки для води',
        name_en: 'Water Bottles',
      },
      {
        name: 'Насоси для мячів',
        name_en: 'Ball Pumps',
      },
    ],
  },
]
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const slugify = require('@sindresorhus/slugify')

module.exports = {
  async up(db) {
    // Insert categories and subcategories into the database
    const { default: slugify } = await import('@sindresorhus/slugify')
    for (const category of categories) {
      const insertedCategory = await db.collection('categories').insertOne({
        name: category.name,
        slug: slugify(category.name),
        description: '',
        translation: {
          en: {
            name: category.name_en,
            slug: slugify(category.name_en),
          },
        },
      })
      const categoryId = insertedCategory.insertedId

      for (const subcategory of category.subcategory) {
        await db.collection('subcategories').insertOne({
          name: subcategory.name,
          slug: slugify(subcategory.name),
          description: '',
          'parrent-category': categoryId,
          translation: {
            en: {
              name: subcategory.name_en,
              slug: slugify(subcategory.name_en),
            },
          },
        })
      }
    }

    // Update categories to include subcategories
    for (const category of categories) {
      const categoryDoc = await db
        .collection('categories')
        .findOne({ name: category.name })
      const subcategoryDocs = await db
        .collection('subcategories')
        .find({ 'parrent-category': categoryDoc._id })
        .toArray()

      await db
        .collection('categories')
        .updateOne(
          { _id: categoryDoc._id },
          { $set: { subcategories: subcategoryDocs } }
        )
    }
  },

  async down(db) {
    // Drop categories and subcategories collections to rollback the migration
    await db.collection('categories').drop()
    await db.collection('subcategories').drop()
  },
}
