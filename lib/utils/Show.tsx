import { Children, ReactElement, ReactNode } from 'react'

export const Show = ({ children }: { children: ReactNode }) => {
  let when: ReactNode | null = null
  let otherwise: ReactNode | null = null
  Children.forEach(children as ReactElement[], (child: ReactElement) => {
    if (child.props.isTrue === undefined) {
      otherwise = child
    } else if (!when && child.props.isTrue === true) {
      when = child
    }
  })

  return when || otherwise
}

Show.When = ({ isTrue, children }: { isTrue: boolean; children: ReactNode }) =>
  isTrue && children
Show.Else = ({
  render,
  children,
}: {
  render?: ReactNode
  children: ReactNode
}) => render || children
