'use client'

import { ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { RootState } from '@/store'
import { toggleSidebar } from '@/store/slices/layoutSlice'
import { Sidebar } from './Sidebar'
import WidgetGrid from './WidgetGrid'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state: RootState) => state.layout)
  const { mode } = useSelector((state: RootState) => state.theme)

  return (
    <div className={`min-h-screen ${mode === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`flex-1 ${sidebarOpen ? 'ml-64' : ''} transition-all duration-300`}>
          <header className="h-16 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center justify-between h-full px-6">
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center space-x-4">
                {/* Add header content here */}
              </div>
            </div>
          </header>

          <main className="p-6">
            <WidgetGrid />
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 