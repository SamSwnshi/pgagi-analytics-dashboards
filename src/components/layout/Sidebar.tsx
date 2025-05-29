'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { toggleSidebar } from '@/store/slices/layoutSlice'
import {
  ChartBarIcon,
  HomeIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export function Sidebar() {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state: RootState) => state.layout)
  const [isHovered, setIsHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Responsive: open by default on desktop, closed on mobile
  // (You may want to sync this with Redux for global state)

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 rounded-lg p-2 bg-white dark:bg-gray-800 shadow"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-7 w-7 text-gray-700 dark:text-gray-200 text-white" />Dash
      </button>

      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 transition-all duration-300
          ${sidebarOpen ? 'w-64' : 'w-20'}
          ${mobileOpen ? 'block' : 'hidden'}
          lg:block`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {sidebarOpen && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          )}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) setMobileOpen(false)
              dispatch(toggleSidebar())
            }}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            {sidebarOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-2 py-2 text-sm font-medium ${
                sidebarOpen ? 'justify-start' : 'justify-center'
              } ${
                isHovered && !sidebarOpen
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon
                className={`h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400 ${
                  sidebarOpen ? 'mr-3' : ''
                }`}
              />
              {sidebarOpen && (
                <span className="text-gray-900 dark:text-white">{item.name}</span>
              )}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
} 