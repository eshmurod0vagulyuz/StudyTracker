import { useEffect, useState } from 'react'
import { achievementAPI } from '../../api/endpoints'
import TopBar from '../../components/layout/TopBar'
import AchievementBadge from '../../components/profile/AchievementBadge'

export default function Achievements() {
  const [all, setAll] = useState([])
  const [earned, setEarned] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([achievementAPI.list(), achievementAPI.mine()])
      .then(([a, m]) => {
        if (a.status === 'fulfilled') {
          const list = a.value.data.results || a.value.data
          setAll(Array.isArray(list) ? list : [])
        }
        if (m.status === 'fulfilled') {
          const earnedList = m.value.data.data || []
          setEarned(earnedList.map((ua) => ua.achievement?.id).filter(Boolean))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-dvh bg-surface-secondary">
      <TopBar title="Achievements" back />

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="px-5 py-4 fade-in">
          <div className="bg-primary/10 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="font-bold text-primary">{earned.length} / {all.length} earned</p>
              <p className="text-xs text-gray-500">Keep completing tasks to unlock more!</p>
            </div>
          </div>

          {all.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-3">🏆</p>
              <p className="font-semibold">No achievements yet</p>
              <p className="text-sm mt-1">Complete tasks to earn badges!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {all.map((a) => (
                <AchievementBadge key={a.id} achievement={a} earned={earned.includes(a.id)} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
