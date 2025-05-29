import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Debug log to check if API key is available
console.log('Alpha Vantage API Key:', process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY)

interface StockQuote {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
  open: number
  previousClose: number
}

interface StockTimeSeries {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface StockResponse {
  quote: StockQuote
  timeSeries: StockTimeSeries[]
}

interface TimeSeriesData {
  [key: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. volume': string
  }
}

interface AlphaVantageResponse {
  [key: string]: TimeSeriesData
}

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.alphavantage.co/query',
  }),
  endpoints: (builder) => ({
    getStockQuote: builder.query<StockResponse, { symbol: string; interval?: string }>({
      query: ({ symbol, interval = '5min' }) => ({
        url: '',
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol,
          interval,
          apikey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY,
        },
      }),
      transformResponse: (response: AlphaVantageResponse, meta, arg) => {
        const { symbol, interval = '5min' } = arg
        const timeSeriesKey = `Time Series (${interval})`
        const timeSeriesData = response[timeSeriesKey]
        
        if (!timeSeriesData) {
          throw new Error('No time series data available')
        }

        const latestTimestamp = Object.keys(timeSeriesData)[0]
        const latestData = timeSeriesData[latestTimestamp]

        return {
          quote: {
            symbol,
            price: parseFloat(latestData['4. close']),
            change: parseFloat(latestData['4. close']) - parseFloat(latestData['1. open']),
            changePercent: ((parseFloat(latestData['4. close']) - parseFloat(latestData['1. open'])) / parseFloat(latestData['1. open'])) * 100,
            volume: parseInt(latestData['5. volume']),
            high: parseFloat(latestData['2. high']),
            low: parseFloat(latestData['3. low']),
            open: parseFloat(latestData['1. open']),
            previousClose: parseFloat(latestData['1. open']),
          },
          timeSeries: Object.entries(timeSeriesData).map(([timestamp, data]) => ({
            timestamp,
            open: parseFloat(data['1. open']),
            high: parseFloat(data['2. high']),
            low: parseFloat(data['3. low']),
            close: parseFloat(data['4. close']),
            volume: parseInt(data['5. volume']),
          })),
        }
      },
    }),
  }),
})

export const { useGetStockQuoteQuery } = financeApi 