// In Next.js, this file would be called: app/providers.jsx
'use client'

import { ThemeProvider } from "@galvatron/ui/components/theme-provider";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
