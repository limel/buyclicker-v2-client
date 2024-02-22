import { Inter } from 'next/font/google'
import Layout from 'components/layout/Layout'
import 'styles/styles.scss'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale} className={`${inter.variable} font-sans`}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
