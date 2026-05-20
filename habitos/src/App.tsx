import { useState } from 'react'
import { useHabits } from './hooks/useHabits'
import { IdentityCard } from './components/IdentityCard'
import { HabitCard } from './components/HabitCard'
import { HabitForm } from './components/HabitForm'
import { ProgressChart } from './components/ProgressChart'
import { StatsBar } from './components/StatsBar'
import { LawsReference } from './components/LawsReference'
import { HabitKind } from './types/habit'
import { Plus, LayoutDashboard, BookOpen, TrendingUp } from 'lucide-react'

type Tab = 'hoy' | 'progreso' | 'leyes'

export default function App() {
  const { habits, identity, addHabit, deleteHabit, toggleToday, setIdentity } = useHabits()
  const [tab, setTab] = useState<Tab>('hoy')
  const [showForm, setShowForm] = useState(false)
  const [formKind, setFormKind] = useState<HabitKind>('good')
  const [filter, setFilter] = useState<'all' | 'good' | 'bad'>('all')

  const openForm = (kind: HabitKind) => { setFormKind(kind); setShowForm(true) }
  const filtered = habits.filter(h => filter === 'all' || h.kind === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto pb-24">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 sticky top-0 z-10">
          <h1 className="text-2xl font-black text-gray-900">Hábitos Atómicos</h1>
          <p className="text-sm text-gray-400">Pequeños cambios, resultados extraordinarios</p>
        </div>

        <div className="px-4 py-5 space-y-5">
          {tab === 'hoy' && (
            <>
              <IdentityCard identity={identity} onSave={setIdentity} />
              <StatsBar habits={habits} />

              {/* Filtros */}
              <div className="flex gap-2">
                {(['all', 'good', 'bad'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filter === f ? 'bg-gray-800 text-white' : 'bg-white text-gray-500 border border-gray-200'
                    }`}
                  >
                    {f === 'all' ? 'Todos' : f === 'good' ? '✅ Buenos' : '❌ Malos'}
                  </button>
                ))}
              </div>

              {/* Lista de hábitos */}
              <div className="space-y-3">
                {filtered.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-4xl mb-3">🌱</p>
                    <p className="font-medium">Aún no tienes hábitos</p>
                    <p className="text-sm mt-1">¡Empieza agregando uno abajo!</p>
                  </div>
                )}
                {filtered.map(h => (
                  <HabitCard key={h.id} habit={h} onToggle={toggleToday} onDelete={deleteHabit} />
                ))}
              </div>

              {/* Botones agregar */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => openForm('good')} className="flex items-center justify-center gap-2 bg-atomic-500 hover:bg-atomic-600 text-white rounded-xl py-3 font-semibold text-sm transition-colors">
                  <Plus size={18} /> Buen hábito
                </button>
                <button onClick={() => openForm('bad')} className="flex items-center justify-center gap-2 bg-bad-500 hover:bg-bad-600 text-white rounded-xl py-3 font-semibold text-sm transition-colors">
                  <Plus size={18} /> Mal hábito
                </button>
              </div>
            </>
          )}

          {tab === 'progreso' && (
            <div className="space-y-5">
              <h2 className="font-bold text-gray-800 text-lg">Tu progreso</h2>
              <ProgressChart habits={habits} />

              {habits.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide">Rachas por hábito</h3>
                  {habits.map(h => {
                    const field = h.kind === 'good' ? 'completions' : 'skips'
                    const total = h[field].length
                    return (
                      <div key={h.id} className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100">
                        <span className="text-xl">{h.emoji}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{h.name}</p>
                          <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
                            <span>{total} veces totales</span>
                            <span>·</span>
                            <span>{h.kind === 'good' ? 'Hábito bueno' : 'Mal hábito'}</span>
                          </div>
                        </div>
                        <div className={`text-right text-xs font-bold px-3 py-1.5 rounded-lg ${h.kind === 'good' ? 'bg-atomic-100 text-atomic-700' : 'bg-bad-100 text-bad-700'}`}>
                          {total} días
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {habits.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-3">📊</p>
                  <p>Agrega hábitos para ver tu progreso</p>
                </div>
              )}
            </div>
          )}

          {tab === 'leyes' && (
            <div className="space-y-4">
              <h2 className="font-bold text-gray-800 text-lg">Las Leyes del Cambio</h2>
              <LawsReference />
            </div>
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 z-10">
        {([
          { id: 'hoy', icon: <LayoutDashboard size={22} />, label: 'Hoy' },
          { id: 'progreso', icon: <TrendingUp size={22} />, label: 'Progreso' },
          { id: 'leyes', icon: <BookOpen size={22} />, label: 'Leyes' },
        ] as { id: Tab; icon: React.ReactNode; label: string }[]).map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-col items-center gap-1 px-5 transition-colors ${tab === id ? 'text-atomic-600' : 'text-gray-400'}`}
          >
            {icon}
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {showForm && (
        <HabitForm defaultKind={formKind} onSave={addHabit} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
