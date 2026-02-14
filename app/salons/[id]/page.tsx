"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Scissors,
  Star,
  MapPin,
  Clock,
  ArrowLeft,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { salons } from "@/lib/salon-data"
import type { Review } from "@/lib/salon-data"
import { useAuth } from "@/lib/auth-context"

export default function SalonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const salon = salons.find((s) => s.id === id)
  const { user } = useAuth()

  const [reviews, setReviews] = useState<Review[]>(salon?.reviews || [])
  const [newRating, setNewRating] = useState(5)
  const [newReview, setNewReview] = useState("")
  const [hoverRating, setHoverRating] = useState(0)

  if (!salon) return notFound()

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
          1
        )
      : "0"

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReview.trim()) return
    const review: Review = {
      id: `rev-${Date.now()}`,
      userId: user?.id || "guest",
      userName: user?.name || "Guest User",
      rating: newRating,
      text: newReview,
      date: new Date().toISOString().split("T")[0],
    }
    setReviews((prev) => [review, ...prev])
    setNewReview("")
    setNewRating(5)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-accent" />
            <span className="font-serif text-lg font-bold text-foreground">
              Lumiere
            </span>
          </Link>
          <Link href="/booking">
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/salons"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all salons
        </Link>

        {/* Hero */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
          <Image
            src={salon.image}
            alt={salon.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              {salon.name}
            </h1>
            <p className="mt-2 text-primary-foreground/80">{salon.tagline}</p>
            <div className="mt-3 flex items-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {salon.address}, {salon.city}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" /> {avgRating}{" "}
                ({reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {salon.services.map((service) => (
              <div
                key={service.id}
                className="flex items-start justify-between rounded-lg border border-border bg-card p-5"
              >
                <div>
                  <p className="font-medium text-foreground">{service.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {service.duration}
                    </span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs capitalize">
                      {service.category}
                    </span>
                  </div>
                </div>
                <span className="ml-4 font-serif text-lg font-bold text-accent">
                  ${service.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Reviews & Ratings
          </h2>

          {/* Review form */}
          <div className="mt-6 rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Leave a Review
            </h3>
            {!user && (
              <p className="mt-2 text-sm text-muted-foreground">
                <Link href="/auth/login" className="text-accent hover:underline">
                  Sign in
                </Link>{" "}
                to leave a review, or continue as a guest.
              </p>
            )}
            <form
              onSubmit={handleSubmitReview}
              className="mt-4 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Your Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= (hoverRating || newRating)
                            ? "fill-accent text-accent"
                            : "text-border"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="review-text" className="text-foreground">Your Review</Label>
                <Textarea
                  id="review-text"
                  placeholder="Share your experience..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows={3}
                  required
                  className="resize-none"
                />
              </div>
              <Button
                type="submit"
                className="self-start bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Send className="mr-2 h-4 w-4" /> Submit Review
              </Button>
            </form>
          </div>

          {/* Reviews list */}
          <div className="mt-8 flex flex-col gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {review.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {review.userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date + "T12:00:00").toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating
                            ? "fill-accent text-accent"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
