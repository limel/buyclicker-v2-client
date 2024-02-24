import { categoriesAPI } from 'services/CategoreisServices'
import { ICategory } from 'types/reducers'

export function HeaderCategories() {
  const { data } = categoriesAPI.useGetCategoriesQuery()
  const categories: ICategory[] = Array.isArray(data) ? data : []

  return (
    <menu className='flex items-center justify-start gap-10 grow-0 shrink-1 basis-3/5'>
      {categories &&
        categories.map(({ _id, name }: { _id: string; name: string }) => (
          <li key={_id}>
            <div className='flex items-center justify-start text-h6 uppercase'>
              {name}
              <svg className='w-5 h-5 text-blue'>
                <use href='/sprite.svg#chevron-down' />
              </svg>
            </div>
          </li>
        ))}
    </menu>
  )
}

/* <li>
        <Link
          href='/'
          className='flex items-center justify-start text-h6 uppercase'
        >
          Одежда
          <svg className='w-5 h-5 text-blue'>
            <use href='/sprite.svg#chevron-down' />
          </svg>
        </Link>
        {/* <div className='absolute events-none w-full bg-white shadow-md py-5 left-0 top-full'>
          <ul className='flex items-center justify-start flex-wrap mx-auto max-w-[1312px] gap-16'>
            <li>category 1</li>
            <li>category 1</li>
            <li>category2</li>
          </ul>
        </div>
      </li>
      <li>
        <Link
          href='/'
          className='flex items-center justify-start text-h6 uppercase'
        >
          Обувь
          <svg className='w-5 h-5 text-blue'>
            <use href='/sprite.svg#chevron-down' />
          </svg>
        </Link>
      </li> */
