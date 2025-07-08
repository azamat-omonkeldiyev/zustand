import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import stackService from '../services/stackService'
import type { CreateStackRequest, Stack, StackStore, UpdateStackRequest } from '../@types'

export const useStackStore = create<StackStore>()(
  devtools(
    (set, get) => ({
      // State
      stacks: [],
      loading: false,
      error: null,
      
      // Actions
      fetchStacks: async (): Promise<void> => {
        set({ loading: true, error: null })
        try {
          const data = await stackService.getAllStacks()
          set({ stacks: data, loading: false })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          set({ error: errorMessage, loading: false })
        }
      },
      
      createStack: async (stackData: CreateStackRequest): Promise<Stack> => {
        set({ loading: true, error: null })
        try {
          const newStack = await stackService.createStack(stackData)
          set((state) => ({ 
            stacks: [...state.stacks, newStack], 
            loading: false 
          }))
          return newStack
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          set({ error: errorMessage, loading: false })
          throw error
        }
      },
      
      updateStack: async (id: number, stackData: UpdateStackRequest): Promise<Stack> => {
        set({ loading: true, error: null })
        try {
          const updatedStack = await stackService.updateStack(id, stackData)
          set((state:any) => ({
            stacks: state.stacks.map((stack:any) => 
              stack.id === id ? updatedStack : stack
            ),
            loading: false
          }))
          return updatedStack
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          set({ error: errorMessage, loading: false })
          throw error
        }
      },
      
      deleteStack: async (id: number): Promise<void> => {
        set({ loading: true, error: null })
        try {
          await stackService.deleteStack(id)
          set((state:any) => ({
            stacks: state.stacks.filter((stack:any) => stack.id !== id),
            loading: false
          }))
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          set({ error: errorMessage, loading: false })
          throw error
        }
      },
      
      clearError: (): void => set({ error: null })
    }),
    {
      name: 'stack-store'
    }
  )
)