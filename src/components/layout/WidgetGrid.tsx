'use client'

import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd/dist/core/DndProvider'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RootState } from '@/store'
import WeatherWidget from '@/components/widgets/WeatherWidget'
import NewsWidget from '@/components/widgets/NewsWidget'
import StockWidget from '@/components/widgets/StockWidget'

interface WidgetProps {
  id: string
  symbol?: string
}

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

const widgetComponents: Record<string, React.ComponentType<WidgetProps>> = {
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