// components/widgets/WeatherWidget.client.tsx
'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'
import { useGetWeatherQuery } from '@/store/services/weatherApi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DailyWeather {
  dt: number
  temp: { day: number; min: number; max: number }
  humidity: number
  wind_speed: number
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
}

// Default location (New York City)
const DEFAULT_LAT = 40.7128
const DEFAULT_LON = -74.0060

export default function WeatherWidget() {
  const [location, setLocation] = useState({ lat: DEFAULT_LAT, lon: DEFAULT_LON })
  const [locationError, setLocationError] = useState<string | null>(null)
  const { data: weather, error, isLoading } = useGetWeatherQuery(location)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
          setLocationError(null)
        },
        (error) => {
          // Handle different types of geolocation errors
          let errorMessage = 'Using default location (New York City)'
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Using default location (New York City)'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable. Using default location (New York City)'
              break
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Using default location (New York City)'
              break
          }
          setLocationError(errorMessage)
          console.log(errorMessage)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    } else {
      setLocationError('Geolocation not supported. Using default location (New York City)')
    }
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="text-red-500">Error loading weather data</div>
      </div>
    )
  }

  if (!weather) return null

  const current = weather.current
  const today = weather.daily[0]

  const chartData = weather.daily.map((day: DailyWeather) => ({
    date: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(day.dt * 1000)),
    temperature: day.temp.day,
  }))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Weather</h2>
      {locationError && (
        <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-2">
          {locationError}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold">{Math.round(current.temp)}°C</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {current.weather[0].description}
          </div>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt={current.weather[0].description}
          className="w-16 h-16"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-gray-500 dark:text-gray-400">Humidity</div>
          <div>{current.humidity}%</div>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400">Wind</div>
          <div>{current.wind_speed} m/s</div>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400">High</div>
          <div>{Math.round(today.temp.max)}°C</div>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400">Low</div>
          <div>{Math.round(today.temp.min)}°C</div>
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
