export type Currency = 'USD' | 'EUR' | 'BRL' | 'GBP'

export type AccountType = 'checking' | 'savings' | 'investment' | 'credit'

export interface Account {
  id: string
  name: string
  type: AccountType
  bankName: string
  accountNumber: string
  currency: Currency
  balance: number
  initialBalance: number
  updatedAt: string
}

export type CostCenterCode = 'RD' | 'MKT' | 'OPS' | 'SALES' | 'GA'

export interface CostCenter {
  id: string
  code: CostCenterCode
  name: string
  color: string
  manager: string
  allocatedBudget: number
  currentSpent: number
}

export type CategoryType = 'revenue' | 'expense' | 'deduction' | 'cogs'

export interface Category {
  id: string
  name: string
  type: CategoryType
  code: string
  color: string
  icon?: string
}

export type TransactionStatus = 'cleared' | 'pending' | 'overdue' | 'reconciled'
export type PaymentMethod = 'ach_transfer' | 'wire' | 'credit_card' | 'stripe' | 'pix' | 'sepa'

export interface Transaction {
  id: string
  accountId: string
  accountName: string
  categoryId: string
  categoryName: string
  costCenterId?: string
  costCenterCode?: CostCenterCode
  description: string
  amount: number
  type: 'inflow' | 'outflow'
  date: string
  status: TransactionStatus
  paymentMethod: PaymentMethod
  invoiceNumber?: string
  agingDays?: number
  notes?: string
}

export interface Budget {
  id: string
  categoryId: string
  categoryName: string
  costCenterId?: string
  month: number
  year: number
  allocatedAmount: number
  actualSpent: number
}

export interface IncomeStatementRow {
  id: string
  orderNumber?: number
  label: string
  budget: number
  actual: number
  varianceDollar: number
  variancePercent: number
  budgetVsActualPercent: number
  isPercentageMetric?: boolean
  percentageBudgetFormatted?: string
  percentageActualFormatted?: string
  level: number
  parentId?: string
  hasChildren?: boolean
  isExpanded?: boolean
  children?: IncomeStatementRow[]
}

export interface CashFlowPoint {
  date: string
  label: string
  inflow: number
  outflow: number
  netFlow: number
  balance: number
  projection?: number
  isProjected?: boolean
}

export interface ExecutiveSummary {
  grossRevenue: number
  netRevenue: number
  operatingExpenses: number
  ebitda: number
  ebitdaMargin: number
  netProfit: number
  cashBalance: number
  monthlyInflow: number
  monthlyOutflow: number
  burnRate: number
  runwayMonths: number
  growthRateYoY: number
}

export type PeriodRange = 'Q1' | 'Q2' | 'Q3' | 'Q4' | '1M' | '3M' | '6M' | '1Y' | 'YTD'
export type EntityScope = 'all' | 'us-corp' | 'eu-subsidiary' | 'latam-hq'
