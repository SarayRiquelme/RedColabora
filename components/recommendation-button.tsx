"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { ThumbsUp, Loader2 } from "lucide-react"

interface RecommendationButtonProps {
  businessId: string
  businessName: string
  initialRecommended: boolean
  initialCount: number
}

export function RecommendationButton({
  businessId,
  businessName,
  initialRecommended,
  initialCount,
}: RecommendationButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isRecommended, setIsRecommended] = useState(initialRecommended)
  const [count, setCount] = useState(initialCount)

  const handleToggleRecommendation = async () => {
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        alert("Debes iniciar sesión para recomendar")
        return
      }

      if (isRecommended) {
        // Remove recommendation
        const { error } = await supabase
          .from("recommendations")
          .delete()
          .eq("business_id", businessId)
          .eq("user_id", user.id)

        if (error) throw error

        setIsRecommended(false)
        setCount(count - 1)
      } else {
        // Add recommendation
        const { error } = await supabase.from("recommendations").insert({
          business_id: businessId,
          user_id: user.id,
        })

        if (error) throw error

        setIsRecommended(true)
        setCount(count + 1)
      }

      router.refresh()
    } catch (err) {
      console.error("[v0] Error toggling recommendation:", err)
      alert("Error al procesar la recomendación")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleToggleRecommendation}
      disabled={isLoading}
      variant={isRecommended ? "default" : "outline"}
      className="gap-2"
      aria-label={isRecommended ? `Quitar recomendación de ${businessName}` : `Recomendar ${businessName}`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <ThumbsUp className={`h-4 w-4 ${isRecommended ? "fill-current" : ""}`} aria-hidden="true" />
      )}
      {isRecommended ? "Recomendado" : "Recomendar"}
      <span className="font-semibold">({count})</span>
    </Button>
  )
}
