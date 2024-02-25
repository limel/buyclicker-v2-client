'server only'
import clientPromise from 'lib/mongodb'
import { getCategories, getDbAndReqBody } from 'lib/utils/api-routes'
import { HeaderCategoryItem as Item } from './HeaderCategoryItem'
import { ICategory } from './Header.types'

async function fetchCategories() {
  const { db } = await getDbAndReqBody(clientPromise, null)
  const rawData = await getCategories(db)
  const serializedData = JSON.parse(JSON.stringify(rawData)) // Serialize and deserialize
  return serializedData
}

export async function HeaderCategories() {
  const categories = await fetchCategories()
  return (
    <menu className='flex items-center justify-center gap-10 grow-0 shrink-1 basis-3/5'>
      {categories &&
        categories.map((category: ICategory, index: number) => (
          <Item {...category} key={String(category._id) || index} />
        ))}
    </menu>
  )
}
