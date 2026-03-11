import { Modulo } from '@/types'

interface Props {
  total: number
  atual: number
  modulos: Modulo[]
}

export default function QuizProgress({ total, atual, modulos }: Props) {
  const percentual = ((atual) / total) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-brand-black/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Module indicators */}
        <div className="flex items-center gap-1.5 mb-3">
          {modulos.map((m, i) => (
            <div
              key={m.id}
              className="flex-1 h-1 rounded-full transition-all duration-500"
              style={{
                background:
                  i < atual
                    ? '#FF5C1A'
                    : i === atual
                    ? 'linear-gradient(90deg, #FF5C1A, #2A2A2A)'
                    : '#2A2A2A',
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-brand-orange text-lg">{modulos[atual].emoji}</span>
            <div>
              <div className="text-xs text-brand-muted uppercase tracking-wider">
                Módulo {atual + 1} de {total}
              </div>
              <div className="text-sm font-semibold text-brand-cream">
                {modulos[atual].titulo}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-brand-orange font-display font-bold text-lg">
              {Math.round(percentual)}%
            </div>
            <div className="text-xs text-brand-muted">concluído</div>
          </div>
        </div>
      </div>
    </div>
  )
}
