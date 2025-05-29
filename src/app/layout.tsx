import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Analytics Dashboard',
  description: 'A comprehensive analytics dashboard with real-time data visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900`}>
        <Providers>
          <Header />
          <Sidebar />
          <main className="pl-64 pt-16 min-h-screen">
            <div className="p-6">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
