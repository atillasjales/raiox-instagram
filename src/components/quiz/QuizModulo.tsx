'use client'

import { useState } from 'react'
import { Modulo } from '@/types'

interface Props {
  modulo: Modulo
  onComplete: (notas: Record<number, number>) => void
}

export default function QuizModulo({ modulo, onComplete }: Props) {
  const [notas, setNotas] = useState<Record<number, number>>(() => {
    const init: Record<number, number> = {}
    modulo.perguntas.forEach((p) => { init[p.id] = 5 })
    return init
  })

  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const pergunta = modulo.perguntas[perguntaAtual]
  const isLast = perguntaAtual === modulo.perguntas.length - 1
  const nota = notas[pergunta.id]

  function getNivelLabel(n: number) {
    if (n <= 2) return { label: 'Muito ruim', color: '#EF4444' }
    if (n <= 4) return { label: 'Ruim', color: '#F97316' }
    if (n <= 6) return { label: 'Regular', color: '#E8B84B' }
    if (n <= 8) return { label: 'Bom', color: '#84CC16' }
    return { label: 'Excelente', color: '#22C55E' }
  }

  const nivelInfo = getNivelLabel(nota)

  function avancar() {
    if (isLast) {
      onComplete(notas)
    } else {
      setPerguntaAtual((prev) => prev + 1)
    }
  }

  function voltar() {
    if (perguntaAtual > 0) {
      setPerguntaAtual((prev) => prev - 1)
    }
  }

  return (
    <div className="animate-fade-up">
      {/* Module header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">{modulo.emoji}</div>
        <h2 className="font-display font-bold text-3xl text-brand-cream mb-2">
          {modulo.titulo}
        </h2>
        <p className="text-brand-muted text-sm">{modulo.descricao}</p>
      </div>

      {/* Question card */}
      <div className="bg-brand-gray rounded-2xl border border-white/8 overflow-hidden">
        {/* Question counter */}
        <div className="px-8 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-brand-muted uppercase tracking-widest">
              Pergunta {perguntaAtual + 1} de {modulo.perguntas.length}
            </span>
            <div className="flex gap-1">
              {modulo.perguntas.map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-1 rounded-full transition-all duration-300"
                  style={{
                    background: i <= perguntaAtual ? '#FF5C1A' : '#2A2A2A',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Question text */}
        <div className="px-8 py-8">
          <p className="text-xl text-brand-cream leading-relaxed font-medium">
            {pergunta.texto}
          </p>
        </div>

        {/* Slider section */}
        <div className="px-8 pb-8">
          {/* Score display */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-brand-muted">1 — Muito ruim</span>
            <div className="text-center">
              <div
                className="font-display font-black text-5xl leading-none transition-all duration-200"
                style={{ color: nivelInfo.color }}
              >
                {nota}
              </div>
              <div
                className="text-sm font-medium mt-1 transition-all duration-200"
                style={{ color: nivelInfo.color }}
              >
                {nivelInfo.label}
              </div>
            </div>
            <span className="text-sm text-brand-muted">10 — Excelente</span>
          </div>

          {/* Range slider */}
          <div
            className="relative mb-6"
            style={{
              '--slider-value': `${((nota - 1) / 9) * 100}%`,
              background: `linear-gradient(90deg, ${nivelInfo.color} var(--slider-value), #2A2A2A var(--slider-value))`,
              borderRadius: '3px',
              height: '6px',
            } as React.CSSProperties}
          >
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={nota}
              onChange={(e) => {
                const val = Number(e.target.value)
                setNotas((prev) => ({ ...prev, [pergunta.id]: val }))
              }}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              style={{ zIndex: 1 }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-3 border-brand-black transition-all duration-150"
              style={{
                left: `calc(${((nota - 1) / 9) * 100}% - 12px)`,
                background: nivelInfo.color,
                border: `3px solid #0A0A0A`,
                boxShadow: `0 0 16px ${nivelInfo.color}80`,
              }}
            />
          </div>

          {/* Quick pick buttons */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <button
                key={n}
                onClick={() => setNotas((prev) => ({ ...prev, [pergunta.id]: n }))}
                className="flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-150"
                style={{
                  background: nota === n ? nivelInfo.color : '#2A2A2A',
                  color: nota === n ? 'white' : '#888',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="px-8 pb-8 flex gap-3">
          {perguntaAtual > 0 && (
            <button
              onClick={voltar}
              className="flex-none px-6 py-4 rounded-xl border border-white/10 text-brand-muted hover:text-brand-cream hover:border-white/20 transition-all text-sm font-medium"
            >
              ← Voltar
            </button>
          )}
          <button
            onClick={avancar}
            className="flex-1 bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {isLast ? (
              <>Finalizar módulo ✓</>
            ) : (
              <>
                Próxima pergunta
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
