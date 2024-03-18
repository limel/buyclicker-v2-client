import clientPromise from 'lib/mongodb'
import { NextResponse } from 'next/server'
import { getTranslations, getLocale } from 'next-intl/server'
import {
  getDbAndReqBody,
  findUserByEmail,
  createUserAndGenerateTokens,
} from 'lib/utils/api-routes'

// async function translateions() {
//   const locale = await getLocale()
//   const t = await getTranslations({ locale: locale, namespaces: 'Http' })
//   // console.log(t)
//   return t
// }

export async function POST(req: Request) {
  try {
    // const t = await import('locales/en.json')
    // const tr = await translateions()
    // console.log(req)
    // console.log(tr)
    // console.log('POST /api/users/signup')
    // const locale = await getLocale()
    // const t = await getTranslations({ locale: locale, namespaces: 'Http' })
    // console.log(locale)
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const user = await findUserByEmail(db, reqBody.email)
    if (user) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 401 }
      )
    }

    const tokens = await createUserAndGenerateTokens(db, reqBody)
    return NextResponse.json(
      tokens,
      { status: 201 }
      // { 'Set-Cookie': tokens.refreshToken }
    )
  } catch (err) {
    throw new Error((err as Error).message)
  }
}
