import { useRef, useEffect, useState } from 'react'
import { GlowOrb, SectionBadge, SectionTitle, useReveal } from './Shared'

/* Mini radar SVG para el grupo de habilidades */
function RadarChart({ pct, color }) {
  const points = 6
  const cx = 40, cy = 40, r = 28
  const coords = (i, rr) => {
    const a = (Math.PI * 2 / points) * i - Math.PI / 2
    return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) }
  }
  const poly = (rr) => Array.from({ length: points }, (_, i) => coords(i, rr))
    .map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      {/* Fondo */}
      {[1, 0.66, 0.33].map(f => (
        <polygon key={f} points={poly(r * f)}
          fill="none" stroke={color} strokeWidth="0.5" opacity="0.15" />
      ))}
      {/* Radios */}
      {Array.from({ length: points }, (_, i) => {
        const p = coords(i, r)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
          stroke={color} strokeWidth="0.5" opacity="0.15" />
      })}
      {/* Área de habilidad */}
      <polygon points={poly(r * (pct / 100))}
        fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5" />
      {/* Centro */}
      <circle cx={cx} cy={cy} r="3" fill={color} opacity="0.6" />
    </svg>
  )
}

function SkillCard({ group, index }) {
  const [hovered, setHovered] = useState(false)
  const [ref, visible] = useReveal(0.12)
  const pct = group.pct ?? 80

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border overflow-hidden transition-all duration-500 cursor-default"
      style={{
        background: hovered ? 'var(--surface2)' : 'var(--surface)',
        borderColor: hovered ? group.color : 'var(--border)',
        boxShadow: hovered ? `0 8px 40px ${group.color}22, 0 0 0 1px ${group.color}18` : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transitionDelay: `${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${group.color}, transparent)`,
          opacity: hovered ? 1 : 0.25,
        }}
      />

      {/* Glow bg */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl transition-opacity duration-500"
        style={{ background: group.color, opacity: hovered ? 0.1 : 0 }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
        <h3
          className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          style={{ color: group.color }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: group.color }} />
          {group.title}
        </h3>
        <div className="flex-shrink-0" style={{ width: 56, height: 56 }}>
          <RadarChart pct={pct} color={group.color} size={56} />
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-wrap gap-1.5 sm:gap-2">
        {group.items.map(item => (
          <span
            key={item.label}
            className="text-xs px-2.5 py-1 rounded-lg border transition-all duration-200"
            style={
              item.hi
                ? { color: group.color, borderColor: `${group.color}50`, background: `${group.color}10` }
                : { color: 'var(--muted)', borderColor: 'var(--border)', background: 'var(--bg)' }
            }
          >
            {item.hi && <span className="mr-1" style={{ color: group.color }}>✦</span>}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Barra de expertise animada */
function ExpertiseBar({ label, pct, color, delay = 0 }) {
  const [ref, visible] = useReveal(0.2)
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: visible ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transitionDelay: `${delay}ms`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills({ skills }) {
  if (!skills?.length) return null

  /* Augmentar skills con % de radar */
  const augmented = skills.map((g, i) => ({
    ...g,
    pct: [92, 80, 85, 78, 82, 70][i] ?? 75,
  }))

  return (
    <section id="habilidades" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      <GlowOrb x="80%" y="50%" color="var(--brand2)" size={450} opacity={0.07} />
      <GlowOrb x="5%"  y="30%" color="var(--cyan)"   size={300} opacity={0.05} />

      <div className="relative z-10 mb-14">
        <SectionBadge label="Stack tecnológico" color="brand" />
        <SectionTitle>Habilidades &amp; <span className="gradient-text">tecnologías</span></SectionTitle>
        <p className="mt-3 text-sm max-w-xl" style={{ color: 'var(--muted)' }}>
          Tecnologías que uso día a día en proyectos de producción — desde APIs gubernamentales hasta e-commerce y bots.
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
        {augmented.map((group, i) => (
          <SkillCard key={group.title} group={group} index={i} />
        ))}
      </div>

      {/* Expertise bars */}
      <div
        className="relative z-10 rounded-2xl border p-6 lg:p-8"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(79,142,247,0.1)', color: 'var(--brand)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--brand)' }}>
            Nivel de expertise
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {[
            { label: 'PHP / Laravel',   pct: 92, color: '#b07ef7', delay: 0   },
            { label: 'React / Vite',    pct: 85, color: '#38c5d9', delay: 100 },
            { label: 'Node.js / TS',    pct: 80, color: '#3dd68c', delay: 200 },
            { label: 'MySQL / Oracle',  pct: 78, color: '#f7b155', delay: 300 },
            { label: 'Docker',          pct: 70, color: '#4f8ef7', delay: 400 },
            { label: 'APIs / Pagos',    pct: 82, color: '#f76f6f', delay: 100 },
          ].map(bar => (
            <ExpertiseBar key={bar.label} {...bar} />
          ))}
        </div>
      </div>
    </section>
  )
}
