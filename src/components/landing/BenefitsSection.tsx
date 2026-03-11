export default function BenefitsSection() {
  const benefits = [
    {
      icon: '🔍',
      title: 'Diagnóstico preciso',
      description:
        'Avaliação científica de 60 pontos baseada na metodologia dos maiores especialistas em Instagram do Brasil.',
    },
    {
      icon: '📊',
      title: 'Nota por categoria',
      description:
        'Você vai saber exatamente onde está forte e onde está perdendo dinheiro — módulo a módulo.',
    },
    {
      icon: '🗺️',
      title: 'Plano de ação real',
      description:
        'Não é teoria. São ações concretas e priorizadas para você executar hoje e ver resultados.',
    },
    {
      icon: '⚡',
      title: 'Resultado imediato',
      description:
        'Em menos de 5 minutos você recebe seu diagnóstico completo no email — sem espera.',
    },
  ]

  return (
    <section className="py-24 px-6 glass-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-pink text-xs font-medium tracking-widest uppercase mb-4">
            Por que fazer?
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-cream leading-tight">
            Pare de adivinhar.
            <br />
            <em className="text-brand-pink">Comece a saber.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group p-8 rounded-2xl glass-card-mid border border-white/5 hover:border-brand-pink/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="font-display font-semibold text-xl text-brand-cream mb-3">
                {b.title}
              </h3>
              <p className="text-brand-muted leading-relaxed text-sm">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
