'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { verify } from './api/auth'
import AuthForm from './api/authForm'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await verify()
        setIsAuthenticated(isValid)

        if (!isValid) {
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      }
    }

    checkAuth()
  }, [pathname, router])

  return (<>
    {
      isAuthenticated ? <>{children}</> : <AuthForm mode='login' />
    }
  </>)



}