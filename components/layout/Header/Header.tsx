'use client'
import { useEffect, useRef, useState } from 'react'
import debounce from 'debounce'
// import clsx from 'clsx'
import Link from 'next/link'
import { HeaderActions as Actions } from './HeaderActions'
import { HeaderLangSwitcher as LangSwitcher } from './HeaderLangSwitcher'
import { HeaderCategories as Categories } from './HeaderCategories'

function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [prevScroll, setPrevScroll] = useState(200)

  function updateFixedState() {
    const currentScroll = window.scrollY
    const isScrollingUp = currentScroll < prevScroll
    if (headerRef.current) {
      currentScroll > 0
        ? headerRef.current.classList.add('header_fixed')
        : headerRef.current.classList.remove('header_fixed')

      if (window.innerWidth > 1024) {
        if (currentScroll < 800) {
          headerRef.current.classList.remove('header_hide')
        } else {
          isScrollingUp
            ? headerRef.current.classList.remove('header_hide')
            : headerRef.current.classList.add('header_hide')
        }
      } else {
        headerRef.current.classList.remove('header_hide')
      }
    }
    setPrevScroll(currentScroll)
  }

  const debounceHandler = debounce(updateFixedState, 100)

  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight
      document.body.style.paddingTop = `${headerHeight}px`
    }
    window.addEventListener('scroll', debounceHandler)
    return () => window.removeEventListener('scroll', debounceHandler)
  })

  return (
    <>
      <header className='header' ref={headerRef}>
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
      </header>
      <div className='header-info'>
        <span>header info</span>
      </div>
    </>
  )
}

export default Header
