import { useState } from 'react'
import { UserCircle, Edit2, Check } from 'lucide-react'

interface Props {
  identity: string
  onSave: (value: string) => void
}

export function IdentityCard({ identity, onSave }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(identity)

  const save = () => {
    onSave(draft)
    setEditing(false)
  }

  return (
    <div className="bg-gradient-to-br from-atomic-600 to-atomic-800 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <UserCircle size={22} />
        <span className="font-semibold text-atomic-100 text-sm uppercase tracking-wider">Tu Identidad</span>
      </div>
      {editing ? (
        <div className="flex gap-2">
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && save()}
            placeholder="Soy el tipo de persona que..."
            className="flex-1 bg-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 outline-none border border-white/30 focus:border-white"
          />
          <button onClick={save} className="bg-white text-atomic-700 rounded-lg px-3 py-2 hover:bg-atomic-50">
            <Check size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <p className="flex-1 text-lg font-medium">
            {identity || <span className="text-white/50 italic">Define quién quieres ser...</span>}
          </p>
          <button onClick={() => { setDraft(identity); setEditing(true) }} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Edit2 size={16} />
          </button>
        </div>
      )}
      <p className="mt-3 text-xs text-atomic-200">
        📖 "El cambio real es un cambio de identidad. Cada acción es un voto por el tipo de persona que deseas ser." — James Clear
      </p>
    </div>
  )
}
