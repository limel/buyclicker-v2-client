'use client'
// import { useState } from 'react'
import { useLocale } from 'next-intl'
import clsx from 'clsx'
import { IHeaderCategoryItem, ISubcategories } from '../Header.types'
import { useContext } from 'react'
import { HeaderContext } from 'context/HeaderContext'

export function HeaderCategoryItem({
  data,
  index,
  active,
}: IHeaderCategoryItem) {
  const category = {
    _id: data._id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    translation: data.translation,
    subcategories: data.subcategories,
  }
  const locale = useLocale()
  const { setActiveIndex } = useContext(HeaderContext) as {
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
  }

  return (
    <li
      className='cursor-pointer'
      onMouseEnter={() => {
        setActiveIndex(index)
      }}
    >
      <div className={clsx('category-item', active && 'active')}>
        {locale === 'en' ? category.translation.en.name : category.name}
        <svg className='w-5 h-5 text-blue ml-[6px] transition-transform ease-in-out duration-300'>
          <use href='/sprite.svg#chevron-down' />
        </svg>
      </div>
      <div className='dropdown absolute pointer-events-none w-full bg-white shadow-md pt-5 pb-20 left-0 top-full opacity-0'>
        <div className='container gap-16  flex items-start justify-start flex-wrap lg:max-h-[405.5px] 3xl:max-h-[566.5px] overflow-y-auto'>
          <ul className='flex items-start gap-4 flex-col'>
            {category.subcategories &&
              category.subcategories.map(
                (subcategory: ISubcategories, index: number) => (
                  <li
                    key={String(subcategory._id) || index}
                    className='text-h6 text-primary-gray'
                  >
                    {locale === 'en'
                      ? subcategory.translation.en.name
                      : subcategory.name}
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    </li>
  )
}