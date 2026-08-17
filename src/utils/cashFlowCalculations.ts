import type { CashFlowPoint, Transaction } from '../types/financial'

export interface DailyAggregation {
  date: string
  inflow: number
  outflow: number
  netFlow: number
}

export function aggregateDailyCashFlow(transactions: Transaction[]): DailyAggregation[] {
  const map = new Map<string, { inflow: number; outflow: number }>()

  for (const tx of transactions) {
    const existing = map.get(tx.date) ?? { inflow: 0, outflow: 0 }
    if (tx.type === 'inflow') {
      existing.inflow += tx.amount
    } else {
      existing.outflow += tx.amount
    }
    map.set(tx.date, existing)
  }

  const sortedDates = Array.from(map.keys()).sort()
  return sortedDates.map((date) => {
    const item = map.get(date)!
    return {
      date,
      inflow: item.inflow,
      outflow: item.outflow,
      netFlow: item.inflow - item.outflow,
    }
  })
}

export function calculateRollingBalances(
  initialBalance: number,
  dailyFlows: DailyAggregation[]
): CashFlowPoint[] {
  let currentBalance = initialBalance
  return dailyFlows.map((df) => {
    currentBalance += df.netFlow
    return {
      date: df.date,
      label: df.date.slice(5),
      inflow: df.inflow,
      outflow: df.outflow,
      netFlow: df.netFlow,
      balance: currentBalance,
    }
  })
}

export function generateMovingAverageForecast(
  history: CashFlowPoint[],
  windowSize = 3,
  projectionSteps = 3
): CashFlowPoint[] {
  if (history.length === 0) return []

  const recent = history.slice(-windowSize)
  const avgNet = recent.reduce((sum, p) => sum + p.netFlow, 0) / (recent.length || 1)
  const avgInflow = recent.reduce((sum, p) => sum + p.inflow, 0) / (recent.length || 1)
  const avgOutflow = recent.reduce((sum, p) => sum + p.outflow, 0) / (recent.length || 1)

  let lastBalance = history[history.length - 1].balance
  const projected: CashFlowPoint[] = []

  for (let i = 1; i <= projectionSteps; i++) {
    lastBalance += avgNet
    projected.push({
      date: `Forecast +${i}`,
      label: `+${i * 15}d (Proj)`,
      inflow: Math.round(avgInflow),
      outflow: Math.round(avgOutflow),
      netFlow: Math.round(avgNet),
      balance: Math.round(lastBalance),
      projection: Math.round(lastBalance),
      isProjected: true,
    })
  }

  return projected
}
