import { getTranslations } from 'next-intl/server'
import Hero from 'components/Hero'

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
  return (
    <main className=''>
      <Hero />
    </main>
  )
}
