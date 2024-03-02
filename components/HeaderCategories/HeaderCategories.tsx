'use client'
import { useContext } from 'react'
import { HeaderCategoryItem as Item } from '../HeaderCategoryItem/HeaderCategoryItem'
import { ICategory } from 'types/Header.types'
import { HeaderContext } from 'context/HeaderContext'

export function HeaderCategories({
  categories = [],
}: {
  categories: ICategory[]
}) {
  const { activeIndex } = useContext(HeaderContext) as {
    activeIndex: number | null
  }

  return (
    <menu className='flex items-center justify-center gap-10 grow-0 shrink-1 basis-3/5'>
      {categories &&
        categories.map((category: ICategory, index: number) => (
          <Item
            index={index + 1}
            active={activeIndex === index + 1}
            data={category}
            key={String(category._id) || index}
          />
        ))}
    </menu>
  )
}
