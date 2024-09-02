import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { config } from './config'

interface APIKey {
  key: string
  createdAt: string
}

const getToken = () => localStorage.getItem('token')

const fetchAPIKeys = async (): Promise<APIKey[]> => {
  const response = await fetch(`${config.apiUrl}/v1/api-keys`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch API keys')
  }
  return response.json()
}

const generateAPIKey = async (): Promise<APIKey> => {
  const response = await fetch(`${config.apiUrl}/v1/api-keys`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })
  if (!response.ok) {
    throw new Error('Failed to generate API key')
  }
  return response.json()
}

const deleteAPIKey = async (keyToDelete: string): Promise<void> => {
  const response = await fetch(`${config.apiUrl}/v1/api-keys/${keyToDelete}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })
  if (!response.ok) {
    throw new Error('Failed to delete API key')
  }
}

export const useAPIKeys = () => {
  return useQuery({
    queryKey: ['apiKeys'],
    queryFn: fetchAPIKeys
  })
}

export const useGenerateAPIKey = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: generateAPIKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] })
    },
  })
}

export const useDeleteAPIKey = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAPIKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] })
    },
  })
}