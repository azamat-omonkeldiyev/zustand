import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import type { CreateStackRequest, StackFormProps } from '../../@types'

const StackForm: React.FC<StackFormProps> = ({ stack, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<CreateStackRequest>({
    name: '',
    image: ''
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if (stack) {
      setFormData({
        name: stack.name,
        image: stack.image
      })
    }
  }, [stack])

  const handleSubmit = async (): Promise<void> => {
    if (!formData.name.trim()) {
      alert('Stack name is required')
      return
    }
    
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert('Error: ' + errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CreateStackRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stack Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange('name')}
          onKeyPress={handleKeyPress}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter stack name"
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image
        </label>
        <input
          type="text"
          value={formData.image}
          onChange={handleInputChange('image')}
          onKeyPress={handleKeyPress}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter image filename"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="flex gap-2 pt-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save size={16} />
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default StackForm