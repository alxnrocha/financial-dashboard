import { useState } from 'react'
import {
  ArrowUpRight, BarChart3, Bell, Building2, ChevronDown,
  CircleHelp, CreditCard, Download, FileText, LayoutDashboard, Menu,
  MoreHorizontal, PieChart, Search, Settings, SlidersHorizontal, Wallet,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'

const chartData = [
  { month: 'Jan', balance: 180, projection: 150 }, { month: 'Feb', balance: 390, projection: 330 },
  { month: 'Mar', balance: 260, projection: 420 }, { month: 'Apr', balance: 650, projection: 560 },
  { month: 'May', balance: 575, projection: 680 }, { month: 'Jun', balance: 790, projection: 710 },
  { month: 'Jul', balance: 900, projection: 760 }, { month: 'Aug', balance: 945, projection: 815 },
  { month: 'Sep', balance: 1060, projection: 850 },
]

const transactions = [
  ['02.08.2023', 'Add Description', 'Operating', '€1,420.00', 'Paid', 'Undisolved'],
  ['03.08.2023', 'R&D Description', 'Payroll', '€320.00', 'Overdue', '3¢ change'],
  ['02.08.2023', 'Operated Transaction', 'Investment', '€26.00', 'Pending', 'Not Pended'],
]

const navItems: Array<[LucideIcon, string]> = [
  [LayoutDashboard, 'Dashboard'], [Wallet, 'Financial Overview'], [BarChart3, 'Reports'],
  [CreditCard, 'Budgets'], [PieChart, 'Cash Flow'], [Building2, 'Accounts'],
]

function Metric({ title, value, change, tone = '' }: { title: string; value: string; change: string; tone?: string }) {
  return <article className={`metric ${tone}`}><span>{title}</span><strong>{value}</strong><small className={change.startsWith('-') ? 'negative' : ''}>{change}</small></article>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [period, setPeriod] = useState('Last 3 Months')
  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="brand"><span className="brand-mark"><span /><span /><span /></span><strong>FINORA</strong><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
      <nav>{navItems.map(([Icon, label]) => <a className={label === 'Financial Overview' ? 'active' : ''} href={`#${label.toLowerCase().replaceAll(' ', '-')}`} key={label as string}><Icon size={18} /><span>{label}</span></a>)}</nav>
      <div className="sidebar-bottom"><a href="#settings"><Settings size={18} /><span>Settings</span></a><a href="#help"><CircleHelp size={18} /><span>Help</span></a></div>
    </aside>
    <main className="content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button><div className="title"><p>Monday, August 7, 2023</p><h1>Financial Overview</h1></div><div className="top-actions"><button aria-label="Search"><Search size={18} /></button><button aria-label="Notifications"><Bell size={18} /><i /></button><div className="avatar">AR</div><ChevronDown size={16} /></div></header>
      <section className="metrics"><Metric title="Total Cash Balance" value="€1,420,500" change="+12.4% vs Last Month" /><Metric title="Monthly Inflow" value="€320,000" change="+6.8%" tone="inflow" /><Metric title="Monthly Outflow" value="€185,000" change="-3.1%" tone="outflow" /><Metric title="Net Profit" value="€135,500" change="+5.2%" /><article className="runway"><span>Runway</span><strong>14</strong><small>Months</small><div><ArrowUpRight size={14} /> Stable</div></article></section>
      <section className="dashboard-grid"><article className="panel flow-panel"><div className="panel-heading"><div><span className="eyebrow">CASH FLOW</span><h2>Cash Flow Projection</h2></div><div className="segmented">{['Last 3 Months', 'Last 6 Months', 'Last 1 Year'].map(item => <button className={period === item ? 'selected' : ''} onClick={() => setPeriod(item)} key={item}>{item}</button>)}</div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 15, right: 5, left: -16, bottom: 0 }}><defs><linearGradient id="balance" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#63d9ff" stopOpacity={0.3} /><stop offset="100%" stopColor="#63d9ff" stopOpacity={0} /></linearGradient><linearGradient id="projection" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#aa8cff" stopOpacity={0.25} /><stop offset="100%" stopColor="#aa8cff" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#243246" strokeDasharray="3 5" vertical={false} /><XAxis dataKey="month" stroke="#718096" axisLine={false} tickLine={false} /><YAxis stroke="#718096" axisLine={false} tickLine={false} tickFormatter={v => `€${v}k`} /><Tooltip contentStyle={{ background: '#172236', border: '1px solid #33445d', borderRadius: 10 }} /><Area type="monotone" dataKey="projection" stroke="#9b89dd" strokeWidth={2} strokeDasharray="5 4" fill="url(#projection)" /><Area type="monotone" dataKey="balance" stroke="#63d9ff" strokeWidth={3} fill="url(#balance)" /></AreaChart></ResponsiveContainer></div><div className="forecast-label"><span>90 day forecast</span><i /></div></article>
        <article className="panel cost-panel"><div className="panel-heading"><div><span className="eyebrow">ALLOCATION</span><h2>Cost Center Breakdown</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="donut"><div className="donut-hole"><strong>€185k</strong><span>total spend</span></div></div><div className="legend"><span><i className="blue" />Marketing <b>28%</b></span><span><i className="green" />R&amp;D <b>24%</b></span><span><i className="yellow" />Operations <b>20%</b></span><span><i className="red" />Sales <b>18%</b></span><span><i className="purple" />G&amp;A <b>10%</b></span></div></article>
      </section>
      <section className="panel transactions"><div className="panel-heading"><div><span className="eyebrow">LATEST ACTIVITY</span><h2>Financial Transactions</h2></div><div className="table-actions"><button><Download size={15} /> Export PDF</button><button><Download size={15} /> Export CSV</button></div></div><div className="table-tools"><div className="search-field"><Search size={15} /><input placeholder="Search transactions" /></div><button className="filter-button"><SlidersHorizontal size={15} /> Filters</button></div><div className="table-scroll"><table><thead><tr><th>Date</th><th>Description</th><th>Account</th><th>Amount</th><th>Status</th><th>Invoice Aging Status</th></tr></thead><tbody>{transactions.map(row => <tr key={row[0] + row[1]}>{row.map((cell, index) => <td className={index === 4 ? `status-cell ${cell.toLowerCase()}` : index === 5 ? 'aging' : ''} key={cell}>{index === 2 ? <span className="account-tag">{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div><button className="view-all">View all transactions <ArrowUpRight size={15} /></button></section>
      <footer><span>© 2023 Finora Finance</span><span><FileText size={13} /> Last updated 4 min ago</span></footer>
    </main>
  </div>
}

export default App
