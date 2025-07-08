import React from 'react'
import { Plus } from 'lucide-react'
import type { HeaderProps } from '../../@types'

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Stack Management</h1>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        aria-label="Add new stack"
      >
        <Plus size={20} />
        Add Stack
      </button>
    </div>
  )
}

export default Header