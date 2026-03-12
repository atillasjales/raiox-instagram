'use client'

import Image from 'next/image'

interface Props {
  onCTA: () => void
}

export default function HeroSection({ onCTA }: Props) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#FF2D8B 1px, transparent 1px), linear-gradient(90deg, #FF2D8B 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-pink/10 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple/10 blur-[100px] animate-float delay-500 pointer-events-none" />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-8">
        <div className="flex items-center gap-3">
          <Image
            src="/logos/logo-white.png"
            alt="Troppa Digital"
            width={120}
            height={40}
            quality={95}
            className="w-auto h-8 md:h-10"
          />
        </div>
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] text-brand-muted tracking-[0.2em] uppercase">
          12 anos de mercado
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-brand-pink text-[11px] font-bold tracking-[0.2em] uppercase mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
        >
          <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse shadow-[0_0_8px_#FF2D8B]" />
          Diagnóstico 100% Gratuito
        </div>

        {/* Heading */}
        <h1
          className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
        >
          <span className="block text-brand-cream">Raio-X do</span>
          <span className="block bg-gradient-to-r from-brand-pink via-[#FF5CAD] to-brand-purple bg-clip-text text-transparent italic pb-2">Instagram</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-lg md:text-2xl text-brand-muted/80 max-w-3xl mx-auto leading-relaxed mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          Descubra em menos de{' '}
          <strong className="text-brand-cream font-bold">5 minutos</strong> por que seu
          Instagram não está vendendo — e exatamente o que fazer para mudar isso.
        </p>

        {/* CTA */}
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
        >
          <button
            onClick={onCTA}
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-brand-pink to-brand-purple hover:scale-105 text-white font-bold text-xl px-12 py-6 rounded-2xl transition-all duration-300 animate-pulse-glow shadow-2xl shadow-brand-pink/20"
          >
            <span>Fazer meu diagnóstico grátis</span>
            <svg
              className="w-6 h-6 transition-transform group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="text-xs text-brand-muted/60 mt-6 tracking-wide">
            Sem cartão de crédito · Resultado imediato · 60 perguntas estratégicas
          </p>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-12 mt-20 pt-16 border-t border-white/[0.05] opacity-0 animate-fade-up"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          {[
            { number: '12+', label: 'Anos de mercado' },
            { number: '6', label: 'Módulos de análise' },
            { number: '60', label: 'Pontos avaliados' },
            { number: '100%', label: 'Gratuito' },
          ].map((stat) => (
            <div key={stat.label} className="text-center group cursor-default">
              <div className="font-display font-black text-4xl text-brand-pink group-hover:text-brand-purple transition-colors duration-500">{stat.number}</div>
              <div className="text-[10px] text-brand-muted mt-2 tracking-[0.2em] uppercase font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-float opacity-30">
        <span className="text-[10px] text-brand-muted tracking-[0.3em] uppercase font-bold">Role para descobrir</span>
        <svg className="w-5 h-5 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
