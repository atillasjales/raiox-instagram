import { NotasModulo, DiagnosticoModulo, ResultadoDiagnostico, PlanoAcao } from '@/types'
import { MODULOS, getNivel, calcularNotaGeral } from './quiz-data'

const RECOMENDACOES: Record<string, Record<string, string[]>> = {
  perfil: {
    perdido: [
      'Reescreva sua bio com: o que você faz + para quem + resultado que gera — em 3 linhas diretas.',
      'Troque a foto de perfil por uma imagem profissional, nítida, com rosto visível ou logo clara.',
      'Coloque todos os botões de contato: email, telefone e WhatsApp.',
      'Crie pelo menos 4 destaques estratégicos: Quem sou, Serviços, Depoimentos e Como contratar.',
    ],
    luneta: [
      'Revise sua bio: adicione uma chamada para ação clara no final (ex: "Clique no link abaixo").',
      'Organize os destaques com capas padronizadas e com nomes estratégicos.',
      'Verifique se o link da bio está atualizado e funcional.',
    ],
    tesouro: [
      'Seu perfil está bem estruturado! Mantenha a consistência e revise a bio a cada 3 meses.',
      'Considere adicionar prova social na bio (ex: "+200 clientes atendidos").',
    ],
  },
  posicionamento: {
    perdido: [
      'Defina uma "bandeira" — uma crença forte que você defende no seu mercado.',
      'Escreva sua proposta de valor em uma frase: "Eu ajudo [quem] a [resultado] através de [como]".',
      'Pare de tentar falar com todo mundo. Nicho é liberdade, não limitação.',
      'Compartilhe sua história e bastidores — as pessoas se conectam com pessoas, não com produtos.',
    ],
    luneta: [
      'Seja mais assertivo ao emitir opiniões sobre seu segmento — isso gera autoridade.',
      'Crie pelo menos 1 conteúdo por semana defendendo sua bandeira.',
      'Mostre mais os bastidores do seu trabalho para humanizar a marca.',
    ],
    tesouro: [
      'Excelente posicionamento! Explore colaborações com outros criadores do nicho.',
      'Considere desenvolver um conteúdo "manifesto" fixado no topo do perfil.',
    ],
  },
  identidade_visual: {
    perdido: [
      'Escolha 3 cores principais e use APENAS elas em todos os posts. Consistência é tudo.',
      'Defina 2 fontes: uma para títulos e uma para textos — e não mude mais.',
      'Crie um moodboard no Canva com seu universo visual e use como referência.',
      'Padronize o layout dos seus posts com templates no Canva ou Adobe Express.',
    ],
    luneta: [
      'Revise seus templates atuais e verifique se as cores e fontes estão 100% consistentes.',
      'Crie elementos gráficos autorais (ícones, formas) que apareçam recorrentemente.',
      'Monte um moodboard e atualize com referências mensalmente.',
    ],
    tesouro: [
      'Identidade visual forte! Agora explore variações criativas mantendo a essência.',
      'Documente seu guia de marca para facilitar quando terceirizar criação de conteúdo.',
    ],
  },
  seguidores: {
    perdido: [
      'Pare de buscar seguidores em massa — foque em atrair o cliente ideal.',
      'Responda 100% dos comentários e directs nas primeiras 2 horas após publicar.',
      'Faça enquetes e caixinhas de pergunta nos stories para entender sua audiência.',
      'Revise quem você está atraindo e ajuste o conteúdo para falar com o cliente ideal.',
    ],
    luneta: [
      'Crie rituais de interação: responda stories de seguidores, faça perguntas nos posts.',
      'Envolva a audiência nas suas decisões (ex: "qual capa prefere: A ou B?").',
      'Identifique os seguidores mais engajados e cultive esse relacionamento.',
    ],
    tesouro: [
      'Audiência qualificada! Ative programas de indicação e depoimentos em vídeo.',
      'Crie conteúdo exclusivo para seguidores mais engajados para fortalecer a comunidade.',
    ],
  },
  conteudo: {
    perdido: [
      'Mapeie as 10 principais dores do seu cliente ideal e crie 1 post sobre cada.',
      'Use o Funil de Conteúdo: 40% atração, 40% relacionamento, 20% oferta.',
      'Pare de postar sem objetivo. Cada post precisa ter UMA chamada para ação.',
      'Aposte em carrosséis — eles têm 3x mais salvamentos e alcance orgânico.',
    ],
    luneta: [
      'Revise seus últimos 30 posts e classifique: atração, relacionamento ou oferta.',
      'Crie mais conteúdos que gerem salvamentos — listas, tutoriais, checklists.',
      'Integre mais o produto/serviço de forma natural no conteúdo de valor.',
    ],
    tesouro: [
      'Conteúdo de alto nível! Explore reaproveitamento: transforme posts em reels e vice-versa.',
      'Considere criar uma série de conteúdo temático para fortalecer autoridade.',
    ],
  },
  engajamento: {
    perdido: [
      'Sempre coloque uma chamada para ação em TODOS os posts (comentar, salvar, compartilhar).',
      'Poste nos melhores horários para seu público — analise os insights da conta.',
      'Use todos os recursos interativos: enquetes, quiz, caixinhas, contagem regressiva.',
      'Responda todos os comentários nas primeiras 2 horas — o algoritmo prioriza quem interage.',
    ],
    luneta: [
      'Teste horários diferentes de publicação e compare o engajamento.',
      'Use a caixinha de perguntas pelo menos 2x por semana para gerar interação.',
      'Explore o recurso "Collab" para ampliar alcance em parceria com outros perfis.',
    ],
    tesouro: [
      'Engajamento excelente! Agora foque em converter esse engajamento em vendas.',
      'Crie eventos ao vivo (lives) mensais para aprofundar o relacionamento com a audiência.',
    ],
  },
}

