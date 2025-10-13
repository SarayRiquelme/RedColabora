"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"
import { UserPlus } from "lucide-react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<"pyme" | "consumer" | "">("")
  const [comuna, setComuna] = useState("")
  const [consentRgpd, setConsentRgpd] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!userType) {
      setError("Por favor selecciona el tipo de usuario")
      setIsLoading(false)
      return
    }

    if (!comuna.trim()) {
      setError("Por favor ingresa tu comuna")
      setIsLoading(false)
      return
    }

    if (!consentRgpd) {
      setError("Debes aceptar el consentimiento de datos personales (Ley 19.628)")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            type: userType,
            comuna: comuna.trim(),
            consent_rgpd: consentRgpd,
          },
        },
      })

      if (authError) throw authError
      if (!authData.user) throw new Error("No se pudo crear el usuario")

      router.push("/register/success")
    } catch (error: unknown) {
      console.error("[v0] Registration error:", error)
      if (error instanceof Error) {
        if (error.message.includes("already registered") || error.message.includes("already been registered")) {
          setError("Este correo ya está registrado. Por favor inicia sesión.")
        } else {
          setError(error.message)
        }
      } else {
        setError("Ocurrió un error durante el registro")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-muted/30 p-4 md:p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Registro en RedColabora</CardTitle>
            </div>
            <CardDescription className="text-base">
              Únete a nuestra comunidad de colaboración para PYMEs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Correo electrónico{" "}
                  <span className="text-destructive" aria-label="requerido">
                    *
                  </span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Correo electrónico"
                  aria-required="true"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-type">
                  Tipo de usuario{" "}
                  <span className="text-destructive" aria-label="requerido">
                    *
                  </span>
                </Label>
                <Select value={userType} onValueChange={(value) => setUserType(value as "pyme" | "consumer")}>
                  <SelectTrigger id="user-type" aria-label="Seleccionar tipo de usuario" aria-required="true">
                    <SelectValue placeholder="Selecciona tu tipo de usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pyme">PYME (Pequeña y Mediana Empresa)</SelectItem>
                    <SelectItem value="consumer">Consumidor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comuna">
                  Comuna{" "}
                  <span className="text-destructive" aria-label="requerido">
                    *
                  </span>
                </Label>
                <Input
                  id="comuna"
                  type="text"
                  placeholder="Ej: Santiago, Providencia, Las Condes"
                  required
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  aria-label="Comuna de residencia"
                  aria-required="true"
                  autoComplete="address-level2"
                  minLength={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Contraseña{" "}
                  <span className="text-destructive" aria-label="requerido">
                    *
                  </span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Contraseña"
                  aria-required="true"
                  autoComplete="new-password"
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  Confirmar contraseña{" "}
                  <span className="text-destructive" aria-label="requerido">
                    *
                  </span>
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-label="Confirmar contraseña"
                  aria-required="true"
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border p-4 bg-muted/50">
                <Checkbox
                  id="consent-rgpd"
                  checked={consentRgpd}
                  onCheckedChange={(checked) => setConsentRgpd(checked as boolean)}
                  required
                  aria-required="true"
                  aria-label="Consentimiento de datos personales"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="consent-rgpd"
                    className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Consentimiento de datos personales{" "}
                    <span className="text-destructive" aria-label="requerido">
                      *
                    </span>
                  </Label>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Acepto que mis datos personales sean tratados conforme a la Ley 19.628 sobre Protección de la Vida
                    Privada y la Política de Privacidad de RedColabora.
                  </p>
                </div>
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

              <Button type="submit" className="w-full" disabled={isLoading} aria-label="Crear cuenta en RedColabora">
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline underline-offset-4 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="Ir a página de inicio de sesión"
                >
                  Inicia sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
