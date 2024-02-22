import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function Home() {
  const t = useTranslations()
  return (
    <main className=''>
      <div className='container'>
        <span>test</span>
        <h1>{t('Metadata.title')}</h1>
        <p>description</p>
      </div>
    </main>
  )
}
