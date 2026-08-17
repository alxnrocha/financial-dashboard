import type {
  Budget,
  CashFlowPoint,
  IncomeStatementRow,
  Transaction,
} from '../types/financial'

export function calculateNetRevenue(grossRevenue: number, deductions: number): number {
  return grossRevenue - Math.abs(deductions)
}

export function calculateGrossProfit(netRevenue: number, cogs: number): number {
  return netRevenue - Math.abs(cogs)
}

export function calculateEbitda(grossProfit: number, opex: number): number {
  return grossProfit - Math.abs(opex)
}

export function calculateEbitdaMargin(ebitda: number, netRevenue: number): number {
  if (netRevenue <= 0) return 0
  return Number(((ebitda / netRevenue) * 100).toFixed(1))
}

export function calculateVariance(budget: number, actual: number): {
  varianceDollar: number
  variancePercent: number
  budgetVsActualPercent: number
} {
  const varianceDollar = actual - budget
  const variancePercent = budget !== 0 ? Number(((varianceDollar / Math.abs(budget)) * 100).toFixed(1)) : 0
  const budgetVsActualPercent = budget !== 0 ? Math.round((Math.abs(actual) / Math.abs(budget)) * 100) : 100

  return {
    varianceDollar,
    variancePercent,
    budgetVsActualPercent,
  }
}

export function calculateRunway(cashBalance: number, monthlyBurnRate: number): number {
  if (monthlyBurnRate <= 0) return 999
  return Math.max(0, Math.floor(cashBalance / monthlyBurnRate))
}

export function aggregateTransactionsByStatus(transactions: Transaction[]): Record<string, { count: number; total: number }> {
  return transactions.reduce(
    (acc, tx) => {
      if (!acc[tx.status]) {
        acc[tx.status] = { count: 0, total: 0 }
      }
      acc[tx.status].count += 1
      acc[tx.status].total += tx.amount
      return acc
    },
    {} as Record<string, { count: number; total: number }>
  )
}

export function calculateBudgetBurn(budgets: Budget[]): {
  totalAllocated: number
  totalSpent: number
  totalRemaining: number
  burnRatePercent: number
} {
  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocatedAmount, 0)
  const totalSpent = budgets.reduce((acc, b) => acc + b.actualSpent, 0)
  const totalRemaining = totalAllocated - totalSpent
  const burnRatePercent = totalAllocated > 0 ? Number(((totalSpent / totalAllocated) * 100).toFixed(1)) : 0

  return {
    totalAllocated,
    totalSpent,
    totalRemaining,
    burnRatePercent,
  }
}

export function projectCashFlow(
  initialBalance: number,
  averageMonthlyNetFlow: number,
  monthsAhead: number
): CashFlowPoint[] {
  const points: CashFlowPoint[] = []
  let runningBalance = initialBalance

  for (let i = 1; i <= monthsAhead; i++) {
    runningBalance += averageMonthlyNetFlow
    points.push({
      date: `2024-0${3 + i}-01`,
      label: `Month +${i}`,
      inflow: Math.max(0, averageMonthlyNetFlow * 1.5),
      outflow: Math.max(0, averageMonthlyNetFlow * 0.5),
      netFlow: averageMonthlyNetFlow,
      balance: runningBalance,
      projection: runningBalance,
      isProjected: true,
    })
  }

  return points
}

export function validateDREConsistency(rows: IncomeStatementRow[]): boolean {
  const rowMap = new Map(rows.map((r) => [r.orderNumber ?? r.id, r]))

  const grossRev = rowMap.get(1)?.actual ?? 0
  const deductions = rowMap.get('row-deductions')?.actual ?? 0
  const netRev = rowMap.get(2)?.actual ?? 0

  return grossRev + deductions === netRev
}
