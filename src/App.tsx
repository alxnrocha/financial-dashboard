import {
  AccountsView,
  BudgetVarianceAnalysis,
  CashFlowChart,
  CostCenterBreakdown,
  ExecutiveMetrics,
  Header,
  IncomeStatementTable,
  Sidebar,
  TransactionsTable,
} from './components'
import { useFinancialStore } from './store/useFinancialStore'

function App() {
  const {
    activeTab,
    setActiveTab,
    currency,
    setCurrency,
    entity,
    setEntity,
    theme,
    toggleTheme,
    isSidebarCollapsed,
    toggleSidebar,
    executiveSummary,
    incomeStatement,
    cashFlowPoints,
    costCenters,
    transactions,
    budgets,
    accounts,
    addAccount,
  } = useFinancialStore()

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-row font-sans transition-colors duration-200">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            entity={entity}
            onEntityChange={setEntity}
            currency={currency}
            onCurrencyChange={setCurrency}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
            {/* View Switcher based on Active Tab */}
            {activeTab === 'overview' && (
              <>
                <ExecutiveMetrics summary={executiveSummary} currency={currency} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <CashFlowChart data={cashFlowPoints} currency={currency} />
                  </div>
                  <div>
                    <CostCenterBreakdown costCenters={costCenters} currency={currency} />
                  </div>
                </div>
                <TransactionsTable transactions={transactions} currency={currency} />
              </>
            )}

            {activeTab === 'dre' && (
              <>
                <ExecutiveMetrics summary={executiveSummary} currency={currency} />
                <IncomeStatementTable
                  rows={incomeStatement}
                  currency={currency}
                  periodLabel="For the period Jan 1 – Mar 31, 2024"
                />
              </>
            )}

            {activeTab === 'cashflow' && (
              <>
                <CashFlowChart data={cashFlowPoints} currency={currency} />
                <TransactionsTable transactions={transactions} currency={currency} />
              </>
            )}

            {activeTab === 'cost-centers' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CostCenterBreakdown costCenters={costCenters} currency={currency} />
                <BudgetVarianceAnalysis budgets={budgets} currency={currency} />
              </div>
            )}

            {activeTab === 'budgets' && (
              <BudgetVarianceAnalysis budgets={budgets} currency={currency} />
            )}

            {activeTab === 'accounts' && (
              <AccountsView
                accounts={accounts}
                currency={currency}
                onAddAccount={addAccount}
              />
            )}

            {(activeTab === 'reports' || activeTab === 'audit' || activeTab === 'settings') && (
              <div className="space-y-6">
                <IncomeStatementTable
                  rows={incomeStatement}
                  currency={currency}
                  periodLabel="Corporate Audit & Reconciliation Statement"
                />
                <TransactionsTable transactions={transactions} currency={currency} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
