import { getTranslations } from 'next-intl/server'
import RegistrationForm from 'components/RegistrationForm'
import Image from 'next/image'

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
      <Image
        className='absolute top-0 left-0 -z-10 object-cover w-full h-full '
        src='/images/bg/login-registration-form.jpg'
        fill={true}
        layout='fill'
        style={{ width: '100%', height: '100%' }}
        alt='bg'
        quality={100}
      />
      <RegistrationForm />
    </main>
  )
}
