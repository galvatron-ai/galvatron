"use client";

import React, { useState } from 'react'
import { Button } from './button'
import { cn } from '../lib/utils'
import { ChevronLeft, ChevronRight, Home, Settings, Users, Key } from 'lucide-react'
import dynamic from 'next/dynamic'

const ThemeToggle = dynamic(() => import('./theme-toggle'), { ssr: false })

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Users, label: 'Users', href: '/users' },
  { icon: Key, label: 'API Keys', href: '/api-keys' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function NavMenu() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav
      className={cn(
        'flex flex-col h-screen bg-background border-r transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <ul className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-center p-2 hover:bg-accent hover:text-accent-foreground rounded-lg mx-2"
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
      <div className="p-4">
        <ThemeToggle />
      </div>
    </nav>
  )
}