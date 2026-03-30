'use client'

interface HeaderProps {
  companyCount: number
  newsCount: number
  lastFetched: Date | null
  onRefreshAll: () => void
  isRefreshing: boolean
}

const DAY_KO = ['일', '월', '화', '수', '목', '금', '토']

function formatDateTime(date: Date): { datePart: string; timePart: string } {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const day = DAY_KO[date.getDay()]
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return {
    datePart: `${yyyy}. ${mm}. ${dd}.(${day})`,
    timePart: `${hh}:${min}:${ss}`,
  }
}

export default function Header({ companyCount, newsCount, lastFetched, onRefreshAll, isRefreshing }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* 좌측: 로고 + 타이틀 */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: '#1B4D3E' }}
          >
            N
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">건설사 뉴스 모니터링</h1>
            <p className="text-sm text-gray-500 leading-tight">수도권 제2순환선(양평-이천) 건설공사 참여 건설사 최신뉴스를 한 눈에!</p>
          </div>
        </div>

        {/* 우측: 통계 + 조회시각 + 새로고침 */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>모니터링 <span className="font-semibold text-gray-800">{companyCount}개사</span></span>
            <span className="text-gray-300">|</span>
            <span>수집 뉴스 <span className="font-semibold text-gray-800">{newsCount}건</span></span>
          </div>
          {lastFetched && (() => {
            const { datePart, timePart } = formatDateTime(lastFetched)
            return (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 tabular-nums">
                <span className="text-xs text-gray-400 font-medium">날짜</span>
                <span className="text-xs font-semibold text-gray-700">{datePart}</span>
                <span className="text-gray-300 text-xs">|</span>
                <span className="text-xs text-gray-400 font-medium">조회시간</span>
                <span className="text-xs font-semibold text-gray-700">{timePart}</span>
              </div>
            )
          })()}
          <button
            onClick={onRefreshAll}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white rounded-lg transition-opacity disabled:opacity-60 cursor-pointer"
            style={{ backgroundColor: '#1B4D3E' }}
          >
            <svg
              className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            전체 새로고침
          </button>
        </div>
      </div>
    </header>
  )
}
