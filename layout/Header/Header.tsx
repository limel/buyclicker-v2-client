import Link from 'next/link'
import { HeaderTop as Top } from 'components/HeaderTop'
import { HeaderActions as Actions } from 'components/HeaderActions'
import { HeaderWrapper as Wrapper } from 'components/HeaderWrapper'
import { HeaderCategories as Categories } from 'components/HeaderCategories'
import { getCategories, getDbAndReqBody } from 'lib/utils/api-routes'
import clientPromise from 'lib/mongodb'
import { getTranslations } from 'next-intl/server'

async function fetchCategories() {
  const { db } = await getDbAndReqBody(clientPromise, null)
  const data = await getCategories(db)
  return JSON.stringify(data)
}

async function Header() {
  const categories = await fetchCategories().then((data) => JSON.parse(data))
  const t = await getTranslations('Metadata')
  return (
    <Wrapper>
      <Top />
      <div className='header-bottom'>
        <nav className='container flex items-center justify-between'>
          <Link
            href='/'
            className='logo'
            title={t('title')}
            aria-label={t('title')}
          >
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
