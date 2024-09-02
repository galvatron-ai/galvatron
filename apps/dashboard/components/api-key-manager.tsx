'use client'

import React, { useState } from 'react'
import { Button } from '@galvatron/ui/components/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@galvatron/ui/components/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@galvatron/ui/components/dialog'
import { Alert, AlertDescription } from '@galvatron/ui/components/alert'
import { Copy, Check, AlertTriangle } from 'lucide-react'
import { useAPIKeys, useGenerateAPIKey, useDeleteAPIKey } from '../api'

export function APIKeyManager() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const { data: apiKeys, isLoading, isError } = useAPIKeys()
  const generateKeyMutation = useGenerateAPIKey()
  const deleteKeyMutation = useDeleteAPIKey()

  const handleGenerateAPIKey = async () => {
    try {
      const newKey = await generateKeyMutation.mutateAsync()
      setNewlyGeneratedKey(newKey.key)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error generating API key:', error)
    }
  }

  const handleDeleteAPIKey = async (keyToDelete: string) => {
    try {
      await deleteKeyMutation.mutateAsync(keyToDelete)
    } catch (error) {
      console.error('Error deleting API key:', error)
    }
  }

  const copyToClipboard = () => {
    if (newlyGeneratedKey) {
      navigator.clipboard.writeText(newlyGeneratedKey)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading API keys</div>

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button onClick={handleGenerateAPIKey} disabled={generateKeyMutation.isLoading}>
          {generateKeyMutation.isLoading ? 'Generating...' : 'Generate New API Key'}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>API Key</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys?.map((key) => (
            <TableRow key={key.key}>
              <TableCell>{`${key.key.substring(0, 8)}...`}</TableCell>
              <TableCell>{new Date(key.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteAPIKey(key.key)}
                  disabled={deleteKeyMutation.isLoading}
                >
                  {deleteKeyMutation.isLoading ? 'Deleting...' : 'Delete'}
                </Button>
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
            <code className="flex-grow">{newlyGeneratedKey}</code>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Alert variant="destructive">
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