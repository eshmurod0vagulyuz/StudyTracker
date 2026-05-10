import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { taskAPI } from '../../api/endpoints'
import useTaskStore from '../../store/useTaskStore'
import TopBar from '../../components/layout/TopBar'
import { Button } from '../../components/ui/Button'
import dayjs from 'dayjs'

const priorityBg = {
  low: 'bg-green-50 text-green-700',
  medium: 'bg-yellow-50 text-yellow-700',
  high: 'bg-orange-50 text-orange-700'
}

export default function TaskDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeTask, deleteTask } = useTaskStore()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    taskAPI.detail(id)
      .then(({ data }) => setTask(data))
      .catch(() => navigate('/tasks'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-dvh bg-surface-secondary">
      <TopBar title="Task Details" back />
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )

  if (!task) return null

  const isCompleted = task.status === 'completed'
  const isOverdue = !isCompleted && task.deadline && dayjs(task.deadline).isBefore(dayjs(), 'day')

  const handleComplete = async () => {
    const ok = await completeTask(task.id)
    if (ok) setTask({ ...task, status: 'completed', completed_at: new Date().toISOString() })
  }

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      await deleteTask(task.id)
      navigate('/tasks')
    }
  }

  return (
    <div className="min-h-dvh bg-surface-secondary">
      <TopBar
        title="Task Details"
        back
        right={
          <button
            onClick={handleDelete}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-500 active:scale-90 transition-transform"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          </button>
        }
      />

      <div className="px-5 py-5 flex flex-col gap-4 fade-in">
        {/* Title card */}
        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${isCompleted ? 'bg-primary border-primary' : 'border-gray-300'}`}>
              {isCompleted && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <h2 className={`font-display font-bold text-lg leading-snug ${isCompleted ? 'line-through text-gray-400' : 'text-gray-900'}`}>
              {task.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {task.subject && (
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: (task.subject.color || '#2E7D32') + '20', color: task.subject.color || '#2E7D32' }}
              >
                ■ {task.subject.name}
              </span>
            )}
            <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${priorityBg[task.priority] || 'bg-gray-100 text-gray-600'}`}>
              {task.priority} priority
            </span>
            {isOverdue && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-500">
                Overdue!
              </span>
            )}
          </div>
        </div>

        {/* Info card */}
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
          {task.deadline && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-lg">📅</div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Deadline</p>
                <p className="text-sm font-bold text-gray-900">{dayjs(task.deadline).format('MMMM D, YYYY')}</p>
              </div>
            </div>
          )}
          {task.created_at && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center text-lg">📝</div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Created</p>
                <p className="text-sm font-bold text-gray-900">{dayjs(task.created_at).format('MMMM D, YYYY')}</p>
              </div>
            </div>
          )}
          {task.completed_at && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-lg">✅</div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Completed</p>
                <p className="text-sm font-bold text-gray-900">{dayjs(task.completed_at).format('MMMM D, YYYY')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {task.description && (
          <div className="bg-white rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-semibold mb-2">NOTES</p>
            <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
          </div>
        )}

        {!isCompleted && (
          <Button onClick={handleComplete}>✓ Mark as Complete</Button>
        )}
      </div>
    </div>
  )
}
