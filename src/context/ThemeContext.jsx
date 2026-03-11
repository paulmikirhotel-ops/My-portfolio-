import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('gold')
  const toggleTheme = () => setTheme(t => t === 'gold' ? 'blue' : 'gold')
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-root theme--${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
