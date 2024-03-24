// /* eslint-disable @typescript-eslint/no-var-requires */
// const xlsx = require('xlsx')
// const fs = require('fs')

// // const slugify = require('@sindresorhus/slugify')

// // Load the Excel file
// const workbook = xlsx.readFile('./whs_dropshipping.xlsx')
// // const ofc_dropshipping = xlsx.readFile('./ofc_dropshipping.xlsx')

// // Assuming you have only one sheet, if not, you need to specify the sheet name or index
// const sheetName = workbook.SheetNames[0]
// const worksheet = workbook.Sheets[sheetName]

// // // Convert the worksheet to JSON
// let jsonData = xlsx.utils.sheet_to_json(worksheet)
// // const keyFieldTranslations = {
// //   Код: 'sku',
// //   Стать: 'gender',
// //   'Осн. кат.': 'main_category',
// //   ' Під кат.': 'sub_category',
// //   Назва: 'name',
// //   Артикул: 'vendor_code',
// //   Розмір: 'size',
// //   'Дроп Ціна': 'drop_price',
// //   Кількість: 'quantity',
// //   Фото: 'photo',
// // }
// function formatStringsToLowerAndTrim(obj) {
//   const newObj = {}
//   for (let key in obj) {
//     const trimmedKey = key.trim().toLowerCase()
//     const value = obj[key]
//     const trimmedValue =
//       typeof value === 'string' ? value.trim().toLowerCase() : value
//     newObj[trimmedKey] = trimmedValue
//   }
//   return newObj
// }

// // Format all string values in jsonData to lowercase and trim keys and values
// jsonData = jsonData.map(formatStringsToLowerAndTrim)

// const categories = jsonData.reduce((arr, item) => {
//   const name = item['осн. кат.']
//   const subcategory = item['під кат.']
//   const gender = item['стать']

//   const categoryIndex = arr.findIndex((category) => category.name === name)

//   // If the category doesn't exist, create a new one and push it to the array
//   if (categoryIndex === -1) {
//     arr.push({
//       name: name,
//       gender_categories: [
//         {
//           name: gender,
//           subcategories: [{ name: subcategory }],
//         },
//       ],
//     })
//   } else {
//     // If the category exists, check if the gender exists
//     const genderIndex = arr[categoryIndex].gender_categories.findIndex(
//       (g) => g.name === gender
//     )

//     // If the gender doesn't exist, create a new gender object and push it
//     if (genderIndex === -1) {
//       arr[categoryIndex].gender_categories.push({
//         name: gender,
//         subcategories: [{ name: subcategory }],
//       })
//     } else {
//       // If the gender exists, check if the subcategory already exists
//       const subcategoryIndex = arr[categoryIndex].gender_categories[
//         genderIndex
//       ].subcategories.findIndex((sub) => sub.name === subcategory)

//       // If the subcategory doesn't exist, push it to the subcategory array
//       if (subcategoryIndex === -1) {
//         arr[categoryIndex].gender_categories[genderIndex].subcategories.push({
//           name: subcategory,
//         })
//       }
//     }
//   }

//   return arr
// }, [])

// const subcategories = jsonData.reduce((arr, item) => {
//   const name = item['під кат.']
//   const subcategoryIndex = arr.findIndex(
//     (subcategory) => subcategory.name === name
//   )

//   // If the subcategory doesn't exist, create a new one and push it to the array
//   if (subcategoryIndex === -1) {
//     arr.push({
//       name: name,
//     })
//   }

//   return arr
// }, [])

// // Write categoriesArray to a file
// fs.writeFile(
//   'subcategories2.json',
//   JSON.stringify(subcategories, null, 2),
//   (err) => {
//     if (err) {
//       console.error('Error writing categories with subcategories to file:', err)
//       return
//     }
//     console.log('Categories with subcategories file has been saved!')
//   }
// )
