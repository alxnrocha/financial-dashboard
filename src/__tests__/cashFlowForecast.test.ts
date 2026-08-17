import { describe, expect, it } from 'vitest'
import { mockTransactions } from '../data/mockFinancialData'
import {
  aggregateDailyCashFlow,
  calculateRollingBalances,
  generateMovingAverageForecast,
} from '../utils/cashFlowCalculations'

describe('Cash Flow Aggregation & Forecast Rules', () => {
  it('aggregates daily transactions into net inflows and outflows', () => {
    const daily = aggregateDailyCashFlow(mockTransactions)
    expect(daily.length).toBeGreaterThan(0)
    const mar28 = daily.find((d) => d.date === '2024-03-28')
    expect(mar28).toBeDefined()
    expect(mar28?.inflow).toBe(142000)
    expect(mar28?.outflow).toBe(0)
    expect(mar28?.netFlow).toBe(142000)
  })

  it('calculates sequential rolling balances from initial liquidity', () => {
    const daily = aggregateDailyCashFlow(mockTransactions)
    const initialBalance = 2000000
    const rolling = calculateRollingBalances(initialBalance, daily)

    expect(rolling[0].balance).toBe(initialBalance + daily[0].netFlow)
    const finalBalance = rolling[rolling.length - 1].balance
    const expectedFinal = initialBalance + daily.reduce((acc, d) => acc + d.netFlow, 0)
    expect(finalBalance).toBe(expectedFinal)
  })

  it('generates 30-day forward moving average forecast points', () => {
    const history = [
      { date: '2024-01-01', label: 'W1', inflow: 100000, outflow: 50000, netFlow: 50000, balance: 1050000 },
      { date: '2024-01-15', label: 'W2', inflow: 120000, outflow: 60000, netFlow: 60000, balance: 1110000 },
      { date: '2024-02-01', label: 'W3', inflow: 110000, outflow: 70000, netFlow: 40000, balance: 1150000 },
    ]

    const forecast = generateMovingAverageForecast(history, 3, 2)
    expect(forecast).toHaveLength(2)
    expect(forecast[0].isProjected).toBe(true)
    expect(forecast[0].balance).toBe(1200000) // 1150000 + 50000 avg net
    expect(forecast[1].balance).toBe(1250000) // 1200000 + 50000 avg net
  })
})
