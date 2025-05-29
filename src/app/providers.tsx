'use client'

import { Provider } from 'react-redux'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { store } from '@/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemeProvider>
    </Provider>
  )
} 