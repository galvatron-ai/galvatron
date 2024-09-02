import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { config } from './config'

interface APIKey {
  key: string
  createdAt: string
}

const getToken = () => localStorage.getItem('token')

const getDashboardToken = async (): Promise<string> => {
  const response = await fetch('/api/getDashboardToken', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to get dashboard token');
  }
  const data = await response.json();
  return data.token;
}

const fetchAPIKeys = async (): Promise<{ data: APIKey[] }> => {
  const dashboardToken = await getDashboardToken();
  const response = await fetch(`${config.apiUrl}/v1/api-keys`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'X-Dashboard-Token': dashboardToken
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch API keys')
  }
  return response.json()
}

const generateAPIKey = async (): Promise<APIKey> => {
  const dashboardToken = await getDashboardToken();
  const response = await fetch(`${config.apiUrl}/v1/api-keys`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'X-Dashboard-Token': dashboardToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: getToken() })
  })
  if (!response.ok) {
    throw new Error('Failed to generate API key')
  }
  return response.json()
}

const deleteAPIKey = async (keyToDelete: string): Promise<void> => {
  const dashboardToken = await getDashboardToken();
  const response = await fetch(`${config.apiUrl}/v1/api-keys/${keyToDelete}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'X-Dashboard-Token': dashboardToken
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