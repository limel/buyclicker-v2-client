import { NextResponse, type NextRequest } from 'next/server'
import { google } from 'googleapis'
import clientPromise from 'lib/mongodb'
import { getDbAndReqBody, createProductCards } from 'lib/utils/api-routes'
// import { GoogleSpreadsheet } from 'google-spreadsheet'
// import { JWT } from 'google-auth-library'

// // const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)

export async function GET(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
    try {
      // const serviceAccountAuth = new JWT({
      //   email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
      //   key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY.replace(/\\n/g, '\n'),
      //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      // })

      // console.log(serviceAccountAuth)

      // console.log(
      //   process.env.NEXT_PUBLIC_GOOGLE_API_KEY.replace(/\\n/g, '\n'),
      //   process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      //   process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      // )

      // if (process.env.NEXT_PUBLIC_OFC_SHEET_ID) {
      //   const doc = new GoogleSpreadsheet(
      //     process.env.NEXT_PUBLIC_OFC_SHEET_ID,
      //     {
      //       apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY.replace(
      //         /\\n/g,
      //         '\n'
      //       ),
      //     }
      //   )

      //   await doc.loadInfo()
      //   console.log('Spreadsheet title:', doc.title)
      // } else {
      //   console.error('OFC_SHEET_ID environment variable is not set.')
      // }

      const auth = await google.auth.getClient({
        projectId: 'buyclicker',
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      })

      const sheets = google.sheets({ version: 'v4', auth })

      const { data } = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.NEXT_PUBLIC_WHS_SHEET_ID,
        range: 'A2:J60000',
        valueRenderOption: 'FORMULA',
      })

      const removeBrackets = (string: string) =>
        string.replace(/\s*\([^)]*\)/g, '')

      const extractURL = (formula: string) => {
        const match = formula.match(/"(.*?)"/) // Regex to match the URL inside double quotes
        return match ? match[1] : '' // Return the matched URL
      }

      const priceHandler = (price: number) => Number((price * 1.2).toFixed()) // + 20% to the price

      //

      // Process each row
      if (!data.values) return NextResponse.error()
      const processedData = data.values.map((row) => {
        // Replace "=IMAGE()" formula with clean URL
        const product = {
          sku: row[0],
          gender: row[1],
          category: row[2],
          subcategory: row[3],
          name: removeBrackets(row[4]),
          vendorCode: row[5],
          size: row[6],
          dropPrice: row[7],
          price: priceHandler(row[7]),
          quantity: row[8],
          images: [
            {
              url: extractURL(row[9]),
              alt: row[4],
              order: 1,
            },
          ],
          createdAt: new Date().toISOString(),
        }
        return product
      })
      const { db } = await getDbAndReqBody(clientPromise, null)
      const dataBaseResponse = await createProductCards(db, processedData)

      console.log(dataBaseResponse)
      // const product = await createProductCards(db, processedData)

      return NextResponse.json(dataBaseResponse, { status: 200 })
    } catch (error) {
      console.error('Error:', error)
      return NextResponse.error()
    }
  }
}

// const options = { sheetName: 'ofc_dropshipping', useFormat: false }
// const parser = new PublicGoogleSheetsParser(
// process.env.NEXT_PUBLIC_OFC_SHEET_ID,
// options
// )
// parser.setOption({ useFormat: false })
// parser.parse().then((data) => {
// console.log(data)
// })

//whs_google spreed sheets
// [
//   "FN6352-043&FN6356-043-M",
//   "",
//   "Одяг",
//   "Костюми",
//   "Спортивний костюм Jordan Комплект (FN6352-043&FN6356-043)",
//   "FN6352-043&FN6356-043",
//   "M",
//   5661,
//   4,
//   "https://hub.idealsport.com.ua/photos/basic/FN6352-043/FN6352-043_1.jpg"
// ]
