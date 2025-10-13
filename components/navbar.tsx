/**
 * COMPONENTE NAVBAR (NAVEGACIÓN PRINCIPAL)
 *
 * Propósito:
 * - Barra de navegación principal visible en todas las páginas
 * - Muestra links principales y estado de autenticación
 * - Responsive con menú móvil
 *
 * Requisitos Funcionales (RF):
 * - RF-01: Mostrar estado de autenticación (login/logout)
 * - RF-06: Navegación entre páginas principales
 *
 * Requisitos No Funcionales (RNF):
 * - RNF-04: Accesibilidad WCAG 2.1 AA
 *   - ARIA labels en todos los links
 *   - Navegación por teclado
 *   - Contraste de colores adecuado
 * - RNF-03: Responsive mobile-first
 * - RNF-01: Rendimiento - SSR para carga rápida
 *
 * Decisiones de Diseño:
 * - Server Component para SSR (verifica auth en servidor)
 * - Sticky navbar para acceso constante
 * - Sheet component para menú móvil (mejor UX que dropdown)
 * - Backdrop blur para efecto moderno sin sacrificar legibilidad
 */

import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { LogoutButton } from "@/components/logout-button"
import { Menu, Search, UserPlus, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export async function Navbar() {
  // Verificar autenticación en servidor (SSR)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    // Navbar sticky con backdrop blur para efecto moderno
    // z-50 asegura que esté sobre otros elementos
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo - Accesible con aria-label */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
          aria-label="RedColabora - Ir a inicio"
        >
          <span className="text-primary">Red</span>Colabora
        </Link>

        {/* Navegación Desktop - Oculta en móvil con hidden md:flex */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Ir a inicio"
          >
            Inicio
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Buscar colaboradores"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Buscar
          </Link>

          {/* Mostrar logout si autenticado, sino mostrar login/registro */}
          {user ? (
            <LogoutButton />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" aria-label="Iniciar sesión">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/register" aria-label="Registrarse">
                <Button size="sm" className="gap-2">
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Registrarse
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Navegación Móvil - Sheet (drawer) para mejor UX en móvil */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col gap-4 mt-8" role="navigation" aria-label="Menú principal móvil">
              <Link
                href="/"
                className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-accent"
                aria-label="Ir a inicio"
              >
                Inicio
              </Link>
              <Link
                href="/search"
                className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-accent"
                aria-label="Buscar colaboradores"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
                Buscar
              </Link>

              <div className="border-t border-border my-4" />

              {user ? (
                <div className="px-2">
                  <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
                  <LogoutButton />
                </div>
              ) : (
                <div className="flex flex-col gap-3 px-2">
                  <Link href="/login" aria-label="Iniciar sesión">
                    <Button variant="outline" className="w-full gap-2 justify-start bg-transparent">
                      <LogIn className="h-4 w-4" aria-hidden="true" />
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link href="/register" aria-label="Registrarse">
                    <Button className="w-full gap-2 justify-start">
                      <UserPlus className="h-4 w-4" aria-hidden="true" />
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
