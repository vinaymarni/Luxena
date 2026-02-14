"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

export interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<
    { id: string; name: string; email: string; password: string }[]
  >([
    {
      id: "demo-1",
      name: "Demo User",
      email: "demo@lumiere.com",
      password: "password",
    },
  ])

  const login = useCallback(
    (email: string, password: string) => {
      const found = users.find(
        (u) => u.email === email && u.password === password
      )
      if (found) {
        setUser({ id: found.id, name: found.name, email: found.email })
        return true
      }
      return false
    },
    [users]
  )

  const register = useCallback(
    (name: string, email: string, password: string) => {
      if (users.some((u) => u.email === email)) return false
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
      }
      setUsers((prev) => [...prev, newUser])
      setUser({ id: newUser.id, name: newUser.name, email: newUser.email })
      return true
    },
    [users]
  )

  const logout = useCallback(() => setUser(null), [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
