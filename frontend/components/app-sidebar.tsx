"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Blocks,
  Calendar,
  Trash2,
  MessageCircleQuestion,
  CircleCheckBig,
  Star,
  List,
  ClipboardList,
  Settings2,
  MoreHorizontal,
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "All",
      url: "",
      icon: List,
    },
    {
      title: "My Task",
      url: "my-task",
      icon: ClipboardList,
    },
    {
      title: "Favorites",
      url: "favorites",
      icon: Star,
      badge: "10",
    },
    {
      title: "Done",
      url: "done",
      icon: CircleCheckBig ,
      badge: "10",
    },
    {
      title: "Deleted",
      url: "deleted",
      icon: Trash2 ,
      badge: "10",
    },
  ],
  navSecondary: [
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
    {
      name: "Project Management & Task Tracking 1",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning 1",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines 1",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List 1",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care 1",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources 1",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker 1",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio 1",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews 1",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting 1",
      url: "#",
      emoji: "✅",
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="border-r border-green-500">
      <SidebarHeader>
        <Image className="relative m-auto top-2 md:m-0 md:left-3 md:mb-10" src='/note.svg' width={100} height={50} alt="note"/>
        <h1 className="pl-2 text-[20px] text-green-500 ">Tasks :</h1>
        <NavMain items={data.navMain} /> 
      </SidebarHeader>
      <SidebarContent className="flex flex-col gpa-2 justify-center py-2 border-y-2 border-green-500">
        <h1 className="pl-2 text-[20px] text-green-500 ">Projects</h1>
        <NavFavorites favorites={data.favorites}/>
        {/* <NavWorkspaces workspaces={data.workspaces} /> */}
        <Link href="/note/projects" className="flex gap-3 pl-2 cursor-pointer">
            <MoreHorizontal />
            <span>More</span>
        </Link>
      </SidebarContent>
        <NavSecondary items={data.navSecondary} />

      <SidebarRail />
    </Sidebar>
  )
}
