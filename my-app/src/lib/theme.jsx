import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_KEY = 'caravan-theme'
const ThemeContext = createContext(null)

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_KEY)
  return storedTheme === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme) {
  const root = document.documentElement
  const isDark = theme === 'dark'

  root.classList.toggle('dark', isDark)
  root.style.colorScheme = isDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme: () => {
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark'
        )
      },
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
