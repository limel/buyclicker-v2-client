import Link from 'next/link'
import { HeaderActions as Actions } from './HeaderActions'
import { LangSwitcher } from './LangSwitcher'

function Header() {
  return (
    <>
      <header className='header'>
        <div className='header-top'>
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

        <div className='header-bottom'>
          <nav className='container flex items-center justify-between'>
            <Link href='/' className='logo'>
              <svg>
                <use href='/sprite.svg#logo' />
              </svg>
            </Link>
            <menu className='flex items-center justify-start gap-10'>
              <li>
                <Link
                  href='/'
                  className='flex items-center justify-start text-h6 uppercase'
                >
                  Одежда
                  <svg className='w-5 h-5 text-blue'>
                    <use href='/sprite.svg#chevron-down' />
                  </svg>
                </Link>
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
              </li>
            </menu>
            <Actions />
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
