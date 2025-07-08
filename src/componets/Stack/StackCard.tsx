import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import type { StackCardProps } from '../../@types'

const StackCard: React.FC<StackCardProps> = ({ stack, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
//   console.log(stack, 'dsvdfv')

  const handleDelete = async (): Promise<void> => {
    const confirmed = window.confirm('Are you sure you want to delete this stack?')
    if (!confirmed) return

    setIsDeleting(true)
    try {
      await onDelete(stack.id)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert('Error deleting stack: ' + errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold truncate pr-2">{stack.name}</h3>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(stack)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
            title="Edit stack"
            aria-label={`Edit ${stack.name}`}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:bg-red-50 rounded disabled:opacity-50 transition-colors"
            title="Delete stack"
            aria-label={`Delete ${stack.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p><strong>ID:</strong> {stack.id}</p>
        <p><strong>Image:</strong> {stack.image || 'No image'}</p>
        <p><strong>Created:</strong> {formatDate(stack.createdAt)}</p>
      </div>
    </div>
  )
}

export default StackCard