import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
              <CardTitle className="text-2xl">Negocio No Encontrado</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Lo sentimos, el negocio que buscas no existe o ha sido eliminado.
            </p>
            <Button asChild>
              <Link href="/search" aria-label="Volver a búsqueda">
                Volver a Búsqueda
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
