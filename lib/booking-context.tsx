"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

export interface TimeSlot {
  id: string
  time: string
  available: boolean
}

export interface Booking {
  id: string
  userId: string
  salonId: string
  salonName: string
  service: string
  date: string
  time: string
  price: number
  status: "confirmed" | "pending" | "cancelled"
}

interface BookingContextType {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "status">) => Booking
  cancelBooking: (id: string) => void
  getSlots: (date: string) => TimeSlot[]
}

const BookingContext = createContext<BookingContextType | null>(null)

const generateSlots = (date: string): TimeSlot[] => {
  const times = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM",
  ]
  // Seed-based pseudo-random availability
  return times.map((time, i) => ({
    id: `${date}-${i}`,
    time,
    available: (i + date.charCodeAt(date.length - 1)) % 3 !== 0,
  }))
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])

  const addBooking = useCallback(
    (booking: Omit<Booking, "id" | "status">) => {
      const newBooking: Booking = {
        ...booking,
        id: `bk-${Date.now()}`,
        status: "confirmed",
      }
      setBookings((prev) => [...prev, newBooking])
      return newBooking
    },
    []
  )

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    )
  }, [])

  const getSlots = useCallback((date: string) => generateSlots(date), [])

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, getSlots }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context)
    throw new Error("useBooking must be used within BookingProvider")
  return context
}
