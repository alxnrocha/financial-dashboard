import React from 'react'
import {
  Bell,
  Building,
  ChevronDown,
  Moon,
  Search,
  Sun,
} from 'lucide-react'
import type { Currency, EntityScope } from '../types/financial'

interface HeaderProps {
  entity: EntityScope
  onEntityChange: (entity: EntityScope) => void
  currency: Currency
  onCurrencyChange: (currency: Currency) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({
  entity,
  onEntityChange,
  currency,
  onCurrencyChange,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left Entity Selector */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={entity}
              onChange={(e) => onEntityChange(e.target.value as EntityScope)}
              className="bg-transparent border-0 outline-hidden font-semibold cursor-pointer pr-1"
              aria-label="Select entity scope"
            >
              <option value="all">Multi-Entity Consolidation</option>
              <option value="us-corp">US Corporation (Delaware)</option>
              <option value="eu-subsidiary">EU Subsidiary (Amsterdam)</option>
              <option value="latam-hq">LATAM HQ (São Paulo)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Right Tools & Profile */}
      <div className="flex items-center gap-3">
        {/* Currency Switcher matching design */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
          <span>$</span>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="bg-transparent border-0 outline-hidden font-bold cursor-pointer pr-1"
            aria-label="Select active currency"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BRL">BRL</option>
            <option value="GBP">GBP</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none" />
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Global Search Button */}
        <button
          type="button"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
          aria-label="Search dashboard"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* User Avatar matching design.png */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            AR
          </div>
        </div>
      </div>
    </header>
  )
}
