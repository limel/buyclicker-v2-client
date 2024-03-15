'use client'
import { Datepicker } from 'flowbite-react'
import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import { useLocale, useTranslations } from 'next-intl'

const CalendarIcon = () => (
  <svg className='w-6 h-6 text-black cursor-pointer'>
    <use href='/sprite.svg#calendar' />
  </svg>
)

const theme = {
  base: {
    input: 'text-primary-gray',
  },
  popup: {
    root: {
      base: 'absolute top-10 block pt-2 z-10',
      inline: 'realative top-0 z-auto',
    },
  },
  views: {
    days: {
      items: {
        item: {
          selected: 'bg-blue text-white',
        },
      },
    },
    years: {
      items: {
        item: {
          selected: 'bg-blue text-white',
        },
      },
    },
  },
}

function DatePickerInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [field] = useField(props?.name ?? 'date')
  const t = useTranslations('Inputs')
  const locale = useLocale()
  return (
    <div className='input'>
      <span>{t('birthday.label')}</span>
      <Datepicker
        {...props}
        showClearButton={false}
        onSelectedDateChanged={(date: Date) => {
          field.onChange({
            target: {
              value: date,
              name: field.name,
            },
          })
        }}
        className='input'
        showTodayButton={false}
        language={locale}
        weekStart={1}
        icon={undefined}
        theme={theme}
        rightIcon={CalendarIcon}
      />
    </div>
  )
}

export default DatePickerInput
