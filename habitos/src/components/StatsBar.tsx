import { Habit } from '../types/habit'
import { todayISO, getStreak } from '../utils/storage'
import { Flame, CheckCircle, XCircle, Zap } from 'lucide-react'

interface Props {
  habits: Habit[]
}

export function StatsBar({ habits }: Props) {
  const today = todayISO()
  const good = habits.filter(h => h.kind === 'good')
  const bad = habits.filter(h => h.kind === 'bad')
  const goodDone = good.filter(h => h.completions.includes(today)).length
  const badResisted = bad.filter(h => h.skips.includes(today)).length
  const topStreak = habits.reduce((max, h) => Math.max(max, getStreak(h)), 0)
  const score = goodDone + badResisted

  return (
    <div className="grid grid-cols-4 gap-3">
      {[
        { icon: <CheckCircle size={18} className="text-atomic-500" />, value: `${goodDone}/${good.length}`, label: 'Buenos hoy', color: 'bg-atomic-50' },
        { icon: <XCircle size={18} className="text-bad-500" />, value: `${badResisted}/${bad.length}`, label: 'Resistidos', color: 'bg-bad-50' },
        { icon: <Flame size={18} className="text-orange-400" />, value: topStreak, label: 'Racha máx', color: 'bg-orange-50' },
        { icon: <Zap size={18} className="text-yellow-500" />, value: score, label: 'Puntos hoy', color: 'bg-yellow-50' },
      ].map(({ icon, value, label, color }) => (
        <div key={label} className={`${color} rounded-xl p-3 text-center`}>
          <div className="flex justify-center mb-1">{icon}</div>
          <p className="font-bold text-gray-800 text-lg leading-none">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{label}</p>
        </div>
      ))}
    </div>
  )
}
