import Link from "next/link"
import Image from "next/image"
import { Scissors, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { salons } from "@/lib/salon-data"

export default function SalonsPage() {
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
          <div className="flex items-center gap-3">
            <Link href="/booking">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Discover
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Our Partner Salons
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Explore our handpicked collection of premium salons across the
            country. Each one upholds the Lumiere standard of excellence.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {salons.map((salon) => (
            <Link
              key={salon.id}
              href={`/salons/${salon.id}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={salon.image}
                  alt={salon.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  {salon.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {salon.tagline}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {salon.address}, {salon.city}
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold text-foreground">
                      {salon.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({salon.reviewCount})
                    </span>
                  </div>
                  <span className="text-sm font-medium text-accent">
                    {salon.services.length} services
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
