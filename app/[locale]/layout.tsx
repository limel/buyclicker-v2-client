import { Inter } from 'next/font/google'
import 'styles/styles.scss'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  console.log(locale)
  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
