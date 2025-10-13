"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Star, Loader2 } from "lucide-react"

interface ReviewFormProps {
  businessId: string
  businessName: string
}

export function ReviewForm({ businessId, businessName }: ReviewFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Por favor selecciona una calificación")
      return
    }

    if (comment.trim().length < 10) {
      setError("El comentario debe tener al menos 10 caracteres")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Debes iniciar sesión para dejar una reseña")
        return
      }

      const { error: insertError } = await supabase.from("reviews").insert({
        business_id: businessId,
        user_id: user.id,
        rating,
        comment: comment.trim(),
      })

      if (insertError) throw insertError

      // Reset form
      setRating(0)
      setComment("")
      router.refresh()
      alert("Reseña publicada exitosamente")
    } catch (err) {
      console.error("[v0] Error creating review:", err)
      setError(err instanceof Error ? err.message : "Error al publicar la reseña")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Deja tu Reseña</CardTitle>
        <CardDescription>Comparte tu experiencia con {businessName}</CardDescription>
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
            <Label htmlFor="rating">
              Calificación <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-1" role="radiogroup" aria-label="Calificación de 1 a 5 estrellas">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  disabled={isLoading}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} ${star === 1 ? "estrella" : "estrellas"}`}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                Has seleccionado {rating} {rating === 1 ? "estrella" : "estrellas"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">
              Comentario <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
              minLength={10}
              disabled={isLoading}
              placeholder="Cuéntanos sobre tu experiencia..."
              aria-required="true"
            />
            <p className="text-xs text-muted-foreground">Mínimo 10 caracteres ({comment.length}/10)</p>
          </div>

          <Button type="submit" disabled={isLoading || rating === 0} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
            {isLoading ? "Publicando..." : "Publicar Reseña"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
