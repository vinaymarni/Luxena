import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Essential",
    price: "$45",
    description: "Perfect for a quick refresh",
    features: [
      "Precision Haircut",
      "Blow Dry & Styling",
      "Scalp Massage",
      "Complimentary Beverage",
    ],
    highlighted: false,
  },
  {
    name: "Luxe",
    price: "$120",
    description: "Our most popular package",
    features: [
      "Haircut & Styling",
      "Deep Conditioning Treatment",
      "Express Facial",
      "Hand & Nail Care",
      "Complimentary Refreshments",
    ],
    highlighted: true,
  },
  {
    name: "Bridal Suite",
    price: "$350",
    description: "Your complete bridal experience",
    features: [
      "Bridal Hair & Makeup",
      "Trial Session Included",
      "Luxury Facial Treatment",
      "Full Body Spa",
      "Champagne & Treats",
      "Bridesmaid Discounts",
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Transparent Pricing
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Packages for Every Occasion
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Choose from our curated packages or mix and match individual services
            to create your perfect beauty experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-lg border p-8 transition-shadow hover:shadow-lg ${
                plan.highlighted
                  ? "border-accent bg-card shadow-md"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-6">
                <span className="font-serif text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  / session
                </span>
              </div>
              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="mt-8">
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Book This Package
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
