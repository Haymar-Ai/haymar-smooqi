"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupValues = z.infer<typeof signupSchema>

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refCode = searchParams.get("ref") ?? undefined
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [ageConfirmed, setAgeConfirmed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
  })

  async function onSubmit(data: SignupValues) {
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          ref: refCode,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.error?.email) {
          setError(result.error.email[0])
        } else {
          setError("Something went wrong. Please try again.")
        }
        return
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError("Account created but sign in failed. Please log in manually.")
        return
      }

      router.push("/onboarding")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-[var(--card-radius)]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>Start learning today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3 mt-2">
            <input
              type="checkbox"
              id="age-confirm"
              checked={ageConfirmed}
              onChange={(e) => setAgeConfirmed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[var(--color-primary)]"
            />
            <label htmlFor="age-confirm" className="text-sm text-gray-600 leading-relaxed">
              I confirm that I am 13 years of age or older and agree to the{" "}
              <a href="/terms" className="text-[var(--color-primary)] hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="/privacy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <Button
            type="submit"
            disabled={!ageConfirmed || loading}
            className="w-full bg-[var(--color-primary)] text-white rounded-[var(--button-radius)] hover:opacity-90"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="relative flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full rounded-[var(--button-radius)]"
          onClick={() => {
            if (refCode) {
              document.cookie = `smooqi_ref=${encodeURIComponent(refCode)}; path=/; max-age=600`
            }
            signIn("google")
          }}
        >
          <svg className="mr-2 size-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--color-primary)] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8">Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}
