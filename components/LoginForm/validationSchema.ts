import * as yup from 'yup'
// import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

// async function generateTranslations() {
//   return await getTranslations()
// }

export const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})
