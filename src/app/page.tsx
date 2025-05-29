'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to Your Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            {/* Add any additional header content here */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
