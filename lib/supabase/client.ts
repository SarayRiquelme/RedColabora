/**
 * CLIENTE SUPABASE PARA NAVEGADOR (CLIENT-SIDE)
 *
 * Propósito:
 * - Crea un cliente de Supabase para uso en Client Components y navegador
 * - Maneja autenticación y operaciones de base de datos desde el cliente
 *
 * Requisitos Funcionales (RF):
 * - RF-01: Autenticación de usuarios (login, registro, logout)
 * - RF-02: Gestión de perfiles de usuario
 * - RF-03: Sistema de reseñas y calificaciones
 * - RF-04: Sistema de recomendaciones
 *
 * Requisitos No Funcionales (RNF):
 * - RNF-02: Seguridad - Usa variables de entorno para credenciales
 * - RNF-03: Rendimiento - Cliente singleton para evitar múltiples instancias
 * - RNF-04: Accesibilidad - Maneja errores de forma clara para el usuario
 *
 * Decisiones de Diseño:
 * - Usa @supabase/ssr para mejor integración con Next.js
 * - createBrowserClient maneja cookies automáticamente en el navegador
 * - Variables de entorno NEXT_PUBLIC_* son accesibles en el cliente
 */

import { createBrowserClient } from "@supabase/ssr"

/**
 * Crea y retorna un cliente de Supabase para uso en el navegador
 *
 * @returns Cliente de Supabase configurado para operaciones client-side
 *
 * Uso:
 * - En Client Components ('use client')
 * - Para operaciones de autenticación (login, registro)
 * - Para queries en tiempo real
 * - Para operaciones que requieren interacción del usuario
 */
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
