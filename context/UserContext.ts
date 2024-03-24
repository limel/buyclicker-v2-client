import { createContext } from 'react'
import type { UserData } from 'types/User.types'

export const UserContext = createContext<{
  activeIndex: UserData | null
  setActiveIndex: React.Dispatch<React.SetStateAction<UserData | null>>
} | null>(null)
