import Link from 'next/link'

export function HeaderActions() {
  return (
    <div className='actions'>
      <button className='flex items-center justify-center cursor-pointer w-6 h-6'>
        <svg className='w-full h-full'>
          <use href='/sprite.svg#search' />
        </svg>
      </button>
      <div className='border-l-[1px] border-dashed border-divider' />
      <Link
        href='#'
        className='flex items-center justify-center cursor-pointer w-6 h-6'
      >
        <svg className='w-full h-full'>
          <use href='/sprite.svg#like' />
        </svg>
      </Link>
      <Link
        href='#'
        className='flex items-center justify-center cursor-pointer w-6 h-6'
      >
        <svg className='w-full h-full'>
          <use href='/sprite.svg#cart' />
        </svg>
      </Link>
      <Link
        href='#'
        className='flex items-center justify-center cursor-pointer w-6 h-6'
      >
        <svg className='w-full h-full'>
          <use href='/sprite.svg#account' />
        </svg>
      </Link>
    </div>
  )
}
