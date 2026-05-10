import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  {
    path: '/dashboard', label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    )
  },
  {
    path: '/tasks', label: 'Tasks',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="3" fill={active ? 'currentColor' : 'none'} />
        <path d="M9 12l2 2 4-4" stroke={active ? 'white' : 'currentColor'} />
      </svg>
    )
  },
  {
    path: '/statistics', label: 'Stats',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="12" width="4" height="9" rx="1" fill={active ? 'currentColor' : 'none'} />
        <rect x="10" y="7" width="4" height="14" rx="1" fill={active ? 'currentColor' : 'none'} />
        <rect x="17" y="3" width="4" height="18" rx="1" fill={active ? 'currentColor' : 'none'} />
      </svg>
    )
  },
  {
    path: '/profile', label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    )
  },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-20">
      <div className="flex">
        {navItems.map(({ path, label, icon }) => {
          const active = pathname.startsWith(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${active ? 'text-primary' : 'text-gray-400'}`}
            >
              {icon(active)}
              <span className="text-[10px] font-bold">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
