import { Db, MongoClient } from 'mongodb'

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
