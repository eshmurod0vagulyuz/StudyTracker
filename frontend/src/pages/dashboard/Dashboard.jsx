import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useTaskStore from '../../store/useTaskStore'
import { statsAPI } from '../../api/endpoints'
import BottomNav from '../../components/layout/BottomNav'
import TaskList from '../../components/tasks/TaskList'
import dayjs from 'dayjs'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, fetchMe } = useAuthStore()
  const { fetchTasks, tasks } = useTaskStore()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchMe()
    fetchTasks({ status: 'active' })
    statsAPI.dashboard().then(({ data }) => setStats(data.data)).catch(() => {})
  }, [])

  // tasks array ekanini tekshirish
  const taskList = Array.isArray(tasks) ? tasks : []
  const todayTasks = taskList.slice(0, 3)
  const completedCount = stats?.completed_tasks || 0
  const totalCount = stats?.total_tasks || 0
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const hour = dayjs().hour()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
  const greetEmoji = hour < 12 ? '☀️' : hour < 17 ? '👋' : '🌙'

  return (
    <div className="min-h-dvh bg-surface-secondary">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm text-gray-400 font-semibold">{dayjs().format('dddd, MMM D')}</p>
            <h1 className="font-display font-bold text-xl text-gray-900">
              {greeting}! {greetEmoji}
            </h1>
            {user && <p className="text-sm text-gray-500">Let's make today productive</p>}
          </div>
          <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user?.username?.[0]?.toUpperCase() || '?'}
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-primary rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm text-white/80">Today's Progress</p>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
          <p className="font-display font-bold text-3xl">{progress}%</p>
          <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-white/70 mt-2">{completedCount} of {totalCount} tasks completed</p>
        </div>
      </div>

      {/* Streak */}
      {user?.streak > 0 && (
        <div className="px-5 mt-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="font-bold text-sm text-gray-900">{user.streak} day streak!</p>
              <p className="text-xs text-gray-500">Keep it up, you're on fire!</p>
            </div>
          </div>
        </div>
      )}

      {/* Today's Tasks */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-base text-gray-900">Today's Tasks</h2>
          <button onClick={() => navigate('/tasks')} className="text-primary text-sm font-bold">
            View All →
          </button>
        </div>
        <TaskList tasks={todayTasks} emptyText="No active tasks! Add one +" />
      </div>

      {/* Add task FAB */}
      <button
        onClick={() => navigate('/tasks/add')}
        className="fixed bottom-24 right-5 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/40 active:scale-90 transition-transform z-10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <div className="h-24" />
      <BottomNav />
    </div>
  )
}
