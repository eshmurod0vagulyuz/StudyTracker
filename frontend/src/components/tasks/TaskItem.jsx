import { useNavigate } from 'react-router-dom'
import useTaskStore from '../../store/useTaskStore'
import dayjs from 'dayjs'

const priorityColors = { low: '#4CAF50', medium: '#FFB800', high: '#FF6B35' }

export default function TaskItem({ task }) {
  const navigate = useNavigate()
  const completeTask = useTaskStore((s) => s.completeTask)
  const isCompleted = task.status === 'completed'
  const isOverdue = !isCompleted && task.deadline && dayjs(task.deadline).isBefore(dayjs(), 'day')

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="flex items-center gap-3 bg-white rounded-2xl p-3.5 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
    >
      <button
        onClick={(e) => { e.stopPropagation(); !isCompleted && completeTask(task.id) }}
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          isCompleted ? 'bg-primary border-primary' : 'border-gray-300'
        }`}
      >
        {isCompleted && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${isCompleted ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {task.subject && (
            <span className="text-xs font-semibold" style={{ color: task.subject.color || '#2E7D32' }}>
              ■ {task.subject.name}
            </span>
          )}
          {task.deadline && (
            <span className={`text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
              📅 {dayjs(task.deadline).format('MMM D')}
            </span>
          )}
        </div>
      </div>

      <div
        className="w-2 h-10 rounded-full flex-shrink-0"
        style={{ backgroundColor: priorityColors[task.priority] || '#ccc' }}
      />
    </div>
  )
}
