import { useRef, useEffect, useState } from 'react'
import { GlowOrb, SectionBadge, SectionTitle, Counter, useReveal } from './Shared'

/* Timeline de experiencia */
const experience = [
  {
    period:   '2021 – Actualidad',
    role:     'Full Stack Developer',
    company:  'Municipalidad de Morón',
    desc:     'Desarrollo y mantenimiento del ecosistema de microservicios PHP/Laravel. Integración con RAFAM, Oracle, PNET e Interbanking. Portal de tasas, débito automático, portal de proveedores y sistema de permisos LDAP.',
    color:    '#4f8ef7',
    icon:     '🏛️',
    current:  true,
  },
  {
    period:   '2023 – Actualidad',
    role:     'Full Stack Developer',
    company:  'Proyectos Propios · Freelance',
    desc:     'Bot de trading USDT/ARS (TypeScript + Telegram/Twilio), e-commerce con Firebase + Mercado Pago, sistema de mantenimiento minero con Node.js + React.',
    color:    '#b07ef7',
    icon:     '🚀',
    current:  false,
  },
  {
    period:   '2020 – 2021',
    role:     'Desarrollo inicial',
    company:  'Aprendizaje & Proyectos académicos',
    desc:     'Primeros proyectos con PHP, MySQL, JavaScript y React. Construcción de bases de código, APIs REST y primeras SPA.',
    color:    '#3dd68c',
    icon:     '🌱',
    current:  false,
  },
]

function TimelineItem({ item, index }) {
  const [ref, visible] = useReveal(0.15)
  return (
    <div
      ref={ref}
      className="relative pl-10 pb-10 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Línea vertical */}
      {index < experience.length - 1 && (
        <div
          className="absolute left-3.5 top-8 bottom-0 w-px"
          style={{ background: `linear-gradient(to bottom, ${item.color}60, transparent)` }}
        />
      )}

      {/* Dot */}
      <div
        className="absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs"
        style={{
          background: `${item.color}18`,
          borderColor: item.color,
          boxShadow: item.current ? `0 0 16px ${item.color}50` : 'none',
        }}
      >
        {item.icon}
      </div>

      {/* Content */}
      <div
        className="rounded-xl border p-5 transition-all duration-300 hover:scale-[1.01]"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = `0 0 20px ${item.color}18` }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
          <div>
            <h4 className="text-sm font-bold" style={{ color: 'var(--text)' }}>{item.role}</h4>
            <p className="text-xs font-semibold" style={{ color: item.color }}>{item.company}</p>
          </div>
          <div className="flex items-center gap-2">
            {item.current && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{ color: 'var(--green)', borderColor: 'rgba(61,214,140,0.3)', background: 'rgba(61,214,140,0.07)' }}
              >
                ● Actual
              </span>
            )}
            <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{item.period}</span>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-justify" style={{ color: 'var(--muted)' }}>{item.desc}</p>
      </div>
    </div>
  )
}

function StatCard({ stat, index }) {
  const numStr = stat.num.replace(/\D/g, '')
  const suffix = stat.num.replace(/[\d]/g, '')
  const target = parseInt(numStr) || 0
  const [ref, visible] = useReveal(0.2)

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border p-6 overflow-hidden transition-all duration-500 cursor-default group"
      style={{
        background:  'var(--surface)',
        borderColor: 'var(--border)',
        opacity:     visible ? 1 : 0,
        transform:   visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        transitionDelay: `${index * 90}ms`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--brand)'
        e.currentTarget.style.boxShadow   = '0 0 30px rgba(79,142,247,0.12)'
        e.currentTarget.style.transform   = 'translateY(-3px) scale(1.02)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow   = 'none'
        e.currentTarget.style.transform   = 'translateY(0) scale(1)'
      }}
    >
      {/* Fondo gradiente en hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.04), transparent)' }}
      />

      {/* Glow corner */}
      <div
        className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: 'var(--brand)' }}
      />

      <div className="text-4xl font-black mb-2 leading-none" style={{ color: 'var(--brand)' }}>
        {visible ? <Counter target={target} suffix={suffix} /> : `0${suffix}`}
      </div>
      <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
        {stat.label}
      </div>
    </div>
  )
}

export default function About({ data }) {
  if (!data) return null
  const { bio, stats, github } = data

  return (
    <section id="sobre-mi" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      <GlowOrb x="50%" y="50%" color="var(--brand)" size={550} opacity={0.04} />
      <GlowOrb x="90%" y="10%" color="var(--purple)" size={300} opacity={0.05} />

      <div className="relative z-10 mb-10 sm:mb-14">
        <SectionBadge label="Quién soy" color="purple" />
        <SectionTitle>Sobre <span className="gradient-text">mí</span></SectionTitle>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-start">

        {/* ── Columna izquierda: bio + timeline ── */}
        <div>
          <div className="space-y-4 mb-10">
            {bio.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-justify" style={{ color: 'var(--muted)' }}>{p}</p>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href={github}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border transition-all hover:scale-105 mb-10"
            style={{ borderColor: 'var(--border2)', color: 'var(--text)', background: 'var(--surface)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(79,142,247,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            Ver GitHub → Izirae
          </a>

          {/* Timeline */}
          <h4
            className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2"
            style={{ color: 'var(--brand)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Trayectoria
          </h4>
          {experience.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* ── Columna derecha: stats + expertise ── */}
        <div className="space-y-4 sm:space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s, i) => <StatCard key={s.num + s.label} stat={s} index={i} />)}
          </div>

          {/* Expertise bar */}
          <div
            className="rounded-2xl border p-6"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2" style={{ color: 'var(--brand)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              Expertise
            </h4>
            {[
              { label: 'PHP / Laravel',   pct: 92, color: '#b07ef7' },
              { label: 'React / Vite',    pct: 85, color: '#38c5d9' },
              { label: 'Node.js / TS',    pct: 80, color: '#3dd68c' },
              { label: 'MySQL / Oracle',  pct: 78, color: '#f7b155' },
              { label: 'Docker',          pct: 70, color: '#4f8ef7' },
            ].map((bar, i) => (
              <ExpertiseBarInline key={bar.label} {...bar} delay={i * 80} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function ExpertiseBarInline({ label, pct, color, delay = 0 }) {
  const [ref, visible] = useReveal(0.2)
  return (
    <div ref={ref} className="mb-3">
      <div className="mb-1.5">
        <span className="text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: visible ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transitionDelay: `${delay}ms`,
            boxShadow: `0 0 6px ${color}60`,
          }}
        />
      </div>
    </div>
  )
}
