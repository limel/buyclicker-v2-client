'use client'
import { useState } from 'react'
import { useLocale } from 'next-intl'
import clsx from 'clsx'
import { ICategory, ISubcategories } from './Header.types'

export function HeaderCategoryItem(props: ICategory) {
  const category: ICategory = props
  const locale = useLocale()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = (e: React.UIEvent) => {
    console.log(e.currentTarget)
    setIsHovered(true)
  }

  // const handleMouseLeave = () => {
  //   setIsHovered(false)
  // }
  return (
    <li
      className='group/item cursor-pointer'
      onMouseEnter={(e) => {
        handleMouseEnter(e)
      }}
    >
      <div className={clsx('category-item', isHovered && 'active')}>
        {locale === 'en' ? category.translation.en.name : category.name}
        <svg className='w-5 h-5 text-blue ml-[6px] group-hover/item:rotate-180 transition-transform ease-in-out duration-300'>
          <use href='/sprite.svg#chevron-down' />
        </svg>
      </div>
      <div className='dropdown absolute pointer-events-none w-full bg-white shadow-md py-5 left-0 top-full opacity-0'>
        <div className='container gap-16  flex items-start justify-start flex-wrap max-h-[540px] overflow-y-clip'>
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
