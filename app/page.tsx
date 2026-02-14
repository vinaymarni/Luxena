import { Navbar } from "@/components/salon/navbar"
import { HeroSection } from "@/components/salon/hero-section"
import { ServicesSection } from "@/components/salon/services-section"
import { PricingSection } from "@/components/salon/pricing-section"
import { TestimonialsSection } from "@/components/salon/testimonials-section"
import { ContactSection } from "@/components/salon/contact-section"
import { Footer } from "@/components/salon/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
