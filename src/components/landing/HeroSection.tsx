'use client'

interface Props {
  onCTA: () => void
}

export default function HeroSection({ onCTA }: Props) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#FF5C1A 1px, transparent 1px), linear-gradient(90deg, #FF5C1A 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange opacity-[0.06] blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-orange rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="text-sm font-medium tracking-wider text-brand-muted">TROPPA DIGITAL</span>
        </div>
        <span className="text-xs text-brand-muted tracking-widest uppercase">
          12 anos de mercado
        </span>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-xs font-medium tracking-widest uppercase mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          Diagnóstico 100% Gratuito
        </div>

        {/* Heading */}
        <h1
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
        >
          <span className="block text-brand-cream">Raio-X do</span>
          <span className="block text-brand-orange italic">Instagram</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          Descubra em menos de{' '}
          <strong className="text-brand-cream">5 minutos</strong> por que seu
          Instagram não está vendendo — e exatamente o que fazer para mudar isso.
        </p>

        {/* CTA */}
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
        >
          <button
            onClick={onCTA}
            className="group relative inline-flex items-center gap-3 bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-300 animate-pulse-glow hover:scale-105"
          >
            <span>Fazer meu diagnóstico grátis</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="text-xs text-brand-muted mt-4">
            Sem cartão de crédito · Resultado imediato · 60 perguntas estratégicas
          </p>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-white/5 opacity-0 animate-fade-up"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          {[
            { number: '12+', label: 'Anos de mercado' },
            { number: '6', label: 'Módulos de análise' },
            { number: '60', label: 'Pontos avaliados' },
            { number: '100%', label: 'Gratuito' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-3xl text-brand-orange">{stat.number}</div>
              <div className="text-xs text-brand-muted mt-1 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-40">
        <span className="text-xs text-brand-muted tracking-widest uppercase">Saiba mais</span>
        <svg className="w-5 h-5 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
