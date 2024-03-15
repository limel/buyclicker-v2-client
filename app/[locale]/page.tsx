import { getTranslations } from 'next-intl/server'
import Hero from 'blocks/Hero'
import Guides from 'blocks/Guides'

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
    <main>
      <Hero />
      <Guides />
    </main>
  )
}
