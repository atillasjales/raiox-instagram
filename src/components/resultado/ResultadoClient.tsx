'use client'

import { ResultadoDiagnostico } from '@/types'
import { NIVEL_CONFIG, MODULOS } from '@/lib/quiz-data'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  PolarRadiusAxis,
} from 'recharts'

interface Props {
  resultado: ResultadoDiagnostico
  nome: string
  avaliacaoId: string
}

export default function ResultadoClient({ resultado, nome, avaliacaoId }: Props) {
  const nivelConfig = NIVEL_CONFIG[resultado.nivel_geral]
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5581999999999'

  const radarData = MODULOS.map((m) => {
    const diag = resultado.diagnostico_modulos.find((d) => d.modulo === m.id)
    return {
      subject: m.titulo,
      nota: diag?.nota ?? 0,
      fullMark: 10,
    }
  })

  function getWhatsappLink(oferta: string) {
    const texto = encodeURIComponent(
      `Olá! Fiz o Raio-X do Instagram da Troppa Digital e tirei ${resultado.nota_geral} de nota. Quero saber mais sobre ${oferta}.`
    )
    return `https://wa.me/${whatsappNumber}?text=${texto}`
  }

  return (
    <div className="min-h-screen bg-brand-black pb-24">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-brand-gray to-brand-black px-6 py-16 text-center border-b border-white/5">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[500px] h-[500px] rounded-full blur-[100px] opacity-10"
            style={{ background: nivelConfig.cor }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs text-brand-muted uppercase tracking-widest mb-4">
            Raio-X do Instagram — Troppa Digital
          </p>

          <h1 className="font-display font-black text-4xl md:text-5xl text-brand-cream mb-6 leading-tight">
            Diagnóstico de <em style={{ color: nivelConfig.cor }}>{nome}</em>
          </h1>

          {/* Score */}
          <div
            className="inline-flex flex-col items-center justify-center w-40 h-40 rounded-full border-4 mb-6"
            style={{
              borderColor: nivelConfig.cor,
              boxShadow: `0 0 40px ${nivelConfig.cor}40`,
            }}
          >
            <div
              className="font-display font-black text-6xl leading-none"
              style={{ color: nivelConfig.cor }}
            >
              {resultado.nota_geral.toFixed(1)}
            </div>
            <div className="text-xs text-brand-muted mt-1 uppercase tracking-wider">
              de 10
            </div>
          </div>

          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm"
            style={{
              borderColor: `${nivelConfig.cor}40`,
              background: `${nivelConfig.cor}10`,
              color: nivelConfig.cor,
            }}
          >
            {nivelConfig.emoji} {nivelConfig.label}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Radar chart */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-brand-cream mb-6 text-center">
            Mapa do seu Instagram
          </h2>
          <div className="bg-brand-gray rounded-2xl border border-white/5 p-6">
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2A2A2A" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#888888', fontSize: 13, fontFamily: 'DM Sans' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 10]}
                  tick={{ fill: '#555', fontSize: 10 }}
                  tickCount={6}
                />
                <Radar
                  name="Nota"
                  dataKey="nota"
                  stroke="#FF5C1A"
                  fill="#FF5C1A"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Modules breakdown */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-brand-cream mb-6">
            Resultado por módulo
          </h2>
          <div className="space-y-4">
            {resultado.diagnostico_modulos.map((diag) => {
              const modulo = MODULOS.find((m) => m.id === diag.modulo)
              const nivel = NIVEL_CONFIG[diag.nivel]
              const barWidth = (diag.nota / 10) * 100

              return (
                <div
                  key={diag.modulo}
                  className="bg-brand-gray rounded-xl border border-white/5 p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{modulo?.emoji}</span>
                      <div>
                        <div className="font-semibold text-brand-cream">{diag.titulo}</div>
                        <div
                          className="text-xs font-medium mt-0.5"
                          style={{ color: nivel.cor }}
                        >
                          {nivel.emoji} {nivel.label}
                        </div>
                      </div>
                    </div>
                    <div
                      className="font-display font-black text-3xl"
                      style={{ color: nivel.cor }}
                    >
                      {diag.nota.toFixed(1)}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-brand-gray-mid rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${barWidth}%`, background: nivel.cor }}
                    />
                  </div>

                  <p className="text-brand-muted text-sm mb-4">{diag.descricao}</p>

                  {diag.nivel !== 'tesouro' && diag.recomendacoes.length > 0 && (
                    <div className="space-y-2">
                      {diag.recomendacoes.slice(0, 2).map((rec, i) => (
                        <div
                          key={i}
                          className="flex gap-3 text-sm text-brand-cream/80 bg-brand-gray-mid rounded-lg p-3"
                        >
                          <span className="text-brand-orange mt-0.5 flex-none">→</span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Action plan */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-brand-cream mb-6">
            🗺️ Seu plano de ação prioritário
          </h2>
          <div className="bg-brand-gray rounded-2xl border border-white/5 p-7">
            <div className="space-y-3">
              {resultado.plano_acao.prioridades.map((prioridade, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-brand-gray-mid rounded-xl border-l-2 border-brand-orange"
                >
                  <div className="flex-none w-7 h-7 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <p className="text-sm text-brand-cream/90 leading-relaxed">{prioridade}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offer CTA */}
        <section>
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <div className="bg-gradient-to-br from-brand-orange to-orange-700 p-8 md:p-12">
              <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-3">
                Próximo passo
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-4 leading-tight">
                Acelere seus resultados com a Troppa Digital
              </h2>
              <p className="text-white/90 text-base leading-relaxed mb-8 max-w-xl">
                {resultado.plano_acao.mensagem_cta}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {(resultado.plano_acao.oferta_recomendada === 'ativacao' ||
                  resultado.plano_acao.oferta_recomendada === 'ambos') && (
                  <a
                    href={getWhatsappLink('a Ativação de Social Media (Planejamento 30 dias)')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center bg-white rounded-2xl px-6 py-5 text-brand-orange transition-transform hover:scale-105 text-center"
                  >
                    <span className="text-2xl mb-1">📅</span>
                    <span className="font-bold text-sm">Ativação de Social Media</span>
                    <span className="text-xs text-gray-500 mt-1">
                      Planejamento estratégico 30 dias
                    </span>
                  </a>
                )}

                {(resultado.plano_acao.oferta_recomendada === 'assessoria' ||
                  resultado.plano_acao.oferta_recomendada === 'ambos') && (
                  <a
                    href={getWhatsappLink('a Assessoria de Marketing e Vendas')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center bg-white rounded-2xl px-6 py-5 text-brand-orange transition-transform hover:scale-105 text-center"
                  >
                    <span className="text-2xl mb-1">🚀</span>
                    <span className="font-bold text-sm">Assessoria de Marketing e Vendas</span>
                    <span className="text-xs text-gray-500 mt-1">
                      Acompanhamento mensal completo
                    </span>
                  </a>
                )}
              </div>

              <p className="text-white/60 text-xs mt-4 text-center">
                Troppa Digital — 12 anos de mercado · Pagamento parcelado disponível
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
