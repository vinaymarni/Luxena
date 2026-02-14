"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Get In Touch
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Visit Our Salon
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact info + Map */}
          <div className="flex flex-col gap-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Address
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    123 Beauty Lane, Suite 100
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Phone</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    hello@lumieresalon.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Hours</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Mon - Sat: 9AM - 8PM
                    <br />
                    Sunday: 10AM - 6PM
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="overflow-hidden rounded-lg border border-border">
              <iframe
                title="Lumiere Salon location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343035!2d-74.00425878459374!3d40.74076797932764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629302484000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-lg border border-border bg-card p-8">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Send Us a Message
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Have questions? We would love to hear from you.
            </p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center justify-center py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <p className="mt-4 font-serif text-lg font-semibold text-foreground">
                  Message Sent
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-name" className="text-foreground">
                      Name
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-subject" className="text-foreground">
                    Subject
                  </Label>
                  <Input
                    id="contact-subject"
                    placeholder="How can we help?"
                    required
                    className="bg-background"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-message" className="text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us more..."
                    rows={4}
                    required
                    className="bg-background resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
