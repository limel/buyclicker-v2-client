'use client'
import React from 'react'
import { useField } from 'formik'
import { useTranslations } from 'next-intl'
import { GenderRadioProps } from './GenderRadio.types'
import s from './GenderRadio.module.scss'

export default function GenderRadio(props: GenderRadioProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(props?.name ?? 'gender')
  const t = useTranslations('Inputs')

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.value)
  }
  return (
    <div className={s.radio}>
      <span className={s.radio__label}>{t('gender.label')}</span>
      <div className={s.radio__items}>
        <label className={s.radio__item}>
          <input
            type='radio'
            name={props.name}
            className='sr-only'
            value='female'
            onChange={handleRadioChange}
          />
          <span>{t('gender.female')}</span>
        </label>
        <label className={s.radio__item}>
          <input
            type='radio'
            name={props.name}
            className='sr-only'
            defaultChecked
            onChange={handleRadioChange}
            value='male'
          />
          <span>{t('gender.male')}</span>
        </label>
      </div>
    </div>
  )
}
