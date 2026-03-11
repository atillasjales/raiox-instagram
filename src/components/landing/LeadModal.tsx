'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LeadFormData } from '@/types'

const schema = z.object({
  nome: z.string().min(2, 'Digite seu nome completo'),
  email: z.string().email('Digite um e-mail válido'),
  telefone: z
    .string()
    .min(10, 'Digite um telefone válido')
    .regex(/^[\d\s\(\)\-\+]+$/, 'Telefone inválido'),
  segmento: z.string().min(2, 'Selecione ou digite seu segmento'),
})

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function LeadModal({ isOpen, onClose }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [useCustomSegmento, setUseCustomSegmento] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: LeadFormData) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao salvar dados')

      // Store lead info in session for the quiz/resultado
      sessionStorage.setItem('lead_id', json.id)
      sessionStorage.setItem('lead_nome', data.nome)
      sessionStorage.setItem('lead_segmento', data.segmento)

      onClose()
      router.push('/quiz')
    } catch (err: any) {
      setError(err.message || 'Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-3xl border border-white/10 overflow-hidden animate-fade-up">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-pink to-brand-purple" />

        <div className="p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-brand-muted hover:text-brand-cream transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="text-3xl mb-3">🔬</div>
            <h2 className="font-display font-bold text-2xl text-brand-cream mb-2">
              Vamos começar seu diagnóstico
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed">
              Preencha abaixo para receber o resultado completo por e-mail assim que terminar.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-xs font-medium text-brand-muted uppercase tracking-wider mb-2">
                Seu nome
              </label>
              <input
                {...register('nome')}
                type="text"
                placeholder="Como posso te chamar?"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-pink transition-colors"
              />
              {errors.nome && (
                <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-brand-muted uppercase tracking-wider mb-2">
                E-mail
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-pink transition-colors"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-xs font-medium text-brand-muted uppercase tracking-wider mb-2">
                WhatsApp / Telefone
              </label>
              <input
                {...register('telefone')}
                type="tel"
                placeholder="(81) 99999-9999"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-pink transition-colors"
              />
              {errors.telefone && (
                <p className="text-red-400 text-xs mt-1">{errors.telefone.message}</p>
              )}
            </div>

            {/* Segmento */}
            <div>
              <label className="block text-xs font-medium text-brand-muted uppercase tracking-wider mb-2">
                Seu Segmento de Atuação
              </label>
              {!useCustomSegmento ? (
                <select
                  {...register('segmento')}
                  onChange={(e) => {
                    if (e.target.value === 'Outro') {
                      setUseCustomSegmento(true)
                      e.target.value = ''
                    } else {
                      register('segmento').onChange(e)
                    }
                  }}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-pink transition-colors appearance-none"
                >
                  <option value="" disabled selected>Selecione seu nicho...</option>
                  <option value="Clínica Médica / Odontológica">Clínica Médica / Odontológica</option>
                  <option value="Estética e Beleza">Estética e Beleza</option>
                  <option value="Advocacia / Escritório Jurídico">Advocacia / Escritório Jurídico</option>
                  <option value="Imobiliária / Corretor">Imobiliária / Corretor</option>
                  <option value="Varejo / Loja Física">Varejo / Loja Física</option>
                  <option value="Restaurante / Delivery">Restaurante / Delivery</option>
                  <option value="Prestação de Serviços">Prestação de Serviços</option>
                  <option value="Infoproduto / Educação">Infoproduto / Educação</option>
                  <option value="Outro">Outro (Digitar)</option>
                </select>
              ) : (
                <input
                  {...register('segmento')}
                  type="text"
                  placeholder="Qual o seu segmento?"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-pink transition-colors"
                  autoFocus
                />
              )}
              {errors.segmento && (
                <p className="text-red-400 text-xs mt-1">{errors.segmento.message}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-pink hover:bg-brand-pink-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Iniciando diagnóstico...
                </>
              ) : (
                <>
                  Começar diagnóstico grátis
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-xs text-brand-muted pt-1">
              Seus dados estão seguros. Não enviamos spam.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
