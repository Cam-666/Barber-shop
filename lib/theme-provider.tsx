"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const saved = localStorage.getItem("theme") as Theme | null
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDarkMode = saved === "dark" || (saved !== "light" && systemDark)

    if (isDarkMode) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }

    setThemeState(saved || "system")
    setIsDark(isDarkMode)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (!saved || saved === "system") {
        setIsDark(e.matches)
        if (e.matches) {
          html.classList.add("dark")
        } else {
          html.classList.remove("dark")
        }
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    setMounted(true)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)

    let dark: boolean
    if (newTheme === "dark") {
      dark = true
    } else if (newTheme === "light") {
      dark = false
    } else {
      dark = window.matchMedia("(prefers-color-scheme: dark)").matches
    }

    setIsDark(dark)
    updateTheme(dark)
  }

  return <ThemeContext.Provider value={{ theme, setTheme, isDark }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
