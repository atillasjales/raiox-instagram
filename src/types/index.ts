// ─── Lead ───────────────────────────────────────────────────────────────────
export interface Lead {
  id: string
  nome: string
  email: string
  telefone: string
  created_at: string
}

// ─── Quiz ────────────────────────────────────────────────────────────────────
export type ModuloId =
  | 'perfil'
  | 'posicionamento'
  | 'identidade_visual'
  | 'seguidores'
  | 'conteudo'
  | 'engajamento'

export interface Pergunta {
  id: number
  texto: string
  apoio?: string
  exemplo?: string
}

export interface Modulo {
  id: ModuloId
  titulo: string
  descricao: string
  emoji: string
  perguntas: Pergunta[]
}

export type Respostas = Record<ModuloId, Record<number, number>>

// ─── Avaliação ───────────────────────────────────────────────────────────────
export interface NotasModulo {
  [key: string]: number
  perfil: number
  posicionamento: number
  identidade_visual: number
  seguidores: number
  conteudo: number
  engajamento: number
}

export interface Avaliacao {
  id: string
  lead_id: string
  nota_geral: number
  notas: NotasModulo
  created_at: string
}

// ─── Resultado ───────────────────────────────────────────────────────────────
export type NivelModulo = 'perdido' | 'luneta' | 'tesouro'

export interface DiagnosticoModulo {
  modulo: ModuloId
  titulo: string
  nota: number
  nivel: NivelModulo
  descricao: string
  recomendacoes: string[]
}

export interface ResultadoDiagnostico {
  nota_geral: number
  nivel_geral: NivelModulo
  diagnostico_modulos: DiagnosticoModulo[]
  plano_acao: PlanoAcao
}

export interface EstrategiaConteudo {
  stories: {
    sequencias: string[]
    caixinha_perguntas: string[]
    transformacoes: string[]
    interacoes: string[]
  }
  reels: Array<{ formato: string; tema: string; descricao: string }>
  feed: Array<{ formato: string; tema: string; descricao: string }>
  destaques: string[]
  linha_editorial: {
    frequencia: string
    distribuicao: string
    calendario: string
  }
}

export interface PlanoAcao {
  prioridades: string[]
  oferta_recomendada: 'ativacao' | 'assessoria' | 'ambos'
  mensagem_cta: string
  estrategia_conteudo?: EstrategiaConteudo
}

// ─── Form ─────────────────────────────────────────────────────────────────────
export interface LeadFormData {
  nome: string
  email: string
  telefone: string
  segmento: string
}
