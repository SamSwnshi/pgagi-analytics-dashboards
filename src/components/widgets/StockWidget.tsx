'use client'

import { useGetStockQuoteQuery } from '@/store/services/financeApi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StockWidgetProps {
  id: string
  symbol?: string
}

export default function StockWidget({ symbol = 'AAPL' }: StockWidgetProps) {
  const { data, error, isLoading } = useGetStockQuoteQuery({ symbol, interval: '5min' })

  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-red-500 dark:text-red-400">Error loading stock data</div>
      </div>
    )
  }

  if (!data) return null

  const chartData = data.timeSeries.map((point) => ({
    date: new Date(point.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: point.close,
  }))

  const { quote } = data

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{symbol}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${quote.price.toFixed(2)}
          </span>
          <span
            className={`text-sm font-medium ${
              quote.change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {quote.change >= 0 ? '+' : ''}
            {quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke={quote.change >= 0 ? '#10b981' : '#ef4444'}
              strokeWidth={2}
              dot={{ fill: quote.change >= 0 ? '#10b981' : '#ef4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
        <div>
          <span className="font-medium">Open:</span> ${quote.open.toFixed(2)}
        </div>
        <div>
          <span className="font-medium">High:</span> ${quote.high.toFixed(2)}
        </div>
        <div>
          <span className="font-medium">Low:</span> ${quote.low.toFixed(2)}
        </div>
        <div>
          <span className="font-medium">Volume:</span> {quote.volume.toLocaleString()}
        </div>
      </div>
    </div>
  )
} 