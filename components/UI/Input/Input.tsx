'use client'
import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import clsx from 'clsx'
import InputProps from './Input.types'
import s from './Input.module.scss'

export default function Input({ label, ...props }: InputProps) {
  const [field, meta] = useField(props.name)
  return (
    <label className={clsx(s.input, meta.error && s.input_error)}>
      <span>{label as string}</span>
      <input {...field} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      <span
        className={clsx(
          'text-red text-xs transition-all ease-in-out duration-300 ',
          meta.error && meta.touched
            ? 'opacity-100 h-full overflow-visible'
            : 'opacity-0 h-0 overflow-hidden'
        )}
      >
        {meta.error}
      </span>
    </label>
  )
}
