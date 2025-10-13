import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Navbar } from "@/components/navbar"
import { ErrorBoundary } from "@/components/error-boundary"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { Suspense } from "react"
import "./globals.css"

// Configuración de fuentes con optimizaciones
// display: swap previene FOIT (Flash of Invisible Text)
// preload: true carga fuentes críticas primero
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

// Metadata completa para SEO y redes sociales
// Relacionado con RNF-02 (SEO) y RNF-05 (PWA)
export const metadata: Metadata = {
  title: {
    default: "RedColabora - Marketplace Social de Colaboración",
    template: "%s | RedColabora",
  },
  description:
    "Conecta con PYMEs y colaboradores, comparte proyectos y construye comunidad en RedColabora. Marketplace social para negocios en Chile.",
  keywords: ["marketplace", "colaboración", "pymes", "negocios", "chile", "emprendimiento", "networking"],
  authors: [{ name: "RedColabora" }],
  creator: "RedColabora",
  publisher: "RedColabora",
  generator: "v0.app",
  manifest: "/manifest.json", // PWA manifest
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true, // Importante para accesibilidad
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RedColabora",
  },
  formatDetection: {
    telephone: false, // Evita auto-detección de teléfonos
  },
  // Open Graph para compartir en redes sociales
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://redcolabora.com",
    siteName: "RedColabora",
    title: "RedColabora - Marketplace Social de Colaboración",
    description: "Conecta con PYMEs y colaboradores, comparte proyectos y construye comunidad",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RedColabora",
      },
    ],
  },
  // Twitter Cards para compartir en Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "RedColabora - Marketplace Social de Colaboración",
    description: "Conecta con PYMEs y colaboradores, comparte proyectos y construye comunidad",
    images: ["/og-image.jpg"],
  },
  // Configuración de robots para SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* PWA icons y meta tags */}
        <link rel="icon" href="/icon-192.jpg" />
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ErrorBoundary captura errores globales */}
        <ErrorBoundary>
          {/* PerformanceMonitor alerta si carga >2s (RNF-01) */}
          <PerformanceMonitor />

          {/* Navbar global en todas las páginas */}
          <Navbar />

          {/* Suspense para loading states automáticos */}
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Cargando...</div>
              </div>
            }
          >
            {/* Main content con altura mínima para footer sticky */}
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          </Suspense>

          {/* Vercel Analytics y Speed Insights (RNF-01, RNF-07) */}
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </body>
    </html>
  )
}
