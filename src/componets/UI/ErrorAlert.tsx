import React from 'react'
import { AlertCircle, X } from 'lucide-react'
import type { ErrorAlertProps } from '../../@types'

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  if (!error) return null
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
        <div className="flex-1">
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Close error"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default ErrorAlert