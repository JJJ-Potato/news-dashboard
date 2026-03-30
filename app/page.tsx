'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import CompanyCard from '@/components/CompanyCard'
import SkeletonCard from '@/components/SkeletonCard'
import { COMPANIES, CATEGORY_LABELS } from '@/lib/companies'
import type { Category, NewsItem, ApiResponse } from '@/lib/types'

const CATEGORY_ORDER: Category[] = ['prime', 'joint', 'sub']
const CATEGORY_COLORS: Record<Category, string> = {
  prime: '#1B4D3E',
  joint: '#1A237E',
  sub:   '#B71C1C',
}
const SECTIONS = [1, 2, 3, 4]

type CompanyData = {
  items: NewsItem[]
  loading: boolean
  error: string | null
}

const INITIAL_STATE: Record<string, CompanyData> = Object.fromEntries(
  COMPANIES.map(c => [c.id, { items: [], loading: true, error: null }])
)

export default function Home() {
  const [dataMap, setDataMap] = useState<Record<string, CompanyData>>(INITIAL_STATE)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)
  const [isRefreshingAll, setIsRefreshingAll] = useState(false)
  const [activeJointSection, setActiveJointSection] = useState<number | null>(1)
  const [activeSubSection, setActiveSubSection] = useState<number | null>(1)

  const fetchOne = useCallback(async (companyId: string, companyName: string) => {
    setDataMap(prev => ({
      ...prev,
      [companyId]: { ...prev[companyId], loading: true, error: null },
    }))
    try {
      const res = await fetch(`/api/news?company=${encodeURIComponent(companyName)}`)
      if (!res.ok) throw new Error(`서버 오류 (${res.status})`)
      const data: ApiResponse = await res.json()
      if (data.error) throw new Error(data.error)
      setDataMap(prev => ({
        ...prev,
        [companyId]: { items: data.items, loading: false, error: null },
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류'
      setDataMap(prev => ({
        ...prev,
        [companyId]: { ...prev[companyId], loading: false, error: message },
      }))
    }
  }, [])

  const fetchAll = useCallback(async () => {
    setIsRefreshingAll(true)
    await Promise.allSettled(COMPANIES.map(c => fetchOne(c.id, c.name)))
    setLastFetched(new Date())
    setIsRefreshingAll(false)
  }, [fetchOne])

  useEffect(() => {
    fetchAll()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefreshAll = () => fetchAll()
  const handleRefreshCompany = (companyId: string, companyName: string) => {
    fetchOne(companyId, companyName).then(() => setLastFetched(new Date()))
  }

  const totalNews = Object.values(dataMap).reduce((sum, d) => sum + d.items.length, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        companyCount={COMPANIES.length}
        newsCount={totalNews}
        lastFetched={lastFetched}
        onRefreshAll={handleRefreshAll}
        isRefreshing={isRefreshingAll}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {CATEGORY_ORDER.map(category => {
          const companies = COMPANIES.filter(c => c.category === category)
          if (companies.length === 0) return null

          // 공동도급사 — 공구 탭
          if (category === 'joint') {
            const activeCompanies = activeJointSection !== null
              ? companies.filter(c => c.section === activeJointSection)
              : []

            return (
              <section key={category}>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS.joint }} />
                  <h2 className="text-base font-bold text-gray-800">{CATEGORY_LABELS.joint}</h2>
                  <div className="flex items-center gap-1.5">
                    {SECTIONS.map(sec => {
                      const isActive = activeJointSection === sec
                      return (
                        <button
                          key={sec}
                          onClick={() => setActiveJointSection(isActive ? null : sec)}
                          className="px-3 py-1 text-xs font-semibold rounded-full border transition-colors cursor-pointer"
                          style={isActive
                            ? { backgroundColor: '#1A237E', color: '#fff', borderColor: '#1A237E' }
                            : { backgroundColor: '#fff', color: '#6B7280', borderColor: '#D1D5DB' }
                          }
                        >
                          {sec}공구
                        </button>
                      )
                    })}
                  </div>
                </div>

                {activeJointSection !== null && (
                  activeCompanies.length > 0 ? (
                    <div className={`grid gap-4 ${activeCompanies.length === 1 ? 'grid-cols-1 lg:max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
                      {activeCompanies.map(company => {
                        const d = dataMap[company.id]
                        if (d.loading && d.items.length === 0) return <SkeletonCard key={company.id} />
                        return (
                          <CompanyCard
                            key={company.id}
                            company={company}
                            news={d.items}
                            error={d.error}
                            onRefresh={() => handleRefreshCompany(company.id, company.name)}
                            isRefreshing={d.loading}
                            maxItems={5}
                          />
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 pl-4">{activeJointSection}공구 공동도급사가 아직 등록되지 않았습니다.</p>
                  )
                )}
              </section>
            )
          }

          // 하도급사 — 공구 탭
          if (category === 'sub') {
            const activeCompanies = activeSubSection !== null
              ? companies.filter(c => c.section === activeSubSection)
              : []

            return (
              <section key={category}>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS.sub }} />
                  <h2 className="text-base font-bold text-gray-800">{CATEGORY_LABELS.sub}</h2>
                  <div className="flex items-center gap-1.5">
                    {SECTIONS.map(sec => {
                      const isActive = activeSubSection === sec
                      return (
                        <button
                          key={sec}
                          onClick={() => setActiveSubSection(isActive ? null : sec)}
                          className="px-3 py-1 text-xs font-semibold rounded-full border transition-colors cursor-pointer"
                          style={isActive
                            ? { backgroundColor: '#B71C1C', color: '#fff', borderColor: '#B71C1C' }
                            : { backgroundColor: '#fff', color: '#6B7280', borderColor: '#D1D5DB' }
                          }
                        >
                          {sec}공구
                        </button>
                      )
                    })}
                  </div>
                </div>

                {activeSubSection !== null && (
                  activeCompanies.length > 0 ? (
                    <div className={`grid gap-4 ${activeCompanies.length === 1 ? 'grid-cols-1 lg:max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
                      {activeCompanies.map(company => {
                        const d = dataMap[company.id]
                        if (d.loading && d.items.length === 0) return <SkeletonCard key={company.id} />
                        return (
                          <CompanyCard
                            key={company.id}
                            company={company}
                            news={d.items}
                            error={d.error}
                            onRefresh={() => handleRefreshCompany(company.id, company.name)}
                            isRefreshing={d.loading}
                            maxItems={5}
                          />
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 pl-4">{activeSubSection}공구 하도급사가 아직 등록되지 않았습니다.</p>
                  )
                )}
              </section>
            )
          }

          // 원도급사 — 일반 그리드
          return (
            <section key={category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[category] }} />
                <h2 className="text-base font-bold text-gray-800">{CATEGORY_LABELS[category]}</h2>
                <span className="text-sm text-gray-400">{companies.length}개사</span>
              </div>
              <div className={`grid gap-4 ${companies.length === 1 ? 'grid-cols-1 lg:max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
                {companies.map(company => {
                  const d = dataMap[company.id]
                  if (d.loading && d.items.length === 0) return <SkeletonCard key={company.id} />
                  return (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      news={d.items}
                      error={d.error}
                      onRefresh={() => handleRefreshCompany(company.id, company.name)}
                      isRefreshing={d.loading}
                    />
                  )
                })}
              </div>
            </section>
          )
        })}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-400">
          수도권 제2순환선(양평-이천) 건설사 뉴스 모니터링 · 데이터 출처: 네이버 뉴스
        </div>
      </footer>
    </div>
  )
}
