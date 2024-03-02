import { getTranslations } from 'next-intl/server'
import Hero from 'blocks/Hero'

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
    </main>
  )
}
