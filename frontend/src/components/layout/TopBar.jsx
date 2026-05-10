import { useNavigate } from 'react-router-dom'

export default function TopBar({ title, back, right }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between py-4 px-4 bg-white sticky top-0 z-10 border-b border-gray-100">
      {back ? (
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 active:scale-90 transition-transform">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      ) : <div className="w-9" />}
      <h1 className="font-display font-bold text-lg text-gray-900">{title}</h1>
      {right || <div className="w-9" />}
    </div>
  )
}
