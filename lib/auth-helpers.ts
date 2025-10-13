/**
 * HELPERS DE AUTENTICACIÓN
 *
 * Propósito:
 * - Funciones auxiliares para operaciones de autenticación comunes
 * - Abstrae la lógica de Supabase Auth para facilitar uso en componentes
 *
 * Requisitos Funcionales (RF):
 * - RF-01: Registro de usuarios con email/password
 * - RF-01: Login de usuarios existentes
 * - RF-01: Logout de usuarios autenticados
 * - RF-02: Obtener datos del usuario actual
 *
 * Requisitos No Funcionales (RNF):
 * - RNF-02: Seguridad - Manejo seguro de credenciales
 * - RNF-04: Usabilidad - API simple y consistente
 * - RNF-06: Mantenibilidad - Código reutilizable y testeable
 *
 * Decisiones de Diseño:
 * - Funciones separadas para cada operación (Single Responsibility)
 * - Retorna siempre { data, error } para manejo consistente de errores
 * - signUp/signIn usan cliente browser (requieren interacción usuario)
 * - getCurrentUser usa cliente servidor (para SSR)
 */

import { createClient as createBrowserClient } from "@/lib/supabase/client"
import { createClient as createServerClient } from "@/lib/supabase/server"

/**
 * Registra un nuevo usuario con email y contraseña
 *
 * @param email - Email del usuario
 * @param password - Contraseña del usuario
 * @returns Objeto con data (usuario) y error si ocurre
 *
 * Relacionado con:
 * - RF-01: Sistema de autenticación
 * - RNF-02: Seguridad (Supabase hashea passwords automáticamente)
 *
 * Nota: Por defecto Supabase requiere confirmación de email
 */
export async function signUp(email: string, password: string) {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // URL de redirección después de confirmar email
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/`,
    },
  })

  return { data, error }
}

/**
 * Inicia sesión de un usuario existente con email y contraseña
 *
 * @param email - Email del usuario
 * @param password - Contraseña del usuario
 * @returns Objeto con data (sesión) y error si ocurre
 *
 * Relacionado con:
 * - RF-01: Sistema de autenticación
 * - RNF-02: Seguridad (verificación de credenciales)
 */
export async function signIn(email: string, password: string) {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

/**
 * Cierra la sesión del usuario actual
 *
 * @returns Objeto con error si ocurre
 *
 * Relacionado con:
 * - RF-01: Sistema de autenticación
 * - RNF-02: Seguridad (limpia cookies de sesión)
 */
export async function signOut() {
  const supabase = createBrowserClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Obtiene el usuario actualmente autenticado (server-side)
 *
 * @returns Objeto con user y error si ocurre
 *
 * Relacionado con:
 * - RF-02: Gestión de perfiles
 * - RNF-01: Rendimiento (SSR para carga rápida)
 *
 * Uso: En Server Components para verificar autenticación
 */
export async function getCurrentUser() {
  const supabase = await createServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return { user, error }
}
