import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Tag, Phone, Mail, Globe, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BusinessEditForm } from "@/components/business-edit-form"
import { ReviewForm } from "@/components/review-form"
import { RecommendationButton } from "@/components/recommendation-button"

interface Business {
  id: string
  name: string
  description: string | null
  comuna: string | null
  category: string | null
  phone: string | null
  email: string | null
  website: string | null
  user_id: string | null
  created_at: string
}

interface Review {
  id: string
  rating: number
  comment: string
  created_at: string
  user_id: string
}

export default async function BusinessDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Fetch business details
  const { data: business, error } = await supabase.from("businesses").select("*").eq("id", params.id).single()

  if (error || !business) {
    notFound()
  }

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isOwner = user?.id === business.user_id

  // Fetch reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("business_id", params.id)
    .order("created_at", { ascending: false })

  // Fetch recommendations count
  const { count: recommendationsCount } = await supabase
    .from("recommendations")
    .select("*", { count: "exact", head: true })
    .eq("business_id", params.id)

  // Check if current user has recommended
  const { data: userRecommendation } = user
    ? await supabase
        .from("recommendations")
        .select("id")
        .eq("business_id", params.id)
        .eq("user_id", user.id)
        .maybeSingle()
    : { data: null }

  // Calculate average rating
  const averageRating =
    reviews && reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          aria-label="Volver a búsqueda"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a búsqueda
        </Link>

        {/* Business Header with Photo Placeholder */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo Placeholder */}
              <div className="w-full md:w-48 h-48 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-4xl text-muted-foreground" aria-hidden="true">
                  🏢
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <CardTitle className="text-3xl text-balance">{business.name}</CardTitle>
                <CardDescription className="flex flex-wrap gap-3">
                  {business.comuna && (
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {business.comuna}
                    </span>
                  )}
                  {business.category && (
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <Tag className="h-4 w-4" aria-hidden="true" />
                      {business.category}
                    </span>
                  )}
                </CardDescription>

                {/* Rating Display */}
                {reviews && reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            {business.description && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed text-pretty">{business.description}</p>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Información de Contacto</h2>
              <div className="space-y-3">
                {business.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <a
                      href={`tel:${business.phone}`}
                      className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                      aria-label={`Llamar a ${business.name}`}
                    >
                      {business.phone}
                    </a>
                  </div>
                )}
                {business.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <a
                      href={`mailto:${business.email}`}
                      className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                      aria-label={`Enviar email a ${business.name}`}
                    >
                      {business.email}
                    </a>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                      aria-label={`Visitar sitio web de ${business.name} (se abre en nueva pestaña)`}
                    >
                      {business.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <RecommendationButton
                businessId={business.id}
                businessName={business.name}
                initialRecommended={!!userRecommendation}
                initialCount={recommendationsCount || 0}
              />
              {business.phone && (
                <Button variant="outline" asChild>
                  <a href={`tel:${business.phone}`} aria-label={`Llamar a ${business.name}`}>
                    <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                    Llamar
                  </a>
                </Button>
              )}
              {business.email && (
                <Button variant="outline" asChild>
                  <a href={`mailto:${business.email}`} aria-label={`Enviar email a ${business.name}`}>
                    <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                    Email
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Form (only for owner) */}
        {isOwner && <BusinessEditForm business={business} />}

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Reseñas</h2>

          {/* Review Form (only for authenticated users) */}
          {user && <ReviewForm businessId={business.id} businessName={business.name} />}

          {/* Reviews List */}
          {reviews && reviews.length > 0 ? (
            <div className="space-y-4" role="list" aria-label="Lista de reseñas">
              {reviews.map((review) => (
                <Card key={review.id} role="listitem">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <time className="text-sm text-muted-foreground" dateTime={review.created_at}>
                        {new Date(review.created_at).toLocaleDateString("es-CL", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Aún no hay reseñas.{" "}
                  {user ? "¡Sé el primero en dejar una!" : "Inicia sesión para dejar la primera reseña."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
