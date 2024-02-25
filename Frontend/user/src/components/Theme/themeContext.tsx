// ThemeProvider.tsx
import React, { createContext, useState, useContext } from 'react'
import { lightColors, darkColors } from '~/styles/colors'

interface ThemeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
  colors: typeof lightColors | typeof darkColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  const colors = darkMode ? darkColors : lightColors

  const value = { darkMode, toggleDarkMode, colors }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
