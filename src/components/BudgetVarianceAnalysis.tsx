import React from 'react'
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react'
import type { Budget, Currency } from '../types/financial'
import { formatCurrency, formatPercent } from '../utils/formatters'

interface BudgetVarianceAnalysisProps {
  budgets: Budget[]
  currency?: Currency
}

export const BudgetVarianceAnalysis: React.FC<BudgetVarianceAnalysisProps> = ({
  budgets,
  currency = 'USD',
}) => {
  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocatedAmount, 0)
  const totalSpent = budgets.reduce((acc, b) => acc + b.actualSpent, 0)
  const totalRemaining = totalAllocated - totalSpent
  const overallBurnPercent = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0

  const overspentCount = budgets.filter((b) => b.actualSpent > b.allocatedAmount).length

  return (
    <article className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs" aria-label="Budget vs Actual Variance Analysis">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Governance & Controls
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Budget vs. Actual Analysis
          </h2>
        </div>

        {overspentCount > 0 ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>{overspentCount} Category Over Budget</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>All Budgets Within Targets</span>
          </div>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Allocated Budget</span>
          <strong className="text-xl font-bold text-slate-900 dark:text-white block mt-1">
            {formatCurrency(totalAllocated, currency)}
          </strong>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Actual Realized Spend</span>
          <strong className="text-xl font-bold text-slate-900 dark:text-white block mt-1">
            {formatCurrency(totalSpent, currency)}
          </strong>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {formatPercent(overallBurnPercent)} Total Burn
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Remaining Cushion</span>
          <strong className="text-xl font-bold text-emerald-600 dark:text-emerald-400 block mt-1">
            {formatCurrency(totalRemaining, currency)}
          </strong>
        </div>
      </div>

      {/* Categories Progress list */}
      <div className="space-y-4">
        {budgets.map((b) => {
          const consumption = b.allocatedAmount > 0 ? (b.actualSpent / b.allocatedAmount) * 100 : 0
          const remaining = b.allocatedAmount - b.actualSpent
          const isOver = consumption > 100
          const isWarn = consumption >= 80 && !isOver

          return (
            <div
              key={b.id}
              className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {b.categoryName}
                  </span>
                  {isOver && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      <AlertTriangle className="w-3 h-3" /> Over Budget
                    </span>
                  )}
                  {isWarn && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      80%+ Consumed
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    Spent: <strong className="text-slate-900 dark:text-white">{formatCurrency(b.actualSpent, currency)}</strong>
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Budget: <strong className="text-slate-900 dark:text-white">{formatCurrency(b.allocatedAmount, currency)}</strong>
                  </span>
                  <span className={`font-semibold ${isOver ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {isOver ? `Over by ${formatCurrency(Math.abs(remaining), currency)}` : `${formatCurrency(remaining, currency)} left`}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all ${
                    isOver ? 'bg-rose-500' : isWarn ? 'bg-amber-500' : 'bg-blue-600 dark:bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(consumption, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}
