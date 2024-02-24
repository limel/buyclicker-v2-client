'use client'
import React from 'react'
import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import debounce from 'debounce'

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLElement>(null)
  const [prevScroll, setPrevScroll] = useState(200)

  function updateFixedState() {
    const currentScroll = window.scrollY
    const isScrollingUp = currentScroll < (prevScroll || 0)

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

  const debounceHandler = debounce(updateFixedState, 150)
  useLayoutEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight
      document.body.style.paddingTop = `${headerHeight}px`
    }
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', debounceHandler)
    return () => window.removeEventListener('scroll', debounceHandler)
  }, [debounceHandler, prevScroll])

  return (
    <header className='header' ref={headerRef}>
      {children}
    </header>
  )
}
