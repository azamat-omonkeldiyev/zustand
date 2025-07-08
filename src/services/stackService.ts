import type { CreateStackRequest, Stack, UpdateStackRequest } from '../@types'
import { API_BASE_URL, ENDPOINTS, ERROR_MESSAGES } from '../utils/constants'

class StackService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  async getAllStacks(): Promise<Stack[]> {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STACKS}`)
      const { data } = await this.handleResponse<{ data: Stack[] }>(response)
    //   console.log(data)  // To'g'ri array chiqadi
      return data
    } catch (error) {
      throw new Error(ERROR_MESSAGES.FETCH_FAILED)
    }
  }
  
  

  async createStack(stackData: CreateStackRequest): Promise<Stack> {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STACKS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stackData)
      })
      return this.handleResponse<Stack>(response)
    } catch (error) {
      throw new Error(ERROR_MESSAGES.CREATE_FAILED)
    }
  }

  async updateStack(id: number, stackData: UpdateStackRequest): Promise<Stack> {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STACKS}${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stackData)
      })
      return this.handleResponse<Stack>(response)
    } catch (error) {
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED)
    }
  }

  async deleteStack(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STACKS}${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DELETE_FAILED)
    }
  }
}

export default new StackService()