import { useState } from 'react'
import { Habit, HabitKind, FourLaws } from '../types/habit'
import { X } from 'lucide-react'

interface Props {
  defaultKind?: HabitKind
  onSave: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'skips'>) => void
  onClose: () => void
}

const EMOJIS = ['🏃', '📚', '🧘', '💧', '🥗', '💪', '🧠', '✍️', '🎯', '🌅', '😴', '🚭', '🍺', '📱', '🍔', '😤', '🎮', '🛒']
const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1']

const GOOD_LAWS_LABELS = [
  { key: 'law1', title: '1. Hazlo Obvio', hint: 'ej. Pongo los zapatos junto a la puerta' },
  { key: 'law2', title: '2. Hazlo Atractivo', hint: 'ej. Escucho mi podcast favorito solo al correr' },
  { key: 'law3', title: '3. Hazlo Fácil', hint: 'ej. Solo 5 minutos al principio' },
  { key: 'law4', title: '4. Hazlo Satisfactorio', hint: 'ej. Marco mi calendario cada día completado' },
]

const BAD_LAWS_LABELS = [
  { key: 'law1', title: '1. Hazlo Invisible', hint: 'ej. Elimino la app del celular' },
  { key: 'law2', title: '2. Hazlo Poco Atractivo', hint: 'ej. Recuerdo cómo me siento después' },
  { key: 'law3', title: '3. Hazlo Difícil', hint: 'ej. Pongo obstáculos físicos en el camino' },
  { key: 'law4', title: '4. Hazlo Insatisfactorio', hint: 'ej. Comparto con alguien mis fallos' },
]

export function HabitForm({ defaultKind = 'good', onSave, onClose }: Props) {
  const [kind, setKind] = useState<HabitKind>(defaultKind)
  const [name, setName] = useState('')
  const [identity, setIdentity] = useState('')
  const [cue, setCue] = useState('')
  const [craving, setCraving] = useState('')
  const [response, setResponse] = useState('')
  const [reward, setReward] = useState('')
  const [twoMin, setTwoMin] = useState('')
  const [stackWith, setStackWith] = useState('')
  const [emoji, setEmoji] = useState('🎯')
  const [color, setColor] = useState(COLORS[0])
  const [laws, setLaws] = useState<FourLaws>({ law1: '', law2: '', law3: '', law4: '' })

  const lawLabels = kind === 'good' ? GOOD_LAWS_LABELS : BAD_LAWS_LABELS

  const setLaw = (key: keyof FourLaws, value: string) => setLaws(l => ({ ...l, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name, kind, identity, cue, craving, response, reward, twoMinuteVersion: twoMin, stackWith, emoji, color, frequency: 'daily', laws })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-gray-800">Nuevo hábito</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Tipo */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            <button type="button" onClick={() => setKind('good')} className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${kind === 'good' ? 'bg-atomic-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              ✅ Hábito Bueno
            </button>
            <button type="button" onClick={() => setKind('bad')} className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${kind === 'bad' ? 'bg-bad-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              ❌ Mal Hábito
            </button>
          </div>

          {/* Nombre y emoji */}
          <div>
            <label className="label">Nombre del hábito *</label>
            <div className="flex gap-2">
              <select value={emoji} onChange={e => setEmoji(e.target.value)} className="input w-14 text-center text-xl px-1">
                {EMOJIS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder={kind === 'good' ? 'ej. Correr 30 minutos' : 'ej. Revisar redes sociales'} className="input flex-1" />
            </div>
          </div>

          {/* Identidad */}
          <div>
            <label className="label">Declaración de identidad</label>
            <input value={identity} onChange={e => setIdentity(e.target.value)} placeholder={kind === 'good' ? 'Soy el tipo de persona que cuida su salud' : 'No soy el tipo de persona que desperdicia tiempo'} className="input" />
          </div>

          {/* Bucle del hábito */}
          <div className="space-y-2">
            <p className="label">🔁 Bucle del Hábito</p>
            <input value={cue} onChange={e => setCue(e.target.value)} placeholder="Señal — ¿qué lo dispara?" className="input" />
            <input value={craving} onChange={e => setCraving(e.target.value)} placeholder="Anhelo — ¿qué deseas?" className="input" />
            <input value={response} onChange={e => setResponse(e.target.value)} placeholder="Respuesta — ¿qué haces exactamente?" className="input" />
            <input value={reward} onChange={e => setReward(e.target.value)} placeholder="Recompensa — ¿qué ganas?" className="input" />
          </div>

          {/* 4 Leyes */}
          <div className="space-y-2">
            <p className="label">{kind === 'good' ? '⚖️ Las 4 Leyes del Bien' : '⚖️ Las 4 Leyes Inversas'}</p>
            {lawLabels.map(({ key, title, hint }) => (
              <div key={key}>
                <p className="text-xs font-semibold text-gray-500 mb-1">{title}</p>
                <input
                  value={laws[key as keyof FourLaws]}
                  onChange={e => setLaw(key as keyof FourLaws, e.target.value)}
                  placeholder={hint}
                  className="input"
                />
              </div>
            ))}
          </div>

          {/* Regla 2 min + Apilamiento */}
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="label">⏱ Versión de 2 minutos</label>
              <input value={twoMin} onChange={e => setTwoMin(e.target.value)} placeholder="ej. Solo ponerme los zapatos de correr" className="input" />
            </div>
            <div>
              <label className="label">🔗 Apilar con (hábito existente)</label>
              <input value={stackWith} onChange={e => setStackWith(e.target.value)} placeholder="ej. Después de cepillarme los dientes" className="input" />
            </div>
          </div>

          <button type="submit" className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${kind === 'good' ? 'bg-atomic-500 hover:bg-atomic-600' : 'bg-bad-500 hover:bg-bad-600'}`}>
            Agregar hábito
          </button>
        </form>
      </div>
    </div>
  )
}
