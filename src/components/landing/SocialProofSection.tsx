export default function SocialProofSection() {
  const depoimentos = [
    {
      texto:
        'O Raio-X me abriu os olhos para coisas que eu nunca tinha percebido no meu perfil. Em 30 dias aplicando as recomendações, meu alcance triplicou.',
      nome: 'Carla M.',
      cargo: 'Personal Trainer',
      nota: 9.2,
    },
    {
      texto:
        'Pensava que o problema era o algoritmo. Descobri que era minha identidade visual e posicionamento. A Troppa me ajudou a reconstruir tudo isso.',
      nome: 'Rafael S.',
      cargo: 'Arquiteto',
      nota: 6.4,
    },
    {
      texto:
        'Meu perfil tirou 4.1 no diagnóstico e eu entrei em pânico. Mas o plano de ação foi tão claro que em 2 semanas já vi diferença real no engajamento.',
      nome: 'Ana B.',
      cargo: 'Loja de moda feminina',
      nota: 4.1,
    },
  ]

  return (
    <section className="py-24 px-6 glass-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-pink text-xs font-medium tracking-widest uppercase mb-4">
            Quem já fez
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-cream leading-tight">
            A verdade incomoda.
            <br />
            <em className="text-brand-pink">O resultado liberta.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {depoimentos.map((d) => (
            <div
              key={d.nome}
              className="p-7 rounded-2xl glass-card-mid border border-white/5 flex flex-col"
            >
              {/* Quote */}
              <div className="text-brand-pink text-4xl font-display font-black leading-none mb-4 opacity-40">
                "
              </div>
              <p className="text-brand-cream/80 text-sm leading-relaxed flex-1 mb-6">
                {d.texto}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <div className="font-semibold text-brand-cream text-sm">{d.nome}</div>
                  <div className="text-brand-muted text-xs mt-0.5">{d.cargo}</div>
                </div>
                <div className="text-right">
                  <div className="text-brand-pink font-display font-black text-xl">
                    {d.nota}
                  </div>
                  <div className="text-brand-muted text-xs">nota inicial</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
