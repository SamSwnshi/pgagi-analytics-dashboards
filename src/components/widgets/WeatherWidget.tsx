'use client'

import { useEffect, useState } from 'react'
import { useGetWeatherQuery } from '@/store/services/weatherApi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DailyWeather {
  dt: number
  temp: {
    day: number
    min: number
    max: number
  }
  humidity: number
  wind_speed: number
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
}

export default function WeatherWidget() {
  const [location, setLocation] = useState({ lat: 40.7128, lon: -74.006 }) // Default to New York
  const { data, error, isLoading } = useGetWeatherQuery(location)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

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
        <div className="text-red-500 dark:text-red-400">Error loading weather data</div>
      </div>
    )
  }

  if (!data) return null

  const chartData = data.daily.map((day: DailyWeather) => ({
    date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    temperature: day.temp.day,
  }))

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Weather Forecast</h2>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(data.current.temp)}°C
          </span>
          <img
            src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
            alt={data.current.weather[0].description}
            className="w-12 h-12"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <span className="font-medium">Humidity:</span> {data.current.humidity}%
          </div>
          <div>
            <span className="font-medium">Wind Speed:</span> {data.current.wind_speed} m/s
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ fill: '#0ea5e9' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 