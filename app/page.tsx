import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Store,
  Users,
  TrendingUp,
  Shield,
  Search,
  MessageSquare,
  Star,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Building2,
  ShoppingBag,
  Handshake,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container px-4 py-20 md:py-28 lg:py-36">
          <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
            <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Conectando PYMEs en Santiago, Chile
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance">
              El Marketplace que <span className="text-primary">Impulsa tu Negocio Local</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed max-w-3xl">
              RedColabora conecta pequeñas y medianas empresas, proveedores y consumidores en un ecosistema digital
              colaborativo. Gana visibilidad, encuentra clientes y fortalece la economía local.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/register" aria-label="Registra tu PYME gratis">
                <Button size="lg" className="gap-2 text-base h-12 px-8">
                  Registra tu PYME gratis
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/search" aria-label="Explorar negocios locales">
                <Button size="lg" variant="outline" className="text-base h-12 px-8 bg-transparent">
                  <Search className="h-5 w-5 mr-2" aria-hidden="true" />
                  Explorar negocios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Gratis para PYMEs</div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">Local</div>
              <div className="text-sm text-muted-foreground">Economía Colaborativa</div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Visibilidad Digital</div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">Seguro</div>
              <div className="text-sm text-muted-foreground">Reseñas Verificadas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Compite con las Grandes Plataformas</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              A diferencia de Mercado Libre o Amazon, RedColabora está diseñado específicamente para fortalecer tu
              negocio local sin comisiones abusivas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div
                  className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Perfil de Negocio Completo</CardTitle>
                <CardDescription className="leading-relaxed">
                  Crea tu vitrina digital con fotos, descripción, ubicación y horarios. Destaca lo que hace único a tu
                  negocio.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div
                  className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Reseñas y Recomendaciones</CardTitle>
                <CardDescription className="leading-relaxed">
                  Construye confianza con reseñas verificadas de clientes reales. Las recomendaciones impulsan tu
                  visibilidad.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div
                  className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Sistema de Cotizaciones</CardTitle>
                <CardDescription className="leading-relaxed">
                  Recibe solicitudes de cotización directamente de clientes interesados. Responde rápido y cierra más
                  ventas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div
                  className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Red de Colaboración</CardTitle>
                <CardDescription className="leading-relaxed">
                  Conecta con otros negocios locales, proveedores y potenciales socios. Crece en comunidad.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div
                  className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Visibilidad Local</CardTitle>
                <CardDescription className="leading-relaxed">
                  Aparece en búsquedas por comuna y categoría. Los clientes locales te encuentran fácilmente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div
                  className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Plataforma Segura</CardTitle>
                <CardDescription className="leading-relaxed">
                  Cumplimos con la Ley 19.628 de protección de datos. Tu información y la de tus clientes está
                  protegida.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Cómo Funciona RedColabora</h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                En solo 3 pasos, tu negocio estará visible para miles de clientes potenciales
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold">Regístrate Gratis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Crea tu cuenta como PYME o consumidor. Solo necesitas email y contraseña. Sin costos ocultos ni
                  comisiones.
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold">Completa tu Perfil</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Agrega información de tu negocio: categoría, comuna, descripción y contacto. Mientras más completo,
                  más visible serás.
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold">Conecta y Vende</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Recibe cotizaciones, responde consultas y construye tu reputación con reseñas. ¡Tu negocio crece!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                    ¿Necesitas un Servicio o Producto?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Solicita cotizaciones a múltiples PYMEs locales y compara. Encuentra la mejor opción para tu
                    proyecto.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground">Respuestas rápidas de negocios verificados</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground">Compara precios y servicios fácilmente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground">Apoya la economía local de tu comuna</span>
                    </li>
                  </ul>
                  <Link href="/search" aria-label="Solicitar cotización">
                    <Button size="lg" className="gap-2">
                      Solicitar Cotización
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-background/80 backdrop-blur">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                      <Building2 className="h-8 w-8 text-primary" aria-hidden="true" />
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-muted-foreground">PYMEs Registradas</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/80 backdrop-blur">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                      <ShoppingBag className="h-8 w-8 text-primary" aria-hidden="true" />
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm text-muted-foreground">Categorías</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/80 backdrop-blur">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                      <MapPin className="h-8 w-8 text-primary" aria-hidden="true" />
                      <div className="text-2xl font-bold">30+</div>
                      <div className="text-sm text-muted-foreground">Comunas</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/80 backdrop-blur">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                      <Handshake className="h-8 w-8 text-primary" aria-hidden="true" />
                      <div className="text-2xl font-bold">1000+</div>
                      <div className="text-sm text-muted-foreground">Conexiones</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Únete a la Economía Colaborativa Local</h2>
            <p className="text-lg mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
              Miles de PYMEs y consumidores ya están conectando en RedColabora. Es tu turno de crecer y fortalecer tu
              comunidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" aria-label="Comenzar ahora gratis">
                <Button size="lg" variant="secondary" className="gap-2 text-base h-12 px-8">
                  Comenzar Ahora Gratis
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/search" aria-label="Ver negocios locales">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Ver Negocios Locales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
