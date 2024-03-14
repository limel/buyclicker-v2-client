'use client'
import React from 'react'
import { useField } from 'formik'
import clsx from 'clsx'
import { InputProps } from './Input.types'

export default function Input({ label, ...props }: InputProps) {
  const [field, meta] = useField(props.name)
  return (
    <label
      className={clsx('input', meta.error && meta.touched && 'input_error')}
    >
      <span>{label as string}</span>
      <input {...field} {...props} />
      <span
        className={clsx(
          'text-red text-xs transition-all ease-in-out duration-300 ',
          meta.error && meta.touched
            ? 'opacity-100 h-full overflow-visible '
            : 'opacity-0 h-0 overflow-hidden visible'
        )}
      >
        {meta.error}
      </span>
    </label>
  )
}
