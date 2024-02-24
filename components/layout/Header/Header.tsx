import Link from 'next/link'
import { HeaderActions as Actions } from './HeaderActions'
import { HeaderWrapper as Wrapper } from './HeaderWrapper'
import { HeaderLangSwitcher as LangSwitcher } from './HeaderLangSwitcher'
import { HeaderCategories as Categories } from './HeaderCategories'

function Header() {
  return (
    <Wrapper>
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
          <Categories />
          <Actions />
        </nav>
      </div>
    </Wrapper>
  )
}

export default Header
