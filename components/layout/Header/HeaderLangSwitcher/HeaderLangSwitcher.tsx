import { useTranslations } from 'next-intl'

export function HeaderLangSwitcher() {
  const t = useTranslations('Header')
  return (
    <button className='flex items-center gap-1.5'>
      <svg className='w-5 h-5'>
        <use href={`/sprite.svg#${t('currentLocale')}`} />
      </svg>
      <span className='text-h6 uppercase'>{t('currentLocale')}</span>
    </button>
  )
}
