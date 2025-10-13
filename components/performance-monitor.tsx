"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      // Log page load time
      window.addEventListener("load", () => {
        const perfData = window.performance.timing
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart

        console.log("[v0] Performance Metrics:", {
          pageLoadTime: `${pageLoadTime}ms`,
          domContentLoaded: `${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`,
          firstPaint: `${perfData.responseStart - perfData.navigationStart}ms`,
          timestamp: new Date().toISOString(),
        })

        // Alert if page load is too slow (>2s)
        if (pageLoadTime > 2000) {
          console.warn("[v0] Page load time exceeds 2s target:", pageLoadTime)
        }
      })

      // Monitor errors
      window.addEventListener("error", (event) => {
        console.error("[v0] Global error:", {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          timestamp: new Date().toISOString(),
        })
      })

      // Monitor unhandled promise rejections
      window.addEventListener("unhandledrejection", (event) => {
        console.error("[v0] Unhandled promise rejection:", {
          reason: event.reason,
          timestamp: new Date().toISOString(),
        })
      })
    }

    // Monitor network status for offline support
    const handleOnline = () => {
      console.log("[v0] Network status: Online")
    }

    const handleOffline = () => {
      console.warn("[v0] Network status: Offline")
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return null
}
