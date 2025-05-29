import { useState } from 'react'
import { useGetStockQuoteQuery } from '@/store/services/financeApi'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface FinanceWidgetProps {
  id: string
}

const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']

export default function FinanceWidget({ id }: FinanceWidgetProps) {
  const [selectedStock, setSelectedStock] = useState('AAPL')
  const { data, error, isLoading } = useGetStockQuoteQuery({
    symbol: selectedStock,
    interval: '5min',
  })

  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
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

  const { quote, timeSeries } = data
  const chartData = timeSeries.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    price: point.close,
  }))

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Stock Market</h2>
        <div className="flex space-x-2">
          {popularStocks.map((symbol) => (
            <button
              key={symbol}
              onClick={() => setSelectedStock(symbol)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStock === symbol
                  ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${quote.price.toFixed(2)}
          </span>
          <span
            className={`text-sm font-medium ${
              quote.change >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {quote.change >= 0 ? '+' : ''}
            {quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
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
            <span className="font-medium">Volume:</span>{' '}
            {quote.volume.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke={quote.change >= 0 ? '#10b981' : '#ef4444'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 