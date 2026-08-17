import { create } from 'zustand'
import {
  mockAccounts,
  mockBudgets,
  mockCashFlowPoints,
  mockCategories,
  mockCostCenters,
  mockExecutiveSummary,
  mockIncomeStatement,
  mockTransactions,
} from '../data/mockFinancialData'
import type {
  Account,
  Budget,
  CashFlowPoint,
  Category,
  CostCenter,
  Currency,
  EntityScope,
  ExecutiveSummary,
  IncomeStatementRow,
  PeriodRange,
  Transaction,
} from '../types/financial'

export type ActiveNavTab =
  | 'overview'
  | 'cashflow'
  | 'dre'
  | 'cost-centers'
  | 'budgets'
  | 'accounts'
  | 'reports'
  | 'audit'
  | 'settings'

interface FinancialState {
  // Domain Data
  accounts: Account[]
  costCenters: CostCenter[]
  categories: Category[]
  transactions: Transaction[]
  budgets: Budget[]
  incomeStatement: IncomeStatementRow[]
  cashFlowPoints: CashFlowPoint[]
  executiveSummary: ExecutiveSummary

  // UI / Global Context
  activeTab: ActiveNavTab
  currency: Currency
  entity: EntityScope
  period: PeriodRange
  searchQuery: string
  isSidebarCollapsed: boolean
  theme: 'light' | 'dark'

  // Actions
  setActiveTab: (tab: ActiveNavTab) => void
  setCurrency: (currency: Currency) => void
  setEntity: (entity: EntityScope) => void
  setPeriod: (period: PeriodRange) => void
  setSearchQuery: (query: string) => void
  toggleSidebar: () => void
  toggleTheme: () => void

  // CRUD / Mutations
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  addBudget: (budget: Omit<Budget, 'id'>) => void
  updateBudget: (id: string, updates: Partial<Budget>) => void
  addAccount: (account: Omit<Account, 'id'>) => void
  updateAccount: (id: string, updates: Partial<Account>) => void
}

export const useFinancialStore = create<FinancialState>((set) => ({
  accounts: mockAccounts,
  costCenters: mockCostCenters,
  categories: mockCategories,
  transactions: mockTransactions,
  budgets: mockBudgets,
  incomeStatement: mockIncomeStatement,
  cashFlowPoints: mockCashFlowPoints,
  executiveSummary: mockExecutiveSummary,

  activeTab: 'dre', // Default to DRE as in design reference
  currency: 'USD',
  entity: 'all',
  period: 'Q1',
  searchQuery: '',
  isSidebarCollapsed: false,
  theme: 'light',

  setActiveTab: (tab) => set({ activeTab: tab }),
  setCurrency: (currency) => set({ currency }),
  setEntity: (entity) => set({ entity }),
  setPeriod: (period) => set({ period }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  addTransaction: (tx) =>
    set((state) => {
      const newTx: Transaction = {
        ...tx,
        id: `tx-${Date.now()}`,
      }
      return { transactions: [newTx, ...state.transactions] }
    }),

  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === id ? { ...tx, ...updates } : tx
      ),
    })),

  addBudget: (budget) =>
    set((state) => {
      const newBudget: Budget = {
        ...budget,
        id: `b-${Date.now()}`,
      }
      return { budgets: [...state.budgets, newBudget] }
    }),

  updateBudget: (id, updates) =>
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    })),

  addAccount: (account) =>
    set((state) => {
      const newAcc: Account = {
        ...account,
        id: `acc-${Date.now()}`,
      }
      return { accounts: [...state.accounts, newAcc] }
    }),

  updateAccount: (id, updates) =>
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.id === id ? { ...acc, ...updates } : acc
      ),
    })),
}))
