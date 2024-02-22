import { useTranslations } from 'next-intl'
import Link from 'next/link'

function Header() {
  const t = useTranslations('Header')
  return (
    <>
      <header className='header'>
        <div className='header-top'>
          <nav className='container flex items-center justify-between'>
            <button className='flex items-center gap-1.5'>
              <svg className='w-5 h-5'>
                <use href='/sprite.svg#Ukraine' />
              </svg>
              <span className='text-h6 uppercase'>{t('currentLocale')}</span>
            </button>

            <Link
              href='/'
              aria-label='main page'
              className='logo absolute left-1/2 -translate-x-1/2'
            >
              <svg>
                <use href='/sprite.svg#logo' />
              </svg>
            </Link>

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
          </nav>
        </div>

        <div className='header-bottom'>
          <nav className='container'>
            <Link href='/' className='logo'>
              <svg>
                <use href='/sprite.svg#logo' />
              </svg>
            </Link>
          </nav>
        </div>
      </header>
      <div className='header-info'>
        <span>header info</span>
      </div>
    </>
  )
}

export default Header
