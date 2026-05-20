export function LawsReference() {
  const good = [
    { law: '1ª Ley', title: 'Hazlo Obvio', icon: '👁', desc: 'Diseña tu entorno para que la señal del hábito sea visible. Usa el apilamiento de hábitos: "Después de X, haré Y".' },
    { law: '2ª Ley', title: 'Hazlo Atractivo', icon: '💛', desc: 'Combina lo que necesitas hacer con algo que disfrutas. Únete a una cultura donde el comportamiento es normal.' },
    { law: '3ª Ley', title: 'Hazlo Fácil', icon: '⚡', desc: 'Reduce la fricción. Usa la regla de los 2 minutos: escala el hábito hasta que puedas hacerlo en 2 minutos.' },
    { law: '4ª Ley', title: 'Hazlo Satisfactorio', icon: '🎉', desc: 'Dale una recompensa inmediata. Registra tus hábitos. Nunca falles dos veces seguidas.' },
  ]

  const bad = [
    { law: '1ª Ley Inv.', title: 'Hazlo Invisible', icon: '🙈', desc: 'Reduce la exposición. Elimina las señales del entorno que desencadenan el mal hábito.' },
    { law: '2ª Ley Inv.', title: 'Hazlo Poco Atractivo', icon: '😐', desc: 'Resalta los beneficios de evitarlo. Reprograma tu mente sobre el hábito.' },
    { law: '3ª Ley Inv.', title: 'Hazlo Difícil', icon: '🧱', desc: 'Aumenta la fricción. Usa un dispositivo de compromiso para bloquear el comportamiento futuro.' },
    { law: '4ª Ley Inv.', title: 'Hazlo Insatisfactorio', icon: '😞', desc: 'Involucra a alguien de confianza. Crea un contrato de hábito que haga el costo del incumplimiento público.' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-700 mb-3">✅ Para crear buenos hábitos</h3>
        <div className="space-y-3">
          {good.map(({ law, title, icon, desc }) => (
            <div key={law} className="flex gap-3 bg-atomic-50 rounded-xl p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-xs font-bold text-atomic-600 uppercase tracking-wide">{law}</p>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-600 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-700 mb-3">❌ Para eliminar malos hábitos</h3>
        <div className="space-y-3">
          {bad.map(({ law, title, icon, desc }) => (
            <div key={law} className="flex gap-3 bg-bad-50 rounded-xl p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-xs font-bold text-bad-600 uppercase tracking-wide">{law}</p>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-600 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
        <p className="font-bold text-indigo-700 mb-1">📈 La Regla del 1%</p>
        <p className="text-sm text-gray-600">
          Si mejorar un 1% cada día durante un año, terminarás siendo 37 veces mejor. Si empeoras un 1% cada día durante un año, acabarás casi en cero. Los pequeños hábitos tienen un impacto enorme.
        </p>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100">
        <p className="font-bold text-amber-700 mb-1">🏆 Nunca falles dos veces</p>
        <p className="text-sm text-gray-600">
          Los días malos ocurren. Lo importante no es la perfección sino volver al camino de inmediato. Un día perdido te hace daño, pero la espiral de fallos consecutivos es lo que destruye el hábito.
        </p>
      </div>
    </div>
  )
}
