import { ResultadoDiagnostico } from '@/types'
import { NIVEL_CONFIG } from './quiz-data'

export function gerarEmailResultado(
  nome: string,
  resultado: ResultadoDiagnostico,
  avaliacaoId: string,
  appUrl: string,
  instagramProfile?: string
): string {
  const nivelConfig = NIVEL_CONFIG[resultado.nivel_geral]
  const top3Modulos = resultado.diagnostico_modulos.slice(0, 3)

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seu Raio-X do Instagram — Troppa Digital</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0A0A0A; color: #F5EFE0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #1A1A1A 0%, #000000 100%); padding: 48px 40px; text-align: center; border-bottom: 2px solid #FF2D8B; }
    .logo { font-size: 13px; letter-spacing: 4px; color: #FF2D8B; text-transform: uppercase; margin-bottom: 24px; }
    .title { font-size: 28px; font-weight: 700; color: #F5EFE0; line-height: 1.3; }
    .score-box { background: #1A1A1A; margin: 0 40px; border-radius: 16px; padding: 32px; text-align: center; border: 1px solid #2A2A2A; margin-top: 32px; }
    .score-number { font-size: 72px; font-weight: 900; color: #FF2D8B; line-height: 1; }
    .score-label { font-size: 14px; color: #888; margin-top: 8px; letter-spacing: 2px; text-transform: uppercase; }
    .nivel-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-top: 16px; }
    .section { padding: 32px 40px; }
    .section-title { font-size: 18px; font-weight: 700; color: #F5EFE0; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #2A2A2A; }
    .modulo-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #1A1A1A; }
    .modulo-name { font-size: 14px; color: #F5EFE0; }
    .modulo-nota { font-size: 20px; font-weight: 700; }
    .prioridade-item { background: #1A1A1A; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; font-size: 14px; color: #F5EFE0; line-height: 1.6; border-left: 3px solid #FF2D8B; }
    .cta-box { background: linear-gradient(135deg, #FF2D8B, #8B2DFF); margin: 0 40px 40px; border-radius: 16px; padding: 32px; text-align: center; }
    .cta-title { font-size: 22px; font-weight: 700; color: white; margin-bottom: 12px; }
    .cta-text { font-size: 15px; color: rgba(255,255,255,0.9); line-height: 1.7; margin-bottom: 24px; }
    .cta-button { display: inline-block; background: white; color: #FF2D8B; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; }
    .footer { padding: 24px 40px; text-align: center; font-size: 12px; color: #555; border-top: 1px solid #1A1A1A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${appUrl}/logos/logo-white.png" alt="Troppa Digital" width="140" style="display:block;margin:0 auto 24px;" />
      <div class="title">Seu Raio-X do Instagram<br>está pronto, ${nome}!</div>
      ${instagramProfile ? `<div style="color: #FF2D8B; font-size: 14px; margin-top: 12px; font-weight: 600;">Perfil analisado: ${instagramProfile}</div>` : ''}
    </div>

    <div class="score-box">
      <div class="score-number">${resultado.nota_geral.toFixed(1)}</div>
      <div class="score-label">Nota Geral do Perfil</div>
      <div class="nivel-badge" style="background: ${nivelConfig.cor}20; color: ${nivelConfig.cor}; border: 1px solid ${nivelConfig.cor}40;">
        ${nivelConfig.emoji} ${nivelConfig.label}
      </div>
    </div>

    <div class="section">
      <div class="section-title">📊 Notas por Módulo</div>
      ${top3Modulos.map((m) => {
    const cor = NIVEL_CONFIG[m.nivel].cor
    return `
        <div class="modulo-row">
          <span class="modulo-name">${m.titulo}</span>
          <span class="modulo-nota" style="color: ${cor}">${m.nota.toFixed(1)}</span>
        </div>`
  }).join('')}
    </div>

    <div class="section">
      <div class="section-title">🎯 Prioridades de Ação</div>
      ${resultado.plano_acao.prioridades.slice(0, 3).map((p) => `
        <div class="prioridade-item">${p}</div>
      `).join('')}
    </div>

    <div class="cta-box">
      <div class="cta-title">Quer resultados mais rápidos?</div>
      <div class="cta-text">${resultado.plano_acao.mensagem_cta}</div>
      <a href="${appUrl}/resultado/${avaliacaoId}" class="cta-button">Ver Diagnóstico Completo →</a>
    </div>

    <div class="footer">
      <img src="${appUrl}/logos/logo-white.png" alt="Troppa Digital" width="100" style="display:block;margin:0 auto 8px;opacity:0.7;" />
      <p>12 anos transformando negócios no digital</p>
      <p style="margin-top: 8px;">Você recebeu este email porque fez o Raio-X do Instagram.</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
