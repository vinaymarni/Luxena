"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Scissors,
  Calendar,
  LogOut,
  Plus,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useBooking } from "@/lib/booking-context"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { bookings, cancelBooking } = useBooking()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push("/auth/login")
  }, [user, router])

  if (!user) return null

  const userBookings = bookings.filter((b) => b.userId === user.id)

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00")
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-accent" />
            <span className="font-serif text-lg font-bold text-foreground">
              Lumiere
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout()
                router.push("/")
              }}
              className="text-foreground"
            >
              <LogOut className="mr-1 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Welcome back, {user.name.split(" ")[0]}
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your appointments and explore new services.
            </p>
          </div>
          <Link href="/booking">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-1 h-4 w-4" /> New Booking
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/booking"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <Calendar className="h-8 w-8 text-accent" />
            <div>
              <p className="font-medium text-foreground">Book Appointment</p>
              <p className="text-xs text-muted-foreground">
                Schedule a new service
              </p>
            </div>
          </Link>
          <Link
            href="/salons"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <Scissors className="h-8 w-8 text-accent" />
            <div>
              <p className="font-medium text-foreground">Discover Salons</p>
              <p className="text-xs text-muted-foreground">
                Browse our partner salons
              </p>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <Plus className="h-8 w-8 text-accent" />
            <div>
              <p className="font-medium text-foreground">Explore Services</p>
              <p className="text-xs text-muted-foreground">
                See all available treatments
              </p>
            </div>
          </Link>
        </div>

        {/* Bookings */}
        <div className="mt-12">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Your Appointments
          </h2>
          {userBookings.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
              <Calendar className="h-10 w-10 text-muted-foreground/40" />
              <p className="mt-4 font-medium text-foreground">
                No appointments yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Book your first appointment to get started.
              </p>
              <Link href="/booking" className="mt-4">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/5 hover:text-accent"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {userBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between ${
                    booking.status === "cancelled"
                      ? "border-border bg-muted/50"
                      : "border-border bg-card"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">
                        {booking.service}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-accent/10 text-accent"
                            : booking.status === "cancelled"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {booking.salonName}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(booking.date)} at {booking.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-lg font-bold text-foreground">
                      ${booking.price}
                    </span>
                    {booking.status === "confirmed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => cancelBooking(booking.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <XCircle className="mr-1 h-4 w-4" /> Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
