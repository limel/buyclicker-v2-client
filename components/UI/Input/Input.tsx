'use client'
import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import InputProps from './Input.types'
import s from './Input.module.scss'

export default function Input({ label, ...props }: InputProps) {
  const [field, meta] = useField(props.name)
  return (
    <label className={s.input}>
      <span>{label as string}</span>
      <input {...field} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </label>
  )
}
