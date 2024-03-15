import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonProps = {
  href?: string
  color?: 'black' | 'peachy' | 'grey' | 'transparent' | 'white'
  size?: 'primary' | 'secondary'
  children: ReactNode
} & ( // If the component is a button, href should be never
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  // If the component is a link, href is required
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
)
export default ButtonProps
