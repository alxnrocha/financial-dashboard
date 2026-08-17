import React from 'react'
import {
  Banknote,
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileSpreadsheet,
  FileText,
  History,
  LayoutDashboard,
  PieChart,
  Settings,
} from 'lucide-react'
import type { ActiveNavTab } from '../store/useFinancialStore'

interface SidebarProps {
  activeTab: ActiveNavTab
  onSelectTab: (tab: ActiveNavTab) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

interface NavItemConfig {
  id: ActiveNavTab
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItemConfig[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'cashflow', label: 'Cash Flow', icon: PieChart },
  { id: 'dre', label: 'DRE / P&L', icon: FileSpreadsheet },
  { id: 'cost-centers', label: 'Cost Centers', icon: BarChart3 },
  { id: 'budgets', label: 'Budgets', icon: CreditCard },
  { id: 'accounts', label: 'Bank Accounts', icon: Building2 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'audit', label: 'Audit Logs', icon: History },
]

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 z-30 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      aria-label="Main Navigation"
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center px-5 gap-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Banknote className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                FinFlow
              </span>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                B2B Intelligence
              </span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
        <button
          type="button"
          onClick={() => onSelectTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings className="w-4 h-4 text-slate-400 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 mx-auto" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
