import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Layout from 'components/layout/Layout'
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
      <body className={`${inter.variable}`}>
        <Layout locale={locale}>{children}</Layout>
        <SpeedInsights />
      </body>
    </html>
  )
}
