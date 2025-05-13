"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types'
import { getCurrentUser, login as loginService, logout as logoutService, register as registerService } from '@/lib/services/auth-service'
import type { LoginCredentials, RegisterData } from '@/lib/services/auth-service'
import { toast } from 'sonner'

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>,
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    const userData = await loginService(credentials)
    console.log('User data:', userData)
    setIsLoading(false)
    if(!userData.error) {
      setUser(userData.user!)
      toast.success('تم تسجيل الدخول بنجاح')
      router.push('/')
    } else{
      console.error('Login error:', userData.error)
      toast.error(userData.error)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    const newUser = await registerService(userData)
    setIsLoading(false)
    if(!newUser.error) {
      setUser(newUser.user!)
      toast.success('تم تسجيل الحساب بنجاح')
      router.push('/')
    } else {
        console.error('Registration error:', newUser.error)
        toast.error(newUser.error)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await logoutService()
      setUser(null)
      toast.success('تم تسجيل الخروج بنجاح')
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('حدث خطأ أثناء تسجيل الخروج')
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}