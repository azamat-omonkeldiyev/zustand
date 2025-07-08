export interface Stack {
    id: number
    name: string
    image: string
    createdAt: string
  }
  
  export interface CreateStackRequest {
    name: string
    image: string
  }
  
  export interface UpdateStackRequest {
    name: string
    image: string
  }
  
  export interface StackStore {
    stacks: Stack[]
    loading: boolean
    error: string | null
    fetchStacks: () => Promise<void>
    createStack: (stackData: CreateStackRequest) => Promise<Stack>
    updateStack: (id: number, stackData: UpdateStackRequest) => Promise<Stack>
    deleteStack: (id: number) => Promise<void>
    clearError: () => void
  }
  
  export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
  }
  
  export interface ErrorAlertProps {
    error: string | null
    onClose: () => void
  }
  
  export interface StackCardProps {
    stack: Stack
    onEdit: (stack: Stack) => void
    onDelete: (id: number) => Promise<void>
  }
  
  export interface StackFormProps {
    stack?: Stack | null
    onSubmit: (formData: CreateStackRequest) => Promise<void>
    onClose: () => void
  }
  
  export interface StackListProps {
    stacks: Stack[]
    onEdit: (stack: Stack) => void
    onDelete: (id: number) => Promise<void>
    loading: boolean
  }
  
  export interface HeaderProps {
    onAddClick: () => void
  }