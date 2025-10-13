"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      disabled={isLoading}
      className="gap-2"
      aria-label="Cerrar sesión"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      {isLoading ? "Cerrando..." : "Cerrar sesión"}
    </Button>
  )
}
