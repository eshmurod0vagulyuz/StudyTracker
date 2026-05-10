import { useEffect, useState } from 'react'
import { statsAPI } from '../../api/endpoints'
import BottomNav from '../../components/layout/BottomNav'
import StatCard from '../../components/statistics/StatCard'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function StatisticsPage() {
  const [stats, setStats] = useState(null)
  const [weekly, setWeekly] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      statsAPI.dashboard(),
      statsAPI.weekly(),
    ]).then(([d, w]) => {
      if (d.status === 'fulfilled') setStats(d.value.data.data)
      if (w.status === 'fulfilled') setWeekly(w.value.data.data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-surface-secondary">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const subjectData = stats?.tasks_by_subject?.map((s) => ({
    name: s.subject__name || 'Unknown',
    tasks: s.count,
    color: s.subject__color || '#2E7D32',
  })) || []

  return (
    <div className="min-h-dvh bg-surface-secondary">
      <div className="bg-white px-5 pt-12 pb-5 sticky top-0 z-10">
        <h1 className="font-display font-bold text-xl text-gray-900">Statistics</h1>
        <p className="text-xs text-gray-400">Track your progress</p>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3 fade-in">
        <StatCard
          title="Current Streak"
          value={`${stats?.streak || 0} days`}
          icon="🔥"
          color="#FF6B35"
        />
        <StatCard
          title="Tasks Completed"
          value={stats?.completed_tasks || 0}
          icon="✅"
          color="#FFB800"
          subtitle={`${stats?.completion_rate || 0}% completion rate`}
        />
        <StatCard
          title="This Week"
          value={weekly?.weekly_tasks_completed || 0}
          icon="📅"
          color="#2E7D32"
          subtitle={`of ${weekly?.weekly_tasks_total || 0} tasks`}
        />

        {/* Weekly Study Time */}
        {(weekly?.weekly_study_minutes > 0) && (
          <div className="bg-white rounded-2xl p-4">
            <p className="font-bold text-sm text-gray-900 mb-1">Weekly Study Time</p>
            <p className="text-2xl font-display font-bold text-primary">
              {Math.floor((weekly?.weekly_study_minutes || 0) / 60)}h {(weekly?.weekly_study_minutes || 0) % 60}m
            </p>
          </div>
        )}

        {/* Tasks by Subject */}
        {subjectData.length > 0 && (
          <div className="bg-white rounded-2xl p-4">
            <p className="font-bold text-sm text-gray-900 mb-4">Tasks by Subject</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={subjectData} barSize={28}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Nunito', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'Nunito' }}
                />
                <Bar dataKey="tasks" radius={[8, 8, 0, 0]}>
                  {subjectData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Priority breakdown */}
        {stats?.tasks_by_priority && (
          <div className="bg-white rounded-2xl p-4">
            <p className="font-bold text-sm text-gray-900 mb-3">Tasks by Priority</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'High', key: 'high', color: '#FF6B35' },
                { label: 'Medium', key: 'medium', color: '#FFB800' },
                { label: 'Low', key: 'low', color: '#4CAF50' },
              ].map(({ label, key, color }) => {
                const count = stats.tasks_by_priority[key] || 0
                const total = stats.total_tasks || 1
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 w-12">{label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(count / total) * 100}%`, backgroundColor: color }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-4 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="h-24" />
      <BottomNav />
    </div>
  )
}
