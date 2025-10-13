import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Calendar, Shield } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect si no hay usuario autenticado
  if (!user) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Tus datos registrados en RedColabora</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Correo electrónico</p>
                <p className="text-base">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Comuna</p>
                <p className="text-base">{profile?.comuna || "No especificada"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Miembro desde</p>
                <p className="text-base">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("es-CL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Fecha no disponible"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipo de Usuario</CardTitle>
            <CardDescription>Tu rol en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={profile?.type === "pyme" ? "default" : "secondary"} className="text-sm px-3 py-1">
              {profile?.type === "pyme" ? "PYME (Pequeña y Mediana Empresa)" : "Consumidor"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacidad y Consentimiento</CardTitle>
            <CardDescription>Gestión de datos personales según Ley 19.628</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">Consentimiento RGPD</p>
                <p className="text-sm text-muted-foreground">
                  {profile?.consent_rgpd
                    ? "Has aceptado el tratamiento de tus datos personales conforme a la Ley 19.628"
                    : "No has aceptado el consentimiento"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
