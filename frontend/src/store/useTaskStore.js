import { create } from 'zustand'
import { taskAPI, subjectAPI } from '../api/endpoints'

const useTaskStore = create((set, get) => ({
  tasks: [],
  subjects: [],
  loading: false,
  filter: 'all',

  setFilter: (filter) => set({ filter }),

  fetchTasks: async (params) => {
    set({ loading: true })
    try {
      const { data } = await taskAPI.list(params)
      // Backend pagination yoki oddiy array bo'lishi mumkin
      const list = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : [])
      set({ tasks: list, loading: false })
    } catch {
      set({ tasks: [], loading: false })
    }
  },

  fetchSubjects: async () => {
    try {
      const { data } = await subjectAPI.list()
      const list = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : [])
      set({ subjects: list })
    } catch {
      set({ subjects: [] })
    }
  },

  createTask: async (taskData) => {
    try {
      const { data } = await taskAPI.create(taskData)
      set((state) => ({ tasks: [data, ...state.tasks] }))
      return true
    } catch (err) {
      return err.response?.data || false
    }
  },

  completeTask: async (id) => {
    try {
      await taskAPI.complete(id)
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, status: 'completed' } : t
        ),
      }))
      return true
    } catch {
      return false
    }
  },

  deleteTask: async (id) => {
    try {
      await taskAPI.delete(id)
      set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }))
      return true
    } catch {
      return false
    }
  },

  getFilteredTasks: () => {
    const { tasks, filter } = get()
    if (!Array.isArray(tasks)) return []
    if (filter === 'active') return tasks.filter((t) => t.status === 'active')
    if (filter === 'completed') return tasks.filter((t) => t.status === 'completed')
    return tasks
  },
}))

export default useTaskStore
