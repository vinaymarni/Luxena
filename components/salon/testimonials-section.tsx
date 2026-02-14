"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Amelia Grant",
    role: "Bridal Client",
    rating: 5,
    text: "My bridal experience at Lumiere was nothing short of magical. The team understood my vision perfectly and executed it flawlessly. I felt like the most beautiful version of myself on my wedding day.",
    initials: "AG",
  },
  {
    name: "Sarah Mitchell",
    role: "Regular Client",
    rating: 5,
    text: "I have been coming to Lumiere for over two years and every visit is consistently outstanding. The attention to detail, the warm atmosphere, and the genuine care from the stylists make it my sanctuary.",
    initials: "SM",
  },
  {
    name: "David Chen",
    role: "Spa Client",
    rating: 5,
    text: "The spa treatments here are truly world-class. After a stressful month at work, the deep tissue massage and facial left me feeling completely rejuvenated. The ambiance alone is worth the visit.",
    initials: "DC",
  },
  {
    name: "Priya Sharma",
    role: "Haircut & Styling",
    rating: 5,
    text: "Finally found a salon that understands diverse hair textures. My stylist took the time to understand my hair and gave me the most gorgeous cut I have ever had. Absolutely recommend Lumiere.",
    initials: "PS",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const testimonial = testimonials[current]

  return (
    <section id="testimonials" className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Client Stories
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <Quote className="h-10 w-10 text-accent/30" />
          <p className="mt-6 text-center text-lg leading-relaxed text-foreground md:text-xl text-pretty">
            {testimonial.text}
          </p>

          <div className="mt-8 flex items-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-accent text-accent"
              />
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {testimonial.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-accent"
                      : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
