"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Scissors, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const success = login(email, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password. Try demo@lumiere.com / password")
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - branding */}
      <div className="hidden flex-1 flex-col justify-between bg-primary p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-accent" />
          <span className="font-serif text-xl font-bold text-primary-foreground">
            Lumiere
          </span>
        </Link>
        <div>
          <h2 className="font-serif text-3xl font-bold leading-tight text-primary-foreground text-balance">
            Welcome back to your beauty sanctuary.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Sign in to manage your appointments, discover new treatments, and
            continue your journey to timeless elegance.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/40">
          &copy; {new Date().getFullYear()} Lumiere Salon
        </p>
      </div>

      {/* Right side - form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 lg:hidden"
          >
            <Scissors className="h-6 w-6 text-accent" />
            <span className="font-serif text-xl font-bold text-foreground">
              Lumiere
            </span>
          </Link>

          <h1 className="font-serif text-2xl font-bold text-foreground">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your account.
          </p>

          {error && (
            <div className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@lumiere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link
              href="/auth/register"
              className="font-medium text-accent hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
