import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface TimeSeriesData {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}

interface StockResponse {
  'Time Series (Daily)': {
    [date: string]: TimeSeriesData
  }
}

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.alphavantage.co/query',
  }),
  endpoints: (builder) => ({
    getStockQuote: builder.query<StockResponse, string>({
      query: (symbol) => ({
        url: '',
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol,
          apikey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY,
        },
      }),
    }),
  }),
})

export const { useGetStockQuoteQuery } = stockApi 