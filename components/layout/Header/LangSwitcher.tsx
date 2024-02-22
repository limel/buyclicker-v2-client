import { useTranslations } from 'next-intl'

export function LangSwitcher() {
  const t = useTranslations('Header')
  return (
    <button className='flex items-center gap-1.5'>
      <svg className='w-5 h-5'>
        <use href='/sprite.svg#Ukraine' />
      </svg>
      <span className='text-h6 uppercase'>{t('currentLocale')}</span>
    </button>
  )
}
