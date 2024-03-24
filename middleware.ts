// import createIntlMiddleware from 'next-intl/middleware'
// import { NextRequest } from 'next/server'

// const publicPages = [
//   '/login',
//   '/vkhid-v-osobystyi-kabinet', // 'uk' version of '/login
//   '/registration',
//   '/forgot-password',
//   '/reset-password',
//   '/404',
//   '/',
// ]

// const intlMiddleware = createIntlMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'uk'],
//   // Used when no locale matches
//   defaultLocale: 'uk',
//   localePrefix: 'as-needed',
//   pathnames: {
//     '/login': {
//       en: '/login',
//       uk: '/vkhid-v-osobystyi-kabinet',
//     },
//   },
// })

// export default function middleware(req: NextRequest) {
//   const publicPathnameRegex = RegExp(
//     `^(/(${['en', 'uk'].join('|')}))?(${publicPages
//       .flatMap((p) => (p === '/' ? ['', '/'] : p))
//       .join('|')})/?$`,
//     'i'
//   )
//   const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
//   if (isPublicPage) return intlMiddleware(req)
// }

// export const config = {
//   // Skip all paths that should not be internationalized
//   matcher: ['/((?!api|_next|.*\\..*).*)', '/'],
// }

// // export const config = {
// //   // Match only internationalized pathnames
// //   matcher: ['/', '/(uk|en)/:path*'],
// // }

import createMiddleware from 'next-intl/middleware'
import { pathnames, locales, localePrefix } from './config'

export default createMiddleware({
  defaultLocale: 'uk',
  locales,
  pathnames,
  localePrefix,
})

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(uk|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
}
