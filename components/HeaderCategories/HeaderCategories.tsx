'use client'
import { useContext } from 'react'
import { HeaderCategoryItem as Item } from '../HeaderCategoryItem/HeaderCategoryItem'
import { ICategory } from 'types/Category.types'
import { HeaderContext } from 'context/HeaderContext'
import Button from 'components/UI/Button'

export function HeaderCategories({
  categories = [],
}: {
  categories: ICategory[]
}) {
  const { activeIndex } = useContext(HeaderContext) as {
    activeIndex: number | null
  }

  function handler() {
    const res = fetch('/api/cron/')
      .then((res) => res)
      .then((res) => res.json())
    return res
  }
  return (
    <menu className='flex items-center justify-center gap-10 grow-0 shrink-1 basis-3/5'>
      <Button onClick={handler}>fetch</Button>
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
