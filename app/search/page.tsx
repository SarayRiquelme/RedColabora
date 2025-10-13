"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Tag, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

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

export default function SearchPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([])
  const [comunaFilter, setComunaFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searching, setSearching] = useState(false)

  const supabase = createClient()

  // Fetch all businesses on mount
  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from("businesses")
        .select("*")
        .order("created_at", { ascending: false })

      if (fetchError) throw fetchError

      setBusinesses(data || [])
      setFilteredBusinesses(data || [])
    } catch (err) {
      console.error("Error fetching businesses:", err)
      setError("Error al cargar los negocios. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setSearching(true)
      setError(null)

      let query = supabase.from("businesses").select("*")

      // Apply filters if provided
      if (comunaFilter.trim()) {
        query = query.ilike("comuna", `%${comunaFilter.trim()}%`)
      }

      if (categoryFilter.trim()) {
        query = query.ilike("category", `%${categoryFilter.trim()}%`)
      }

      const { data, error: searchError } = await query.order("created_at", { ascending: false })

      if (searchError) throw searchError

      setFilteredBusinesses(data || [])
    } catch (err) {
      console.error("Error searching businesses:", err)
      setError("Error al buscar. Por favor, intenta nuevamente.")
    } finally {
      setSearching(false)
    }
  }

  const handleReset = () => {
    setComunaFilter("")
    setCategoryFilter("")
    setFilteredBusinesses(businesses)
  }

  if (loading) {
    return (
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" aria-hidden="true" />
              <p className="text-muted-foreground">Cargando negocios...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Buscar Negocios</h1>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Encuentra PYMEs locales en tu comuna
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Comuna Filter */}
              <div className="flex-1">
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    type="text"
                    placeholder="Filtrar por comuna..."
                    value={comunaFilter}
                    onChange={(e) => setComunaFilter(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 h-12 text-base"
                    aria-label="Filtrar por comuna"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex-1">
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    type="text"
                    placeholder="Filtrar por categoría..."
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 h-12 text-base"
                    aria-label="Filtrar por categoría"
                  />
                </div>
              </div>

              {/* Search Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleSearch} disabled={searching} className="h-12 px-6" aria-label="Buscar negocios">
                  {searching ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" aria-hidden="true" />
                      Buscar
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 px-6 bg-transparent"
                  aria-label="Limpiar filtros"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" aria-hidden="true" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {filteredBusinesses.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredBusinesses.length}{" "}
                {filteredBusinesses.length === 1 ? "negocio encontrado" : "negocios encontrados"}
              </p>
            </div>
            <ul role="list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBusinesses.map((business) => (
                <li key={business.id}>
                  <Link
                    href={`/business/${business.id}`}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                    aria-label={`Ver detalles de ${business.name}`}
                  >
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                      <CardHeader>
                        <CardTitle className="text-balance">{business.name}</CardTitle>
                        <CardDescription className="flex flex-wrap gap-2 mt-2">
                          {business.comuna && (
                            <span className="inline-flex items-center gap-1 text-xs">
                              <MapPin className="h-3 w-3" aria-hidden="true" />
                              {business.comuna}
                            </span>
                          )}
                          {business.category && (
                            <span className="inline-flex items-center gap-1 text-xs">
                              <Tag className="h-3 w-3" aria-hidden="true" />
                              {business.category}
                            </span>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground text-pretty leading-relaxed line-clamp-3">
                          {business.description || "Sin descripción disponible"}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
