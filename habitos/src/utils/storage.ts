import { AppState, Habit } from '../types/habit'

const KEY = 'atomic-habits-app'

const defaultState: AppState = {
  habits: [],
  identity: '',
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState
    return JSON.parse(raw) as AppState
  } catch {
    return defaultState
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getStreak(habit: Habit): number {
  const dates = habit.kind === 'good' ? habit.completions : habit.skips
  const sorted = [...dates].sort().reverse()
  let streak = 0
  let cursor = new Date()
  cursor.setHours(0, 0, 0, 0)

  for (const d of sorted) {
    const day = new Date(d + 'T00:00:00')
    const diff = Math.round((cursor.getTime() - day.getTime()) / 86400000)
    if (diff === 0 || diff === 1) {
      streak++
      cursor = day
    } else {
      break
    }
  }
  return streak
}

export function getCompletionRate(habit: Habit, days = 30): number {
  const dates = habit.kind === 'good' ? habit.completions : habit.skips
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const recent = dates.filter(d => new Date(d) >= cutoff)
  return Math.round((recent.length / days) * 100)
}

export function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
}
