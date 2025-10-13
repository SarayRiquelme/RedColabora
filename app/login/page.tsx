"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { LogIn, Mail } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setNeedsConfirmation(false)
    setResendSuccess(false)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setNeedsConfirmation(true)
          setError(
            "Tu correo electrónico aún no ha sido confirmado. Por favor revisa tu bandeja de entrada y haz clic en el enlace de confirmación.",
          )
        } else {
          throw error
        }
        return
      }

      router.push("/search")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al iniciar sesión. Verifica tus credenciales.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setIsResending(true)
    setError(null)
    setResendSuccess(false)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/search`,
        },
      })

      if (error) throw error

      setResendSuccess(true)
      setError(null)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al reenviar el correo de confirmación.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-muted/30 p-4 md:p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <LogIn className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Inicia Sesión en RedColabora</CardTitle>
            </div>
            <CardDescription className="text-base">Ingresa a tu cuenta de RedColabora</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Correo electrónico"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Contraseña"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div
                  className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              {resendSuccess && (
                <div
                  className="p-3 text-sm text-green-700 bg-green-50 rounded-md border border-green-200"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Correo de confirmación reenviado. Por favor revisa tu bandeja de entrada.</span>
                  </div>
                </div>
              )}

              {needsConfirmation && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleResendConfirmation}
                  disabled={isResending || !email}
                  aria-label="Reenviar correo de confirmación"
                >
                  {isResending ? "Reenviando..." : "Reenviar correo de confirmación"}
                </Button>
              )}

              <Button type="submit" className="w-full" disabled={isLoading} aria-label="Iniciar sesión">
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:underline underline-offset-4 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="Crear cuenta"
                >
                  Regístrate
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
