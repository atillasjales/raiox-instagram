import { NotasModulo, DiagnosticoModulo, ResultadoDiagnostico, PlanoAcao } from '@/types'
import { MODULOS, getNivel, calcularNotaGeral } from './quiz-data'

const RECOMENDACOES: Record<string, Record<string, string[]>> = {
  perfil: {
    perdido: [
      'Reescreva a bio claramente: o que você faz + para quem + resultado. Máximo 3 linhas, sem floreios.',
      'Coloque uma foto profissional, nítida e bem iluminada (ou logo clara se for empresa).',
      'Ative todos os botões de contato: e-mail, telefone e WhatsApp em sua bio.',
      'Crie 4 destaques nomeados: "Quem Sou", "Serviços", "Depoimentos" e "Como Contratar" com capas padronizadas.',
      'Fixe um post de apresentação explicando sua história, especialidade e proposta de valor.',
    ],
    luneta: [
      'Revise a bio e adicione uma chamada para ação clara: "Clique no link para mais informações".',
      'Organize seus destaques com nomes estratégicos e capas padronizadas.',
      'Atualize e teste o link da bio — certifique-se de que leva para o lugar correto.',
      'Atualize a foto de perfil a cada 6 meses para manter a aparência fresca.',
      'Ative mais botões de contato: e-mail, telefone, WhatsApp Business.',
    ],
    tesouro: [
      'Parabéns! Seu perfil está bem estruturado. Continue mantendo a consistência.',
      'Adicione prova social na bio para aumentar credibilidade: "+200 clientes satisfeitos", "10 anos no mercado".',
      'Crie um call-to-action visual: teste adicionar um banner ou destaque especial na foto de perfil.',
      'Use ferramentas como Linktree para destacar múltiplos links e CTAs na bio.',
      'Revise anualmente se os destaques continuam refletindo os valores atuais da marca.',
    ],
  },
  posicionamento: {
    perdido: [
      'Defina sua "bandeira" — uma crença forte que você defende e que os concorrentes ignoram.',
      'Escreva sua proposta de valor em uma frase clara: "Ajudo [quem] a [resultado final]".',
      'Escolha um nicho específico e um cliente ideal — generalistas nunca se destacam.',
      'Compartilhe sua história pessoal — histórias vendem muito mais que features.',
      'Documente seu processo ou metodologia única — isso é seu diferencial competitivo.',
    ],
    luneta: [
      'Compartilhe opiniões assertivas sobre seu segmento — posicionamento gera respeito.',
      'Crie 1 post por semana defendendo sua bandeira ou sua visão de mundo.',
      'Mostre mais bastidores do trabalho — humanizar marca cria conexão real.',
      'Destaque o problema específico que você resolve melhor que ninguém.',
      'Crie um "manifesto" explicando por que sua forma de trabalhar é superior.',
    ],
    tesouro: [
      'Posicionamento excelente! Explore parcerias com criadores complementares para co-criar.',
      'Desenvolva conteúdo em série que reforce sua identidade e marca pessoal.',
      'Considere lançar uma comunidade exclusiva ou programa de mentorado.',
      'Consolide autoridade: publique artigos, faça palestras, apareça em podcasts.',
      'Documente transformações reais de clientes — social proof é muito poderoso.',
    ],
  },
  identidade_visual: {
    perdido: [
      'Escolha 3 cores principais e use APENAS elas em todo conteúdo — deixe claro qual é a marca.',
      'Defina 2 fontes: uma para títulos (impactante) e outra para textos (legível). Fixe-as.',
      'Crie um moodboard visual no Canva com referências do seu universo estético.',
      'Padronize layouts com templates no Canva — cores, fontes, posicionamento de elementos.',
      'Crie 5 templates pré-prontos para usar sem pensar — economiza tempo e mantém coerência.',
    ],
    luneta: [
      'Revise templates: cores e fontes precisam estar 100% consistentes em tudo.',
      'Crie elementos gráficos únicos (ícones, divisores, formas) que apareçam em todo post.',
      'Monte um moodboard visual e atualize-o mensalmente com novas referências.',
      'Adicione um elemento visual único que identifique seus posts imediatamente.',
      'Teste 2-3 paletas de cores em stories antes de decidir a paleta final.',
    ],
    tesouro: [
      'Identidade visual forte! Explore variações criativas mantendo a essência.',
      'Documente seu guia de marca (cores, fontes, espaçamento) para trabalhar com terceiros.',
      'Crie versões específicas para cada plataforma (Reels, Stories, Feed).',
      'Evolua a identidade visual anualmente — mude detalhes mantendo o reconhecimento.',
      'Crie uma "assinatura visual" única sua — algo impossível de copiar.',
    ],
  },
  seguidores: {
    perdido: [
      'Crie um "cliente ideal" detalhado: idade, profissão, principais problemas, sonhos.',
      'Responda 100% dos comentários e DMs nas primeiras 2 horas — o algoritmo prioriza rápida resposta.',
      'Faça enquetes e caixinhas nos stories 3x por semana para entender melhor a audiência.',
      'Revise quem está seguindo e ajuste conteúdo para atrair mais pessoas como seu cliente ideal.',
      'Crie conteúdo exclusivo: bastidores, sneak peeks, ofertas early access para seguidores.',
    ],
    luneta: [
      'Responda comentários e stories de seguidores 5x por semana — construa relacionamento real.',
      'Envolva audiência em decisões: "qual tema prefere?" — cria senso de comunidade forte.',
      'Identifique seus 5% de seguidores mais engajados e cultive relação especial com eles.',
      'Faça lives semanais ou quinzenais — conversas ao vivo multiplicam engajamento muito.',
      'Crie desafios ou dinâmicas que incentivem seguidores a compartilhar com amigos.',
    ],
    tesouro: [
      'Audiência qualificada! Ative um programa de indicação — recompense quem indica.',
      'Peça depoimentos em vídeo de clientes — são muito mais poderosos que textos.',
      'Crie um programa VIP para seguidores mais antigos — acesso antecipado e ofertas especiais.',
      'Desenvolva comunidade offline: encontros, grupos privados para fortalecer lealdade.',
      'Aumente preços de ofertas para seguidores fiéis — eles já provaram disposição de pagar.',
    ],
  },
  conteudo: {
    perdido: [
      'Mapeie as 10 maiores dores do cliente ideal — crie 1 post educativo para cada uma.',
      'Aplique o Funil de Conteúdo: 40% atração (curiosidade), 40% relacionamento (educação), 20% venda.',
      'Cada post deve ter UM objetivo claro e UMA chamada para ação específica.',
      'Foque em carrosséis — geram 3x mais salvamentos, compartilhamentos e alcance.',
      'Crie conteúdo salvável: listas, checklists, templates, tutoriais, guias práticos.',
    ],
    luneta: [
      'Analise últimos 30 posts: quantos % são atração, relacionamento, venda? Rebalanceie.',
      'Aumente conteúdo salvável — o algoritmo amplifica muito esse tipo de post.',
      'Integre produto/serviço naturalmente no conteúdo educativo — não venda de forma óbvia.',
      'Teste diferentes formatos: quais carrosséis, fotos, vídeos geram mais engajamento?',
      'Crie séries temáticas (ex: "segundas de dicas", "sextas de cases") — isso fideliza.',
    ],
    tesouro: [
      'Conteúdo de alto nível! Reaproveitamento: transforme posts em reels, reels em carrosséis.',
      'Crie série temática profunda para estabelecer autoridade definitiva no seu assunto.',
      'Desenvolva um "pilar de conteúdo" — um tema central explorado de múltiplos ângulos.',
      'Acompanhe tendências e adapte-as para seu nicho — rende muito alcance.',
      'Considere lançar mini-cursos gratuitos (série de carrosséis) para gerar leads qualificados.',
    ],
  },
  engajamento: {
    perdido: [
      'Coloque chamada para ação em TODOS os posts: "comente", "salve", "compartilhe".',
      'Analise insights e identifique os melhores horários para postar — poste quando público está ativo.',
      'Use TODOS os recursos interativos: enquetes, quiz, caixinhas, contagem regressiva.',
      'Responda comentários nas primeiras 2 horas — o algoritmo prioriza rápida interação.',
      'Crie conteúdo que gera debate respeitado — polemizar de forma educada = muito engajamento.',
    ],
    luneta: [
      'Teste 3 horários por semana, meça qual gera mais engajamento e reproduza o vencedor.',
      'Use caixinha de perguntas 2-3x por semana — formato que mais gera salvamentos.',
      'Explore Collab com criadores complementares (não concorrentes) para ampliar alcance.',
      'Use stories interativos: enquetes, quiz, contagem regressiva — muito mais efetivo.',
      'Responda comentários com vídeo nos stories — cria diálogo e pessoas se sentem ouvidas.',
    ],
    tesouro: [
      'Engajamento excelente! Agora converta em vendas — crie urgência nas ofertas.',
      'Faça lives mensais com convidados no nicho — amplifica alcance e autoridade.',
      'Crie "gatilhos de urgência": oferta por tempo limitado, vagas limitadas, bônus que expira.',
      'Lance produtos para audiência engajada — eles promovem melhor que qualquer anúncio.',
      'Monetize: curso, grupo VIP, consultoria — converta fãs engajados em clientes pagantes.',
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
      perdido: `Seu ${modulo.titulo.toLowerCase()} precisa de atenção imediata. Isso está impactando diretamente seus resultados.`,
      luneta: `Seu ${modulo.titulo.toLowerCase()} está no caminho certo, mas ainda há melhorias importantes a fazer.`,
      tesouro: `Parabéns! Seu ${modulo.titulo.toLowerCase()} é muito bom — é um diferencial claro do seu perfil.`,
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

export async function gerarDiagnosticoComIA(notas: NotasModulo, segmento: string, nome?: string): Promise<ResultadoDiagnostico> {
  const base = gerarDiagnostico(notas)

  if (!process.env.GEMINI_API_KEY || !segmento || segmento.trim() === '' || segmento === 'Não informado') {
    return base
  }

  try {
    const { GoogleGenAI } = await import('@google/genai')
    // Initialize standard SDK
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    const prompt = `
Você é um consultor estrategista de Marketing Digital especializado em ${segmento}. Seu cliente${nome ? ` ${nome}` : ''} fez um diagnóstico do Instagram e recebeu as seguintes notas:

${base.diagnostico_modulos.map(m => `- ${m.titulo}: ${m.nota}/10 (${m.nivel})`).join('\n')}

Nota Geral: ${base.nota_geral}/10

**Sua missão:**
Gerar descrições ricas, 5 recomendações por módulo, e uma estratégia de conteúdo adaptada ao segmento de ${segmento}${nome ? ` e ao nome/marca ${nome}` : ''}.

**Regras:**
- Descrições devem ter 2-3 frases com contexto, analogia do segmento, e interpretação do resultado
- Recomendações: 5 itens imperativos, práticos, aplicáveis hoje (verbos de ação: "crie", "defina", "ative", etc)
- Estratégia de conteúdo: baseada no segmento específico, com exemplos concretos
- Tom: animador, vendedor, motivador
- Mantenha toda a humanidade: fale como coach, não como bot

**JSON esperado:**
{
  "diagnostico_modulos": [
    {
      "modulo": "perfil",
      "descricao": "2-3 frases explicando a nota e o que significa para um negócio de ${segmento}",
      "recomendacoes": ["Rec 1 imperativa", "Rec 2 imperativa", "Rec 3 imperativa", "Rec 4 imperativa", "Rec 5 imperativa"]
    }
  ],
  "plano_acao": {
    "prioridades": ["Prioridade 1 urgentíssima", "Prioridade 2 crítica", "Prioridade 3 importante"],
    "estrategia_conteudo": {
      "stories": {
        "sequencias": ["Narrativa diária exemplo 1", "Narrativa diária exemplo 2", "Micro-sequência reutilizável 1", "Micro-sequência reutilizável 2"],
        "caixinha_perguntas": ["Ideia 1 com contexto do segmento", "Ideia 2 com contexto", "Ideia 3 com contexto"],
        "transformacoes": ["Tipo de transformação 1 para ${segmento}", "Tipo 2", "Tipo 3"],
        "interacoes": ["Mecânica 1: enquetes sobre...", "Mecânica 2: quiz sobre...", "Mecânica 3: contagem regressiva para..."]
      },
      "reels": [
        {"formato": "Vídeo curto", "tema": "Tema específico", "descricao": "O que deve aparecer no reel"},
        {"formato": "Tutorial", "tema": "Tema específico", "descricao": "Descrição"},
        {"formato": "Trending", "tema": "Tema específico", "descricao": "Descrição"},
        {"formato": "Depoimento/Case", "tema": "Tema específico", "descricao": "Descrição"},
        {"formato": "Humor/Relatable", "tema": "Tema específico", "descricao": "Descrição"}
      ],
      "feed": [
        {"formato": "Carrossel", "tema": "Tema 1", "descricao": "Descrição prática do carrossel"},
        {"formato": "Imagem simples", "tema": "Tema 2", "descricao": "Descrição da imagem"},
        {"formato": "Imagem + legenda longa", "tema": "Tema 3", "descricao": "Descrição"},
        {"formato": "Vídeo estático", "tema": "Tema 4", "descricao": "Descrição"},
        {"formato": "Carrossel educativo", "tema": "Tema 5", "descricao": "Descrição"}
      ],
      "destaques": ["Nome 1", "Nome 2", "Nome 3", "Nome 4", "Nome 5"],
      "linha_editorial": {
        "frequencia": "3-4x por semana",
        "distribuicao": "1-2 Reels, 1-2 carrosséis ou posts estáticos, 1 story especial",
        "calendario": "Sugestão prática: [dia/hora específicos para este segmento]"
      }
    },
    "plano_execucao": {
      "stories": [
        {"ideia": "O que fazer no stories (sequência, caixinha, bastidor, etc) — específico para ${segmento}", "copy": "Texto/roteiro exato para usar no stories", "cta": "Ação concreta que deve pedir no final"},
        {"ideia": "Segunda ideia de stories para ${segmento}", "copy": "Texto do stories 2", "cta": "CTA 2"},
        {"ideia": "Terceira ideia de stories para ${segmento}", "copy": "Texto do stories 3", "cta": "CTA 3"}
      ],
      "reels": [
        {"ideia": "Conceito do reel adaptado ao segmento ${segmento}", "copy": "Legenda/narração sugerida para o reel", "cta": "CTA para o reel (salvar, comentar, link na bio, etc)"},
        {"ideia": "Segunda ideia de reel para ${segmento}", "copy": "Legenda 2", "cta": "CTA 2"},
        {"ideia": "Terceira ideia de reel para ${segmento}", "copy": "Legenda 3", "cta": "CTA 3"}
      ],
      "posts": [
        {"ideia": "Tema do post (imagem, texto, estático) — específico para ${segmento}", "copy": "Legenda completa sugerida", "cta": "CTA do post"},
        {"ideia": "Segunda ideia de post para ${segmento}", "copy": "Legenda 2", "cta": "CTA 2"},
        {"ideia": "Terceira ideia de post para ${segmento}", "copy": "Legenda 3", "cta": "CTA 3"}
      ],
      "carrosseis": [
        {"ideia": "Tema do carrossel com estrutura de slides sugerida — para ${segmento}", "copy": "Legenda + título do primeiro slide", "cta": "CTA do carrossel (salvar é a principal)"},
        {"ideia": "Segunda ideia de carrossel para ${segmento}", "copy": "Legenda 2", "cta": "CTA 2"},
        {"ideia": "Terceira ideia de carrossel para ${segmento}", "copy": "Legenda 3", "cta": "CTA 3"}
      ]
    }
  }
}

**Importante:** Retorne todos os 6 módulos (perfil, posicionamento, identidade_visual, seguidores, conteudo, engajamento). Seja específico e aplicável ao segmento de ${segmento}.
`
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    })

    const texto = response.text || ''
    const dados = JSON.parse(texto)

    // Mesclar os dados base com os de IA
    const diagnostico_modulos = base.diagnostico_modulos.map(m => {
      const iaMod = dados.diagnostico_modulos?.find((d: any) => d.modulo === m.modulo)
      return {
        ...m,
        descricao: iaMod?.descricao || m.descricao,
        recomendacoes: (iaMod?.recomendacoes && Array.isArray(iaMod.recomendacoes))
          ? iaMod.recomendacoes.slice(0, 5)
          : m.recomendacoes,
      }
    })

    return {
      ...base,
      diagnostico_modulos: diagnostico_modulos,
      plano_acao: {
        ...base.plano_acao,
        prioridades: dados.plano_acao?.prioridades || base.plano_acao.prioridades,
        estrategia_conteudo: dados.plano_acao?.estrategia_conteudo || undefined,
        plano_execucao: dados.plano_acao?.plano_execucao || undefined
      }
    }
  } catch (e) {
    console.error('[GERAR IA ERROR]', e)
    return base
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
