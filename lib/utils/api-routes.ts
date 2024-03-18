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

export const generateTokens = (
  name: string,
  email: string,
  role: string,
  nameInitials: string
) => {
  const accessToken = jwt.sign(
    { name, email, role, nameInitials },
    'succesaccesstoken', // process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '10m',
    }
  )

  const refreshToken = jwt.sign(
    { name, email, role, nameInitials },
    'securerefreshtoken', // process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '30d',
    }
  )

  return { accessToken, refreshToken }
}

interface IUser {
  name: string
  lastName: string
  nameInitials: string
  birthdate: string
  email: string
  gender: string
  phone: string
  password: string
  receiveMail: boolean
  years: number
  role: string
  createdAt: string
}

export const createUserAndGenerateTokens = async (db: Db, reqBody: IUser) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)

  await db.collection('users').insertOne({
    name: reqBody.name,
    lastName: reqBody.lastName,
    nameInitials: reqBody.nameInitials,
    birthdate: reqBody.birthdate,
    email: reqBody.email,
    gender: reqBody.gender,
    phone: reqBody.phone,
    password: hash,
    recevieMail: reqBody.receiveMail,
    years: reqBody.years,
    image: '',
    role: 'user',
    createdAt: reqBody.createdAt,
  })

  return generateTokens(
    reqBody.name,
    reqBody.email,
    reqBody.role,
    reqBody.nameInitials
  )
}

export const findUserByEmail = async (db: Db, email: string) => {
  const user = await db.collection('users').findOne({ email })
  return user
}
