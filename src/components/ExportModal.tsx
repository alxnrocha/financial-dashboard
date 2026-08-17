import React, { useState } from 'react'
import { Check, Download, FileSpreadsheet, FileText, X } from 'lucide-react'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState<'pdf' | 'csv' | 'xlsx'>('pdf')
  const [isExporting, setIsExporting] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  if (!isOpen) return null

  const handleDownload = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      setDownloadSuccess(true)
      setTimeout(() => {
        setDownloadSuccess(false)
        onClose()
      }, 1200)
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="export-title">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between mb-4">
          <h3 id="export-title" className="text-lg font-bold text-slate-900 dark:text-white">
            Export Financial Report
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close export modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Generate high-resolution corporate financial reports including Income Statement (DRE), Cash Flow projections, and Transactions ledger.
        </p>

        {/* Format Selection */}
        <div className="space-y-2.5 mb-6">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Select Output Format
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'pdf', label: 'PDF Report', icon: FileText },
              { id: 'csv', label: 'CSV Ledger', icon: Download },
              { id: 'xlsx', label: 'Excel (XLSX)', icon: FileSpreadsheet },
            ].map((fmt) => {
              const Icon = fmt.icon
              const isSelected = format === fmt.id
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setFormat(fmt.id as 'pdf' | 'csv' | 'xlsx')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{fmt.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting || downloadSuccess}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 shadow-xs transition-all"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Downloaded!</span>
              </>
            ) : isExporting ? (
              <span>Generating {format.toUpperCase()}...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export {format.toUpperCase()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
