import { Modulo } from '@/types'

export const MODULOS: Modulo[] = [
  {
    id: 'perfil',
    titulo: 'Perfil',
    descricao: 'Análise da sua presença inicial — bio, foto, destaques e primeiras impressões.',
    emoji: '👤',
    perguntas: [
      { id: 1, texto: 'Sua foto de perfil transmite clareza e profissionalismo para a sua marca?' },
      { id: 2, texto: 'A bio representa bem seus serviços, marca e conteúdo?' },
      { id: 3, texto: 'Seu nome de usuário (@) é fácil de memorizar e encontrar?' },
      { id: 4, texto: 'O nome em negrito traz sua especialidade ou nome + especialidade?' },
      { id: 5, texto: 'A bio deixa claro para quem você oferece seus produtos/serviços?' },
      { id: 6, texto: 'Sua bio é persuasiva o suficiente para converter visitante em seguidor?' },
      { id: 7, texto: 'Seu perfil tem todas as formas de contato (email, telefone, botão de ação)?' },
      { id: 8, texto: 'Existe uma chamada para ação clara que leva ao link da bio?' },
      { id: 9, texto: 'Seus destaques são usados de forma estratégica (não apenas fotos aleatórias)?' },
      { id: 10, texto: 'Alguém que nunca te viu entende em 5 segundos o que você oferece?' },
    ],
  },
  {
    id: 'posicionamento',
    titulo: 'Posicionamento',
    descricao: 'Como sua marca se diferencia e comunica seu propósito no mercado.',
    emoji: '🎯',
    perguntas: [
      { id: 1, texto: 'Alguém que não te conhece consegue identificar seu diferencial só pelo perfil?' },
      { id: 2, texto: 'Você emite opiniões claras sobre assuntos do seu segmento?' },
      { id: 3, texto: 'As pessoas chegam com perguntas relacionadas ao que você realmente vende?' },
      { id: 4, texto: 'Você defende uma causa ou bandeira de forma clara no seu conteúdo?' },
      { id: 5, texto: 'Seu posicionamento gera conexão imediata do público com sua marca?' },
      { id: 6, texto: 'Está claro para você (e para o público) por que devem te escolher?' },
      { id: 7, texto: 'As pessoas conhecem os bastidores do que há por trás do que você vende?' },
      { id: 8, texto: 'Seu posicionamento transmite confiança e autoridade no seu nicho?' },
      { id: 9, texto: 'Você é consistente na mensagem que passa em todos os formatos de conteúdo?' },
      { id: 10, texto: 'Seu perfil cria um sentimento de identificação e pertencimento na audiência?' },
    ],
  },
  {
    id: 'identidade_visual',
    titulo: 'Identidade Visual',
    descricao: 'A coerência estética do seu perfil — cores, fontes, elementos e reconhecimento.',
    emoji: '🎨',
    perguntas: [
      { id: 1, texto: 'Seu perfil tem um padrão característico de cores bem definido?' },
      { id: 2, texto: 'Seu perfil é de fácil compreensão para quem chega pela primeira vez?' },
      { id: 3, texto: 'As fontes que você usa fazem parte da sua identidade e têm boa leitura?' },
      { id: 4, texto: 'Existem elementos gráficos característicos e reconhecíveis da sua marca?' },
      { id: 5, texto: 'As pessoas reconheceriam uma publicação sua mesmo sem ver sua logo?' },
      { id: 6, texto: 'Existe um padrão de layout específico nas suas campanhas de venda?' },
      { id: 7, texto: 'Sua identidade visual reflete a personalidade da sua marca?' },
      { id: 8, texto: 'Olhando a tela inicial do perfil, a comunicação visual é impactante?' },
      { id: 9, texto: 'Você investe em mostrar visualmente o que você vende de formas criativas?' },
      { id: 10, texto: 'Seu moodboard visual é consistente e atualizado frequentemente?' },
    ],
  },
  {
    id: 'seguidores',
    titulo: 'Seguidores',
    descricao: 'A qualidade, engajamento e alinhamento da sua audiência com seu negócio.',
    emoji: '👥',
    perguntas: [
      { id: 1, texto: 'A maioria dos seus seguidores tem o perfil do seu cliente ideal?' },
      { id: 2, texto: 'Quando as pessoas perguntam o preço, elas tendem a fechar negócio?' },
      { id: 3, texto: 'Quando você faz uma oferta, o nível de resposta positiva é alto?' },
      { id: 4, texto: 'Você responde todos os comentários e directs com agilidade e personalização?' },
      { id: 5, texto: 'Sua audiência é participativa com o que você publica?' },
      { id: 6, texto: 'Você envolve seu público nas tomadas de decisão da sua marca?' },
      { id: 7, texto: 'Seus seguidores recomendam seu conteúdo ou o que você vende?' },
      { id: 8, texto: 'Você repete os formatos de publicação que mais atraíram seguidores?' },
      { id: 9, texto: 'Você usa os stories estrategicamente para reter e engajar a audiência?' },
      { id: 10, texto: 'Você tem clareza sobre quem é o seu seguidor e quais são suas dores?' },
    ],
  },
  {
    id: 'conteudo',
    titulo: 'Conteúdo',
    descricao: 'A estratégia, relevância e poder de conversão do que você publica.',
    emoji: '📝',
    perguntas: [
      { id: 1, texto: 'Seu conteúdo tem chamado a atenção das pessoas com frequência?' },
      { id: 2, texto: 'Você tem atraído novos seguidores consistentemente através do conteúdo?' },
      { id: 3, texto: 'Seu posicionamento fica claro através do que você escreve nas legendas?' },
      { id: 4, texto: 'Seu conteúdo é nichado (específico) e não generalista?' },
      { id: 5, texto: 'O conteúdo que você posta gera compartilhamento espontâneo?' },
      { id: 6, texto: 'Suas postagens seguem uma linha direcionada ao que você vende?' },
      { id: 7, texto: 'As pessoas costumam salvar seus conteúdos para ver depois?' },
      { id: 8, texto: 'Seu conteúdo gera desejo de compra nos seguidores?' },
      { id: 9, texto: 'Os produtos/serviços que você vende fazem parte do seu universo de conteúdo?' },
      { id: 10, texto: 'Todas as suas publicações têm um objetivo claro (atrair, relacionar ou vender)?' },
    ],
  },
  {
    id: 'engajamento',
    titulo: 'Engajamento',
    descricao: 'A força das interações, uso dos recursos do Instagram e alcance orgânico.',
    emoji: '⚡',
    perguntas: [
      { id: 1, texto: 'O engajamento que você recebe no feed é alto em relação ao número de seguidores?' },
      { id: 2, texto: 'Quando você abre uma caixinha de perguntas, você recebe boas respostas?' },
      { id: 3, texto: 'Você tem horários estratégicos definidos para suas publicações?' },
      { id: 4, texto: 'Você usa todos os recursos interativos que o Instagram disponibiliza?' },
      { id: 5, texto: 'As pessoas comentam espontaneamente que gostam do que você posta?' },
      { id: 6, texto: 'Você usa hashtags de maneira estratégica para ampliar o alcance?' },
      { id: 7, texto: 'Suas publicações têm chamadas para ação claras que geram resposta?' },
      { id: 8, texto: 'Você analisa as métricas e adapta sua estratégia baseado nos dados?' },
      { id: 9, texto: 'Você usa os stories ao longo do dia para manter sua audiência aquecida?' },
      { id: 10, texto: 'Você testa novos formatos e funcionalidades lançadas pelo Instagram?' },
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
