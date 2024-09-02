import { APIKeyManager } from '@galvatron/ui/components/api-key-manager'

export default function APIKeysPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">API Key Management</h1>
            <APIKeyManager />
        </div>
    )
}