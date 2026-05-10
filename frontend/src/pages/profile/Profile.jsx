import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { statsAPI } from '../../api/endpoints'
import BottomNav from '../../components/layout/BottomNav'

const menuItems = [
  { icon: '🏆', label: 'Achievements', path: '/profile/achievements' },
  { icon: '📖', label: 'Study History', path: '/history' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { user, fetchMe, logout } = useAuthStore()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchMe()
    statsAPI.dashboard()
      .then(({ data }) => setStats(data.data))
      .catch(() => {})
  }, [])

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout()
      navigate('/login')
    }
  }

  return (
    <div className="min-h-dvh bg-surface-secondary">
      <div className="bg-white px-5 pt-12 pb-5 sticky top-0 z-10">
        <h1 className="font-display font-bold text-xl text-gray-900">Profile</h1>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4 fade-in">
        {/* User Card */}
        <div className="bg-primary rounded-2xl p-5 text-white">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-display font-bold border-2 border-white/30">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">{user?.username || 'User'}</h2>
              <p className="text-white/70 text-sm">{user?.email || ''}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">Student</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-white/10 rounded-xl p-3">
            <div className="text-center">
              <p className="font-display font-bold text-xl">{stats?.total_tasks || 0}</p>
              <p className="text-xs text-white/70">Total Tasks</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="font-display font-bold text-xl">{user?.completion_rate ?? stats?.completion_rate ?? 0}%</p>
              <p className="text-xs text-white/70">Completion</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-xl">{user?.streak || 0}</p>
              <p className="text-xs text-white/70">Day Streak</p>
            </div>
          </div>
        </div>

        {/* Best streak */}
        {user?.best_streak > 0 && (
          <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">🏅</span>
            <div>
              <p className="font-bold text-sm text-gray-900">Best Streak</p>
              <p className="text-xs text-gray-500">{user.best_streak} days in a row</p>
            </div>
          </div>
        )}

        {/* Menu */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {menuItems.map(({ icon, label, path }, i) => (
            <button
              key={label}
              onClick={() => path && navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors ${
                i < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-xl w-8">{icon}</span>
              <span className="flex-1 text-left font-semibold text-gray-800">{label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-500 font-bold rounded-2xl py-4 active:scale-[0.98] transition-transform"
        >
          🚪 Logout
        </button>
      </div>

      <div className="h-24" />
      <BottomNav />
    </div>
  )
}
