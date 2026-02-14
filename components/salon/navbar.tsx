"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-accent" />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Lumiere
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="text-foreground">
              Sign In
            </Button>
          </Link>
          <Link href="/booking">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/auth/login" onClick={() => setOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/booking" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
