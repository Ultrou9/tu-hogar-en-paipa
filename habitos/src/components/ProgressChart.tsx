import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Habit } from '../types/habit'
import { getLast7Days } from '../utils/storage'

interface Props {
  habits: Habit[]
}

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export function ProgressChart({ habits }: Props) {
  const days = getLast7Days()
  const goodHabits = habits.filter(h => h.kind === 'good')
  const badHabits = habits.filter(h => h.kind === 'bad')

  const data = days.map(date => {
    const d = new Date(date + 'T00:00:00')
    const goodDone = goodHabits.filter(h => h.completions.includes(date)).length
    const badResisted = badHabits.filter(h => h.skips.includes(date)).length
    return {
      day: DAY_LABELS[d.getDay()],
      buenos: goodDone,
      resistidos: badResisted,
      total: goodDone + badResisted,
    }
  })

  if (habits.length === 0) return null

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-4">Últimos 7 días</h3>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} barGap={4}>
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            formatter={(value, name) => [value, name === 'buenos' ? 'Hábitos buenos' : 'Malos resistidos']}
          />
          <Bar dataKey="buenos" fill="#22c55e" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill="#22c55e" />)}
          </Bar>
          <Bar dataKey="resistidos" fill="#f43f5e" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill="#f43f5e" />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-2 justify-center">
        <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded bg-atomic-500 inline-block" /> Buenos completados</span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded bg-bad-500 inline-block" /> Malos resistidos</span>
      </div>
    </div>
  )
}
