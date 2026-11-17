import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext'

const STORAGE_KEY = 'pm-theme'
const THEMES = ['gold', 'blue']

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return THEMES.includes(saved) ? saved : 'gold'
  } catch {
    return 'gold' // storage blocked (private mode etc.)
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readSavedTheme)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore: the theme just won't be remembered */
    }
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme(t => (t === 'gold' ? 'blue' : 'gold')),
    []
  )

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-root theme--${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
