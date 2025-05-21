"use client"

import * as React from "react"
import Image from "next/image"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Trash2,
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "ToDay",
      url: "#",
      icon: Search,
    },
    {
      title: "Week",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "month",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Tasks",
      url: "/note",
      icon: Calendar,
    },
    {
      title: "Calendar",
      url: "/note/calendar",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "/note/settings",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "/note/templates",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "/note/trash",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "/note/help",
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅",
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Image className="relative top-3 left-3 md:mb-10" src='/note.svg' width={100} height={50} alt="note"/>
        <h1 className="pl-2 text-[20px]">Tasks :</h1>
        <NavMain items={data.navMain} /> 
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        {/* <NavWorkspaces workspaces={data.workspaces} /> */}
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
