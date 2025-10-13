"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

interface Business {
  id: string
  name: string
  description: string | null
  comuna: string | null
  category: string | null
  phone: string | null
  email: string | null
  website: string | null
}

interface BusinessEditFormProps {
  business: Business
}

export function BusinessEditForm({ business }: BusinessEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: business.name,
    description: business.description || "",
    comuna: business.comuna || "",
    category: business.category || "",
    phone: business.phone || "",
    email: business.email || "",
    website: business.website || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase
        .from("businesses")
        .update({
          name: formData.name,
          description: formData.description || null,
          comuna: formData.comuna || null,
          category: formData.category || null,
          phone: formData.phone || null,
          email: formData.email || null,
          website: formData.website || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", business.id)

      if (updateError) throw updateError

      router.refresh()
      alert("Negocio actualizado exitosamente")
    } catch (err) {
      console.error("[v0] Error updating business:", err)
      setError(err instanceof Error ? err.message : "Error al actualizar el negocio")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Editar Negocio</CardTitle>
        <CardDescription>Actualiza la información de tu negocio</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="edit-name">
              Nombre del Negocio <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              aria-required="true"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Descripción</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              disabled={isLoading}
              placeholder="Describe tu negocio..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-comuna">Comuna</Label>
              <Input
                id="edit-comuna"
                type="text"
                value={formData.comuna}
                onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                disabled={isLoading}
                placeholder="Ej: Santiago Centro"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoría</Label>
              <Input
                id="edit-category"
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                disabled={isLoading}
                placeholder="Ej: Restaurante"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Teléfono</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={isLoading}
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
                placeholder="contacto@negocio.cl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-website">Sitio Web</Label>
            <Input
              id="edit-website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              disabled={isLoading}
              placeholder="https://www.negocio.cl"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
