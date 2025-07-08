import React from 'react'
import StackCard from './StackCard'
import type { StackListProps } from '../../@types'

const StackList: React.FC<StackListProps> = ({ stacks, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Add safety checks for stacks
  if (!stacks || !Array.isArray(stacks)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No stacks available.</p>
      </div>
    )
  }

  if (stacks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No stacks found. Create your first stack!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stacks.map((stack) => (
        <StackCard
          key={stack.id}
          stack={stack}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default StackList