/**
 * CLIENTE SUPABASE PARA SERVIDOR (SERVER-SIDE)
 *
 * Propósito:
 * - Crea un cliente de Supabase para uso en Server Components, Server Actions y Route Handlers
 * - Maneja cookies de sesión de forma segura en el servidor
 *
 * Requisitos Funcionales (RF):
 * - RF-01: Autenticación SSR (verificar sesión en servidor)
 * - RF-02: Fetch de datos de usuario en servidor
 * - RF-05: Búsqueda y filtrado de negocios (SSR para SEO)
 *
 * Requisitos No Funcionales (RNF):
 * - RNF-01: Rendimiento - SSR para tiempo de carga <2s
 * - RNF-02: Seguridad - Manejo seguro de cookies de sesión
 * - RNF-05: SEO - Renderizado en servidor para indexación
 *
 * Decisiones de Diseño:
 * - Función async para acceder a cookies() de Next.js
 * - Crear nuevo cliente en cada función (importante para Vercel Fluid Compute)
 * - Manejo de errores silencioso en setAll (normal en Server Components)
 */

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Crea y retorna un cliente de Supabase para uso en el servidor
 *
 * @returns Promise con cliente de Supabase configurado para operaciones server-side
 *
 * Uso:
 * - En Server Components (async components)
 * - En Server Actions
 * - En Route Handlers (API routes)
 * - Para fetch de datos con SSR
 *
 * IMPORTANTE: Siempre crear un nuevo cliente dentro de cada función
 * para compatibilidad con Vercel Fluid Compute
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      // Obtener todas las cookies para la sesión
      getAll() {
        return cookieStore.getAll()
      },
      // Establecer cookies (usado por Supabase para mantener sesión)
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // setAll puede ser llamado desde un Server Component
          // Esto es seguro de ignorar si tienes middleware refrescando sesiones
        }
      },
    },
  })
}
