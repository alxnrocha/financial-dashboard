import React, { useState } from 'react'
import {
  ArrowUpRight,
  Building2,
  Check,
  CreditCard,
  Plus,
  Wallet,
} from 'lucide-react'
import type { Account, Currency } from '../types/financial'
import { formatCurrency } from '../utils/formatters'

interface AccountsViewProps {
  accounts: Account[]
  currency?: Currency
  onAddAccount?: (account: Omit<Account, 'id'>) => void
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  accounts,
  currency = 'USD',
  onAddAccount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [balance, setBalance] = useState('')

  const totalLiquidity = accounts.reduce((acc, a) => acc + a.balance, 0)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !bankName || !balance) return

    onAddAccount?.({
      name,
      bankName,
      accountNumber: accountNumber || '•••• ' + Math.floor(1000 + Math.random() * 9000),
      type: 'checking',
      currency: 'USD',
      balance: Number(balance),
      initialBalance: Number(balance),
      updatedAt: new Date().toISOString(),
    })

    setName('')
    setBankName('')
    setAccountNumber('')
    setBalance('')
    setIsModalOpen(false)
  }

  return (
    <article className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs" aria-label="Bank Accounts & Treasury Vaults">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Treasury & Banking
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Bank Accounts & Liquidity Vaults
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Account</span>
        </button>
      </div>

      {/* Total Liquidity Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Liquid Treasury</span>
          <strong className="text-2xl font-bold text-slate-900 dark:text-white block mt-0.5">
            {formatCurrency(totalLiquidity, currency)}
          </strong>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <Check className="w-4 h-4" />
          <span>All 3 Connected Banks Synced via Plaid Enterprise</span>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  {acc.type === 'investment' ? <Building2 className="w-5 h-5" /> : acc.type === 'credit' ? <CreditCard className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                </div>
                <span className="text-xs font-mono font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {acc.currency}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">{acc.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{acc.bankName} • {acc.accountNumber}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Available Balance</span>
                <strong className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                  {formatCurrency(acc.balance, acc.currency)}
                </strong>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add Bank Account / Vault</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Brex Operating Account"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Financial Institution</label>
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. Brex Bank / Wells Fargo"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Balance (USD)</label>
                <input
                  type="number"
                  required
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="e.g. 500000"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </article>
  )
}
