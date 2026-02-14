"use client"

import { AuthProvider } from "@/lib/auth-context"
import { BookingProvider } from "@/lib/booking-context"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <BookingProvider>{children}</BookingProvider>
    </AuthProvider>
  )
}
