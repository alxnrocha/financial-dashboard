import React, { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { CashFlowPoint, Currency, PeriodRange } from '../types/financial'
import { formatCurrency } from '../utils/formatters'

interface CashFlowChartProps {
  data: CashFlowPoint[]
  currency?: Currency
  onPeriodChange?: (period: PeriodRange) => void
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({
  data,
  currency = 'USD',
  onPeriodChange,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodRange>('3M')

  const handlePeriodClick = (p: PeriodRange) => {
    setSelectedPeriod(p)
    onPeriodChange?.(p)
  }

  return (
    <article className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between" aria-label="Cash Flow Projection">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Treasury & Liquidity
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Cash Flow Projection
          </h2>
        </div>

        <div className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          {(['1M', '3M', '6M', '1Y', 'YTD'] as PeriodRange[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePeriodClick(p)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedPeriod === p
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="projGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} className="dark:stroke-slate-800" />
            <XAxis
              dataKey="label"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCurrency(v, currency, { compact: true })}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as CashFlowPoint
                  return (
                    <div className="p-3 rounded-lg bg-slate-900 text-white text-xs border border-slate-700 shadow-lg">
                      <p className="font-semibold text-slate-300 mb-1">{label} {pt.isProjected ? '(30d Forecast)' : ''}</p>
                      <div className="space-y-1">
                        <p className="flex justify-between gap-4">
                          <span className="text-slate-400">Balance:</span>
                          <span className="font-bold text-white">{formatCurrency(pt.balance, currency)}</span>
                        </p>
                        <p className="flex justify-between gap-4">
                          <span className="text-emerald-400">Inflow:</span>
                          <span className="font-medium text-emerald-400">+{formatCurrency(pt.inflow, currency)}</span>
                        </p>
                        <p className="flex justify-between gap-4">
                          <span className="text-rose-400">Outflow:</span>
                          <span className="font-medium text-rose-400">-{formatCurrency(pt.outflow, currency)}</span>
                        </p>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fill="url(#balanceGradient)"
              name="Historical Cash Balance"
            />
            <Area
              type="monotone"
              dataKey="projection"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="url(#projGradient)"
              name="Forecasted Cash Balance"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Actual Liquidity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-dashed border-emerald-500 bg-emerald-500/30" />
            <span>30-Day Predictive Runway</span>
          </div>
        </div>
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
          +14.2% Net Cash Velocity
        </span>
      </div>
    </article>
  )
}
