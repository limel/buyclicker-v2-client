import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
// import { getTranslations, getLocale } from 'next-intl/server'
import clientPromise from 'lib/mongodb'
import {
  getDbAndReqBody,
  findUserByEmail,
  generateTokens,
} from 'lib/utils/api-routes'

export async function POST(req: Request) {
  // const locale = await getLocale()
  // const t = await getTranslations({ locale: locale, namespaces: 'Http' })
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const user = await findUserByEmail(db, reqBody.email)
    if (!user) {
      return NextResponse.json({ message: 'user not found' }, { status: 401 })
    }

    if (!bcrypt.compareSync(reqBody.password, user.password)) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 })
    }

    const tokens = await generateTokens(user.id, user.email, user.role)
    return NextResponse.json(tokens)
  } catch (err) {
    throw new Error((err as Error).message)
  }
}
