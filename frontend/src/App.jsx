import AppRouter from './router/AppRouter'
import useUIStore from './store/useUIStore'

export default function App() {
  const { toast } = useUIStore()

  return (
    <>
      <AppRouter />
      {toast && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-bold slide-up max-w-xs text-center ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-gray-900'
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  )
}
