import React from 'react'
import { ArrowDownRight, ArrowUpRight, ShieldCheck } from 'lucide-react'
import type { Currency, ExecutiveSummary } from '../types/financial'
import { formatCurrency, formatPercent } from '../utils/formatters'

interface ExecutiveMetricsProps {
  summary: ExecutiveSummary
  currency?: Currency
}

export const ExecutiveMetrics: React.FC<ExecutiveMetricsProps> = ({
  summary,
  currency = 'USD',
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6" aria-label="Executive Financial Overview">
      {/* Total Balance / Net Revenue */}
      <article className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
          Total Net Revenue
        </span>
        <strong className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight block mb-2">
          {formatCurrency(summary.netRevenue, currency)}
        </strong>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+{formatPercent(summary.growthRateYoY)} vs Last Year</span>
        </div>
      </article>

      {/* Monthly Inflow */}
      <article className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
          Monthly Inflow
        </span>
        <strong className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight block mb-2">
          {formatCurrency(summary.monthlyInflow, currency)}
        </strong>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+6.8% Inflow Pace</span>
        </div>
      </article>

      {/* Monthly Outflow / OPEX */}
      <article className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
          Operating Expenses (OPEX)
        </span>
        <strong className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight block mb-2">
          {formatCurrency(summary.operatingExpenses, currency)}
        </strong>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <ArrowDownRight className="w-3.5 h-3.5" />
          <span>-21.6% vs Budget</span>
        </div>
      </article>

      {/* EBITDA & Margin */}
      <article className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
          EBITDA (Margin {summary.ebitdaMargin}%)
        </span>
        <strong className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight block mb-2">
          {formatCurrency(summary.ebitda, currency)}
        </strong>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+27.3% vs Target</span>
        </div>
      </article>

      {/* Cash Runway */}
      <article className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-linear-to-br from-indigo-50/50 to-emerald-50/30 dark:from-slate-800/80 dark:to-slate-900 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Cash Runway
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <ShieldCheck className="w-3 h-3" /> Strong
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <strong className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
            {summary.runwayMonths}
          </strong>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Months</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
          Balance: {formatCurrency(summary.cashBalance, currency, { compact: true })}
        </p>
      </article>
    </section>
  )
}
