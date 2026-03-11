import { Modulo } from '@/types'

export const MODULOS: Modulo[] = [
  {
    id: 'perfil',
    titulo: 'Perfil',
    descricao: 'Análise da sua presença inicial — bio, foto, destaques e primeiras impressões.',
    emoji: '👤',
    perguntas: [
      {
        id: 1,
        texto: 'Sua foto de perfil transmite clareza e profissionalismo?',
        apoio: 'A foto é o primeiro contato visual com o cliente. Ela precisa estar bem iluminada, nítida e ser legível no celular.',
        exemplo: 'Para pessoas físicas: rosto iluminado com fundo neutro. Para empresas: logo limpo e legível sem muitos detalhes.'
      },
      {
        id: 2,
        texto: 'Sua bio descreve bem o que você oferece?',
        apoio: 'A bio funciona como um "elevador pitch" — deve dizer em 2 a 3 linhas exatamente o que você faz e para quem.',
        exemplo: 'Exemplo: "Ajudo mulheres empreendedoras a faturarem mais no Instagram" — claro e direto, não motivacional.'
      },
      {
        id: 3,
        texto: 'Seu nome de usuário (@) é fácil de memorizar e encontrar?',
        apoio: 'Nomes com muitos números, underscores ou pontos dificultam para as pessoas te acharem ou te marcarem.',
        exemplo: 'Prefira @joaodasilva em vez de @joao_da_silva_123_oficial.'
      },
      {
        id: 4,
        texto: 'O nome em negrito (abaixo do @) traz sua especialidade?',
        apoio: 'O Instagram usa esse nome para busca (SEO). Não repita seu @, use nome + especialidade em vez disso.',
        exemplo: 'Se o @ é @dra_ana, coloque "Ana Silva | Dentista em São Paulo" como nome em negrito.'
      },
      {
        id: 5,
        texto: 'Fica claro para quem você oferece seus produtos ou serviços?',
        apoio: 'O cliente ideal precisa se reconhecer assim que lê as primeiras palavras da sua bio.',
        exemplo: 'Se vende moda Plus Size, deixe explícito: "Roupas para mulheres plus size" — não apenas "Loja de Roupas".'
      },
      {
        id: 6,
        texto: 'Sua bio é persuasiva o suficiente para converter visitante em seguidor?',
        apoio: 'As pessoas seguem quem oferece benefício. Uma promessa clara de resultado atrai o público certo.',
        exemplo: 'Exemplo: "Aprenda técnicas de constância na academia" — mostra o ganho concreto para quem seguir.'
      },
      {
        id: 7,
        texto: 'Seu perfil tem todas as formas de contato (email, telefone, WhatsApp)?',
        apoio: 'Não deixe o cliente com dificuldade para falar com você. O Instagram oferece botões de contato nativos.',
        exemplo: 'Configure os botões "WhatsApp", "E-mail" ou "Ligar" nas opções de perfil empresarial.'
      },
      {
        id: 8,
        texto: 'Existe uma chamada para ação clara que direciona para o link da bio?',
        apoio: 'A última linha da bio deve instruir o usuário a clicar no link logo abaixo (CTA clara).',
        exemplo: 'Exemplo: "Agende sua consultoria aqui 👇" seguido do link em azul.'
      },
      {
        id: 9,
        texto: 'Seus destaques são estratégicos e bem organizados?',
        apoio: 'Destaques funcionam como um "menu" do seu perfil. Devem responder às principais dúvidas do cliente.',
        exemplo: 'Crie destaques nomeados: "Quem Sou", "Serviços", "Depoimentos" e "Dúvidas Frequentes".'
      },
      {
        id: 10,
        texto: 'Um visitante entende em 5 segundos o que você oferece?',
        apoio: 'O visitante decide se fica ou sai em um piscar de olhos. A compreensão precisa ser instantânea.',
        exemplo: 'Teste: peça a um desconhecido olhar seu perfil por 5 segundos e diga o que você vende.'
      },
    ],
  },
  {
    id: 'posicionamento',
    titulo: 'Posicionamento',
    descricao: 'Como sua marca se diferencia e comunica seu propósito no mercado.',
    emoji: '🎯',
    perguntas: [
      {
        id: 1,
        texto: 'Um visitante consegue identificar seu diferencial só olhando o perfil?',
        apoio: 'Por que o cliente deve escolher você e não o concorrente? Esse é o diferencial que precisa aparecer.',
        exemplo: 'Se oferece atendimento express (entrega em 2h), deixe isso em evidência no perfil.'
      },
      {
        id: 2,
        texto: 'Você compartilha opiniões claras sobre assuntos do seu segmento?',
        apoio: 'Marcas fortes têm voz forte. Ter opinião ajuda a afastar clientes errados e atrair os certos.',
        exemplo: 'Se é nutricionista, compartilhe abertamente sua visão: você apoia ou não dieta flexível?'
      },
      {
        id: 3,
        texto: 'As pessoas chegam com dúvidas relacionadas ao que você realmente vende?',
        apoio: 'Quando o posicionamento é claro, os clientes que chegam estão alinhados com seu negócio.',
        exemplo: 'Se oferece terapia cognitiva, receba perguntas sobre isso — não sobre psicanálise.'
      },
      {
        id: 4,
        texto: 'Você defende uma causa ou bandeira clara no seu conteúdo?',
        apoio: 'Uma bandeira é a crença central do seu negócio. Gera conexão emocional com o público.',
        exemplo: 'A Apple defende "pense diferente"; uma loja de roupas pode defender "conforto de todos os corpos".'
      },
      {
        id: 5,
        texto: 'Seu posicionamento gera conexão imediata com o público?',
        apoio: 'As pessoas não compram apenas serviços — compram quem você é e sua história.',
        exemplo: 'Compartilhe a jornada (dificuldades e vitórias) de como começou. Isso aproxima o público.'
      },
      {
        id: 6,
        texto: 'Fica claro por que as pessoas devem escolher você?',
        apoio: 'Vender só por preço é uma briga que você não vence. Posicione-se pelo valor agregado.',
        exemplo: '"Meus móveis não são os mais baratos, mas duram uma vida toda." — valor acima do preço.'
      },
      {
        id: 7,
        texto: 'O público conhece os bastidores do seu trabalho?',
        apoio: 'Mostrar bastidores aumenta o valor percebido do que você oferece.',
        exemplo: 'Mostre como o produto é feito ou empacotado nos stories.'
      },
      {
        id: 8,
        texto: 'Seu posicionamento transmite confiança e autoridade?',
        apoio: 'Autoridade se constrói ao provar que você resolve problemas como ninguém mais consegue.',
        exemplo: 'Publique estudos de caso e antes/depois reais de clientes satisfeitos.'
      },
      {
        id: 9,
        texto: 'Sua mensagem é consistente em todos os formatos (reels, stories, feed)?',
        apoio: 'O tom de voz e a mensagem devem ser os mesmos em todos os lugares.',
        exemplo: 'Se é amigável nos stories, não seja seco nas legendas do feed.'
      },
      {
        id: 10,
        texto: 'Seu perfil cria identificação e senso de pertencimento?',
        apoio: 'Pertencimento gera fidelização. Quem se sente parte de uma tribo defende sua marca.',
        exemplo: 'Crie um nome carinhoso para a comunidade ou um jargão exclusivo que só vocês usam.'
      },
    ],
  },
  {
    id: 'identidade_visual',
    titulo: 'Identidade Visual',
    descricao: 'A coerência estética do seu perfil — cores, fontes, elementos e reconhecimento.',
    emoji: '🎨',
    perguntas: [
      {
        id: 1,
        texto: 'Seu perfil tem uma paleta de cores bem definida?',
        apoio: 'Use no máximo 3 a 4 cores principais. Isso facilita o reconhecimento da sua marca na mente das pessoas.',
        exemplo: 'O Nubank consolidou o roxo tão bem que qualquer tela roxa já remete ao app.'
      },
      {
        id: 2,
        texto: 'Seu feed é visualmente limpo e agradável à primeira vista?',
        apoio: 'O feed não precisa ser perfeito, mas deve ter "limpeza visual" — sem confusão.',
        exemplo: 'Textos legíveis, imagens claras (não muito escuras), boa qualidade fotográfica em geral.'
      },
      {
        id: 3,
        texto: 'Você usa sempre as mesmas fontes?',
        apoio: 'Use 2 fontes apenas (uma para títulos, outra para texto). Isso padroniza e mostra profissionalismo.',
        exemplo: 'Em vez de trocar fonte a cada story, use sempre a mesma fonte da marca (exemplo: Roboto).'
      },
      {
        id: 4,
        texto: 'Existem elementos gráficos que identificam sua marca?',
        apoio: 'Elementos como ícones, divisórias, formas e filtros únicos criam padronização visual.',
        exemplo: 'Aplicar o mesmo filtro em todas as fotos ou usar uma fita/bordura especial em todos os cards.'
      },
      {
        id: 5,
        texto: 'Pessoas reconheceriam um post seu mesmo sem ver sua logo?',
        apoio: 'Teste definitivo: o post avulso tem "sua cara"? Se alguém visse no explore, saberia que é seu?',
        exemplo: 'Capa preta com letras neon no explore = logo visual clara da academia, sem precisar da logo.'
      },
      {
        id: 6,
        texto: 'Seus posts de venda têm visual diferente dos outros?',
        apoio: 'Campanhas merecem força visual diferente para chamar ação comercial imediata.',
        exemplo: 'Use quadro vermelho vibrante ou elementos de urgência nas imagens de promoção.'
      },
      {
        id: 7,
        texto: 'Sua identidade visual combina com a personalidade da marca?',
        apoio: 'A estética deve refletir o nicho: luxo exige cores diferentes de um bufê infantil.',
        exemplo: 'Preto + dourado + letras finas = luxo. Amarelo + cores vibrantes = energia e dinamismo.'
      },
      {
        id: 8,
        texto: 'Seu feed inteiro (últimos 9-12 posts) é uma vitrine atraente?',
        apoio: 'O feed todo forma uma primeira impressão. Precisa parecer que teve cuidado?',
        exemplo: 'Equilíbrio entre fotos, designs, e imagens de produtos — sem parecer caótico.'
      },
      {
        id: 9,
        texto: 'Você mostra o que vende de forma criativa e atrativa?',
        apoio: 'No Instagram, tudo é visual. Elevar a atratividade do produto é essencial.',
        exemplo: 'Use carrosséis com produto em diferentes ângulos, portfólios estéticos, catálogos bem feitos.'
      },
      {
        id: 10,
        texto: 'Você tem referências visuais salvas e bem organizadas?',
        apoio: 'Um moodboard ajuda a manter a identidade consistente ao longo do tempo.',
        exemplo: 'Colecione imagens que inspiram em uma pasta — assim nunca perde a direção de estilo.'
      },
    ],
  },
  {
    id: 'seguidores',
    titulo: 'Seguidores',
    descricao: 'A qualidade, engajamento e alinhamento da sua audiência com seu negócio.',
    emoji: '👥',
    perguntas: [
      {
        id: 1,
        texto: 'A maioria dos seus seguidores é seu cliente ideal?',
        apoio: '1.000 seguidores com capacidade de pagar valem mais que 10.000 curiosos sem interesse real.',
        exemplo: 'Veja quem comenta: essas pessoas têm condição e interesse em pagar pelo seu produto?'
      },
      {
        id: 2,
        texto: 'Quando oferece algo, as pessoas tendem a comprar?',
        apoio: 'Se o seguidor está alinhado, o preço não assusta. Taxa de conversão alta = público correto.',
        exemplo: 'Se todos desistem por achar caro, o público ainda não é o seu cliente ideal.'
      },
      {
        id: 3,
        texto: 'Quando faz uma oferta, recebe respostas e interesse real?',
        apoio: 'Além de curtidas, procure por comentários, DMs interessadas e salvamentos genuínos.',
        exemplo: 'Oferta no domingo e na segunda há fila de interessados — mesmo de seguidores mais antigos.'
      },
      {
        id: 4,
        texto: 'Você responde comentários e DMs rapidamente e de forma personalizada?',
        apoio: 'O Instagram prioriza respostas rápidas (nas primeiras 2 horas). As pessoas apreciam atendimento real.',
        exemplo: 'Responda com áudio, não apenas emojis. Crie proximidade genuína e relação duradoura.'
      },
      {
        id: 5,
        texto: 'Seu público interage bastante com os posts?',
        apoio: 'Engajamento alto mostra que os seguidores realmente se importam com o que você posta.',
        exemplo: 'Crie posts em formato de conversa — pergunte algo e as pessoas vão responder.'
      },
      {
        id: 6,
        texto: 'Você pede opinião do público antes de tomar decisões?',
        apoio: 'Envolver a audiência cria comunidade e fideliza muito mais do que você imagina.',
        exemplo: 'Faça enquete: "Qual cor você prefere para a nova embalagem?" — assim eles sentem posse.'
      },
      {
        id: 7,
        texto: 'Seus seguidores compartilham seu conteúdo com outras pessoas?',
        apoio: 'Compartilhamentos orgânicos (via DM ou status) são a melhor forma de crescimento.',
        exemplo: 'Se o relatório mostra compartilhamentos para grupos, significa que a audiência defende sua marca.'
      },
      {
        id: 8,
        texto: 'Você repete os formatos que mais geraram resultados?',
        apoio: 'Se um formato funcionou antes, otimize e repita — não tenha preguiça de repetir sucesso.',
        exemplo: 'Se vídeos caseiros funcionaram mais que designs no Canva, então foque em vídeos.'
      },
      {
        id: 9,
        texto: 'Você usa stories de forma estratégica para engajar?',
        apoio: 'Stories são para interação e retenção. Venda vem depois de criar intimidade.',
        exemplo: 'Comece o dia com opinião genuína, e apenas à tarde lance offers de venda.'
      },
      {
        id: 10,
        texto: 'Você sabe quem é seu seguidor e qual é a maior dor dele?',
        apoio: 'Entendar a razão pela qual estão ali é chave para oferecer a solução certa.',
        exemplo: 'Identifique 3 problemas principais e crie posts que endereçam esses problemas diretamente.'
      },
    ],
  },
  {
    id: 'conteudo',
    titulo: 'Conteúdo',
    descricao: 'A estratégia, relevância e poder de conversão do que você publica.',
    emoji: '📝',
    perguntas: [
      {
        id: 1,
        texto: 'Seus posts chamam atenção das pessoas com frequência?',
        apoio: 'Alcance orgânico alto = Instagram está mostrando seu conteúdo para mais gente, não só seguidores.',
        exemplo: 'Use títulos impactantes: "Ganhei 10k com isso" ou "Aqui está meu maior erro" — quebra padrões.'
      },
      {
        id: 2,
        texto: 'Você atrai novos seguidores consistentemente?',
        apoio: 'Novo crescimento significa que o funil de atração está funcionando bem.',
        exemplo: 'Veja nos insights: quantos novos seguidores vieram de cada post? Repita os que funcionaram.'
      },
      {
        id: 3,
        texto: 'Sua legenda reforça seu posicionamento?',
        apoio: 'Legenda boa fecha o que o vídeo/imagem deixou em aberto. Ela precisa converter leitores em defensores.',
        exemplo: 'Em vez de "veja aqui", explique os 3 maiores benefícios do produto para o leitor.'
      },
      {
        id: 4,
        texto: 'Seu conteúdo é específico para seu nicho (não genérico)?',
        apoio: 'Conteúdo genérico (dicas motivacionais) não gera venda. Específico = seu público se identifica.',
        exemplo: 'Para pedreiro: "Como rebocar sem criar fissuras" — muito mais poderoso que dicas genéricas.'
      },
      {
        id: 5,
        texto: 'As pessoas compartilham seu conteúdo naturalmente?',
        apoio: 'Conteúdo compartilhável tem utilidade (checklist, dica prática) ou grande identificação emocional.',
        exemplo: 'Um checklist salvável + repassável para amigos via DM é muito mais forte que um post comum.'
      },
      {
        id: 6,
        texto: 'Seus posts estão alinhados com o que você vende?',
        apoio: 'Cada post deve reforçar ou aproximar do seu produto/serviço, mesmo que indiretamente.',
        exemplo: 'Se vende bolos, mostre receitas, bastidores da confeitaria — tudo ligado ao que oferece.'
      },
      {
        id: 7,
        texto: 'Pessoas salvam seus conteúdos para ver depois?',
        apoio: 'Salvamentos = conteúdo com valor duradouro. O algoritmo adora isso.',
        exemplo: 'Guias fiscais, roteiros de viagem, templates — coisas que as pessoas querem manter para depois.'
      },
      {
        id: 8,
        texto: 'Seu conteúdo gera vontade de comprar?',
        apoio: 'Bom conteúdo gera desejo — mostrar o melhor, os bastidores, a qualidade do que oferece.',
        exemplo: 'Mostre como o produto é feito, qualidade dos materiais, resultado final — cria vontade.'
      },
      {
        id: 9,
        texto: 'O que você vende aparece naturalmente no seu feed?',
        apoio: 'O produto deve estar integrado no universo do seu conteúdo, não ser imposto.',
        exemplo: 'Se vende bolos, mostre bolos sendo feitos, sabor, processo — tudo natural da rotina.'
      },
      {
        id: 10,
        texto: 'Cada post tem um objetivo claro (atrair, relacionar ou vender)?',
        apoio: 'Posts sem objetivo ficam perdidos. Todo post deve ter uma razão e uma ação esperada.',
        exemplo: 'Post de educação (atrair) → Posts de relacionamento (engajar) → Posts de venda (converter).'
      },
    ],
  },
  {
    id: 'engajamento',
    titulo: 'Engajamento',
    descricao: 'A força das interações, uso dos recursos e alcance orgânico.',
    emoji: '⚡',
    perguntas: [
      {
        id: 1,
        texto: 'Seu engajamento é alto em relação ao número de seguidores?',
        apoio: 'Engajamento baixo = seguidores não estão interessados ou são bots. Procure por 3-10% de engajamento (curtidas + comentários).',
        exemplo: '100 seguidores visualizando = 3-10 curtidas/comentários é saudável. Menos que isso = público não engajado.'
      },
      {
        id: 2,
        texto: 'Quando faz caixinha de perguntas, recebe respostas genuínas?',
        apoio: 'Caixinha com respostas reais (não autopreenchidas) mostra que a audiência está interessada e engajada.',
        exemplo: 'As perguntas viram posts seus na semana seguinte = validação de que o público está acompanhando.'
      },
      {
        id: 3,
        texto: 'Você publica em horários estratégicos (quando seu público está ativo)?',
        apoio: 'Postar no horário errado é como abrir uma loja à noite. Veja seus insights para descobrir os melhores horários.',
        exemplo: 'Se seu público está ativo depois das 21h, poste nesse horário — não de madrugada ou cedo demais.'
      },
      {
        id: 4,
        texto: 'Você usa enquetes, quizzes e caixinhas nos stories?',
        apoio: 'Instagram valoriza conteúdo interativo. Use enquetes, quiz e perguntas para incentivar engajamento.',
        exemplo: 'Em vez de apenas falar, coloque enquete "Qual você escolhe?" — muito mais impacto.'
      },
      {
        id: 5,
        texto: 'As pessoas comentam espontaneamente nos seus posts?',
        apoio: 'Comentários reais significam que o conteúdo tocou a pessoa de alguma forma.',
        exemplo: 'Alguém comenta "Exatamente isso que eu precisava ouvir!" — isso é engajamento de ouro.'
      },
      {
        id: 6,
        texto: 'Você usa hashtags específicas para seu nicho?',
        apoio: 'Hashtags genéricas (como #amor) têm bilhões de posts. Foque em hashtags específicas do seu mercado.',
        exemplo: 'Para padaria em Campinas: #PadariaEmCampinas em vez de #Pão — muito mais relevante.'
      },
      {
        id: 7,
        texto: 'Seus posts têm chamadas para ação claras?',
        apoio: 'CTA clara = pedir algo específico: "comente", "salve", "acesse o link", "mande DM".',
        exemplo: 'Em vez de "Vê lá", diga "Comente aqui qual é sua maior dificuldade!" — mais específico, mais respostas.'
      },
      {
        id: 8,
        texto: 'Você acompanha métricas e ajusta sua estratégia?',
        apoio: 'Não confie em achismos — dados falam mais. Veja o que funciona e repita.',
        exemplo: 'Se descobrir que reels têm 3x mais alcance que fotos, foque em reels a partir de agora.'
      },
      {
        id: 9,
        texto: 'Você posta stories ao longo do dia para manter o público engajado?',
        apoio: 'Stories são como capítulos de uma série — distribuir ao longo do dia mantém a audiência aquecida.',
        exemplo: 'Publicar de manhã (com opinião), meio do dia (educação) e noite (venda) — distribuição estratégica.'
      },
      {
        id: 10,
        texto: 'Você testa novos formatos lançados pelo Instagram?',
        apoio: 'Instagram bonifica quem testa novos recursos antes (reels, colabs, áudio). Recebem muito mais alcance.',
        exemplo: 'Quando sai uma feature nova, teste na sua conta — aproveite o boost inicial do algoritmo.'
      },
    ],
  },
]

