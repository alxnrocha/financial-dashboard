import type { Currency } from '../types/financial'

export function formatCurrency(
  amount: number,
  currency: Currency = 'USD',
  options?: { compact?: boolean; hideSign?: boolean }
): string {
  const absAmount = Math.abs(amount)
  const prefix = amount < 0 && !options?.hideSign ? '-' : ''

  if (options?.compact && absAmount >= 1_000_000) {
    const symbol = getCurrencySymbol(currency)
    return `${prefix}${symbol}${(absAmount / 1_000_000).toFixed(2)}M`
  }

  if (options?.compact && absAmount >= 1_000) {
    const symbol = getCurrencySymbol(currency)
    return `${prefix}${symbol}${(absAmount / 1_000).toFixed(0)}k`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getCurrencySymbol(currency: Currency = 'USD'): string {
  switch (currency) {
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    case 'BRL':
      return 'R$'
    case 'GBP':
      return '£'
    default:
      return '$'
  }
}

export function formatPercent(value: number, options?: { withSign?: boolean; decimals?: number }): string {
  const decimals = options?.decimals ?? 1
  const sign = options?.withSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

export function formatVarianceDollar(value: number, currency: Currency = 'USD'): string {
  const sign = value > 0 ? '+ ' : value < 0 ? '- ' : ''
  const formatted = formatCurrency(Math.abs(value), currency)
  return value === 0 ? '$0' : `${sign}${formatted}`
}
