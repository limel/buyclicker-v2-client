import { NextIntlClientProvider, useMessages } from 'next-intl'
import Header from 'components/layout/Header'
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      {/* <Footer /> */}
    </NextIntlClientProvider>
  )
}

export default Layout
