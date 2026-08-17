import { describe, expect, it } from 'vitest'
import {
  mockBudgets,
  mockIncomeStatement,
  mockTransactions,
} from '../data/mockFinancialData'
import {
  aggregateTransactionsByStatus,
  calculateBudgetBurn,
  calculateEbitda,
  calculateEbitdaMargin,
  calculateGrossProfit,
  calculateNetRevenue,
  calculateRunway,
  calculateVariance,
  projectCashFlow,
  validateDREConsistency,
} from '../utils/calculations'
import { formatCurrency, formatPercent, formatVarianceDollar } from '../utils/formatters'

describe('Financial Domain Rules & Accounting Logic', () => {
  describe('Revenue & Profit Equations', () => {
    it('calculates net revenue correctly (Gross - Deductions)', () => {
      const gross = 5820000
      const deductions = -1000000
      const net = calculateNetRevenue(gross, deductions)
      expect(net).toBe(4820000)
    })

    it('calculates gross profit correctly (Net - COGS)', () => {
      const net = 4820000
      const cogs = -1180000
      const gp = calculateGrossProfit(net, cogs)
      expect(gp).toBe(3640000)
    })

    it('calculates EBITDA correctly (Gross Profit - OPEX)', () => {
      const gp = 3640000
      const opex = -1450000
      const ebitda = calculateEbitda(gp, opex)
      expect(ebitda).toBe(2190000)
    })

    it('calculates EBITDA Margin percentage correctly', () => {
      const ebitda = 2190000
      const netRevenue = 4820000
      const margin = calculateEbitdaMargin(ebitda, netRevenue)
      expect(margin).toBe(45.4)
    })

    it('handles zero or negative net revenue in EBITDA margin gracefully', () => {
      expect(calculateEbitdaMargin(1000, 0)).toBe(0)
      expect(calculateEbitdaMargin(1000, -5000)).toBe(0)
    })
  })

  describe('Variance & Budget Tracking', () => {
    it('computes variance nominal dollar and percentage correctly for positive growth', () => {
      const budget = 5600000
      const actual = 5820000
      const v = calculateVariance(budget, actual)

      expect(v.varianceDollar).toBe(220000)
      expect(v.variancePercent).toBe(3.9)
      expect(v.budgetVsActualPercent).toBe(104)
    })

    it('computes variance correctly for under-budget operating expense', () => {
      const budget = -1850000
      const actual = -1450000
      const v = calculateVariance(budget, actual)

      expect(v.varianceDollar).toBe(400000)
      expect(v.variancePercent).toBe(21.6)
      expect(v.budgetVsActualPercent).toBe(78)
    })

    it('calculates total budget burn rates correctly', () => {
      const burn = calculateBudgetBurn(mockBudgets)
      expect(burn.totalAllocated).toBe(2200000)
      expect(burn.totalSpent).toBe(1760000)
      expect(burn.totalRemaining).toBe(440000)
      expect(burn.burnRatePercent).toBe(80.0)
    })
  })

  describe('Treasury, Runway & Cash Flow Forecasting', () => {
    it('calculates runway months correctly based on burn rate', () => {
      const balance = 4820000
      const burn = 483333
      const runway = calculateRunway(balance, burn)
      expect(runway).toBe(9)
    })

    it('returns high runway when burn rate is zero or negative (profitable)', () => {
      expect(calculateRunway(1000000, 0)).toBe(999)
      expect(calculateRunway(1000000, -50000)).toBe(999)
    })

    it('projects future cash flow points sequentially', () => {
      const initial = 4000000
      const monthlyNet = 200000
      const projection = projectCashFlow(initial, monthlyNet, 3)

      expect(projection).toHaveLength(3)
      expect(projection[0].balance).toBe(4200000)
      expect(projection[1].balance).toBe(4400000)
      expect(projection[2].balance).toBe(4600000)
    })
  })

  describe('Transactions Aggregation & DRE Consistency', () => {
    it('aggregates transactions count and amounts by status correctly', () => {
      const grouped = aggregateTransactionsByStatus(mockTransactions)
      expect(grouped.cleared).toBeDefined()
      expect(grouped.cleared.count).toBe(6)
      expect(grouped.pending.count).toBe(1)
      expect(grouped.overdue.count).toBe(1)
    })

    it('validates mock DRE report consistency', () => {
      const isValid = validateDREConsistency(mockIncomeStatement)
      expect(isValid).toBe(true)
    })
  })

  describe('Financial Formatters', () => {
    it('formats currencies in USD, EUR and BRL correctly', () => {
      expect(formatCurrency(1500000, 'USD')).toBe('$1,500,000')
      expect(formatCurrency(1500000, 'USD', { compact: true })).toBe('$1.50M')
      expect(formatCurrency(45000, 'USD', { compact: true })).toBe('$45k')
    })

    it('formats percentages with optional sign and decimals', () => {
      expect(formatPercent(45.4)).toBe('45.4%')
      expect(formatPercent(14.2, { withSign: true })).toBe('+14.2%')
    })

    it('formats variance dollar with sign and spacing', () => {
      expect(formatVarianceDollar(220000, 'USD')).toBe('+ $220,000')
      expect(formatVarianceDollar(-220000, 'USD')).toBe('- $220,000')
      expect(formatVarianceDollar(0, 'USD')).toBe('$0')
    })
  })
})
