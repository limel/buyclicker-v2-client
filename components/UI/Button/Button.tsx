import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

import Link from 'next/link'
import clsx from 'clsx'
import ButtonProps from './Button.types'

import { Show } from 'lib/utils/Show'
import s from './Button.module.scss'

export default function Button({
  href,
  children,
  size = 'primary',
  color = 'black',
  ...props
}: ButtonProps) {
  return (
    <Show>
      <Show.When isTrue={!!href ?? false}>
        <Link
          href={href ?? '/'}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
          className={clsx(s.btn, s[color], s[size])}
        >
          {children}
        </Link>
      </Show.When>
      <Show.Else>
        <button
          data-ripple-dark='true'
          className={clsx(s.btn, s[color], s[size])}
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      </Show.Else>
    </Show>
  )
}
