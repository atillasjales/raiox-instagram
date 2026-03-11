import { MODULOS } from '@/lib/quiz-data'

export default function ModulesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-pink text-xs font-medium tracking-widest uppercase mb-4">
            O que vamos analisar
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-cream leading-tight">
            6 módulos.
            <br />
            <em className="text-brand-pink">60 pontos de diagnóstico.</em>
          </h2>
          <p className="text-brand-muted mt-4 max-w-xl mx-auto">
            Cada módulo tem 10 perguntas estratégicas. Ao final, você recebe uma nota e
            recomendações específicas para cada área.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULOS.map((modulo, index) => (
            <div
              key={modulo.id}
              className="relative p-6 rounded-2xl glass-card border border-white/5 hover:border-brand-pink/20 transition-all duration-300 group overflow-hidden"
            >
              {/* Number */}
              <div className="absolute top-4 right-4 font-display font-black text-5xl text-white/[0.04] select-none group-hover:text-white/[0.07] transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="text-3xl mb-4">{modulo.emoji}</div>
              <h3 className="font-display font-bold text-xl text-brand-cream mb-2">
                {modulo.titulo}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">{modulo.descricao}</p>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink/50" />
                <span className="text-xs text-brand-muted">10 perguntas</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