export function gerarDiagnostico(notas: NotasModulo): ResultadoDiagnostico {
  const nota_geral = calcularNotaGeral(notas)

  const diagnostico_modulos: DiagnosticoModulo[] = MODULOS.map((modulo) => {
    const nota = notas[modulo.id]
    const nivel = getNivel(nota)
    const recs = RECOMENDACOES[modulo.id]?.[nivel] ?? []

    const descricoes = {
      perdido: `Seu ${modulo.titulo.toLowerCase()} precisa de atenção urgente. Isso está limitando seus resultados.`,
      luneta: `Seu ${modulo.titulo.toLowerCase()} está no caminho certo, mas ainda tem pontos importantes para melhorar.`,
      tesouro: `Excelente trabalho no ${modulo.titulo.toLowerCase()}! Isso é um diferencial forte do seu perfil.`,
    }

    return {
      modulo: modulo.id,
      titulo: modulo.titulo,
      nota,
      nivel,
      descricao: descricoes[nivel],
      recomendacoes: recs,
    }
  })

  // Sort by worst score first
  diagnostico_modulos.sort((a, b) => a.nota - b.nota)

  const plano = gerarPlanoAcao(nota_geral, diagnostico_modulos)

  return {
    nota_geral,
    nivel_geral: getNivel(nota_geral),
    diagnostico_modulos,
    plano_acao: plano,
  }
}

function gerarPlanoAcao(nota_geral: number, modulos: DiagnosticoModulo[]): PlanoAcao {
  const perdidos = modulos.filter((m) => m.nivel === 'perdido')
  const prioridades = perdidos
    .slice(0, 3)
    .flatMap((m) => m.recomendacoes.slice(0, 2))

  let oferta_recomendada: 'ativacao' | 'assessoria' | 'ambos'
  let mensagem_cta: string

  if (nota_geral <= 4) {
    oferta_recomendada = 'ativacao'
    mensagem_cta =
      'Seu perfil precisa de uma transformação completa. A Ativação de Social Media da Troppa Digital vai entregar um planejamento estratégico completo para os próximos 30 dias — com identidade visual, calendário de conteúdo e direcionamento de posicionamento.'
  } else if (nota_geral <= 6) {
    oferta_recomendada = 'ambos'
    mensagem_cta =
      'Você está no caminho certo, mas para acelerar os resultados de verdade, você precisa de estratégia profissional. Conheça a Ativação de Social Media ou a Assessoria Completa de Marketing e Vendas da Troppa Digital.'
  } else {
    oferta_recomendada = 'assessoria'
    mensagem_cta =
      'Seu perfil tem uma base sólida. Agora é hora de escalar com estratégia de alto nível. A Assessoria de Marketing e Vendas da Troppa Digital vai levar seu negócio para o próximo patamar.'
  }

  if (prioridades.length === 0) {
    prioridades.push(
      'Continue aprimorando sua estratégia de conteúdo.',
      'Aprofunde o relacionamento com sua audiência através de lives e interações diretas.',
      'Considere investir em tráfego pago para ampliar seu alcance.'
    )
  }

  return { prioridades, oferta_recomendada, mensagem_cta }
}
