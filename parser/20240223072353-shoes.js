// eslint-disable-next-line @typescript-eslint/no-var-requires
const xlsx = require('xlsx')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

// const slugify = require('@sindresorhus/slugify')

// Load the Excel file
const workbook = xlsx.readFile('./whs_dropshipping.xlsx')
// const ofc_dropshipping = xlsx.readFile('./ofc_dropshipping.xlsx')

// Assuming you have only one sheet, if not, you need to specify the sheet name or index
const sheetName = workbook.SheetNames[0]
const worksheet = workbook.Sheets[sheetName]

// // Convert the worksheet to JSON
let jsonData = xlsx.utils.sheet_to_json(worksheet)
// const keyFieldTranslations = {
//   Код: 'sku',
//   Стать: 'gender',
//   'Осн. кат.': 'main_category',
//   ' Під кат.': 'sub_category',
//   Назва: 'name',
//   Артикул: 'vendor_code',
//   Розмір: 'size',
//   'Дроп Ціна': 'drop_price',
//   Кількість: 'quantity',
//   Фото: 'photo',
// }
// Create an object to store categories and their subcategories

// const categories = jsonData.reduce((arr, item) => {
//   const name = item['Осн. кат.']
//   const subcategories = item[' Під кат.']

//   const categoryExists = arr.some((category) => category.name === name)
//   const subcategoryExists = arr.some((category) =>
//     category.subcategories.includes(subcategories)
//   )

//   if (!categoryExists) {
//     arr.push({
//       name,
//       subcategories: [subcategories],
//     })
//   } else if (!subcategoryExists) {
//     const category = arr.find((category) => category.name === name)
//     category.subcategories.push(subcategories)
//   }

//   return arr
// }, [])

const categories = jsonData.reduce((arr, item) => {
  const name = item['Осн. кат.']
  const subcategory = item[' Під кат.']

  const categoryIndex = arr.findIndex((category) => category.name === name)

  // If the category doesn't exist, create a new one and push it to the array
  if (categoryIndex === -1) {
    arr.push({
      name: name,
      subcategory: [{ name: subcategory }],
    })
  } else {
    // If the category exists, check if the subcategory already exists
    const subcategoryIndex = arr[categoryIndex].subcategory.findIndex(
      (sub) => sub.name === subcategory
    )

    // If the subcategory doesn't exist, push it to the subcategory array
    if (subcategoryIndex === -1) {
      arr[categoryIndex].subcategory.push({ name: subcategory })
    }
  }

  return arr
}, [])

// Write categoriesArray to a file
fs.writeFile('categories.json', JSON.stringify(categories, null, 2), (err) => {
  if (err) {
    console.error('Error writing categories with subcategories to file:', err)
    return
  }
  console.log('Categories with subcategories file has been saved!')
})
