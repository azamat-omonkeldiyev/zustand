import React, { useState, useEffect } from 'react'
import { useStackStore } from './store/stackStore'
import type { CreateStackRequest, Stack } from './@types'
import Header from './componets/Layout/Header'
import ErrorAlert from './componets/UI/ErrorAlert'
import StackList from './componets/Stack/StackList'
import Modal from './componets/UI/Modal'
import StackForm from './componets/Stack/StackFrom'


const App: React.FC = () => {
  const { 
    stacks, 
    loading, 
    error, 
    fetchStacks, 
    createStack, 
    updateStack, 
    deleteStack,
    clearError 
  } = useStackStore()

  const [showModal, setShowModal] = useState<boolean>(false)
  const [editingStack, setEditingStack] = useState<Stack | null>(null)

  useEffect(() => {
    fetchStacks()
  }, [fetchStacks])

  const handleCreate = async (formData: CreateStackRequest): Promise<void> => {
    await createStack(formData)
    await fetchStacks()  // Qo‘shilgandan keyin yangilash
    handleCloseModal()   // Modalni yopish (xohlasang)
  }
  
  const handleUpdate = async (formData: CreateStackRequest): Promise<void> => {
    if (editingStack) {
      await updateStack(editingStack.id, formData)
      await fetchStacks()  // Yangilashdan keyin yangilash
      handleCloseModal()
    }
  }
  

  const handleEdit = (stack: Stack): void => {
    setEditingStack(stack)
    setShowModal(true)
  }


  const handleDelete = async (id: number): Promise<void> => {
    await deleteStack(id)
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
    setEditingStack(null)
  }

  const handleAddClick = (): void => {
    setEditingStack(null)
    setShowModal(true)
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header onAddClick={handleAddClick} />
        
        <ErrorAlert error={error} onClose={clearError} />
        
        <StackList 
          stacks={stacks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingStack ? 'Edit Stack' : 'Create New Stack'}
        >
          <StackForm
            stack={editingStack}
            onSubmit={editingStack ? handleUpdate : handleCreate}
            onClose={handleCloseModal}
          />
        </Modal>
      </div>
    </div>
  )
}

export default App