import { useEffect, useRef, useState } from 'react'

/* ── Glow orb de fondo ── */
export function GlowOrb({ x, y, color, size = 500, opacity = 0.12 }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: color,
        opacity,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

/* ── Grid de puntos de fondo ── */
export function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(79,142,247,0.1) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }}
    />
  )
}

/* ── Grid de líneas ── */
export function LineGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(79,142,247,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,142,247,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

/* ── Línea divisora con gradiente ── */
export function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div
        className="h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }}
      />
    </div>
  )
}

/* ── Badge de sección ── */
export function SectionBadge({ label, color = 'brand' }) {
  const colors = {
    brand:  { text: 'var(--brand)',  bg: 'rgba(79,142,247,0.08)',  border: 'rgba(79,142,247,0.25)'  },
    green:  { text: 'var(--green)',  bg: 'rgba(61,214,140,0.08)',  border: 'rgba(61,214,140,0.25)'  },
    purple: { text: 'var(--purple)', bg: 'rgba(176,126,247,0.08)', border: 'rgba(176,126,247,0.25)' },
    cyan:   { text: 'var(--cyan)',   bg: 'rgba(56,197,217,0.08)',  border: 'rgba(56,197,217,0.25)'  },
  }
  const c = colors[color] || colors.brand
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span
        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
        style={{ color: c.text, background: c.bg, borderColor: c.border }}
      >
        {label}
      </span>
    </div>
  )
}

/* ── Título de sección ── */
export function SectionTitle({ children }) {
  return (
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>
      {children}
    </h2>
  )
}

/* ── Ventana de terminal animada ── */
export function TerminalWindow({ lines = [], className = '' }) {
  const [shown, setShown] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (shown >= lines.length) return
    const t = setTimeout(() => setShown(s => s + 1), 350)
    return () => clearTimeout(t)
  }, [visible, shown, lines.length])

  return (
    <div ref={ref} className={`terminal-window ${className}`}>
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span style={{ color: '#484f58', fontSize: 11, marginLeft: 8, fontFamily: 'monospace' }}>
          izirae@portfolio:~
        </span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, shown).map((line, i) => (
          <div key={i} className="terminal-line">
            {line.prompt && <span className="terminal-prompt">❯</span>}
            {line.cmd && <span className="terminal-cmd">{line.cmd}</span>}
            {line.key && <span className="terminal-key">{line.key}</span>}
            {line.sep && <span className="terminal-out">{line.sep}</span>}
            {line.val && <span className="terminal-val">{line.val}</span>}
            {line.str && <span className="terminal-str">{line.str}</span>}
            {line.out && <span className="terminal-out">{line.out}</span>}
          </div>
        ))}
        {shown < lines.length && <span className="terminal-cursor" />}
      </div>
    </div>
  )
}

/* ── Hook: reveal al hacer scroll ── */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Animated counter ── */
export function Counter({ target, suffix = '', duration = 1400 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const steps = 40
    const inc = target / steps
    let cur = 0
    const t = setInterval(() => {
      cur += inc
      if (cur >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.round(cur))
    }, duration / steps)
    return () => clearInterval(t)
  }, [started, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Aurora background ── */
export function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl animate-aurora opacity-10"
        style={{
          background: 'radial-gradient(ellipse, var(--brand) 0%, var(--brand2) 50%, transparent 70%)',
          top: '10%', left: '20%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-8"
        style={{
          background: 'radial-gradient(ellipse, var(--cyan) 0%, transparent 70%)',
          animation: 'aurora 18s ease-in-out infinite reverse',
          top: '50%', right: '10%',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-6"
        style={{
          background: 'radial-gradient(ellipse, var(--purple) 0%, transparent 70%)',
          animation: 'aurora 22s ease-in-out infinite',
          bottom: '0%', left: '50%',
        }}
      />
    </div>
  )
}
