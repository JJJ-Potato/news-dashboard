'use client'

import { useState, Fragment } from 'react'
import type { Company, NewsItem } from '@/lib/types'
import { CATEGORY_LABELS } from '@/lib/companies'

function highlight(text: string, keyword: string): React.ReactNode {
  if (!keyword || !text.includes(keyword)) return text
  const parts = text.split(keyword)
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <strong className="font-bold text-gray-900">{keyword}</strong>
          )}
        </Fragment>
      ))}
    </>
  )
}

const CATEGORY_COLORS = {
  prime: { bg: '#1B4D3E', lightBg: '#E8F5E9', text: '#1B4D3E' },
  joint: { bg: '#1A237E', lightBg: '#E8EAF6', text: '#1A237E' },
  sub:   { bg: '#B71C1C', lightBg: '#FFEBEE', text: '#B71C1C' },
}

function formatRelativeDate(pubDate: string): string {
  try {
    const date = new Date(pubDate)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return '오늘'
    if (diffDays === 1) return '어제'
    return `${diffDays}일 전`
  } catch {
    return ''
  }
}

interface CompanyCardProps {
  company: Company
  news: NewsItem[]
  onRefresh: () => void
  isRefreshing: boolean
  error?: string | null
  maxItems?: number
}

export default function CompanyCard({ company, news, onRefresh, isRefreshing, error, maxItems = 10 }: CompanyCardProps) {
  const [expanded, setExpanded] = useState(false)
  const colors = CATEGORY_COLORS[company.category]
  const cappedNews = news.slice(0, maxItems)
  const visibleNews = expanded ? cappedNews : cappedNews.slice(0, 5)
  const hiddenCount = Math.max(0, cappedNews.length - 5)

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* 카드 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: colors.bg }}
          >
            {company.name[0]}
          </div>
          <span className="font-semibold text-gray-900 text-sm">{company.name}</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: colors.lightBg, color: colors.text }}
          >
            {CATEGORY_LABELS[company.category]}
          </span>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
          title="새로고침"
        >
          <svg
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* 에러 상태 */}
      {error && (
        <div className="px-4 py-5 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={onRefresh}
            className="text-xs font-medium text-gray-500 hover:text-gray-700 underline cursor-pointer"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* 빈 상태 */}
      {!error && news.length === 0 && (
        <div className="px-4 py-5 text-center text-sm text-gray-400">뉴스가 없습니다.</div>
      )}

      {/* 뉴스 리스트 */}
      {!error && (
      <div className="divide-y divide-gray-50">
        {visibleNews.map((item, idx) => (
          <div key={idx} className="px-4 py-2.5 hover:bg-gray-50 transition-colors">
            <div className="flex gap-2.5">
              <span className="text-xs font-medium text-gray-300 mt-0.5 w-4 shrink-0 text-right">{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <a
                  href={item.link}
                  className="text-sm font-medium text-gray-800 hover:text-blue-600 leading-snug block overflow-hidden"
                  style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                >
                  {highlight(item.title, company.name)}
                </a>
                {item.description && (
                  <p
                    className="text-xs text-gray-500 mt-0.5 overflow-hidden"
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                  >
                    {highlight(item.description, company.name)}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs text-gray-400">{item.source}</span>
                  <span className="text-gray-300 text-xs">·</span>
                  <span className="text-xs text-gray-400">{formatRelativeDate(item.pubDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* 더보기/접기 */}
      {!error && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100 cursor-pointer"
        >
          {expanded ? '접기 ↑' : `나머지 ${hiddenCount}건 더보기 ↓`}
        </button>
      )}
    </div>
  )
}
