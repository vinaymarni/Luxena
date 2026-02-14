import { Scissors } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  Services: [
    { label: "Haircut & Styling", href: "#services" },
    { label: "Spa & Wellness", href: "#services" },
    { label: "Facial Treatments", href: "#services" },
    { label: "Bridal Packages", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Gift Cards", href: "#" },
  ],
  Support: [
    { label: "Contact", href: "#contact" },
    { label: "FAQ", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Scissors className="h-5 w-5 text-accent" />
              <span className="font-serif text-lg font-bold">Lumiere</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Where elegance meets expertise. Your destination for premium
              beauty experiences since 2015.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
                {title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Lumiere Salon. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
