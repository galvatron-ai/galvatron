'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog'
import { Alert, AlertDescription } from './alert'
import { Copy, Check, AlertTriangle } from 'lucide-react'

interface APIKey {
  id: string
  name: string
  key: string
  createdAt: string
}

interface APIKeyManagerProps {
  apiUrl: string
}

export function APIKeyManager({ apiUrl }: APIKeyManagerProps) {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [newKeyName, setNewKeyName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<APIKey | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    console.log('API URL:', apiUrl) // Log the API URL
    fetchAPIKeys()
  }, [apiUrl])

  const fetchAPIKeys = async () => {
    try {
      console.log('Fetching API keys from:', `${apiUrl}/api-keys`)
      const response = await fetch(`${apiUrl}/api-keys`, {
        mode: 'cors', // Explicitly set CORS mode
      })
      if (response.ok) {
        const keys = await response.json()
        setApiKeys(keys)
      } else {
        console.error('Failed to fetch API keys:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error fetching API keys:', error)
    }
  }

  const generateAPIKey = async () => {
    if (!newKeyName) return

    try {
      const response = await fetch(`${apiUrl}/api-keys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newKeyName }),
      })

      if (response.ok) {
        const newKey = await response.json()
        setApiKeys([...apiKeys, newKey])
        setNewlyGeneratedKey(newKey)
        setNewKeyName('')
        setIsModalOpen(true)
      } else {
        console.error('Failed to generate API key')
      }
    } catch (error) {
      console.error('Error generating API key:', error)
    }
  }

  const deleteAPIKey = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/api-keys/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setApiKeys(apiKeys.filter(key => key.id !== id))
      } else {
        console.error('Failed to delete API key')
      }
    } catch (error) {
      console.error('Error deleting API key:', error)
    }
  }

  const copyToClipboard = () => {
    if (newlyGeneratedKey) {
      navigator.clipboard.writeText(newlyGeneratedKey.key)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="API Key Name"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
        />
        <Button onClick={generateAPIKey}>Generate New API Key</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow key={key.id}>
              <TableCell>{key.name}</TableCell>
              <TableCell>{new Date(key.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteAPIKey(key.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New API Key Generated</DialogTitle>
            <DialogDescription>
              Please copy your new API key. It will not be shown again.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 bg-muted p-2 rounded">
            <code className="flex-grow">{newlyGeneratedKey?.key}</code>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This key will only be shown once. Please store it securely.
            </AlertDescription>
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  )
}