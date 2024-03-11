import { Db, MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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

export const generateTokens = (name: string, email: string) => {
  const accessToken = jwt.sign(
    { name, email },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '10m',
    }
  )

  const refreshToken = jwt.sign(
    { name, email },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '30d',
    }
  )

  return { accessToken, refreshToken }
}

export const createUserAndGenerateTokens = async (
  db: Db,
  reqBody: { name: string; email: string; password: string }
) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)

  await db.collection('users').insertOne({
    name: reqBody.name,
    email: reqBody.email,
    password: hash,
    image: '',
    role: 'user',
  })

  return generateTokens(reqBody.name, reqBody.email)
}

export const findUserByEmail = async (db: Db, email: string) => {
  const user = await db.collection('users').findOne({ email })
  return user
}
