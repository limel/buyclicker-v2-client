'use client'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '../../navigation'
import Loader from 'components/UI/Loader'

export function HeaderLangSwitcher() {
  const t = useTranslations('Header')
  const locale = useLocale()
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const handleLocaleChange = () => {
    const newLocale = locale === 'en' ? 'uk' : 'en'

    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      router.replace({ pathname, params }, { locale: newLocale })
    })
  }

  return (
    <>
      <button
        className='flex items-center gap-1.5 lg:w-[193px]'
        onClick={handleLocaleChange}
      >
        <svg className='w-5 h-5'>
          <use href={`/sprite.svg#${t('currentLocale')}`} />
        </svg>
        <span className='text-h6 uppercase'>{t('currentLocale')}</span>
      </button>
      <Loader isPending={isPending} />
    </>
  )
}
