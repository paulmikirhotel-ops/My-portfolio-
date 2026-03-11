import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar          from './components/Navbar/Navbar'
import Hero            from './components/Hero/Hero'
import About           from './components/About/About'
import Skills          from './components/Skills/Skills'
import Projects        from './components/Projects/Projects'
import Contact         from './components/Contact/Contact'
import Footer          from './components/Footer/Footer'
import Cursor          from './components/shared/Cursor'
import ThemeSwitcher   from './components/ThemeSwitcher/ThemeSwitcher'
import SceneBackground from './components/SceneBackground/SceneBackground'

export default function App() {
  return (
    <ThemeProvider>
      <SceneBackground />
      <Cursor />
      <ThemeSwitcher />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}