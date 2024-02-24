import { MongoClient } from 'mongodb'

const clientPromise = MongoClient.connect(
  process.env.NEXT_PUBLIC_DB_URL as string,
  {
    maxConnecting: 10,
  }
)

export default clientPromise
