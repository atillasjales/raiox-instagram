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
        texto: 'Sua foto de perfil transmite clareza e profissionalismo para a sua marca?',
        apoio: 'A foto é o primeiro contato do cliente. Ela não deve estar escura, desfocada ou ser ilegível no celular.',
        exemplo: 'Para pessoas: rosto iluminado com fundo neutro. Para empresas: logo limpo, sem textos miúdos.'
      },
      {
        id: 2,
        texto: 'A bio representa bem seus serviços, marca e conteúdo?',
        apoio: 'Sua biografia precisa ser um "elevador pitch" de 3 linhas dizendo exatamente o que você faz.',
        exemplo: 'Ex: "Ajudo mulheres empreendedoras a faturarem +10k no Instagram" ao invés de frases motivacionais soltas.'
      },
      {
        id: 3,
        texto: 'Seu nome de usuário (@) é fácil de memorizar e encontrar?',
        apoio: 'Usernames com muitos números, underlines ou pontos dificultam que as pessoas te achem ou te marquem.',
        exemplo: 'Prefira @joaodasilva ao invés de @joao_da_silva_123_oficial.'
      },
      {
        id: 4,
        texto: 'O nome em negrito traz sua especialidade ou nome + especialidade?',
        apoio: 'O "Nome" em negrito é usado pelo mecanismo de busca do Instagram (SEO). Não repita seu @ ali.',
        exemplo: 'Se o @ é @dra_ana, o nome em negrito pode ser "Ana Silva | Dentista SP".'
      },
      {
        id: 5,
        texto: 'A bio deixa claro para quem você oferece seus produtos/serviços?',
        apoio: 'O seu público-alvo precisa se reconhecer assim que lê as primeiras palavras do seu perfil.',
        exemplo: 'Se você vende moda Plus Size, deixe isso explícito ao invés de colocar apenas "Loja de Roupas".'
      },
      {
        id: 6,
        texto: 'Sua bio é persuasiva o suficiente para converter visitante em seguidor?',
        apoio: 'As pessoas te seguem buscando algum benefício. A promessa de transformação atrai o seguidor certo.',
        exemplo: 'Ex: "Dicas de constância na academia", que mostra o que ele ganha ao te seguir.'
      },
      {
        id: 7,
        texto: 'Seu perfil tem todas as formas de contato (email, telefone, botão de ação)?',
        apoio: 'O cliente não pode ter dificuldade de falar com você. O Instagram oferece botões nativos para contatos.',
        exemplo: 'Ter o botão "WhatsApp" ou "E-mail" configurado diretamente nas opções de perfil empresarial.'
      },
      {
        id: 8,
        texto: 'Existe uma chamada para ação clara que leva ao link da bio?',
        apoio: 'A última linha da sua bio deve instruir o usuário (CTA) a clicar no link logo abaixo dela.',
        exemplo: 'Ex: "Agende sua consultoria aqui 👇" + o link em azul.'
      },
      {
        id: 9,
        texto: 'Seus destaques são usados de forma estratégica (não apenas fotos aleatórias)?',
        apoio: 'Destaques funcionam como o "menu" do seu site. Devem tirar as principais dúvidas do cliente.',
        exemplo: 'Criar destaques padronizados como: "Quem sou", "Serviços", "Depoimentos" e "Dúvidas".'
      },
      {
        id: 10,
        texto: 'Alguém que nunca te viu entende em 5 segundos o que você oferece?',
        apoio: 'O visitante decide se fica ou vai embora na velocidade de um piscar de olhos. A compreensão deve ser instantânea.',
        exemplo: 'Testar pedir pra um desconhecido olhar seu perfil por 5 segundos e perguntar o que você vende.'
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
        texto: 'Alguém que não te conhece consegue identificar seu diferencial só pelo perfil?',
        apoio: 'Por que o cliente deve escolher você e não a aba do concorrente ao lado? Isso é o diferencial.',
        exemplo: 'Ex: Seu diferencial pode ser o atendimento express (entregas em 2h), e isso deve estar em evidência.'
      },
      {
        id: 2,
        texto: 'Você emite opiniões claras sobre assuntos do seu segmento?',
        apoio: 'Marcas fortes têm voz forte. Ter opinião ajuda a eliminar clientes errados e atrair os fãs certos.',
        exemplo: 'Se você é Nutricionista, falar abertamente se defende ou não a dieta flexível.'
      },
      {
        id: 3,
        texto: 'As pessoas chegam com perguntas relacionadas ao que você realmente vende?',
        apoio: 'O alinhamento do público com a venda ocorre quando seu posicionamento é cirúrgico.',
        exemplo: 'Se você vende terapia cognitiva, não adianta receber directs apenas perguntando sobre psicanálise.'
      },
      {
        id: 4,
        texto: 'Você defende uma causa ou bandeira de forma clara no seu conteúdo?',
        apoio: 'A bandeira é a crença máxima do seu negócio no mercado. Causa conexão emocional.',
        exemplo: 'A Apple defende "pense diferente"; uma loja de roupas pode defender "conforto de todos os corpos".'
      },
      {
        id: 5,
        texto: 'Seu posicionamento gera conexão imediata do público com sua marca?',
        apoio: 'O usuário não compra apenas seus serviços, ele compra quem você é e a sua história.',
        exemplo: 'Compartilhar a jornada (dificuldades e vitórias) de como sua empresa começou aproxima o público.'
      },
      {
        id: 6,
        texto: 'Está claro para você (e para o público) por que devem te escolher?',
        apoio: 'Vender apenas o preço é uma briga ruim. Posicionar-se pelo valor agregado cria defensores da marca.',
        exemplo: '"Meus móveis são escolhidos não porque são os mais baratos, mas porque duram uma vida toda."'
      },
      {
        id: 7,
        texto: 'As pessoas conhecem os bastidores do que há por trás do que você vende?',
        apoio: 'Mostrar os bastidores aumenta o valor percebido das suas ofertas.',
        exemplo: 'Mostrar como a comida é preparada empacotando os envios nos stories.'
      },
      {
        id: 8,
        texto: 'Seu posicionamento transmite confiança e autoridade no seu nicho?',
        apoio: 'Autoridade é construída provando que você resolve problemas como ninguém mais.',
        exemplo: 'Publicar estudos de caso e antes/depois de clientes satisfeitos.'
      },
      {
        id: 9,
        texto: 'Você é consistente na mensagem que passa em todos os formatos de conteúdo?',
        apoio: 'Sua mensagem de venda e seu tom de voz devem ser os mesmos em reels, stories e feed.',
        exemplo: 'Se for amigável nos stories, os textos da legenda não podem ser secos e engessados.'
      },
      {
        id: 10,
        texto: 'Seu perfil cria um sentimento de identificação e pertencimento na audiência?',
        apoio: 'Pertencimento significa fidelização. Seguidores que se sentem parte de uma tribo defendem sua marca.',
        exemplo: 'Dar um nome carinhoso para a comunidade ou criar um jargão exclusivo que só vocês usam.'
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
        texto: 'Seu perfil tem um padrão característico de cores bem definido?',
        apoio: 'Definir paleta de cores (no máximo 3 a 4 tons) facilita a consolidação na mente das pessoas.',
        exemplo: 'Ex: O Nubank consolidou o roxo a tal ponto que basta ver uma tela dessa cor para se lembrar do app.'
      },
      {
        id: 2,
        texto: 'Seu perfil é de fácil compreensão para quem chega pela primeira vez?',
        apoio: 'O grid (feed de fotos) não precisa ser um quebra-cabeças, mas precisa passar "limpeza visual".',
        exemplo: 'Textos fáceis de ler nas capas de reels/carrosséis sem fotos estouradas e escuras de fundo.'
      },
      {
        id: 3,
        texto: 'As fontes que você usa fazem parte da sua identidade e têm boa leitura?',
        apoio: 'Usar sempre as 2 mesmas fontes (título e corpo) padroniza o visual geral e mostra extremo profissionalismo.',
        exemplo: 'Ao invés de mudar a fonte em cada story dependendo do humor, usar a fonte da sua marca (ex: Roboto).'
      },
      {
        id: 4,
        texto: 'Existem elementos gráficos característicos e reconhecíveis da sua marca?',
        apoio: 'Elementos de apoio são curvas, ícones, faixas coloridas e filtros fotográficos que geram padronização.',
        exemplo: 'Sempre aplicar o mesmo preset nas fotos, ou assinar todos os cards de carrossel com uma fitinha.'
      },
      {
        id: 5,
        texto: 'As pessoas reconheceriam uma publicação sua mesmo sem ver sua logo?',
        apoio: 'O teste definitivo de uma boa identidade é a "impressão digital". O post avulso tem "a cara" do seu negócio?',
        exemplo: 'Ao esbarrar no explore, o cliente vê uma capa preta de letra neon e já deduz que é da sua academia.'
      },
      {
        id: 6,
        texto: 'Existe um padrão de layout específico nas suas campanhas de venda?',
        apoio: 'Campanhas promocionais merecem uma força visual diferente de posts normais, chamando ação comercial imediata.',
        exemplo: 'Sempre usar um quadro vermelho forte ou botão vibrante nas imagens que anunciam preços/descontos.'
      },
      {
        id: 7,
        texto: 'Sua identidade visual reflete a personalidade da sua marca?',
        apoio: 'A estética deve combinar com a mensagem e o nicho. Um escritório focado em luxo exige cores diferentes de um bufê infantil.',
        exemplo: 'Usar preto, dourado e letras finas transmite luxo e exclusividade, diferentemente do amarelo que exige atenção e dinamismo.'
      },
      {
        id: 8,
        texto: 'Olhando a tela inicial do perfil, a comunicação visual é impactante?',
        apoio: 'O conjunto dos últimos 9 a 12 posts formam uma vitrine. Ela aparenta capricho?',
        exemplo: 'O balanço entre rostos gravados, designs no canva e fotografia crua dão equilíbrio.'
      },
      {
        id: 9,
        texto: 'Você investe em mostrar visualmente o que você vende de formas criativas?',
        apoio: 'Ciente de que Instagram é 100% fotográfico, os cortes, cenas ou artes precisam elevar atratividade da oferta.',
        exemplo: 'Usar carrossel sem texto, apenas em forma de catálogo e portfólios estéticos.'
      },
      {
        id: 10,
        texto: 'Seu moodboard visual é consistente e atualizado frequentemente?',
        apoio: 'Um mapa de referências ajuda e evita que a identidade do perfil fique confusa ao longo dos anos ou na mão de 3os.',
        exemplo: 'Colecionar num arquivo as fotos que inspiram o perfil, pra nunca perder a direção de estilo.'
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
        texto: 'A maioria dos seus seguidores tem o perfil do seu cliente ideal?',
        apoio: 'Mais vale ter 1.000 seguidores endinheirados querendo seu produto do que 10.000 curiosos falidos.',
        exemplo: 'Isso significa olhar os stories de quem anda comentando e ver se essas pessoas teriam condição (ou interesse real) em pagar os boletos do seu balcão.'
      },
      {
        id: 2,
        texto: 'Quando as pessoas perguntam o preço, elas tendem a fechar negócio?',
        apoio: 'Taxa de Conversão limpa: se o seguidor já tá alinhado com o nicho, o preço não deve assustar demais.',
        exemplo: '10 de cada 10 vezes as pessoas desmarcarem por conta de "o pix era pesado", quer dizer que a audiência ainda é o cliente errado.'
      },
      {
        id: 3,
        texto: 'Quando você faz uma oferta, o nível de resposta positiva é alto?',
        apoio: 'Não o simples Like, mas o reply no direct, o salvamento em produtos postados, as mensagens interessadas.',
        exemplo: 'Lançar uma ação comercial de segunda-feira na rede e ter fila na porta, mesmo de seguidores antigos.'
      },
      {
        id: 4,
        texto: 'Você responde todos os comentários e directs com agilidade e personalização?',
        apoio: 'Algoritmo e os seres-humanos precisam da sua resposta nas primeiras 2 horas, não três dias.',
        exemplo: 'Não responder directs só com um coração; usar áudios e interagir de verdade para criar lastro de proximidade.'
      },
      {
        id: 5,
        texto: 'Sua audiência é participativa com o que você publica?',
        apoio: 'O engajamento social ativo mostra quanto os seguidores te "respeitam" e priorizam a leitura do seu post.',
        exemplo: 'Posts em formato de conversa em que as pessoas complementam a tese ali pelos comentários.'
      },
      {
        id: 6,
        texto: 'Você envolve seu público nas tomadas de decisão da sua marca?',
        apoio: 'Co-criar com a audiência solidifica demais o elo de comunidade e tira as dúvidas de planejamento.',
        exemplo: 'Pedir que votem em enquetes qual deveria ser a nova embalagem que usará semana que vem.'
      },
      {
        id: 7,
        texto: 'Seus seguidores recomendam seu conteúdo ou o que você vende?',
        apoio: 'O marketing boca-a-boca validado dentro do app, via botão de aviãozinho do instagram (compartilhamentos diretos).',
        exemplo: 'Se as postagens registram pelo relatório que dezenas repassaram para grupos, a audiência é seu exército.'
      },
      {
        id: 8,
        texto: 'Você repete os formatos de publicação que mais atraíram seguidores?',
        apoio: 'Uma boa pescaria deve repetir os equipamentos que dão certo sem orgulho. Se trouxe audiência antes, pode ser otimizado pra voltar a trazer amanhã.',
        exemplo: 'Se vídeo-tuto gravados em casa tiveram mais engajamento antes do que post-card no canva, então repita vídeos!'
      },
      {
        id: 9,
        texto: 'Você usa os stories estrategicamente para reter e engajar a audiência?',
        apoio: 'Stories de venda vêm depois de retenções; não seja puramente o folder de hipermercado na rede o dia todo.',
        exemplo: 'Acordar as pessoas logo cedo com opinião, para só de tarde meter caixinhas ou pitacos vendendo serviços.'
      },
      {
        id: 10,
        texto: 'Você tem clareza sobre quem é o seu seguidor e quais são suas dores?',
        apoio: 'Saber ler por que aquelas pessoas estão ali acordadas 1 da manhã num perfil comercial. Qual queixa elas gostariam de acabar primeiro se pagassem você.',
        exemplo: 'Falar de forma crua 3 dessas angústias dentro de um post resolve o alinhamento com os novos e antigões.'
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
        texto: 'Seu conteúdo tem chamado a atenção das pessoas com frequência?',
        apoio: 'Métricas de Alcance orgânico. O instagram tem o papel de exibir seu conteúdo solto como um Outdoor para mais pessoas além dos amigos.',
        exemplo: 'Usando títulos muito mais impactantes ("Ganhos reais a partir disto", ou "Foi aqui que eu perdi em X") quebrando os padrões normais.'
      },
      {
        id: 2,
        texto: 'Você tem atraído novos seguidores consistentemente através do conteúdo?',
        apoio: 'Um funil estragado mantém o crescimento de novos Leads a zero no mês de apuro.',
        exemplo: 'Quando publica, confere que o Insta marca um balão "3 seguidores novos das métricas originados nesse post".'
      },
      {
        id: 3,
        texto: 'Seu posicionamento fica claro através do que você escreve nas legendas?',
        apoio: 'A legenda deve fechar os gaps de onde o vídeo deixou pontas soltas. Elas precisam converter leitores em advogados seus.',
        exemplo: 'Ao invés de "Veja a novidade, link lá!" elaborar sobre os 3 benefícios primordiais pro consumidor e ser claro na condução política daquela compra.'
      },
      {
        id: 4,
        texto: 'Seu conteúdo é nichado (específico) e não generalista?',
        apoio: 'Posts que atraem pessoas que pagam não se tratam de dicas motivacionais furadas do globo da tarde que todo mundo faria de qualquer forma.',
        exemplo: '"Como o gesso 3X do Teto Rebaixado gera micro fissuras da casa nos 2 anos": muito especifico pro cara que vai rebocar ou fechar a firma ali no ato.'
      },
      {
        id: 5,
        texto: 'O conteúdo que você posta gera compartilhamento espontâneo?',
        apoio: 'Conteúdo tem utilidade a longo termo ou identificação profunda o suficiente para outro compartilhar em grupos abertos de conversa.',
        exemplo: 'Um checklist pra salvar no instagram, mas também repassar via botão do App pros familiares numa DM rindo.'
      },
      {
        id: 6,
        texto: 'Suas postagens seguem uma linha direcionada ao que você vende?',
        apoio: 'Excesso de fotos de prato de comida para dono de mecânica foge ao fim, a não ser que tenha lição sobre a oficina. As métricas não fecham o caixa de boletos de sexta com post fofinho vazio.',
        exemplo: 'Tudo de LifeStyle do dono entra desde que reforce que seu suor ou visão tem link com o serviço caro cobrado pelo time de operações da base.'
      },
      {
        id: 7,
        texto: 'As pessoas costumam salvar seus conteúdos para ver depois?',
        apoio: 'Salvamento orgânico treina máquina a aumentar demais o seu Trust/Qualidade do app aos olhos do algoritmo de meta de Zukemberg. É ouro sólido.',
        exemplo: '"Tire print de roteiros turísticos prontos, ou o manual fiscal que serve pros próximos 6 meses." Salvar garante voltar e converter amanhã.'
      },
      {
        id: 8,
        texto: 'Seu conteúdo gera desejo de compra nos seguidores?',
        apoio: 'Se ele arrasta as fotos e tem calafrios por ainda não ser cliente ou detentor daquilo.',
        exemplo: 'Mostrando os bastidores do serviço caro via POV: do pacote, texturas do estofado do veículo nos stories suados.'
      },
      {
        id: 9,
        texto: 'Os produtos/serviços que você vende fazem parte do seu universo de conteúdo?',
        apoio: 'Se vender bolo ou assessoria fiscal de luxo a 3 milhões, a timeline aparenta ter as planilhas ou fornos integradas naturalmente num universo co-existente? ',
        exemplo: 'Os baldes do negócio estão nas traseiras das publicações diárias de rotina.'
      },
      {
        id: 10,
        texto: 'Todas as suas publicações têm um objetivo claro (atrair, relacionar ou vender)?',
        apoio: 'Sem meta para post feito ali de supetão as 17hrs para não falhar diária, engajamento e metas só corroem.',
        exemplo: 'O post tem legenda apontando: Compartilhe (Atrair) | Responda abaixo e crie briga amigável (Relação) | Compre a Link in Bio por R$10 ou esgotar amanha (Vender).'
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
        texto: 'O engajamento que você recebe no feed é alto em relação ao número de seguidores?',
        apoio: 'Se há 1000 seguidores mas apenas 3 curtidas cegas sem comentários num reel. Essa métrica é de mortalidade de app e fantasmas de algoritmo do insta de robôs e afins.',
        exemplo: 'Se houver entre 3-10% por mês (10 likes por cada 100 headcounts de visualização do alcance orgânico final, seu negócio respira de fato).'
      },
      {
        id: 2,
        texto: 'Quando você abre uma caixinha de perguntas, você recebe boas respostas?',
        apoio: 'Uma caixinha respondida orgânica (sem autopreenchimento de si mesmo para esquentar a roda do hamster falso de influencer triste) mostra saúde social da parada comercial toda. ',
        exemplo: 'As indagações virando posts eternos nas redes na semana sequente ao invés do vácuo de resposta zero caixinha ignorada em 22hs totais.'
      },
      {
        id: 3,
        texto: 'Você tem horários estratégicos definidos para suas publicações?',
        apoio: 'Horários nobres (Prime time) para suas publicações se aproveitarem de impulsos quentes da concorrência, não os piores pra si com dados de views.',
        exemplo: 'Checar insights da ferramenta se seu povo da estética noturna tem pico após 21hrs diário etc. E postar e cravar nos minutos certeiros orgânicos totais.'
      },
      {
        id: 4,
        texto: 'Você usa todos os recursos interativos que o Instagram disponibiliza?',
        apoio: 'Testes de termômetro, enquete binária, gifs escondidos, os avatares virtuais feios no fim. Instagram gosta quando se usa o ecossistema fechado que ele deu de graça e o algoritmo mima isso para frente aos novos laços.',
        exemplo: 'Mandar links de zap logo em primeira tela foge as regras. Colocar balanço, barra de curtidas nas vitrines, perguntas longas nativas dos Stories e reels remix.'
      },
      {
        id: 5,
        texto: 'As pessoas comentam espontaneamente que gostam do que você posta?',
        apoio: 'O termômetro do post salvador. As pessoas atestano valor.  Ou as interações do tipo que dizem valeu por partilhar que salvaram sua pele.',
        exemplo: 'Bateria de diretos do IG de emojis fofinhos de chamas ou replies com "vc falou o q eu precisava pro café da manha hoje no escritório maluco daqui". '
      },
      {
        id: 6,
        texto: 'Você usa hashtags de maneira estratégica para ampliar o alcance?',
        apoio: 'São rodovias. Se usar a genérica #amor, tá competindo o algoritmo global porcamente de bilhoes que somem as vezes e bots falsos.',
        exemplo: 'Usando #PadariaEmCampinas ao invés de #Bread (o tráfego local do negócio fisíco é muito mais vital e acirrado aos buscadores). '
      },
      {
        id: 7,
        texto: 'Suas publicações têm chamadas para ação claras que geram resposta?',
        apoio: 'Ver se seu público clica e faz e age. É tipo gritar "corre quem é de Deus pro direct" e checar se foram 5 caboco ou Zero. A conversão imediata e tese vital no mercado de conversões digitais velozes das agencias.',
        exemplo: '"Digite EU QUERO agora" ao invez de falar de forma de manual seco. A tese é dar as cordas pro lead pegar o abacaxi nas conversas laterais secretas. '
      },
      {
        id: 8,
        texto: 'Você analisa as métricas e adapta sua estratégia baseado nos dados?',
        apoio: 'Calar achismos pra olhar de forma de planilheiro exato do excel. O dash de profisinais não mente de engajamentos e perfurações ou saídas de seguidores sem dó da base. ',
        exemplo: 'Tirar uma hr, checar quem evadiu nos últimos dias ou quais post foram 200 salvos seguidos, documentando as vitórias exatas e não os pitacos dos sobrinhos aleatórios de casa sem formação técnica de vendas on-line. '
      },
      {
        id: 9,
        texto: 'Você usa os stories ao longo do dia para manter sua audiência aquecida?',
        apoio: 'A lógica da novela. 1 capitulo de tarde. outro de noite etc. Distrubuir para engordar pontos de vistas e prender a atenção das argamassas on-line mentais e de dopamina no longo prazo do ecossistema e bolha sua social e sua própria tese social da audiência retida de valor das compras da marca própria.',
        exemplo: '7 posts matinais as 7, some de manha toda, depois volta 2 na hora do almoço de fato, 3 a noite pro rescaldo fatal no quarto escuro do povo cansado deitado na calada fria sem grana para balada na TV e tela do cel brilhante de dopamina pura. '
      },
      {
        id: 10,
        texto: 'Você testa novos formatos e funcionalidades lançadas pelo Instagram?',
        apoio: 'A rede bonifica com reach absurdo quem desbrava as neves das frescuras novas.',
        exemplo: 'Na febre de Colabs entrar e abusar das febres dos views duplos. Ou áudios trendings no inicio sem nojo.'
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
