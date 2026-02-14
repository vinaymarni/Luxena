import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-salon.jpg"
        alt="Luxury salon interior with warm golden lighting"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary-foreground/70">
          Premium Beauty Experience
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl text-balance">
          Where Elegance Meets Expertise
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
          Indulge in a world of luxury beauty treatments crafted by our master
          stylists. From transformative haircuts to rejuvenating spa rituals,
          every visit is an experience.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/booking">
            <Button
              size="lg"
              className="bg-accent px-8 text-accent-foreground hover:bg-accent/90"
            >
              Book an Appointment
            </Button>
          </Link>
          <a href="#services">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Explore Services
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
