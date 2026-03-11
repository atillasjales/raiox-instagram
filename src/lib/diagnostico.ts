import { NotasModulo, DiagnosticoModulo, ResultadoDiagnostico, PlanoAcao } from '@/types'
import { MODULOS, getNivel, calcularNotaGeral } from './quiz-data'

const RECOMENDACOES: Record<string, Record<string, string[]>> = {
  perfil: {
    perdido: [
      'Reescreva a bio com: o que você faz + para quem + resultado que gera — máximo 3 linhas, sem enrolação.',
      'Troque a foto de perfil por imagem profissional, nítida, com rosto visível (ou logo limpa).',
      'Ative todos os botões de contato: email, telefone, WhatsApp — sem exceção.',
      'Crie 4 destaques estratégicos com capa padronizada: Quem Sou, Serviços, Depoimentos, Como Contratar.',
      'Fixe um post de apresentação no topo do perfil contando sua história e proposta de valor.',
    ],
    luneta: [
      'Revise a bio e adicione chamada para ação clara no final (ex: "Clique no link para saber mais").',
      'Organize os destaques com capas padronizadas e nomes estratégicos.',
      'Verifique se o link da bio está atualizado, funcional e direcionando para lugar certo.',
      'Atualize a foto de perfil a cada 6 meses para manter freshness visual.',
      'Aumente o número de botões de contato visíveis (adicione link do WhatsApp Business).',
    ],
    tesouro: [
      'Seu perfil está bem estruturado! Mantenha a consistência e revise a bio a cada 3 meses.',
      'Considere adicionar prova social na bio (ex: "+200 clientes", "10 anos no mercado").',
      'Crie um "call-to-action" visual — adicione um banner ou sticker na foto de perfil.',
      'Experimente usar as seções de link em bio para destacar múltiplos CTAs simultaneamente.',
      'Revise anualmente se os destaques refletem os valores atuais da marca.',
    ],
  },
  posicionamento: {
    perdido: [
      'Defina sua "bandeira" — uma crença forte que você defende que a concorrência ignora.',
      'Escreva uma proposta de valor em uma frase: "Eu ajudo [quem] a [resultado] através de [como]".',
      'Deixe claro o seu nicho — generalista nunca vence. Escolha um avatar de cliente.',
      'Compartilhe sua história pessoal — histórias vendem 10x mais que features.',
      'Documente sua metodologia ou processo único — isso é um diferencial competitivo.',
    ],
    luneta: [
      'Emita opiniões mais assertivas sobre seu segmento — concordância gera respeito.',
      'Crie pelo menos 1 post por semana defendendo sua "bandeira" ou visão de mundo.',
      'Mostre mais bastidores do trabalho — humanizar a marca gera conexão.',
      'Destaque qual problema específico você resolve melhor que ninguém.',
      'Crie um "manifesto" sobre por que sua forma de trabalhar é superior.',
    ],
    tesouro: [
      'Posicionamento excelente! Explore parcerias com outros criadores do nicho para co-criar.',
      'Desenvolva um manifesto visual ou conteúdo em série que reforce sua identidade.',
      'Considere lançar uma comunidade ou programa de mentorado para fortalecer autoridade.',
      'Posicione-se como thought leader — publique artigos, faça palestras, apareça em podcasts.',
      'Documente sua jornada e transformações de clientes — social proof em forma de narrativa.',
    ],
  },
  identidade_visual: {
    perdido: [
      'Escolha 3 cores principais — use APENAS elas em 100% do conteúdo. Deixe claro qual é a marca.',
      'Defina 2 fontes: uma para títulos (impactante) e uma para textos (legível) — fixas.',
      'Crie um moodboard no Canva com referências visuais do seu universo estético.',
      'Padronize o layout com templates no Canva — fundo, posição de texto, elementos gráficos.',
      'Crie 5 templates pré-prontos para usar sem pensar — isso economiza tempo e mantém coerência.',
    ],
    luneta: [
      'Revise templates atuais — cores e fontes devem estar 100% consistentes em TUDO.',
      'Crie elementos gráficos autorais (ícones, divisores, formas) que apareçam em cada post.',
      'Monte moodboard visual e atualize mensalmente com novas referências.',
      'Adicione um "watermark" visual ou elemento único que identifique seus posts imediatamente.',
      'Teste 2-3 paletas de cores diferentes em historinhas antes de fixar na final.',
    ],
    tesouro: [
      'Identidade visual forte! Explore variações criativas mantendo a essência central.',
      'Documente seu guia de marca (cores, fontes, espaçamento) para terceirizar com segurança.',
      'Crie versões diferentes para plataformas: formato específico para Reels, Stories, Feed.',
      'Experimente evoluir a identidade visual anualmente — mude elementos mantendo reconhecimento.',
      'Considere criar uma "assinatura visual" que só você usa — diferencial impossível de copiar.',
    ],
  },
  seguidores: {
    perdido: [
      'Defina seu "cliente avatar" com detalhes: idade, profissão, problemas, sonhos, onde passa tempo.',
      'Responda 100% dos comentários e DMs nas primeiras 2 horas após publicar — algoritmo prioriza.',
      'Faça enquetes e caixinhas de pergunta nos stories 3x por semana para entender audiência.',
      'Revise quem está seguindo e ajuste conteúdo para atrair mais pessoas como seu avatar.',
      'Crie conteúdo exclusivo para seguidores: vídeos atrás das câmeras, sneak peeks, ofertas early access.',
    ],
    luneta: [
      'Crie rituais de interação: responda stories de seguidores 5x por semana, comente posts deles.',
      'Envolva audiência em decisões — "qual tema você prefere?" — isso cria senso de comunidade.',
      'Identifique os 5% de seguidores mais engajados e cultive relacionamento com eles diretamente.',
      'Faça lives semanais ou quinzenais — conversas ao vivo multiplicam engajamento.',
      'Crie "challenges" ou dinâmicas que incentivem seguidores a compartilharem na história deles.',
    ],
    tesouro: [
      'Audiência qualificada! Ative programa de indicação — ofereça benefício para quem indica.',
      'Colha depoimentos em vídeo de clientes — vale mais que qualquer copy escrito.',
      'Crie programa VIP exclusivo para seguidores mais antigos — ofertas especiais, conteúdo antes.',
      'Desenvolva comunidade offline (meetups, grupo privado) para fortalecer brand loyalty.',
      'Aumente preco/oferta para seguidores fiéis — eles já provaram estar dispostos a pagar.',
    ],
  },
  conteudo: {
    perdido: [
      'Mapeie as 10 maiores dores do seu cliente ideal — crie 1 post educativo para cada.',
      'Aplicar Funil de Conteúdo: 40% atração (curiosidade), 40% relacionamento (valor), 20% oferta.',
      'Cada post deve ter UM objetivo e UMA chamada para ação — sem confundir a audiência.',
      'Aposte em carrosséis — geram 3x mais salvamentos, compartilhamentos e alcance orgânico.',
      'Crie conteúdo que gera salvamentos: listas, checklists, templates, tutoriais, guias.',
    ],
    luneta: [
      'Classifique seus últimos 30 posts: qual % é atração, relacionamento, oferta? Rebalanceie.',
      'Aumente conteúdo que gera salvamentos — o algoritmo ama isso e amplifica muito.',
      'Integre produto/serviço de forma natural no conteúdo de valor — não venda direto.',
      'Teste formatos: qual tipo de carrossel, foto, vídeo funciona melhor com seu público?',
      'Crie série de conteúdo temático (ex: "segundas de dicas", "sextas de cases") — isso fideliza.',
    ],
    tesouro: [
      'Conteúdo de alto nível! Reaproveitamento: transforme posts em reels, reels em carrosséis.',
      'Crie série de conteúdo temático profundo para estabelecer autoridade no assunto.',
      'Desenvolva "pilar de conteúdo" — um tema central que você aborda de múltiplos ângulos.',
      'Comore tendências rápido — temas virais aplicados ao seu nicho rendem muito alcance.',
      'Considere lançar mini-cursos gratuitos (carrosséis em série) para gerar leads qualificados.',
    ],
  },
  engajamento: {
    perdido: [
      'Coloque chamada para ação em TODOS os posts: "comente sua opinião", "salve para depois", "compartilhe".',
      'Descubra melhores horários analisando insights — poste quando seu público está mais ativo.',
      'Use TODOS os recursos interativos: enquetes, quiz, caixinhas, contagem regressiva, "sim/não".',
      'Responda todos os comentários nas primeiras 2 horas — algoritmo prioriza contas que interagem rápido.',
      'Crie conteúdo "controverso" (de forma respeitosa) — polêmica gera debate e algoritmo adora debate.',
    ],
    luneta: [
      'Teste 3 horários diferentes por semana e meça qual gera mais engajamento — reproduza vencedor.',
      'Use caixinha de perguntas 2-3x por semana — é o formato que mais gera salvamentos e DMs.',
      'Explore Collab para ampliar alcance com outros criadores complementares (não concorrentes).',
      'Faça "stories interativas" — use polls, quiz, contagem — histórias > destaques para engajamento.',
      'Responda comentários com vídeo nos stories — cria senso de diálogo e pessoas se sentem ouvidas.',
    ],
    tesouro: [
      'Engajamento excelente! Agora converta esse engajamento em vendas — cria urgência nas ofertas.',
      'Faça lives mensais com convidados relacionados — multiplica alcance + autoridade.',
      'Crie "gatilhos de urgência": oferta por tempo limitado, vagas limitadas, bônus que expira.',
      'Lance produtos/serviços para audiência engajada — eles conversam melhor que qualquer anúncio.',
      'Monetize o engajamento: curso, grupo VIP, consultoria — converta fãs em clientes.',
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
        estrategia_conteudo: dados.plano_acao?.estrategia_conteudo || undefined
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
