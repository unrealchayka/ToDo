"use client"

import { type LucideIcon } from "lucide-react"

import Link from "next/link"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface item {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }

export function NavMain({
  items,
}: {
  items: item[]
}) {
  const pathname = usePathname()
  
  function getIndex(item: item, index: number){
    return pathname === `/note/${item.url}` || pathname === `/note` && index === 0
  }

  return (
    <SidebarMenu>
      {items.map((item, index) => (
        <SidebarMenuItem 

        key={item.title}>
          <SidebarMenuButton asChild isActive={getIndex(item, index)}>
            <Link href={`/note/${item.url}`}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
