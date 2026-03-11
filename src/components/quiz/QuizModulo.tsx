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
    if (n <= 4) return { label: 'Ruim', color: '#FF2D8B' }
    if (n <= 6) return { label: 'Regular', color: '#8B2DFF' }
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
      <div className="text-center mb-12">
        <div className="text-6xl mb-4 animate-float">{modulo.emoji}</div>
        <h2 className="font-display font-black text-4xl text-brand-cream mb-3 tracking-tight">
          {modulo.titulo}
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-brand-pink to-brand-purple mx-auto mb-4 rounded-full" />
        <p className="text-brand-muted font-medium max-w-lg mx-auto leading-relaxed">
          {modulo.descricao}
        </p>
      </div>

      {/* Question card */}
      <div className="glass-card rounded-[2rem] overflow-hidden p-1 shadow-2xl">
        {/* Question counter */}
        <div className="px-8 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] text-brand-muted uppercase tracking-[0.2em] font-bold">
              Pergunta {perguntaAtual + 1} / {modulo.perguntas.length}
            </span>
            <div className="flex gap-1">
              {modulo.perguntas.map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-1 rounded-full transition-all duration-300"
                  style={{
                    background: i <= perguntaAtual ? '#FF2D8B' : '#2A2A2A',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Question text */}
        <div className="px-8 pt-8 pb-4">
          <p className="text-xl text-brand-cream leading-relaxed font-medium">
            {pergunta.texto}
          </p>
          {(pergunta.apoio || pergunta.exemplo) && (
            <div className="mt-5 space-y-3 bg-white/5 rounded-xl p-5 border border-white/5 animate-fade-in-up">
              {pergunta.apoio && (
                <div className="flex gap-3">
                  <span className="text-brand-pink mt-0.5">💡</span>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    <strong className="text-brand-cream/80 font-semibold block mb-1">Como avaliar:</strong>
                    {pergunta.apoio}
                  </p>
                </div>
              )}
              {pergunta.exemplo && (
                <div className="flex gap-3 pt-3 border-t border-white/5">
                  <span className="text-brand-purple mt-0.5">📝</span>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    <strong className="text-brand-cream/80 font-semibold block mb-1">Exemplo prático:</strong>
                    {pergunta.exemplo}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Slider section */}
        <div className="px-8 pb-8">
          {/* Score display */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">1 — Muito ruim</span>
            <div className="text-center">
              <div
                className="font-display font-black text-6xl leading-none transition-all duration-300 transform scale-110"
                style={{ color: nivelInfo.color, textShadow: `0 0 20px ${nivelInfo.color}40` }}
              >
                {nota}
              </div>
              <div
                className="text-xs font-bold mt-2 transition-all duration-300 uppercase tracking-widest"
                style={{ color: nivelInfo.color }}
              >
                {nivelInfo.label}
              </div>
            </div>
            <span className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">10 — Excelente</span>
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
                border: `3px solid #000000`,
                boxShadow: `0 0 16px ${nivelInfo.color}80`,
              }}
            />
          </div>

          {/* Quick pick buttons */}
          <div className="flex gap-2 mb-6">
            {[1, 3, 5, 7, 10].map((n) => (
              <button
                key={n}
                onClick={() => setNotas((prev) => ({ ...prev, [pergunta.id]: n }))}
                className="flex-1 py-3 rounded-xl text-xs font-black transition-all duration-300"
                style={{
                  background: nota === n ? nivelInfo.color : 'rgba(255,255,255,0.03)',
                  color: nota === n ? 'white' : 'rgba(255,255,255,0.3)',
                  border: nota === n ? 'none' : '1px solid rgba(255,255,255,0.05)',
                  transform: nota === n ? 'scale(1.05)' : 'scale(1)',
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
            className="flex-1 bg-brand-pink hover:bg-brand-pink-light text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
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
