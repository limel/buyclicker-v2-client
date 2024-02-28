/* eslint-disable @typescript-eslint/no-var-requires */
const categories1 = require('./categories.json')
const categories2 = require('./categories2.json')
const fs = require('fs')

const concatenatedCategories = categories1.concat(categories2)

// Create a Set to remove duplicates based on the "name" property
const uniqueCategoriesSet = new Set(
  concatenatedCategories.map((category) => JSON.stringify(category))
)

// Convert Set back to an array of unique categories
const uniqueCategoriesArray = Array.from(uniqueCategoriesSet).map((category) =>
  JSON.parse(category)
)

fs.writeFile(
  'unique_categories.json',
  JSON.stringify(uniqueCategoriesArray, null, 2),
  (err) => {
    if (err) {
      console.error('Error writing unique categories to file:', err)
      return
    }
    console.log('Unique categories file has been saved!')
  }
)
