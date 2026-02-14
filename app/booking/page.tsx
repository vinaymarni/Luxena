"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Scissors,
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useBooking } from "@/lib/booking-context"
import { salons } from "@/lib/salon-data"
import type { SalonService } from "@/lib/salon-data"

const steps = ["Select Salon", "Choose Service", "Pick a Slot", "Payment"]

export default function BookingPage() {
  const { user } = useAuth()
  const { addBooking, getSlots } = useBooking()
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<SalonService | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const salon = salons.find((s) => s.id === selectedSalon)
  const slots = selectedDate ? getSlots(selectedDate) : []

  // Generate next 14 days for date selection
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d.toISOString().split("T")[0]
  })

  const handleConfirm = () => {
    if (!salon || !selectedService || !selectedDate || !selectedTime) return
    addBooking({
      userId: user?.id || "guest",
      salonId: salon.id,
      salonName: salon.name,
      service: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      price: selectedService.price,
    })
    setConfirmed(true)
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00")
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  if (confirmed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <Check className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mt-6 font-serif text-2xl font-bold text-foreground">
          Booking Confirmed
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Your appointment for {selectedService?.name} at {salon?.name} on{" "}
          {selectedDate && formatDate(selectedDate)} at {selectedTime} has been
          confirmed.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href={user ? "/dashboard" : "/"}>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              {user ? "View Dashboard" : "Back Home"}
            </Button>
          </Link>
        </div>
      </div>
    )
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
          {user ? (
            <span className="text-sm text-muted-foreground">
              Hi, {user.name}
            </span>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-foreground">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Progress steps */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  i <= step
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`hidden text-sm sm:inline ${
                  i <= step
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`mx-1 h-px w-6 sm:w-10 ${
                    i < step ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Select Salon */}
        {step === 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Choose a Salon
            </h2>
            <p className="mt-2 text-muted-foreground">
              Select from our partner salons to begin your booking.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {salons.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSalon(s.id)
                    setSelectedService(null)
                    setSelectedTime("")
                  }}
                  className={`flex flex-col rounded-lg border p-5 text-left transition-all hover:shadow-md ${
                    selectedSalon === s.id
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card"
                  }`}
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.tagline}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {s.address}, {s.city}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <span className="font-semibold text-accent">
                      {s.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({s.reviewCount} reviews)
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => setStep(1)}
                disabled={!selectedSalon}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Choose Service */}
        {step === 1 && salon && (
          <div>
            <button
              onClick={() => setStep(0)}
              className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to salons
            </button>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Select a Service
            </h2>
            <p className="mt-2 text-muted-foreground">
              Choose from {salon.name}&apos;s available services.
            </p>

            {(["haircut", "spa", "facial", "bridal"] as const).map(
              (category) => {
                const categoryServices = salon.services.filter(
                  (s) => s.category === category
                )
                if (categoryServices.length === 0) return null
                return (
                  <div key={category} className="mt-8">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {category === "haircut"
                        ? "Hair"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {categoryServices.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service)}
                          className={`flex items-start justify-between rounded-lg border p-4 text-left transition-all hover:shadow-sm ${
                            selectedService?.id === service.id
                              ? "border-accent bg-accent/5"
                              : "border-border bg-card"
                          }`}
                        >
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {service.name}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {service.description}
                            </p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {service.duration}
                              </span>
                            </div>
                          </div>
                          <span className="ml-4 font-semibold text-accent">
                            ${service.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              }
            )}

            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedService}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Pick a Slot */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to services
            </button>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Pick Date & Time
            </h2>
            <p className="mt-2 text-muted-foreground">
              Select your preferred appointment slot.
            </p>

            {/* Date picker */}
            <div className="mt-8">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calendar className="h-4 w-4 text-accent" /> Select Date
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date)
                      setSelectedTime("")
                    }}
                    className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                      selectedDate === date
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card text-foreground hover:border-accent/50"
                    }`}
                  >
                    {formatDate(date)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="mt-8">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4 text-accent" /> Available Times
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                        selectedTime === slot.time
                          ? "border-accent bg-accent text-accent-foreground"
                          : slot.available
                          ? "border-border bg-card text-foreground hover:border-accent/50"
                          : "cursor-not-allowed border-border bg-muted text-muted-foreground line-through"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment / Confirm */}
        {step === 3 && salon && selectedService && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to slot selection
            </button>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Confirm & Pay
            </h2>
            <p className="mt-2 text-muted-foreground">
              Review your booking and complete payment.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {/* Summary */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Booking Summary
                </h3>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salon</span>
                    <span className="font-medium text-foreground">
                      {salon.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium text-foreground">
                      {selectedService.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">
                      {selectedService.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="mt-2 border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">
                        Total
                      </span>
                      <span className="font-serif text-xl font-bold text-accent">
                        ${selectedService.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment form */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                  <CreditCard className="h-5 w-5 text-accent" /> Payment
                  Details
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="card-name" className="text-foreground">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="Name on card"
                      defaultValue={user?.name || ""}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="card-number" className="text-foreground">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="card-exp" className="text-foreground">Expiry</Label>
                      <Input id="card-exp" placeholder="MM/YY" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="card-cvc" className="text-foreground">CVC</Label>
                      <Input id="card-cvc" placeholder="123" />
                    </div>
                  </div>
                  <Button
                    onClick={handleConfirm}
                    className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Confirm Booking - ${selectedService.price}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    This is a demo. No real payment is processed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
