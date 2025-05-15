'use client'
import { useEffect } from 'react'
import { usePathname, useRouter,} from 'next/navigation'
import { fetchUserProfile } from './api/auth'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const token = fetchUserProfile()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // const isAuthenticated = await checkAuth()
        if (pathname !== '/login') {
          router.push(`/login?from=${encodeURIComponent(pathname)}`)
        }
      } catch (error) {
        router.push(`/login?from=${encodeURIComponent(pathname)}`)
      }
    }

    verifyAuth()
  }, [pathname, router])

  return <>{children}</>
}

