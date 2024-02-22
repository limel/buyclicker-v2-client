// import type { Metadata } from 'next'
// import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  console.log(t('title'))
  console.log(t('description'))
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function Home() {
  const t = useTranslations()
  return (
    <main className=''>
      <h1>{t('Metadata.title')}</h1>
    </main>
  )
}
