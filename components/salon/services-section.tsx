import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Haircut & Styling",
    description:
      "Precision cuts and creative styling by our expert stylists. From classic looks to contemporary trends.",
    image: "/images/service-haircut.jpg",
    price: "From $45",
  },
  {
    title: "Spa & Wellness",
    description:
      "Rejuvenating body treatments including hot stone massage, aromatherapy, and deep relaxation rituals.",
    image: "/images/service-spa.jpg",
    price: "From $80",
  },
  {
    title: "Facial Treatments",
    description:
      "Advanced skincare using premium products. Customized facials for radiant, youthful skin.",
    image: "/images/service-facial.jpg",
    price: "From $65",
  },
  {
    title: "Bridal Packages",
    description:
      "Complete bridal beauty from hair to makeup. Make your special day unforgettable with our curated packages.",
    image: "/images/service-bridal.jpg",
    price: "From $250",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
            What We Offer
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Our Signature Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Each service is designed to deliver a transformative experience,
            combining artistry with the finest products available.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href="/booking"
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent">
                    {service.price}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    Book <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
