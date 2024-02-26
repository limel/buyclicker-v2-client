'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { HeaderLangSwitcher as LangSwitcher } from '../HeaderLangSwitcher/HeaderLangSwitcher'
import { HeaderActions as Actions } from '../HeaderActions/HeaderActions'
import { HeaderContext } from 'context/HeaderContext'

export function HeaderTop() {
  const { setActiveIndex } = useContext(HeaderContext) as {
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
  }

  return (
    <div
      className='header-top'
      onMouseEnter={() => {
        setActiveIndex(null)
      }}
    >
      <nav className='container flex items-center justify-between'>
        <LangSwitcher />
        <Link
          href='/'
          aria-label='main page'
          className='logo absolute left-1/2 -translate-x-1/2'
        >
          <svg>
            <use href='/sprite.svg#logo' />
          </svg>
        </Link>
        <Actions />
      </nav>
    </div>
  )
}
