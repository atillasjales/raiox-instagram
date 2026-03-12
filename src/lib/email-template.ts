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
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0A; color: #FFFFFF; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0A0A0A; }
    .header { background: linear-gradient(135deg, #1A1A1A 0%, #000000 100%); padding: 48px 40px; text-align: center; border-bottom: 3px solid #FF2D8B; }
    .title { font-size: 32px; font-weight: 800; color: #FFFFFF; line-height: 1.2; margin-top: 0; }
    .score-box { background-color: #111111; margin: 32px 40px 0; border-radius: 20px; padding: 40px; text-align: center; border: 1px solid #222222; }
    .score-number { font-size: 80px; font-weight: 900; color: #FF2D8B; line-height: 1; margin: 0; }
    .score-label { font-size: 14px; color: #AAAAAA; margin-top: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; }
    .nivel-badge { display: inline-block; padding: 8px 20px; border-radius: 30px; font-size: 15px; font-weight: 700; margin-top: 20px; text-transform: uppercase; }
    .section { padding: 40px 40px 20px; }
    .section-title { font-size: 20px; font-weight: 800; color: #FFFFFF; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #222222; text-transform: uppercase; letter-spacing: 1px; }
    .modulo-row { display: block; padding: 16px 0; border-bottom: 1px solid #1A1A1A; overflow: hidden; }
    .modulo-name { font-size: 16px; color: #EEEEEE; font-weight: 600; float: left; }
    .modulo-nota { font-size: 22px; font-weight: 800; float: right; }
    .prioridade-item { background-color: #161616; border-radius: 12px; padding: 18px 20px; margin-bottom: 12px; font-size: 15px; color: #FFFFFF; line-height: 1.6; border-left: 4px solid #FF2D8B; }
    .cta-box { background: linear-gradient(135deg, #FF2D8B 0%, #8B2DFF 100%); margin: 20px 40px 40px; border-radius: 20px; padding: 40px; text-align: center; }
    .cta-title { font-size: 24px; font-weight: 800; color: #FFFFFF; margin-bottom: 16px; }
    .cta-text { font-size: 16px; color: #FFFFFF; line-height: 1.6; margin-bottom: 28px; }
    .cta-button { display: inline-block; background-color: #FFFFFF; color: #FF2D8B; padding: 16px 40px; border-radius: 12px; font-weight: 800; font-size: 16px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    .footer { padding: 40px; text-align: center; background-color: #050505; }
    .footer-text { font-size: 13px; color: #666666; line-height: 1.6; margin-top: 16px; }
    .footer-highlight { color: #888888; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${appUrl}/logos/logo-white.png" alt="Troppa Digital" width="160" height="auto" style="display:block;margin:0 auto 32px;border:0;" />
      <h1 class="title">Seu Raio-X do Instagram está pronto, ${nome}!</h1>
      ${instagramProfile ? `<div style="color: #FF2D8B; font-size: 16px; margin-top: 16px; font-weight: 700;">@${instagramProfile.replace('@', '')}</div>` : ''}
    </div>

    <div class="score-box">
      <div class="score-number">${resultado.nota_geral.toFixed(1)}</div>
      <div class="score-label">Nota Geral do Perfil</div>
      <div class="nivel-badge" style="background-color: ${nivelConfig.cor}; color: #FFFFFF;">
        ${nivelConfig.emoji} ${nivelConfig.label}
      </div>
    </div>

    <div class="section">
      <div class="section-title">📊 Análise por Módulo</div>
      ${top3Modulos.map((m) => {
    const cor = NIVEL_CONFIG[m.nivel].cor
    return `
        <div class="modulo-row">
          <span class="modulo-name">${m.titulo}</span>
          <span class="modulo-nota" style="color: ${cor}">${m.nota.toFixed(1)}</span>
        </div>`
  }).join('')}
      <div style="clear:both;"></div>
    </div>

    <div class="section">
      <div class="section-title">🚀 Próximos Passos Urgentíssimos</div>
      ${resultado.plano_acao.prioridades.slice(0, 3).map((p) => `
        <div class="prioridade-item">${p}</div>
      `).join('')}
    </div>

    <div class="cta-box">
      <div class="cta-title">Vamos acelerar seus resultados?</div>
      <div class="cta-text">${resultado.plano_acao.mensagem_cta}</div>
      <a href="${appUrl}/resultado/${avaliacaoId}" class="cta-button">VER DIAGNÓSTICO COMPLETO</a>
    </div>

    <div class="footer">
      <img src="${appUrl}/logos/logo-white.png" alt="Troppa Digital" width="100" height="auto" style="display:block;margin:0 auto;border:0;opacity:0.5;" />
      <div class="footer-text">
        <p class="footer-highlight">12 anos transformando negócios através de estratégia digital de alto nível.</p>
        <p style="margin-top: 12px;">© Troppa Digital. Este e-mail é um relatório exclusivo do seu diagnóstico.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}