export const TOTAL_PERGUNTAS = MODULOS.reduce((acc, m) => acc + m.perguntas.length, 0)

export function calcularNotaModulo(respostas: Record<number, number>): number {
  const valores = Object.values(respostas)
  if (valores.length === 0) return 0
  return Math.round((valores.reduce((a, b) => a + b, 0) / valores.length) * 10) / 10
}

export function calcularNotaGeral(notas: Record<string, number>): number {
  const valores = Object.values(notas)
  if (valores.length === 0) return 0
  return Math.round((valores.reduce((a, b) => a + b, 0) / valores.length) * 10) / 10
}

export function getNivel(nota: number): 'perdido' | 'luneta' | 'tesouro' {
  if (nota <= 4) return 'perdido'
  if (nota <= 7) return 'luneta'
  return 'tesouro'
}

export const NIVEL_CONFIG = {
  perdido: {
    label: 'Modo Perdido',
    emoji: '🔴',
    cor: '#EF4444',
    descricao: 'Atenção urgente necessária. Este ponto está comprometendo seus resultados.',
  },
  luneta: {
    label: 'Modo Luneta',
    emoji: '🟡',
    cor: '#E8B84B',
    descricao: 'Você enxerga o caminho, mas ainda precisa de ajustes importantes.',
  },
  tesouro: {
    label: 'Modo Tesouro',
    emoji: '🟢',
    cor: '#22C55E',
    descricao: 'Excelente! Este ponto é um diferencial forte do seu perfil.',
  },
}
