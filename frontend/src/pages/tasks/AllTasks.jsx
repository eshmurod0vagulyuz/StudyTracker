import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTaskStore from '../../store/useTaskStore'
import BottomNav from '../../components/layout/BottomNav'
import TaskList from '../../components/tasks/TaskList'

const FILTERS = ['all', 'active', 'completed']

export default function AllTasks() {
  const navigate = useNavigate()
  const { fetchTasks, tasks, filter, setFilter } = useTaskStore()

  useEffect(() => { fetchTasks() }, [])

  const taskList = Array.isArray(tasks) ? tasks : []
  const filtered = filter === 'all' ? taskList : taskList.filter((t) => t.status === filter)

  return (
    <div className="min-h-dvh bg-surface-secondary">
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display font-bold text-xl text-gray-900">All Tasks</h1>
            <p className="text-xs text-gray-400">{taskList.length} total tasks</p>
          </div>
          <button
            onClick={() => navigate('/tasks/add')}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 active:scale-90 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize transition-all ${
                filter === f ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4 fade-in">
        <TaskList tasks={filtered} emptyText="No tasks here yet" />
      </div>

      <div className="h-24" />
      <BottomNav />
    </div>
  )
}
