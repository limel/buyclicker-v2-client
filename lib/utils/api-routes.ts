import { Db, MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { IProduct } from 'types/Product.types'
import type { IUser } from 'types/User.types'

export const getDbAndReqBody = async (
  clientPromise: Promise<MongoClient>,
  req: Request | null
) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)
  if (req) {
    const reqBody = await req.json()
    return { db, reqBody }
  }

  return { db }
}

export const getCategories = async (db: Db) => {
  const categories = await db.collection('categories').find().toArray()
  return categories
}

export const getHeroData = async (db: Db) => {
  const heroData = await db.collection('heros').find().toArray()
  return heroData
}

export const generateTokens = (id: string, email: string, role: string) => {
  const accessToken = jwt.sign(
    { id, email, role },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
    {
      expiresIn: '10m',
    }
  )

  const refreshToken = jwt.sign(
    { id, email, role },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN as string,
    {
      expiresIn: '30d',
    }
  )

  return { accessToken, refreshToken }
}

export const createUserAndGenerateTokens = async (db: Db, reqBody: IUser) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)

  const { insertedId } = await db.collection('users').insertOne({
    name: reqBody.name,
    lastName: reqBody.lastName,
    nameInitials: reqBody.nameInitials,
    birthdate: reqBody.birthdate,
    email: reqBody.email.trim().toLowerCase(),
    gender: reqBody.gender,
    phone: reqBody.phone,
    password: hash,
    recevieMail: reqBody.receiveMail,
    years: reqBody.years,
    image: '',
    role: 'user',
    createdAt: reqBody.createdAt,
  })

  return generateTokens(insertedId.toString(), reqBody.email, reqBody.role)
}

// export const createProductCards = async (db: Db, reqBody: IProduct[]) => {
//   const products = [...reqBody]
//   const categoriesCollection = db.collection('categories')
//   const gendersCollection = db.collection('genders')
//   const subcategoriesCollection = db.collection('subcategories')

//   // Map each product in reqBody
//   const updatedProducts = await Promise.all(
//     products.map(async (product) => {
//       // Find the category document
//       const category = await categoriesCollection.findOne({
//         name: product.category.trim().toLowerCase(),
//       })
//       if (!category) {
//         throw new Error(`Category "${product.category}" not found.`)
//       }

//       // Find the gender document
//       const gender = await gendersCollection.findOne({
//         name: product.gender.trim().toLowerCase(),
//       })
//       if (!gender) {
//         throw new Error(`Gender "${product.gender}" not found.`)
//       }

//       // Find the subcategory document
//       const subcategory = await subcategoriesCollection.findOne({
//         name: product.subcategory.trim().toLowerCase(),
//       })
//       if (!subcategory) {
//         throw new Error(`Subcategory "${product.subcategory}" not found.`)
//       }

//       // Replace category, gender, and subcategory strings with their corresponding objects
//       return {
//         ...product,
//         category,
//         gender,
//         subcategory,
//       }
//     })
//   )

//   const { insertedIds } = await db
//     .collection('products')
//     .insertMany(updatedProducts)
//   return insertedIds
// }

export const createProductCards = async (db: Db, reqBody: IProduct[]) => {
  const products = [...reqBody]
  const categoriesCollection = db.collection('categories')
  const gendersCollection = db.collection('genders')
  const subcategoriesCollection = db.collection('subcategories')
  const productsCollection = db.collection('products')

  // Map each product in reqBody
  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      // Find the category document
      const category = await categoriesCollection.findOne({
        name: product.category.trim().toLowerCase(),
      })
      if (!category) {
        const category = product.category.trim().toLowerCase()
        return category
      }

      // Find the gender document
      const gender = await gendersCollection.findOne({
        name: product.gender.trim().toLowerCase(),
      })
      if (!gender) {
        const gender = product.gender.trim().toLowerCase()
        return gender
      }

      // Find the subcategory document
      const subcategory = await subcategoriesCollection.findOne({
        name: product.subcategory.trim().toLowerCase(),
      })
      if (!subcategory) {
        const subcategory = product.subcategory.trim().toLowerCase()
        return subcategory
      }

      // Replace category, gender, and subcategory strings with their corresponding objects
      const updatedProduct = {
        ...product,
        category: category, // Assuming category._id is the ObjectId
        gender: gender, // Assuming gender._id is the ObjectId
        subcategory: subcategory, // Assuming subcategory._id is the ObjectId
      }

      // Check if product already exists
      const existingProduct = await productsCollection.findOne({
        sku: product.sku, // Assuming sku is a unique identifier for products
      })

      if (existingProduct) {
        // If product exists, check if quantity or dropPrice has changed
        if (
          existingProduct.quantity !== updatedProduct.quantity ||
          existingProduct.dropPrice !== updatedProduct.dropPrice
        ) {
          // If quantity or dropPrice has changed, update the product in the database
          await productsCollection.updateOne(
            { _id: existingProduct._id },
            {
              $set: {
                quantity: updatedProduct.quantity,
                dropPrice: updatedProduct.dropPrice,
                // Update other fields as needed
              },
            }
          )
          console.log(`Product with SKU ${existingProduct.sku} updated.`)
          return existingProduct._id // Return the existing product ID
        } else {
          return null // If nothing has changed, return null
        }
      } else {
        return updatedProduct // Return the updated product
      }
    })
  )

  // Insert new products into the database, filtering out null values
  const newProducts = updatedProducts.filter(
    (product) => product !== null && typeof product === 'object'
  )
  if (newProducts.length > 0) {
    const { insertedIds } = await productsCollection.insertMany(newProducts)
    return insertedIds // Return the inserted product IDs
  } else {
    return [] // Return an empty array if no new products were inserted
  }
}

export const findUserByEmail = async (db: Db, email: string) => {
  const user = await db.collection('users').findOne({ email })
  return user
}
