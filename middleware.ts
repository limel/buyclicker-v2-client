import createIntlMiddleware from 'next-intl/middleware'
import { pathnames, locales, localePrefix } from './config'
import { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware({
  defaultLocale: 'uk',
  locales,
  pathnames,
  localePrefix,
})

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${Object.keys(
      pathnames as { [key: string]: string | Record<string, string> }
    )
      .flatMap((key) => {
        const pathname = pathnames[key as keyof typeof pathnames]
        if (typeof pathname === 'string') return pathname
        return Object.values(pathname)
      })
      .join('|')})/?$`,
    'i'
  )

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
  if (isPublicPage) return intlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
    '/',
    '/(uk|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
}
