import { InputHTMLAttributes } from 'react'

type InputProps = {
  name: string
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export default InputProps
