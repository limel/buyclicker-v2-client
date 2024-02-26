'use client'
import React from 'react'
import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import throttle from 'throttleit'
import { HeaderContext } from 'context/HeaderContext'
import clsx from 'clsx'

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  useLayoutEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight
      document.body.style.paddingTop = `${headerHeight}px`
    }
  }, [])

  useEffect(() => {
    let prevScroll = 200

    function updateFixedState() {
      const currentScroll = window.scrollY
      const isScrollingUp = currentScroll < (prevScroll || 0)

      function headerHide() {
        setActiveIndex(null)
        headerRef.current && headerRef.current.classList.add('header_hide')
      }

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
              : headerHide()
          }
        } else {
          headerRef.current.classList.remove('header_hide')
        }
      }
      prevScroll = currentScroll
    }

    const throttleHandler = throttle(updateFixedState, 300)

    window.addEventListener('scroll', throttleHandler)
    return () => window.removeEventListener('scroll', throttleHandler)
  }, [])

  return (
    <>
      <header
        className='header'
        ref={headerRef}
        onMouseLeave={() => {
          setActiveIndex(null)
        }}
      >
        <HeaderContext.Provider
          value={{
            activeIndex,
            setActiveIndex,
          }}
        >
          {children}
        </HeaderContext.Provider>
      </header>
      <div className={clsx('overlay', activeIndex !== null && 'active')} />
    </>
  )
}
