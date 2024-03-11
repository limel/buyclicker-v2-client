import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import clientPromise from 'lib/mongodb'
import {
  getDbAndReqBody,
  findUserByEmail,
  generateTokens,
} from 'lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const user = await findUserByEmail(db, reqBody.email)
    if (!user) {
      return NextResponse.json(
        { message: 'User are not exists' },
        { status: 401 }
      )
    }

    if (!bcrypt.compareSync(reqBody.password, user.password)) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 })
    }

    const tokens = await generateTokens(user.name, user.email)
    return NextResponse.json(tokens)
  } catch (err) {
    throw new Error((err as Error).message)
  }
}
