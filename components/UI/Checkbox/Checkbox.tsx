import React from 'react'
import { useField } from 'formik'
import { CheckboxProps } from './Checkbox.types'

export default function Checkbox(props: CheckboxProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta] = useField(props?.name ?? 'checkbox')

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    field.onChange(e)
  }

  return (
    <label className='checkbox'>
      <input
        type='checkbox'
        className='sr-only'
        {...props}
        onChange={onChange}
        defaultChecked={props.defaultChecked}
      />
      <span className='checkbox__checkmark'>
        <svg className='w-2 h-2 opacity-0 transition-all duration-300 ease-in-out'>
          <use href='/sprite.svg#checkmark' />
        </svg>
      </span>
      <span className='checkbox__label'>{props.label}</span>
    </label>
  )
}
