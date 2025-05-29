/* eslint-disable @next/next/no-img-element */
import { useGetTopHeadlinesQuery } from '@/store/services/newsApi'
// import Image from 'next/image';

interface NewsArticle {
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
}

export default function NewsWidget() {
  const { data, error, isLoading } = useGetTopHeadlinesQuery({ category: 'general', page: 1 })

  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-red-500 dark:text-red-400">Error loading news</div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Latest News</h2>
      <div className="space-y-4 ">
        {data.articles.slice(0, 5).map((article: NewsArticle, index: number) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-20  no-underline p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex flex-col  justify-center items-start space-x-4">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-12 h-12 object-cover rounded-lg shadow border  dark:border-gray-700 flex-shrink-0"
                />
              )}
              <div className="flex-1  ">
                <h3 className=" font-medium text-gray-900 dark:text-white line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-400 dark:text-gray-500">
                  <span>{article.source.name}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
} 