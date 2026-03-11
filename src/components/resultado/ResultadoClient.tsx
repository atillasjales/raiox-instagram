'use client'

import { useState } from 'react'
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
  const [activeModuleInfo, setActiveModuleInfo] = useState<{ titulo: string, nota: number, desc: string } | null>(null)

  const nivelConfig = NIVEL_CONFIG[resultado.nivel_geral]
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5581999999999'

  const radarData = MODULOS.map((m) => {
    const diag = resultado.diagnostico_modulos.find((d) => d.modulo === m.id)
    return {
      subject: m.titulo,
      nota: diag?.nota ?? 0,
      fullMark: 10,
      desc: m.descricao
    }
  })

  const maxNota = Math.max(...radarData.map(d => d.nota))
  const bestModule = radarData.find(d => d.nota === maxNota)

  function getWhatsappLink(oferta: string) {
    const numeroLimpo = whatsappNumber.replace(/\D/g, '')
    const texto = encodeURIComponent(
      `Olá! Fiz o Raio-X do Instagram da Troppa Digital e tirei ${resultado.nota_geral} de nota. Quero saber mais sobre ${oferta}.`
    )
    return `https://wa.me/${numeroLimpo}?text=${texto}`
  }

  const gerarPDF = async () => {
    const element = document.getElementById('pdf-content')
    if (!element) return

    element.style.display = 'block'
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const opt = {
        margin: 15,
        filename: `Raio-X-Troppa-${nome}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      }
      await html2pdf().set(opt).from(element).save()
    } catch (e) {
      console.error(e)
      alert("Erro ao gerar PDF")
    } finally {
      element.style.display = 'none'
    }
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm mb-6"
            style={{
              borderColor: `${nivelConfig.cor}40`,
              background: `${nivelConfig.cor}10`,
              color: nivelConfig.cor,
            }}
          >
            {nivelConfig.emoji} {nivelConfig.label}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left shadow-lg">
            <h3 className="font-display font-bold text-lg text-brand-cream mb-2">Entendendo seu resultado:</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              {resultado.nivel_geral === 'perdido' && "O Modo Perdido indica que o seu perfil está como um barco à deriva, nadando contra a maré. Faltam bases sólidas (bio, destaque, constância) e o pouco tráfego que chega acaba indo embora sem comprar. Você precisa de arrumar a casa urgente antes de investir mais força."}
              {resultado.nivel_geral === 'luneta' && "O Modo Luneta significa que você consegue enxergar o objetivo (vendas e relevância) lá na frente, mas ainda está desfocado. Você já tem coisas funcionando, mas faltam os ajustes finos estratégicos e consistência para transformar seguidores soltos em comunidade pagante."}
              {resultado.nivel_geral === 'tesouro' && "O Modo Tesouro prova que você está sentado em uma mina de ouro! Suas engrenagens já rodam muito bem e geram valor extremo. O que falta é escalar os processos, criar ofertas de maior poder e colocar mais tráfego qualificado em cima do que já funciona."}
            </p>
          </div>

          <button
            onClick={gerarPDF}
            className="mt-8 bg-brand-pink text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-brand-pink/20 transition-all hover:-translate-y-1 inline-flex items-center gap-2"
          >
            📄 Baixar Resumo em PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Radar chart */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-brand-cream mb-6 text-center">
            Mapa do seu Instagram
          </h2>
          <div className="glass-card rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 to-brand-purple/5 pointer-events-none" />
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData} onClick={(e) => {
                if (e && e.activePayload && e.activePayload.length > 0) {
                  const data = e.activePayload[0].payload;
                  setActiveModuleInfo({ titulo: data.subject, nota: data.nota, desc: data.desc })
                }
              }}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#888888', fontSize: 11, fontFamily: 'DM Sans', fontWeight: 600, cursor: 'pointer' }}
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
                  stroke="#FF2D8B"
                  fill="url(#colorPink)"
                  fillOpacity={0.4}
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: '#fff', stroke: '#FF2D8B', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="colorPink" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF2D8B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B2DFF" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </RadarChart>
            </ResponsiveContainer>

            {/* Explicação do clique no Radar */}
            {activeModuleInfo ? (
              <div className="mt-6 bg-brand-pink/10 border border-brand-pink/20 rounded-xl p-4 animate-fade-in-up">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-brand-cream">{activeModuleInfo.titulo} (Nota {activeModuleInfo.nota.toFixed(1)})</h4>
                    <p className="text-xs text-brand-muted mt-1">{activeModuleInfo.desc}</p>
                  </div>
                  <button onClick={() => setActiveModuleInfo(null)} className="text-brand-muted hover:text-white text-lg leading-none">&times;</button>
                </div>
              </div>
            ) : (
              <p className="text-center text-xs text-brand-muted mt-4">👉 Toque nos pontos do gráfico para detalhar</p>
            )}

            {bestModule && (
              <div className="mt-4 flex items-center gap-2 justify-center bg-green-500/10 text-green-400 text-xs px-4 py-2 rounded-full border border-green-500/20 w-max mx-auto">
                ⭐ Seu maior destaque na rede é: <strong>{bestModule.subject}</strong>
              </div>
            )}
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
                  className="glass-card glass-card-hover rounded-2xl p-7"
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
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4 p-[1px]">
                    <div
                      className="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,45,139,0.3)]"
                      style={{
                        width: `${barWidth}%`,
                        background: `linear-gradient(90deg, ${nivel.cor}, #FF5CAD)`
                      }}
                    />
                  </div>

                  <p className="text-brand-muted text-sm mb-4">{diag.descricao}</p>

                  {diag.nivel !== 'tesouro' && diag.recomendacoes.length > 0 && (
                    <div className="space-y-2">
                      {diag.recomendacoes.slice(0, 2).map((rec, i) => (
                        <div
                          key={i}
                          className="flex gap-3 text-sm text-brand-cream/80 glass-card-mid rounded-lg p-3"
                        >
                          <span className="text-brand-pink mt-0.5 flex-none">→</span>
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
          <div className="glass-card rounded-2xl border border-white/5 p-7">
            <div className="space-y-3">
              {resultado.plano_acao.prioridades.map((prioridade, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 glass-card-mid rounded-xl border-l-2 border-brand-pink"
                >
                  <div className="flex-none w-7 h-7 rounded-full bg-brand-pink/20 text-brand-pink text-xs font-bold flex items-center justify-center">
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
            <div className="bg-gradient-to-br from-brand-pink to-brand-purple p-8 md:p-12">
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
                      className="flex-1 flex flex-col items-center bg-white rounded-2xl px-6 py-5 text-brand-pink transition-transform hover:scale-105 text-center"
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
                      className="flex-1 flex flex-col items-center bg-white rounded-2xl px-6 py-5 text-brand-pink transition-transform hover:scale-105 text-center"
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

      {/* PDF HIDDEN CONTENT FOR PRINTING ONLY */}
      <div id="pdf-content" className="hidden bg-white text-black p-10 font-sans" style={{ width: '800px', margin: '0 auto' }}>
        <div className="border-b-2 border-brand-pink pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Diagnóstico Raio-X Troppa</h1>
            <p className="text-gray-500 text-sm tracking-widest uppercase">Relatório Oficial de Perfil</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-800">{nome}</h2>
            <div className={`mt-2 text-sm font-bold px-3 py-1 rounded inline-block ${resultado.nivel_geral === 'perdido' ? 'bg-red-100 text-red-700' : resultado.nivel_geral === 'luneta' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
              Nota Geral: {resultado.nota_geral.toFixed(1)} / 10
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-brand-pink pl-3">Desempenho por Módulo</h3>
          <div className="grid grid-cols-2 gap-4">
            {resultado.diagnostico_modulos.map((diag) => (
              <div key={diag.modulo} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-700">{diag.titulo}</span>
                  <span className="font-black text-lg text-brand-pink">{diag.nota.toFixed(1)}</span>
                </div>
                <p className="text-xs text-gray-500 leading-tight">{diag.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 p-6 bg-brand-pink/5 border border-brand-pink/20 rounded-xl break-inside-avoid">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">🎯 Plano de Ação Prioritário</h3>
          <ul className="space-y-3">
            {resultado.plano_acao.prioridades.map((prioridade, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="font-bold text-brand-pink">{i + 1}.</span>
                <span>{prioridade}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center text-xs text-gray-400 mt-12 pt-6 border-t border-gray-200">
          Gerado automaticamente por <strong>Troppa Digital</strong>. www.troppadigital.com.br
        </div>
      </div>
    </div>
  )
}
