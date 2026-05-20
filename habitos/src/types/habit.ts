export type HabitKind = 'good' | 'bad'

export type Frequency = 'daily' | 'weekly'

export interface FourLaws {
  // Para hábitos buenos: las 4 leyes positivas
  // Para hábitos malos: las 4 leyes inversas
  law1: string // Obvious / Invisible
  law2: string // Attractive / Unattractive
  law3: string // Easy / Difficult
  law4: string // Satisfying / Unsatisfying
}

export interface Habit {
  id: string
  name: string
  kind: HabitKind
  identity: string       // "Soy el tipo de persona que..."
  cue: string            // Señal / disparador
  craving: string        // Anhelo
  response: string       // Respuesta (acción concreta)
  reward: string         // Recompensa
  twoMinuteVersion: string
  stackWith: string      // Hábito al que se apila
  frequency: Frequency
  laws: FourLaws
  color: string
  emoji: string
  createdAt: string
  completions: string[]  // ISO dates when completed
  skips: string[]        // ISO dates when skipped (bad habits: triggered)
}

export interface AppState {
  habits: Habit[]
  identity: string       // Declaración de identidad global
}
