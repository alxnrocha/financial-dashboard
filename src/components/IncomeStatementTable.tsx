import React, { useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Download,
  Settings,
} from 'lucide-react'
import type { Currency, IncomeStatementRow } from '../types/financial'
import { formatCurrency, formatVarianceDollar } from '../utils/formatters'

interface IncomeStatementTableProps {
  rows: IncomeStatementRow[]
  currency?: Currency
  periodLabel?: string
  onExportReport?: () => void
  onViewSettings?: () => void
}

export const IncomeStatementTable: React.FC<IncomeStatementTableProps> = ({
  rows,
  currency = 'USD',
  periodLabel = 'For the period Jan 1 – Mar 31, 2024',
  onExportReport,
  onViewSettings,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    'row-5': true, // OPEX expanded by default as in design
  })

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const renderValue = (row: IncomeStatementRow, type: 'budget' | 'actual') => {
    if (row.isPercentageMetric) {
      return type === 'budget' ? row.percentageBudgetFormatted : row.percentageActualFormatted
    }
    const val = type === 'budget' ? row.budget : row.actual
    if (val < 0) {
      return `-${formatCurrency(Math.abs(val), currency)}`
    }
    return formatCurrency(val, currency)
  }

  const renderVarianceDollar = (row: IncomeStatementRow) => {
    if (row.isPercentageMetric) {
      const pp = (row.varianceDollar * 100).toFixed(1)
      return `+ ${pp} p.p.`
    }
    return formatVarianceDollar(row.varianceDollar, currency)
  }

  const renderVariancePercent = (row: IncomeStatementRow) => {
    const isZero = row.variancePercent === 0
    const isPositive = row.variancePercent > 0
    const isUnderExpense = row.budget < 0 && row.actual > row.budget // spending less than budgeted expense is good!

    const isFavorable = isUnderExpense || (row.budget >= 0 && isPositive)

    return (
      <div
        className={`inline-flex items-center gap-1 font-semibold text-xs ${
          isZero
            ? 'text-slate-500 dark:text-slate-400'
            : isFavorable
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-rose-600 dark:text-rose-400'
        }`}
      >
        {!isZero && (
          isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )
        )}
        <span>
          {isPositive ? `+${row.variancePercent.toFixed(1)}%` : `${row.variancePercent.toFixed(1)}%`}
        </span>
      </div>
    )
  }

  const renderProgress = (row: IncomeStatementRow) => {
    const pct = row.budgetVsActualPercent
    const isOver = pct > 100
    const widthPct = Math.min(pct, 100)

    return (
      <div className="flex items-center gap-3 justify-end min-w-[130px]">
        <div className="w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
          <div
            className={`h-full rounded-full ${
              isOver ? 'bg-blue-600' : 'bg-blue-500 dark:bg-blue-400'
            }`}
            style={{ width: `${widthPct}%` }}
          />
          {isOver && (
            <div
              className="absolute top-0 right-0 h-full bg-rose-500/80 rounded-r-full"
              style={{ width: `${Math.min(pct - 100, 30)}%` }}
            />
          )}
        </div>
        <span
          className={`text-xs font-bold w-10 text-right ${
            isOver ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-blue-400'
          }`}
        >
          {pct}%
        </span>
      </div>
    )
  }

  return (
    <article className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs" aria-label="DRE Gerencial Income Statement">
      {/* Header matching design.png */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            DRE Gerencial (Income Statement)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {periodLabel}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onViewSettings}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>View Settings</span>
          </button>
          <button
            type="button"
            onClick={onExportReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>+ Export Report</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
        <table className="w-full text-left text-xs border-collapse min-w-[760px]">
          <thead className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3.5 font-bold">Income Statement</th>
              <th className="p-3.5 text-right font-bold">Budget (Q1 2024)</th>
              <th className="p-3.5 text-right font-bold">Actual (Q1 2024)</th>
              <th className="p-3.5 text-right font-bold">Variance ($)</th>
              <th className="p-3.5 text-right font-bold">Variance (%)</th>
              <th className="p-3.5 text-right font-bold pr-5">Budget vs Actual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
            {rows.map((row) => {
              const isParent = Boolean(row.hasChildren && row.children?.length)
              const isExpanded = expandedRows[row.id]

              return (
                <React.Fragment key={row.id}>
                  <tr
                    className={`transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 ${
                      row.orderNumber ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        {isParent ? (
                          <button
                            type="button"
                            onClick={() => toggleRow(row.id)}
                            className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                            aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        ) : (
                          <span className="w-4" />
                        )}
                        <span className="text-slate-900 dark:text-white">
                          {row.orderNumber ? `${row.orderNumber}. ` : ''}
                          {row.label}
                        </span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right font-mono text-slate-700 dark:text-slate-300">
                      {renderValue(row, 'budget')}
                    </td>
                    <td className="p-3.5 text-right font-mono text-slate-900 dark:text-white font-bold">
                      {renderValue(row, 'actual')}
                    </td>
                    <td className="p-3.5 text-right font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {renderVarianceDollar(row)}
                    </td>
                    <td className="p-3.5 text-right font-mono">
                      {renderVariancePercent(row)}
                    </td>
                    <td className="p-3.5 text-right pr-5">
                      {renderProgress(row)}
                    </td>
                  </tr>

                  {/* Render Sub-rows if expanded */}
                  {isParent &&
                    isExpanded &&
                    row.children?.map((subRow) => (
                      <tr
                        key={subRow.id}
                        className="bg-slate-50/40 dark:bg-slate-800/30 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <td className="p-3.5 pl-10 text-slate-600 dark:text-slate-300">
                          {subRow.label}
                        </td>
                        <td className="p-3.5 text-right font-mono">
                          {renderValue(subRow, 'budget')}
                        </td>
                        <td className="p-3.5 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                          {renderValue(subRow, 'actual')}
                        </td>
                        <td className="p-3.5 text-right font-mono text-emerald-600 dark:text-emerald-400">
                          {renderVarianceDollar(subRow)}
                        </td>
                        <td className="p-3.5 text-right font-mono">
                          {renderVariancePercent(subRow)}
                        </td>
                        <td className="p-3.5 text-right pr-5">
                          {renderProgress(subRow)}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </article>
  )
}
