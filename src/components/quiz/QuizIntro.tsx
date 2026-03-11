interface Props {
  nome: string
  onStart: () => void
}

export default function QuizIntro({ nome, onStart }: Props) {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl mx-auto text-center animate-fade-up">
        <div className="text-5xl mb-6">🔬</div>

        <h1 className="font-display font-black text-4xl md:text-5xl text-brand-cream mb-4">
          Olá, <em className="text-brand-pink">{nome}!</em>
        </h1>

        <p className="text-brand-muted text-lg leading-relaxed mb-10">
          Vamos analisar seu Instagram em{' '}
          <strong className="text-brand-cream">6 módulos</strong> com{' '}
          <strong className="text-brand-cream">10 perguntas cada</strong>.
          Seja honesto — quanto mais preciso você for, mais útil será o seu diagnóstico.
        </p>

        {/* Instructions */}
        <div className="grid grid-cols-1 gap-3 mb-10 text-left">
          {[
            { icon: '📊', text: 'Dê notas de 1 a 10 para cada pergunta' },
            { icon: '🎯', text: '1 = muito ruim, 10 = perfeito' },
            { icon: '⏱️', text: 'Leva menos de 5 minutos no total' },
            { icon: '📧', text: 'O resultado chega no seu e-mail' },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 glass-card rounded-xl px-5 py-4 border border-white/5"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm text-brand-cream/80">{item.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full bg-brand-pink hover:bg-brand-pink-light text-white font-bold text-lg py-5 rounded-xl transition-all duration-300 hover:scale-105 animate-pulse-glow"
        >
          Iniciar diagnóstico →
        </button>
      </div>
    </div>
  )
}
