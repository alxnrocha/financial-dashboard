import { beforeEach, describe, expect, it } from 'vitest'
import { useFinancialStore } from '../store/useFinancialStore'

describe('useFinancialStore State Management', () => {
  beforeEach(() => {
    useFinancialStore.setState({
      activeTab: 'dre',
      currency: 'USD',
      entity: 'all',
      period: 'Q1',
      searchQuery: '',
      isSidebarCollapsed: false,
      theme: 'light',
    })
  })

  it('updates active navigation tab', () => {
    useFinancialStore.getState().setActiveTab('cashflow')
    expect(useFinancialStore.getState().activeTab).toBe('cashflow')
  })

  it('updates global active currency', () => {
    useFinancialStore.getState().setCurrency('EUR')
    expect(useFinancialStore.getState().currency).toBe('EUR')
  })

  it('updates active entity consolidation scope', () => {
    useFinancialStore.getState().setEntity('us-corp')
    expect(useFinancialStore.getState().entity).toBe('us-corp')
  })

  it('toggles sidebar collapse state', () => {
    expect(useFinancialStore.getState().isSidebarCollapsed).toBe(false)
    useFinancialStore.getState().toggleSidebar()
    expect(useFinancialStore.getState().isSidebarCollapsed).toBe(true)
  })

  it('toggles dark/light theme mode', () => {
    expect(useFinancialStore.getState().theme).toBe('light')
    useFinancialStore.getState().toggleTheme()
    expect(useFinancialStore.getState().theme).toBe('dark')
  })

  it('adds and updates transactions dynamically', () => {
    const initialCount = useFinancialStore.getState().transactions.length
    useFinancialStore.getState().addTransaction({
      accountId: 'acc-1',
      accountName: 'Silicon Valley Bank',
      categoryId: 'cat-ent',
      categoryName: 'Enterprise SaaS',
      description: 'New Client Contract Onboarding',
      amount: 50000,
      type: 'inflow',
      date: '2024-03-31',
      status: 'cleared',
      paymentMethod: 'wire',
    })

    const updatedTxs = useFinancialStore.getState().transactions
    expect(updatedTxs.length).toBe(initialCount + 1)
    expect(updatedTxs[0].description).toBe('New Client Contract Onboarding')

    const createdId = updatedTxs[0].id
    useFinancialStore.getState().updateTransaction(createdId, { status: 'reconciled' })
    expect(useFinancialStore.getState().transactions[0].status).toBe('reconciled')
  })

  it('adds and updates accounts dynamically', () => {
    const initialCount = useFinancialStore.getState().accounts.length
    useFinancialStore.getState().addAccount({
      name: 'Santander EU Vault',
      type: 'checking',
      bankName: 'Banco Santander',
      accountNumber: '•••• 1122',
      currency: 'EUR',
      balance: 750000,
      initialBalance: 750000,
      updatedAt: new Date().toISOString(),
    })

    const accounts = useFinancialStore.getState().accounts
    expect(accounts.length).toBe(initialCount + 1)
    expect(accounts[accounts.length - 1].name).toBe('Santander EU Vault')
  })
})
