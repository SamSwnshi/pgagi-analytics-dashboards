'use client'

import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RootState } from '@/store'
import dynamic from 'next/dynamic'

// Proper ES module dynamic imports with SSR disabled
const WeatherWidget = dynamic(() => import('@/components/widgets/WeatherWidget.client'), {
  ssr: false,
})
const NewsWidget = dynamic(() => import('@/components/widgets/NewsWidget'), {
  ssr: false,
})
const StockWidget = dynamic(() => import('@/components/widgets/StockWidget'), {
  ssr: false,
})

interface Widget {
  id: string
  type: 'weather' | 'news' | 'stock'
  position: number
  size: 'small' | 'medium' | 'large'
  symbol?: string
}

interface LayoutState {
  widgets: Widget[]
  sidebarOpen: boolean
}

type WidgetProps = {
  id: string
  symbol?: string
}

const widgetComponents: Record<Widget['type'], React.ComponentType<WidgetProps>> = {
  weather: WeatherWidget,
  news: NewsWidget,
  stock: StockWidget,
}

const MemoizedWidget = React.memo(({ widget }: { widget: Widget }) => {
  const WidgetComponent = widgetComponents[widget.type]
  if (!WidgetComponent) return null

  return (
    <div
      key={widget.id}
      className={`col-span-1 ${
        widget.size === 'large' ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <WidgetComponent id={widget.id} symbol={widget.symbol} />
    </div>
  )
})

MemoizedWidget.displayName = 'MemoizedWidget'

export default function WidgetGrid() {
  const { widgets } = useSelector((state: RootState) => state.layout as LayoutState)

  const sortedWidgets = useMemo(() => {
    return [...widgets].sort((a, b) => a.position - b.position)
  }, [widgets])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {sortedWidgets.map((widget) => (
          <MemoizedWidget key={widget.id} widget={widget} />
        ))}
      </div>
    </DndProvider>
  )
}
