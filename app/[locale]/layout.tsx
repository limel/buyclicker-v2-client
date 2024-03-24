import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from 'layout/Header'
import Layout from 'components/Layout'
import 'styles/styles.scss'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale}>
      <body className={`${inter.variable} pt-[157px] relative`}>
        <Layout locale={locale}>
          <Header />
          {children}
        </Layout>
        <div id='modal' />
        <div id='loader' />
        <SpeedInsights />
      </body>
    </html>
  )
}
