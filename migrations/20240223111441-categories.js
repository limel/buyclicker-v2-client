const categories = [
  {
    name: 'Взуття',
    subcategory: [
      {
        name: 'Кросівки',
      },
      {
        name: 'Кеди',
      },
      {
        name: 'Тапочки',
      },
      {
        name: 'Cандалі',
      },
      {
        name: 'Черевики',
      },
      {
        name: 'Футбольні бутси',
      },
      {
        name: 'Футбольні бутси мультигрунт',
      },
      {
        name: 'Футбольні сороконожки',
      },
      {
        name: 'Футбольні футзалки',
      },
    ],
  },
  {
    name: 'Одяг',
    subcategory: [
      {
        name: 'Жилетки',
      },
      {
        name: 'Брюки',
      },
      {
        name: 'Костюми',
      },
      {
        name: 'Кофти',
      },
      {
        name: 'Куртки',
      },
      {
        name: 'Футболки',
      },
      {
        name: 'Термобілизна',
      },
      {
        name: 'Шорти',
      },
      {
        name: 'Бомбери',
      },
      {
        name: 'Лосіни',
      },
      {
        name: 'Вітровки',
      },
      {
        name: 'Майки',
      },
      {
        name: 'Топи спортивні',
      },
      {
        name: 'Футбольна форма',
      },
      {
        name: 'Футбольні шорти',
      },
    ],
  },
  {
    name: 'Аксесуари',
    subcategory: [
      {
        name: 'Сумки на пояс',
      },
      {
        name: 'Сумки через плече',
      },
      {
        name: 'Шапки',
      },
      {
        name: 'Кепки',
      },
      {
        name: 'Панама',
      },
      {
        name: 'Шкарпетки',
      },
      {
        name: 'Різне',
      },
      {
        name: 'Рукавиці',
      },
      {
        name: 'Шарф',
      },
      {
        name: 'Баф',
      },
      {
        name: 'Спідня білизна',
      },
      {
        name: 'Футбол для тренувань',
      },
      {
        name: "Футбольні м'ячі",
      },
      {
        name: 'Футбольні гетри',
      },
      {
        name: 'Футбольні манішки',
      },
      {
        name: 'Футбольні щитки',
      },
      {
        name: 'Футбольні рукавиці',
      },
      {
        name: "Баскетбольні м'ячі",
      },
      {
        name: 'Свитски',
      },
      {
        name: 'Повязка на голову',
      },
      {
        name: 'Напульсники',
      },
      {
        name: 'Пляшки для води',
      },
      {
        name: 'Насоси для мячів',
      },
    ],
  },
]

module.exports = {
  async up(db) {
    // Insert categories and subcategories into the database
    for (const category of categories) {
      const insertedCategory = await db
        .collection('categories')
        .insertOne({ name: category.name })
      const categoryId = insertedCategory.insertedId

      for (const subcategory of category.subcategory) {
        await db
          .collection('subcategories')
          .insertOne({ name: subcategory.name, categoryId })
      }
    }

    // Update categories to include subcategories
    for (const category of categories) {
      const categoryDoc = await db
        .collection('categories')
        .findOne({ name: category.name })
      const subcategoryDocs = await db
        .collection('subcategories')
        .find({ categoryId: categoryDoc._id })
        .toArray()

      await db
        .collection('categories')
        .updateOne(
          { _id: categoryDoc._id },
          { $set: { subcategory: subcategoryDocs } }
        )
    }
  },

  async down(db) {
    // Drop categories and subcategories collections to rollback the migration
    await db.collection('categories').drop()
    await db.collection('subcategories').drop()
  },
}
