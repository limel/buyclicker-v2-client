import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
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
  const t = useTranslations('workInProgress')
  // console.log(message)
  return (
    <main className='min-h-[100vh]'>
      <div className='container text-center flex items-center justify-center flex-col'>
        <p className='text-h0 text-accent'>{t('title')}</p>
        <br />
        <p className='text-h2'>{t('message')}</p>
        <br />
        <p className='text-h2'>{t('message2')}</p>
        <br />
        <p className='text-h2'>{t('message3')}</p>

        <Image
          className='w-[300px] h-[300px]'
          src='/Thought-Processes.svg'
          alt='Thougth Procces'
          width={865}
          height={682}
        />
      </div>
    </main>
  )
}
