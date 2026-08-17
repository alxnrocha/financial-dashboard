import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { CostCenter, Currency } from '../types/financial'
import { formatCurrency, formatPercent } from '../utils/formatters'

interface CostCenterBreakdownProps {
  costCenters: CostCenter[]
  currency?: Currency
}

export const CostCenterBreakdown: React.FC<CostCenterBreakdownProps> = ({
  costCenters,
  currency = 'USD',
}) => {
  const totalSpent = costCenters.reduce((sum, cc) => sum + cc.currentSpent, 0)
  const totalAllocated = costCenters.reduce((sum, cc) => sum + cc.allocatedBudget, 0)

  const chartData = costCenters.map((cc) => ({
    name: cc.name,
    code: cc.code,
    value: cc.currentSpent,
    color: cc.color,
    allocated: cc.allocatedBudget,
    percentOfTotal: totalSpent > 0 ? (cc.currentSpent / totalSpent) * 100 : 0,
    consumptionPercent: cc.allocatedBudget > 0 ? (cc.currentSpent / cc.allocatedBudget) * 100 : 0,
  }))

  return (
    <article className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between" aria-label="Cost Center Breakdown">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Allocation & OPEX
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Cost Center Breakdown
          </h2>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          Budget: {formatCurrency(totalAllocated, currency, { compact: true })}
        </span>
      </div>

      {/* Donut chart with centered text */}
      <div className="relative h-44 w-full my-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="p-2.5 rounded-lg bg-slate-900 text-white text-xs border border-slate-700 shadow-lg">
                      <p className="font-bold">{data.name} ({data.code})</p>
                      <p className="text-slate-300">Spent: {formatCurrency(data.value, currency)}</p>
                      <p className="text-emerald-400">Share: {formatPercent(data.percentOfTotal)}</p>
                      <p className="text-blue-300">Budget Consumed: {formatPercent(data.consumptionPercent)}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.code}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <strong className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
            {formatCurrency(totalSpent, currency, { compact: true })}
          </strong>
          <span className="text-[10px] font-medium text-slate-400">Total Spend</span>
        </div>
      </div>

      {/* Department breakdown list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100 dark:border-slate-800/80">
        {chartData.map((cc) => (
          <div key={cc.code} className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cc.color }} />
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[110px]">
                {cc.name}
              </span>
            </div>
            <div className="text-right">
              <strong className="font-semibold text-slate-900 dark:text-white block">
                {formatPercent(cc.percentOfTotal, { decimals: 0 })}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
