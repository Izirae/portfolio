import { useState, useEffect, useRef } from 'react'
import { GlowOrb, DotGrid, TerminalWindow } from './Shared'

const langDots = [
  { color: '#b07ef7', label: 'PHP / Laravel' },
  { color: '#f7b155', label: 'JavaScript'    },
  { color: '#38c5d9', label: 'React'         },
  { color: '#3dd68c', label: 'Node.js'       },
  { color: '#4f8ef7', label: 'TypeScript'    },
  { color: '#f76f6f', label: 'SQL Server · MySQL'},
]

const terminalLines = [
  { prompt: true, cmd: 'whoami' },
  { out: 'Full Stack Developer · Buenos Aires, AR' },
  { prompt: true, cmd: 'cat stack.json' },
  { key: '"backend"',  sep: ':',  str: '"Laravel, Node.js, Express"' },
  { key: '"frontend"', sep: ':',  str: '"React, Vite, TypeScript"'   },
  { key: '"infra"',    sep: ':',  str: '"Docker, MySQL, Oracle"'      },
  { prompt: true, cmd: 'git log --oneline -3' },
  { val: 'a3f2d1c', out: ' feat: portal tasas municipales' },
  { val: 'b8e5c9a', out: ' feat: bot dolarines USDT/ARS'  },
  { val: 'c1d7f4e', out: ' feat: e-commerce fold-a-desk'  },
]

