'use client'
import { setupStore } from 'store/store'
import { Provider } from 'react-redux'

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = setupStore()
  return <Provider store={store}>{children}</Provider>
}
