import Link from 'next/link'
import { HeaderTop as Top } from 'components/layout/Header/HeaderTop'
import { HeaderActions as Actions } from 'components/layout/Header/HeaderActions'
import { HeaderWrapper as Wrapper } from 'components/layout/Header/HeaderWrapper'
import { HeaderCategories as Categories } from 'components/layout/Header/HeaderCategories'
import { getCategories, getDbAndReqBody } from 'lib/utils/api-routes'
import clientPromise from 'lib/mongodb'

async function fetchCategories() {
  const { db } = await getDbAndReqBody(clientPromise, null)
  const data = await getCategories(db)
  return JSON.stringify(data)
}

async function Header() {
  const categories = await fetchCategories().then((data) => JSON.parse(data))

  return (
    <Wrapper>
      <Top />
      <div className='header-bottom'>
        <nav className='container flex items-center justify-between'>
          <Link href='/' className='logo'>
            <svg>
              <use href='/sprite.svg#logo' />
            </svg>
          </Link>
          <Categories categories={categories} />
          <Actions />
        </nav>
      </div>
    </Wrapper>
  )
}

export default Header
