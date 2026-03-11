'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ResultadoDiagnostico, NivelModulo } from '@/types'
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
  segmento: string
  instagram?: string
}

export default function ResultadoClient({ resultado, nome, avaliacaoId, segmento, instagram }: Props) {
  const [activeModuleInfo, setActiveModuleInfo] = useState<{
    titulo: string
    nota: number
    desc: string
    nivel: NivelModulo
    recomendacoes: string[]
  } | null>(null)

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
        margin: [15, 10, 15, 10] as [number, number, number, number],
        filename: `Raio-X-Troppa-${nome}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as any }
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
          <div className="flex justify-center mb-6">
            <Image
              src="/logos/logo-black.png"
              alt="Troppa Digital"
              width={140}
              height={46}
              quality={95}
            />
          </div>

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
            <h3 className="font-display font-bold text-lg text-brand-cream mb-4">Entendendo seu resultado:</h3>
            <div className="space-y-4 text-sm text-brand-muted leading-relaxed">
              {resultado.nivel_geral === 'perdido' && (
                <div className="space-y-3">
                  <p>
                    <strong className="text-white">🔴 Modo Perdido</strong> — Seu perfil está como um barco à deriva, nadando contra a maré. Isso significa que faltam <strong>bases sólidas</strong> (bio clara, destaques estratégicos, publicações consistentes) e o pouco tráfego que chega acaba indo embora sem converter.
                  </p>
                  <p>
                    O resultado que está vendo reflete um perfil que ainda não tem credibilidade suficiente para vender. A boa notícia? Isso é <strong>totalmente reversível</strong>. Os próximos 30-60 dias são críticos.
                  </p>
                  <p>
                    <strong>O que fazer:</strong> Você precisa arrumar a casa urgente antes de investir em tráfego. Foco em estrutura (perfil + destaques), diferenciação clara (por que alguém deveria seguir você?) e consistência na publicação.
                  </p>
                  {segmento && <p className="italic">Para um negócio de {segmento}, isso significa que faltam sinais de autoridade e confiabilidade que clientes desse mercado buscam.</p>}
                </div>
              )}
              {resultado.nivel_geral === 'luneta' && (
                <div className="space-y-3">
                  <p>
                    <strong className="text-white">🟡 Modo Luneta</strong> — Você consegue enxergar o objetivo (vendas e relevância) lá na frente, mas ainda está desfocado. Isso significa que você <strong>já tem coisas funcionando</strong>, mas faltam os ajustes finos estratégicos para disparar.
                  </p>
                  <p>
                    Seus seguidores existem, mas faltam mecanismos para transformar essa audiência em comunidade pagante. Você tem o potencial, mas precisa afinar a estratégia.
                  </p>
                  <p>
                    <strong>O que fazer:</strong> Não comece do zero. Melhore o que já está meio certo. Ajuste a estratégia de conteúdo, potencialize a interação com audiência, crie ofertas mais claras e teste resultados com tráfego pago.
                  </p>
                  {segmento && <p className="italic">Para um negócio de {segmento}, você está na faixa que permite crescimento acelerado com estratégia certa.</p>}
                </div>
              )}
              {resultado.nivel_geral === 'tesouro' && (
                <div className="space-y-3">
                  <p>
                    <strong className="text-white">🟢 Modo Tesouro</strong> — Parabéns! Você está sentado em uma mina de ouro 🎯. Suas engrenagens já rodam muito bem, a audiência interage naturalmente e há sinais de vendas acontecendo.
                  </p>
                  <p>
                    Isso <strong>não é acaso</strong> — você já fez muito certo. Bio, conteúdo, engajamento e posicionamento estão alinhados. O que falta é escala e maximização.
                  </p>
                  <p>
                    <strong>O que fazer:</strong> Hora de <strong>escalar</strong>. Crie ofertas de maior valor, use tráfego pago para amplificar o que já funciona, crie produtos/programas para monetizar melhor a audiência, lance colaborações estratégicas.
                  </p>
                  {segmento && <p className="italic">Para um negócio de {segmento}, você está pronto para lançar serviços premium e construir comunidades VIP.</p>}
                </div>
              )}
            </div>
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
                  const data = e.activePayload[0].payload
                  const diagData = resultado.diagnostico_modulos.find(d => d.titulo === data.subject)
                  if (diagData) {
                    setActiveModuleInfo({
                      titulo: data.subject,
                      nota: data.nota,
                      desc: data.desc,
                      nivel: diagData.nivel,
                      recomendacoes: diagData.recomendacoes.slice(0, 2)
                    })
                  }
                }
              }}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#CCCCCC', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 600, cursor: 'pointer' }}
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
              <div className="mt-6 bg-brand-pink/10 border border-brand-pink/20 rounded-xl p-6 animate-fade-in-up space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-brand-cream text-lg">{activeModuleInfo.titulo}</h4>
                      <div
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          color: NIVEL_CONFIG[activeModuleInfo.nivel].cor,
                          background: `${NIVEL_CONFIG[activeModuleInfo.nivel].cor}20`,
                          border: `1px solid ${NIVEL_CONFIG[activeModuleInfo.nivel].cor}40`,
                        }}
                      >
                        {NIVEL_CONFIG[activeModuleInfo.nivel].emoji} {NIVEL_CONFIG[activeModuleInfo.nivel].label}
                      </div>
                    </div>
                    <div className="text-sm text-brand-cream font-semibold mb-3">
                      Nota: {activeModuleInfo.nota.toFixed(1)}/10
                    </div>
                    <p className="text-xs text-brand-muted mb-4">{activeModuleInfo.desc}</p>
                  </div>
                  <button onClick={() => setActiveModuleInfo(null)} className="text-brand-muted hover:text-white text-lg leading-none flex-shrink-0">&times;</button>
                </div>
                {activeModuleInfo.recomendacoes.length > 0 && (
                  <div className="border-t border-brand-pink/20 pt-4 space-y-2">
                    <p className="text-xs font-semibold text-brand-cream">Primeiras ações:</p>
                    {activeModuleInfo.recomendacoes.map((rec, i) => (
                      <div key={i} className="flex gap-2 text-xs text-brand-muted">
                        <span className="text-brand-pink flex-shrink-0">✓</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                )}
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

                  {diag.recomendacoes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-brand-cream/70">Recomendações:</p>
                      {diag.recomendacoes.map((rec, i) => (
                        <div
                          key={i}
                          className="flex gap-3 text-xs text-brand-cream/80 glass-card-mid rounded-lg p-3"
                        >
                          <span className="text-brand-pink mt-0.5 flex-none">{i + 1}.</span>
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
          {resultado.plano_acao.plano_execucao ? (
            <div className="space-y-8">
              {([
                { key: 'stories', label: '📱 Stories', items: resultado.plano_acao.plano_execucao.stories },
                { key: 'reels', label: '▶️ Reels', items: resultado.plano_acao.plano_execucao.reels },
                { key: 'posts', label: '📸 Posts', items: resultado.plano_acao.plano_execucao.posts },
                { key: 'carrosseis', label: '🃏 Carrosséis', items: resultado.plano_acao.plano_execucao.carrosseis },
              ] as const).map(({ key, label, items }) => (
                <div key={key} className="glass-card rounded-2xl border border-white/5 p-7">
                  <h3 className="font-semibold text-brand-cream mb-5 text-base">{label}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {items.map((item, i) => (
                      <div key={i} className="glass-card-mid rounded-xl p-5 space-y-3 border border-white/5">
                        <div className="flex items-start gap-2">
                          <span className="text-brand-pink text-sm mt-0.5 flex-none">💡</span>
                          <p className="text-sm text-brand-cream font-semibold leading-snug">{item.ideia}</p>
                        </div>
                        <div className="border-t border-white/10 pt-3 space-y-2">
                          <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">Copy sugerida:</p>
                          <p className="text-xs text-brand-cream/80 italic leading-relaxed">"{item.copy}"</p>
                        </div>
                        <div className="border-t border-white/10 pt-3">
                          <p className="text-xs text-brand-pink font-semibold">👉 CTA: <span className="text-brand-cream/80 font-normal">{item.cta}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </section>

        {/* Content Strategy */}
        {resultado.plano_acao.estrategia_conteudo && (
          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl text-brand-cream mb-6">
              🎬 Estratégia de Conteúdo{segmento && ` para ${segmento}`}
            </h2>
            <div className="space-y-6">
              {/* Stories */}
              <div className="glass-card rounded-2xl border border-white/5 p-7">
                <h3 className="font-semibold text-brand-cream mb-4 flex items-center gap-2">
                  📱 Stories
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase mb-2">Sequências Narrativas:</p>
                    <ul className="space-y-1">
                      {resultado.plano_acao.estrategia_conteudo.stories.sequencias.map((seq, i) => (
                        <li key={i} className="text-sm text-brand-cream/80 flex gap-2">
                          <span className="text-brand-pink">•</span> {seq}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase mb-2">Caixa de Perguntas:</p>
                    <ul className="space-y-1">
                      {resultado.plano_acao.estrategia_conteudo.stories.caixinha_perguntas.map((cx, i) => (
                        <li key={i} className="text-sm text-brand-cream/80 flex gap-2">
                          <span className="text-brand-pink">•</span> {cx}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase mb-2">Transformações a Mostrar:</p>
                    <ul className="space-y-1">
                      {resultado.plano_acao.estrategia_conteudo.stories.transformacoes.map((trans, i) => (
                        <li key={i} className="text-sm text-brand-cream/80 flex gap-2">
                          <span className="text-brand-pink">•</span> {trans}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase mb-2">Mecânicas de Interação:</p>
                    <ul className="space-y-1">
                      {resultado.plano_acao.estrategia_conteudo.stories.interacoes.map((int, i) => (
                        <li key={i} className="text-sm text-brand-cream/80 flex gap-2">
                          <span className="text-brand-pink">•</span> {int}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reels */}
              <div className="glass-card rounded-2xl border border-white/5 p-7">
                <h3 className="font-semibold text-brand-cream mb-4">▶️ 5 Ideias de Reels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {resultado.plano_acao.estrategia_conteudo.reels.map((reel, i) => (
                    <div key={i} className="glass-card-mid p-4 rounded-lg">
                      <p className="text-xs font-semibold text-brand-pink uppercase mb-1">{reel.formato}</p>
                      <p className="text-sm font-semibold text-brand-cream mb-2">{reel.tema}</p>
                      <p className="text-xs text-brand-muted">{reel.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feed */}
              <div className="glass-card rounded-2xl border border-white/5 p-7">
                <h3 className="font-semibold text-brand-cream mb-4">📸 5 Ideias de Posts para Feed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {resultado.plano_acao.estrategia_conteudo.feed.map((post, i) => (
                    <div key={i} className="glass-card-mid p-4 rounded-lg">
                      <p className="text-xs font-semibold text-brand-pink uppercase mb-1">{post.formato}</p>
                      <p className="text-sm font-semibold text-brand-cream mb-2">{post.tema}</p>
                      <p className="text-xs text-brand-muted">{post.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="glass-card rounded-2xl border border-white/5 p-7">
                <h3 className="font-semibold text-brand-cream mb-4">⭐ Sugestões de Destaques</h3>
                <div className="flex flex-wrap gap-2">
                  {resultado.plano_acao.estrategia_conteudo.destaques.map((destaque, i) => (
                    <span key={i} className="glass-card-mid px-4 py-2 rounded-full text-sm text-brand-cream">
                      {destaque}
                    </span>
                  ))}
                </div>
              </div>

              {/* Editorial Line */}
              <div className="glass-card rounded-2xl border border-white/5 p-7">
                <h3 className="font-semibold text-brand-cream mb-4">📅 Linha Editorial</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase mb-1">Frequência:</p>
                    <p className="text-sm text-brand-cream">{resultado.plano_acao.estrategia_conteudo.linha_editorial.frequencia}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase mb-1">Distribuição Semanal:</p>
                    <p className="text-sm text-brand-cream">{resultado.plano_acao.estrategia_conteudo.linha_editorial.distribuicao}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase mb-1">Orientação de Planejamento:</p>
                    <p className="text-sm text-brand-cream">{resultado.plano_acao.estrategia_conteudo.linha_editorial.calendario}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
      <div id="pdf-content" className="hidden bg-white text-black font-sans" style={{ width: '100%', maxWidth: '750px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div className="border-b-2 border-brand-pink pb-8 mb-8">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Raio-X do Instagram — Diagnóstico Completo</h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">Relatório Oficial — Troppa Digital</p>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500">Cliente:</p>
              <p className="text-lg font-bold text-gray-800">{nome}</p>
              {segmento && (
                <p className="text-xs text-gray-500 mt-1">Segmento: <strong>{segmento}</strong></p>
              )}
            </div>
            <div className="text-right">
              <div className={`text-lg font-black px-4 py-3 rounded ${
                resultado.nivel_geral === 'perdido' ? 'bg-red-100 text-red-700' :
                resultado.nivel_geral === 'luneta' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {resultado.nota_geral.toFixed(1)}/10
              </div>
              <p className="text-xs text-gray-600 mt-2">{NIVEL_CONFIG[resultado.nivel_geral].label}</p>
            </div>
          </div>
        </div>

        {/* Resultado Geral */}
        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg break-inside-avoid">
          <h2 className="font-bold text-gray-800 mb-3">Entendendo seu Resultado</h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            {resultado.nivel_geral === 'perdido' && (
              <>
                <p><strong>🔴 Modo Perdido</strong> — Seu perfil está como um barco à deriva, nadando contra a maré. Isso significa que faltam <strong>bases sólidas</strong> (bio clara, destaques estratégicos, publicações consistentes) e o pouco tráfego que chega acaba indo embora sem converter.</p>
                <p>O resultado que está vendo reflete um perfil que ainda não tem credibilidade suficiente para vender. A boa notícia? Isso é <strong>totalmente reversível</strong>. Os próximos 30-60 dias são críticos.</p>
                <p><strong>O que fazer:</strong> Você precisa arrumar a casa urgente antes de investir em tráfego. Foco em estrutura (perfil + destaques), diferenciação clara (por que alguém deveria seguir você?) e consistência na publicação.</p>
                {segmento && <p><em>Para um negócio de {segmento}, isso significa que faltam sinais de autoridade e confiabilidade que clientes desse mercado buscam.</em></p>}
              </>
            )}
            {resultado.nivel_geral === 'luneta' && (
              <>
                <p><strong>🟡 Modo Luneta</strong> — Você consegue enxergar o objetivo (vendas e relevância) lá na frente, mas ainda está desfocado. Isso significa que você <strong>já tem coisas funcionando</strong>, mas faltam os ajustes finos estratégicos para disparar.</p>
                <p>Seus seguidores existem, mas faltam mecanismos para transformar essa audiência em comunidade pagante. Você tem o potencial, mas precisa afinar a estratégia.</p>
                <p><strong>O que fazer:</strong> Não comece do zero. Melhore o que já está meio certo. Ajuste a estratégia de conteúdo, potencialize a interação com audiência, crie ofertas mais claras e teste resultados com tráfego pago.</p>
                {segmento && <p><em>Para um negócio de {segmento}, você está na faixa que permite crescimento acelerado com estratégia certa.</em></p>}
              </>
            )}
            {resultado.nivel_geral === 'tesouro' && (
              <>
                <p><strong>🟢 Modo Tesouro</strong> — Parabéns! Você está sentado em uma mina de ouro 🎯. Suas engrenagens já rodam muito bem, a audiência interage naturalmente e há sinais de vendas acontecendo.</p>
                <p>Isso <strong>não é acaso</strong> — você já fez muito certo. Bio, conteúdo, engajamento e posicionamento estão alinhados. O que falta é escala e maximização.</p>
                <p><strong>O que fazer:</strong> Hora de <strong>escalar</strong>. Crie ofertas de maior valor, use tráfego pago para amplificar o que já funciona, crie produtos/programas para monetizar melhor a audiência, lance colaborações estratégicas.</p>
                {segmento && <p><em>Para um negócio de {segmento}, você está pronto para lançar serviços premium e construir comunidades VIP.</em></p>}
              </>
            )}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="mb-8 break-inside-avoid">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-pink-500 pl-3">Mapa do Instagram</h2>
          <div style={{ width: '100%', height: 280 }}>
            <RadarChart data={radarData} width={680} height={280} cx="50%" cy="50%" outerRadius={100}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#9ca3af', fontSize: 9 }} tickCount={6} />
              <Radar name="Nota" dataKey="nota" stroke="#FF2D8B" fill="#FF2D8B" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </div>
        </div>

        {/* Desempenho por Módulo */}
        <div className="mb-8 page-break-before">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-brand-pink pl-3">Desempenho por Módulo</h2>
          <div className="space-y-6">
            {resultado.diagnostico_modulos.map((diag) => (
              <div key={diag.modulo} className="bg-gray-50 border border-gray-200 p-5 rounded-lg break-inside-avoid">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">{diag.titulo}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        diag.nivel === 'perdido' ? 'bg-red-100 text-red-700' :
                        diag.nivel === 'luneta' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {NIVEL_CONFIG[diag.nivel].emoji} {NIVEL_CONFIG[diag.nivel].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{diag.descricao}</p>
                  </div>
                  <span className="font-black text-xl text-brand-pink">{diag.nota.toFixed(1)}</span>
                </div>

                {diag.recomendacoes.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-xs font-bold text-gray-600 uppercase mb-3">Recomendações:</p>
                    <ol className="space-y-2 list-decimal list-inside">
                      {diag.recomendacoes.map((rec, i) => (
                        <li key={i} className="text-xs text-gray-700">{rec}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Plano de Ação */}
        <div className="mb-8 page-break-before">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-pink-500 pl-3">🎯 Plano de Ação Prioritário</h2>
          {resultado.plano_acao.plano_execucao ? (
            <div className="space-y-5">
              {([
                { key: 'stories', label: '📱 Stories', items: resultado.plano_acao.plano_execucao.stories },
                { key: 'reels', label: '▶️ Reels', items: resultado.plano_acao.plano_execucao.reels },
                { key: 'posts', label: '📸 Posts', items: resultado.plano_acao.plano_execucao.posts },
                { key: 'carrosseis', label: '🃏 Carrosséis', items: resultado.plano_acao.plano_execucao.carrosseis },
              ] as const).map(({ key, label, items }) => (
                <div key={key} className="mb-4">
                  <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">{label}</h3>
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-lg break-inside-avoid">
                        <p className="text-sm font-bold text-gray-800 mb-2">💡 {item.ideia}</p>
                        <p className="text-xs text-gray-600 italic mb-2">📝 Copy: "{item.copy}"</p>
                        <p className="text-xs text-pink-700 font-semibold">👉 CTA: {item.cta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg break-inside-avoid">
              <ol className="space-y-3 list-decimal list-inside">
                {resultado.plano_acao.prioridades.map((prioridade, i) => (
                  <li key={i} className="text-sm text-gray-700">{prioridade}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Estratégia de Conteúdo */}
        {resultado.plano_acao.estrategia_conteudo && (
          <div className="mb-8 page-break-before">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-brand-pink pl-3">
              🎬 Estratégia de Conteúdo{segmento && ` — ${segmento}`}
            </h2>

            {/* Stories */}
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg break-inside-avoid">
              <h3 className="font-bold text-gray-800 mb-3">📱 Stories</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-bold text-gray-700 mb-2">Sequências Narrativas:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {resultado.plano_acao.estrategia_conteudo.stories.sequencias.map((seq, i) => (
                      <li key={i}>{seq}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-2">Caixa de Perguntas:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {resultado.plano_acao.estrategia_conteudo.stories.caixinha_perguntas.map((cx, i) => (
                      <li key={i}>{cx}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-2">Transformações a Mostrar:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {resultado.plano_acao.estrategia_conteudo.stories.transformacoes.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-2">Mecânicas de Interação:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {resultado.plano_acao.estrategia_conteudo.stories.interacoes.map((int, i) => (
                      <li key={i}>{int}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Reels */}
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg break-inside-avoid">
              <h3 className="font-bold text-gray-800 mb-3">▶️ 5 Ideias de Reels</h3>
              <div className="space-y-3">
                {resultado.plano_acao.estrategia_conteudo.reels.map((reel, i) => (
                  <div key={i} className="border-l-2 border-brand-pink pl-3">
                    <p className="text-xs font-bold text-gray-600">{reel.formato}</p>
                    <p className="text-sm font-bold text-gray-800">{reel.tema}</p>
                    <p className="text-xs text-gray-700">{reel.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feed */}
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg break-inside-avoid">
              <h3 className="font-bold text-gray-800 mb-3">📸 5 Ideias de Posts para Feed</h3>
              <div className="space-y-3">
                {resultado.plano_acao.estrategia_conteudo.feed.map((post, i) => (
                  <div key={i} className="border-l-2 border-brand-pink pl-3">
                    <p className="text-xs font-bold text-gray-600">{post.formato}</p>
                    <p className="text-sm font-bold text-gray-800">{post.tema}</p>
                    <p className="text-xs text-gray-700">{post.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg break-inside-avoid">
              <h3 className="font-bold text-gray-800 mb-3">⭐ Sugestões de Destaques</h3>
              <p className="text-sm text-gray-700">{resultado.plano_acao.estrategia_conteudo.destaques.join(', ')}</p>
            </div>

            {/* Linha Editorial */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg break-inside-avoid">
              <h3 className="font-bold text-gray-800 mb-3">📅 Linha Editorial</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-bold text-gray-700">Frequência:</p>
                  <p className="text-gray-700">{resultado.plano_acao.estrategia_conteudo.linha_editorial.frequencia}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Distribuição Semanal:</p>
                  <p className="text-gray-700">{resultado.plano_acao.estrategia_conteudo.linha_editorial.distribuicao}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Orientação de Planejamento:</p>
                  <p className="text-gray-700">{resultado.plano_acao.estrategia_conteudo.linha_editorial.calendario}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-12 pt-6 border-t border-gray-300 page-break-before">
          <p>Gerado automaticamente por <strong>Troppa Digital</strong></p>
          <p className="mt-1">www.troppadigital.com.br | {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  )
}
