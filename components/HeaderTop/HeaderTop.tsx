'use client'
import StoreProvider from 'lib/store/StoreProvider'
import React, { useContext } from 'react'
import Link from 'next/link'
import { HeaderLangSwitcher as LangSwitcher } from '../HeaderLangSwitcher/HeaderLangSwitcher'
import { HeaderActions as Actions } from '../HeaderActions/HeaderActions'
import { HeaderContext } from 'context/HeaderContext'
import { useTranslations } from 'next-intl'

export function HeaderTop() {
  const { setActiveIndex } = useContext(HeaderContext) as {
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
  }
  const t = useTranslations('Metadata')
  return (
    <div
      className='header-top'
      onMouseEnter={() => {
        setActiveIndex(null)
      }}
    >
      <nav className='container flex items-center justify-between'>
        <LangSwitcher />
        <h1 className='logo my-0'>
          <Link
            href='/'
            aria-label={t('title')}
            className='logo'
            title={t('title')}
          >
            <svg>
              <use href='/sprite.svg#logo' />
            </svg>
          </Link>
        </h1>
        <StoreProvider>
          <Actions />
        </StoreProvider>
      </nav>
    </div>
  )
}
