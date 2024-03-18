'use client'
// old version
// import { setupStore } from 'lib/store'
// import { Provider } from 'react-redux'

// export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
//   const store = setupStore()
//   return <Provider store={store}>{children}</Provider>
// }

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from 'lib/store'
import type { AppStore } from 'lib/store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
