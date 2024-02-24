import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { categoriesAPI } from 'services/CategoreisServices'

const rootReducer = combineReducers({
  [categoriesAPI.reducerPath]: categoriesAPI.reducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(categoriesAPI.middleware),
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
