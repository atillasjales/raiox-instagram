import Image from 'next/image'

interface Props {
  onCTA: () => void
}

export default function FinalCTA({ onCTA }: Props) {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-brand-pink opacity-[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-brand-pink text-xs font-medium tracking-widest uppercase mb-6">
          Pronto para saber a verdade?
        </p>

        <h2 className="font-display font-black text-5xl md:text-7xl text-brand-cream leading-[0.95] mb-8">
          Seu Instagram<br />
          merece um{' '}
          <em className="text-brand-pink">diagnóstico real.</em>
        </h2>

        <p className="text-brand-muted text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Não tem mais para onde fugir. Descubra onde você está perdendo
          seguidores, engajamento e — principalmente — vendas.
        </p>

        <button
          onClick={onCTA}
          className="group inline-flex items-center gap-3 bg-brand-pink hover:bg-brand-pink-light text-white font-bold text-xl px-12 py-6 rounded-xl transition-all duration-300 hover:scale-105 animate-pulse-glow"
        >
          <span>Quero meu diagnóstico grátis</span>
          <svg
            className="w-6 h-6 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <p className="text-xs text-brand-muted mt-5">
          Gratuito · 5 minutos · Resultado por e-mail
        </p>

        {/* Troppa branding */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <div className="flex justify-center mb-3">
            <Image
              src="/logos/logo-white.png"
              alt="Troppa Digital"
              width={120}
              height={40}
              quality={95}
            />
          </div>
          <p className="text-brand-muted text-xs">
            Uma ferramenta gratuita — 12 anos transformando negócios no digital.
          </p>
        </div>
      </div>
    </section>
  )
}