function TypedRole({ roles }) {
  const [idx,  setIdx]  = useState(0)
  const [text, setText] = useState('')
  const [del,  setDel]  = useState(false)

  useEffect(() => {
    const current = roles[idx]
    const speed = del ? 35 : 75
    const timer = setTimeout(() => {
      if (!del) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1))
        else setTimeout(() => setDel(true), 2000)
      } else {
        if (text.length > 0) setText(text.slice(0, -1))
        else { setDel(false); setIdx((idx + 1) % roles.length) }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [text, del, idx, roles])

  return (
    <span>
      <span className="gradient-text">{text}</span>
      <span
        className="inline-block w-[3px] ml-1 rounded-sm"
        style={{
          height: '0.85em',
          background: 'var(--brand)',
          verticalAlign: 'middle',
          animation: 'blink .9s step-end infinite',
        }}
      />
    </span>
  )
}

/* Badge flotante */
function FloatBadge({ label, style, delay = '0s' }) {
  return (
    <div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold animate-float glass"
      style={{
        borderColor: 'var(--border2)',
        color: 'var(--muted)',
        animationDelay: delay,
        ...style,
      }}
    >
      {label}
    </div>
  )
}

/* Partícula de fondo */
function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width  = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    let raf

    const isMobile = window.innerWidth < 768
    const particles = Array.from({ length: isMobile ? 25 : 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x = (p.x + p.vx + w) % w
        p.y = (p.y + p.vy + h) % h
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79,142,247,${p.a})`
        ctx.fill()
      }
      // Líneas entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(79,142,247,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  )
}

/* Metric badge en vivo */
function LiveMetric({ icon, label, value, color }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border"
      style={{ background: 'var(--surface)', borderColor: 'var(--border2)' }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
        style={{ background: `${color}18`, color }}
      >
        {icon}
      </div>
      <div>
        <div className="text-base font-black leading-none" style={{ color }}>{value}</div>
        <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>{label}</div>
      </div>
    </div>
  )
}

export default function Hero({ data }) {
  if (!data) return null
  const { github, bio } = data

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-24 md:pb-16 overflow-hidden">
      {/* Background */}
      <ParticleField />
      <DotGrid />
      <GlowOrb x="65%"  y="25%"  color="var(--brand2)" size={700} opacity={0.09} />
      <GlowOrb x="15%"  y="65%"  color="var(--brand)"  size={500} opacity={0.06} />
      <GlowOrb x="85%"  y="75%"  color="var(--cyan)"   size={350} opacity={0.05} />

      {/* Floating badges */}
      <FloatBadge label="⚡ Laravel + Lumen"  style={{ top: '20%', right: '6%'  }} delay="0s"   />
      <FloatBadge label="🚀 React + Vite"     style={{ top: '36%', right: '2%'  }} delay="1.2s" />
      <FloatBadge label="🐳 Docker"           style={{ top: '52%', right: '8%'  }} delay="0.6s" />
      <FloatBadge label="🏛️ Morón Municipal"  style={{ top: '68%', right: '5%'  }} delay="1.8s" />
      <FloatBadge label="☁️ Vercel · GitLab"  style={{ top: '22%', left: '4%'   }} delay="0.9s" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* ─── Columna izquierda ─── */}
        <div>
          {/* Status */}
          <div className="animate-slide-up stagger-1 mb-8">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border animate-pulse-glow"
              style={{
                color: 'var(--green)',
                background: 'rgba(61,214,140,0.07)',
                borderColor: 'rgba(61,214,140,0.25)',
              }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />
              Disponible para trabajar
            </span>
          </div>

          {/* Headline */}
          <div className="animate-slide-up stagger-2 mb-2">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter"
              style={{ color: 'var(--text)' }}
            >
              Full Stack
            </h1>
          </div>
          <div className="animate-slide-up stagger-3 mb-6 flex items-center" style={{ minHeight: '3.5rem' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter">
              <TypedRole roles={['Developer', 'Engineer', 'Builder', 'Architect']} />
            </h1>
          </div>

          {/* Stack pills */}
          <p className="animate-slide-up stagger-4 text-sm font-semibold mb-3 tracking-wide" style={{ color: 'var(--brand)' }}>
            PHP · Laravel · React · Node.js · TypeScript
          </p>

          <p
            className="animate-slide-up stagger-4 text-base leading-relaxed mb-8 max-w-lg text-justify"
            style={{ color: 'var(--muted)' }}
          >
            {bio[0]}
          </p>

          {/* CTA buttons */}
          <div className="animate-slide-up stagger-5 flex gap-2 sm:gap-3 flex-wrap mb-8">
            <a
              href="#proyectos"
              className="relative overflow-hidden inline-flex items-center gap-2 text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-white transition-all active:scale-95 glow-brand"
              style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand2))' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              Ver proyectos
              <span className="shimmer absolute inset-0" />
            </a>
            <a
              href={github}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl border transition-all active:scale-95"
              style={{ borderColor: 'var(--border2)', color: 'var(--text)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.background = 'rgba(79,142,247,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'transparent' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl border transition-all active:scale-95"
              style={{ borderColor: 'var(--border2)', color: 'var(--muted)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Contactar
            </a>
          </div>

          {/* Language dots */}
          <div className="animate-slide-up stagger-6 flex flex-wrap gap-2">
            {langDots.map(d => (
              <span
                key={d.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all hover:scale-105 cursor-default"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = d.color; e.currentTarget.style.color = d.color; e.currentTarget.style.background = `${d.color}12` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'var(--surface)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                {d.label}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Columna derecha ─── */}
        <div className="hidden lg:flex flex-col gap-4 animate-slide-up stagger-4">
          {/* Terminal */}
          <TerminalWindow lines={terminalLines} />

          {/* Métricas */}
          <div className="grid grid-cols-2 gap-3">
            <LiveMetric icon="🚀" label="Proyectos prod." value="12+" color="#4f8ef7" />
            <LiveMetric icon="🏛️" label="Municipio atendido" value="1" color="#b07ef7" />
            <LiveMetric icon="⚙️" label="APIs integradas" value="5+" color="#38c5d9" />
            <LiveMetric icon="⏱️" label="Años experiencia" value="3+" color="#3dd68c" />
          </div>
        </div>

      </div>

      {/* Scroll indicator — oculto en mobile */}
      <div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: '2s', color: 'var(--muted)' }}
      >
        <span className="text-[10px] uppercase tracking-widest">scroll</span>
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'var(--border2)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--brand)', animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
