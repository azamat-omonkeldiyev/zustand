export const API_BASE_URL: string = 'http://54.210.160.235'

export const ENDPOINTS = {
  STACKS: '/stacks/'
} as const

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch stacks',
  CREATE_FAILED: 'Failed to create stack',
  UPDATE_FAILED: 'Failed to update stack',
  DELETE_FAILED: 'Failed to delete stack',
  NETWORK_ERROR: 'Network error occurred'
} as const