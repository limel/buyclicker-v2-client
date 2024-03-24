import React from 'react'
import Link from 'next/link'
import StoreProvider from 'lib/store/StoreProvider'
import { HeaderCategories as Categories } from 'components/HeaderCategories'
import { HeaderActions as Actions } from 'components/HeaderActions'
import { getTranslations } from 'next-intl/server'
import { getCategories, getDbAndReqBody } from 'lib/utils/api-routes'
import clientPromise from 'lib/mongodb'

async function fetchCategories() {
  const { db } = await getDbAndReqBody(clientPromise, null)
  const data = await getCategories(db)
  return JSON.stringify(data)
}

export default async function HeaderBottom() {
  const categories = await fetchCategories().then((data) => JSON.parse(data))
  const t = await getTranslations('Metadata')
  return (
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
        <StoreProvider>
          <Actions />
        </StoreProvider>
      </nav>
    </div>
  )
}
