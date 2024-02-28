import { createContext } from 'react'

export const HeaderContext = createContext<{
  activeIndex: number | null
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
} | null>(null)
