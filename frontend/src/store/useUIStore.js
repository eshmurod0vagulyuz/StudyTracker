import { create } from 'zustand'

const useUIStore = create((set) => ({
  toast: null,
  showToast: (message, type = 'success') => {
    set({ toast: { message, type } })
    setTimeout(() => set({ toast: null }), 3000)
  },
  clearToast: () => set({ toast: null }),
}))

export default useUIStore
