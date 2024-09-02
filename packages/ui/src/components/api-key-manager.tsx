'use client'

import React, { useState } from 'react'
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

export function APIKeyManager() {
    const [apiKeys, setApiKeys] = useState<APIKey[]>([])
    const [newKeyName, setNewKeyName] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<APIKey | null>(null)
    const [isCopied, setIsCopied] = useState(false)

    const generateAPIKey = () => {
        if (!newKeyName) return

        const newKey: APIKey = {
            id: Math.random().toString(36).substr(2, 9),
            name: newKeyName,
            key: 'placeholder', // We'll replace this with the actual API key later
            createdAt: new Date().toISOString(),
        }

        setApiKeys([...apiKeys, newKey])
        setNewlyGeneratedKey(newKey)
        setNewKeyName('')
        setIsModalOpen(true)
    }

    const deleteAPIKey = (id: string) => {
        setApiKeys(apiKeys.filter(key => key.id !== id))
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