// import 'server-only'
// import type { Locale } from 'i18n-config'

// // We enumerate all dictionaries here for better linting and typescript support
// // We also get the default import for cleaner types
// const locales = {
//   en: () =>
//     import('locales/en/translation.json').then((module) => module.default),
//   uk: () =>
//     import('locales/uk/translation.json').then((module) => module.default),
//   // en: () => import('./dictionaries/en.json').then((module) => module.default),
//   // de: () => import('./dictionaries/de.json').then((module) => module.default),
//   // cs: () => import('./dictionaries/cs.json').then((module) => module.default),
// }

// export const getTranslate = async (locale: Locale) =>
//   locales[locale]?.() ?? locales.en()
