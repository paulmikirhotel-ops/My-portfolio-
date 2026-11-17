import React, { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeProvider'
import Navbar          from './components/Navbar/Navbar'
import Hero            from './components/Hero/Hero'
import About           from './components/About/About'
import Skills          from './components/Skills/Skills'
import Projects        from './components/Projects/Projects'
import Contact         from './components/Contact/Contact'
import Footer          from './components/Footer/Footer'
import Cursor          from './components/shared/Cursor'
import ThemeSwitcher   from './components/ThemeSwitcher/ThemeSwitcher'

// Three.js is large, so the 3D background loads after the page is usable.
const SceneBackground = lazy(() => import('./components/SceneBackground/SceneBackground'))

export default function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <SceneBackground />
      </Suspense>
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
