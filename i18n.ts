import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
const locales = ['en', 'uk']

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as string)) notFound()

  return {
    messages: (
      await (locale === 'uk'
        ? import('locales/uk.json')
        : import(`locales/${locale}.json`))
    ).default,
  }
})
