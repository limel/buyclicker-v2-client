import clientPromise from 'lib/mongodb'
import { NextResponse } from 'next/server'
import {
  getDbAndReqBody,
  findUserByEmail,
  createUserAndGenerateTokens,
} from 'lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const user = await findUserByEmail(db, reqBody.email)
    if (user) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 401 }
      )
    }

    const tokens = await createUserAndGenerateTokens(db, reqBody)

    return NextResponse.json(tokens, { status: 201 })
  } catch (err) {
    throw new Error((err as Error).message)
  }
}
