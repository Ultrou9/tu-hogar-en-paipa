import { Habit } from '../types/habit'
import { getStreak, todayISO } from '../utils/storage'
import { Trash2, Flame, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface Props {
  habit: Habit
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const GOOD_LAWS = [
  { label: '👁 Hazlo Obvio', key: 'law1' },
  { label: '💛 Hazlo Atractivo', key: 'law2' },
  { label: '⚡ Hazlo Fácil', key: 'law3' },
  { label: '🎉 Hazlo Satisfactorio', key: 'law4' },
]

const BAD_LAWS = [
  { label: '🙈 Hazlo Invisible', key: 'law1' },
  { label: '😐 Hazlo Poco Atractivo', key: 'law2' },
  { label: '🧱 Hazlo Difícil', key: 'law3' },
  { label: '😞 Hazlo Insatisfactorio', key: 'law4' },
]

export function HabitCard({ habit, onToggle, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false)
  const today = todayISO()
  const field = habit.kind === 'good' ? 'completions' : 'skips'
  const doneToday = habit[field].includes(today)
  const streak = getStreak(habit)
  const laws = habit.kind === 'good' ? GOOD_LAWS : BAD_LAWS
  const isGood = habit.kind === 'good'

  return (
    <div className={`rounded-2xl border-2 shadow-sm transition-all ${
      isGood
        ? doneToday ? 'border-atomic-400 bg-atomic-50' : 'border-gray-200 bg-white'
        : doneToday ? 'border-bad-400 bg-bad-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">{habit.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-gray-800 truncate">{habit.name}</h3>
              <div className="flex items-center gap-1.5 shrink-0">
                {streak > 0 && (
                  <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                    isGood ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                    <Flame size={12} />
                    {streak}
                  </span>
                )}
                <button onClick={() => onDelete(habit.id)} className="p-1 text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 italic">"{habit.identity}"</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onToggle(habit.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-medium text-sm transition-all ${
              isGood
                ? doneToday
                  ? 'bg-atomic-500 text-white hover:bg-atomic-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-atomic-100 hover:text-atomic-700'
                : doneToday
                  ? 'bg-bad-500 text-white hover:bg-bad-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-bad-100 hover:text-bad-700'
            }`}
          >
            {isGood
              ? doneToday ? <><CheckCircle2 size={16} /> ¡Completado!</> : <><CheckCircle2 size={16} /> Marcar hoy</>
              : doneToday ? <><XCircle size={16} /> Resistido hoy</> : <><XCircle size={16} /> Resistir hoy</>
            }
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {laws.map(({ label, key }) => (
              <div key={key} className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
                <p className="text-sm text-gray-700">{habit.laws[key as keyof typeof habit.laws] || '—'}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-blue-50 rounded-lg p-2.5">
              <p className="text-xs font-semibold text-blue-400 mb-1">⏱ Regla de 2 min</p>
              <p className="text-gray-700">{habit.twoMinuteVersion || '—'}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-2.5">
              <p className="text-xs font-semibold text-purple-400 mb-1">🔗 Apilar con</p>
              <p className="text-gray-700">{habit.stackWith || '—'}</p>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-2.5 text-sm">
            <p className="text-xs font-semibold text-yellow-500 mb-1">🔁 Bucle del hábito</p>
            <p className="text-gray-600">
              <span className="text-gray-400">Señal:</span> {habit.cue} →{' '}
              <span className="text-gray-400">Anhelo:</span> {habit.craving} →{' '}
              <span className="text-gray-400">Respuesta:</span> {habit.response} →{' '}
              <span className="text-gray-400">Recompensa:</span> {habit.reward}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
