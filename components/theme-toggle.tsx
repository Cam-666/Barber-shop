"use client"

import { useTheme } from "@/lib/theme-provider"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme()

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(isDark ? "light" : "dark")} className="relative">
      <Sun className="w-5 h-5 absolute rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="w-5 h-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
