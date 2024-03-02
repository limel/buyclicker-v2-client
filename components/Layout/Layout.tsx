import { NextIntlClientProvider, useMessages } from 'next-intl'
import Header from 'layout/Header'
// import { StoreProvider } from 'store/StoreProvider'
// import Footer from 'components/layout/Footer'

function Layout({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: string
}) {
  const messages = useMessages()
  return (
    // <StoreProvider>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      {/* <Footer /> */}
    </NextIntlClientProvider>
    // </StoreProvider>
  )
}

export default Layout
