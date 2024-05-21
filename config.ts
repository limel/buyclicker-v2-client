import { Pathnames } from 'next-intl/navigation'

export const locales = ['en', 'uk'] as const
export const publicPages = ['/', '/login', '/registration']
export const pathnames = {
  '/': '/',
  '/en': '/en',
  '/login': {
    en: '/login',
    uk: '/vhid',
  },
  '/registration': {
    en: '/registration',
    uk: '/reiestratsiia',
  },
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = 'as-needed' as const

export type AppPathnames = keyof typeof pathnames
