import { useState, useCallback } from 'react'
import { Habit, AppState } from '../types/habit'
import { loadState, saveState, generateId, todayISO } from '../utils/storage'

export function useHabits() {
  const [state, setState] = useState<AppState>(loadState)

  const persist = useCallback((next: AppState) => {
    setState(next)
    saveState(next)
  }, [])

  const addHabit = useCallback((habit: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'skips'>) => {
    const next: AppState = {
      ...state,
      habits: [
        ...state.habits,
        { ...habit, id: generateId(), createdAt: todayISO(), completions: [], skips: [] },
      ],
    }
    persist(next)
  }, [state, persist])

  const deleteHabit = useCallback((id: string) => {
    persist({ ...state, habits: state.habits.filter(h => h.id !== id) })
  }, [state, persist])

  const toggleToday = useCallback((id: string) => {
    const today = todayISO()
    const habits = state.habits.map(h => {
      if (h.id !== id) return h
      const field = h.kind === 'good' ? 'completions' : 'skips'
      const already = h[field].includes(today)
      return {
        ...h,
        [field]: already ? h[field].filter(d => d !== today) : [...h[field], today],
      }
    })
    persist({ ...state, habits })
  }, [state, persist])

  const setIdentity = useCallback((identity: string) => {
    persist({ ...state, identity })
  }, [state, persist])

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    const habits = state.habits.map(h => h.id === id ? { ...h, ...updates } : h)
    persist({ ...state, habits })
  }, [state, persist])

  return {
    habits: state.habits,
    identity: state.identity,
    addHabit,
    deleteHabit,
    toggleToday,
    setIdentity,
    updateHabit,
  }
}
