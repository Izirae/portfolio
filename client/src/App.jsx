import { useState, useEffect, useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import { Divider } from './components/Shared'
import { fetchPortfolio } from './api'

/* ── Cursor personalizado (solo desktop/pointer) ── */
function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)

  // No renderizar en dispositivos touch
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  useEffect(() => {
    if (isTouch) return
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }
    const onEnter = () => {
      if (ringRef.current) ringRef.current.classList.add('expanded')
    }
    const onLeave = () => {
      if (ringRef.current) ringRef.current.classList.remove('expanded')
    }

    const lerp = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(lerp)
    }
    rafRef.current = requestAnimationFrame(lerp)

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ── Barra de progreso de scroll ── */
function PageProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={barRef} className="page-progress" style={{ width: '0%' }} />
}

/* ── Loader ── */
function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center gap-6">
        {/* Logo animado */}
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 rounded-2xl animate-spin-slow"
            style={{ background: 'conic-gradient(from 0deg, var(--brand), var(--brand2), var(--cyan), var(--brand))', padding: '2px', borderRadius: '16px' }}
          >
            <div className="w-full h-full rounded-2xl" style={{ background: 'var(--bg)' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-black" style={{ color: 'var(--brand)' }}>
            &lt;/&gt;
          </div>
        </div>
        {/* Dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? 'var(--brand)' : 'var(--brand2)',
                animation: 'pulse 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>cargando portfolio...</p>
      </div>
    </div>
  )
}

export default function App() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolio()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  const personal = data?.personal  ?? {}
  const skills   = data?.skills    ?? []
  const projects = data?.projects  ?? []

  return (
    <div style={{ background: 'var(--bg)' }}>
      <CustomCursor />
      <PageProgress />
      <Nav />
      <main>
        <Hero     data={personal} />
        <Divider />
        <Skills   skills={skills} />
        <Divider />
        <Projects projects={projects} />
        <Divider />
        <About    data={personal} />
        <Divider />
        <Contact  data={personal} />
      </main>
      <footer
        className="text-center py-10 text-xs border-t"
        style={{ color: 'var(--muted)', borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)', animation: 'pulse 2s ease infinite' }} />
          <span>Disponible para nuevas oportunidades</span>
        </div>
        <span>Construido con </span>
        <span className="gradient-text font-semibold">React + Vite · Node.js + Express · Tailwind CSS</span>
        <span> — 2025</span>
      </footer>
    </div>
  )
}
