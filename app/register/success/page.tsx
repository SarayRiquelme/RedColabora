import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">¡Registro exitoso!</CardTitle>
              <CardDescription className="text-base">Revisa tu correo para confirmar tu cuenta</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                Verifica tu correo
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Te hemos enviado un correo de confirmación. Por favor, haz clic en el enlace para activar tu cuenta
                antes de iniciar sesión.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/login" className="block" aria-label="Ir a iniciar sesión">
                <Button className="w-full">Ir a iniciar sesión</Button>
              </Link>
              <Link href="/" className="block" aria-label="Volver al inicio">
                <Button variant="outline" className="w-full bg-transparent">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
