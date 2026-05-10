import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTaskStore from '../../store/useTaskStore'
import TopBar from '../../components/layout/TopBar'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const PRIORITIES = ['low', 'medium', 'high']
const priorityColors = { low: 'bg-green-500', medium: 'bg-yellow-400', high: 'bg-orange-500' }

export default function AddTask() {
  const navigate = useNavigate()
  const { createTask, fetchSubjects, subjects } = useTaskStore()
  const [form, setForm] = useState({ title: '', subject_id: '', description: '', deadline: '', priority: 'medium' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => { fetchSubjects() }, [])

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    const payload = {
      title: form.title.trim(),
      priority: form.priority,
    }
    if (form.subject_id) payload.subject_id = Number(form.subject_id)
    if (form.deadline) payload.deadline = form.deadline
    if (form.description.trim()) payload.description = form.description.trim()

    const ok = await createTask(payload)
    setLoading(false)
    if (ok === true) navigate('/tasks')
    else if (ok && typeof ok === 'object') {
      // Backend validation xatolarini ko'rsatish
      const serverErrors = {}
      Object.keys(ok).forEach(k => { serverErrors[k] = Array.isArray(ok[k]) ? ok[k][0] : ok[k] })
      setErrors(serverErrors)
    }
  }

  return (
    <div className="min-h-dvh bg-white">
      <TopBar title="Add New Task" back />

      <div className="px-5 py-5 flex flex-col gap-5">
        <Input
          label="Task Name"
          placeholder="e.g. Complete homework"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          error={errors.title}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Subject</label>
          <select
            value={form.subject_id}
            onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50 font-medium"
          >
            <option value="">Select a subject</option>
            {Array.isArray(subjects) && subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.subject_id && <span className="text-xs text-red-500">{errors.subject_id}</span>}
        </div>

        <Input
          label="Deadline"
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Priority</label>
          <div className="flex gap-2">
            {PRIORITIES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setForm({ ...form, priority: p })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize border-2 transition-all ${
                  form.priority === p
                    ? `border-transparent text-white ${priorityColors[p]}`
                    : 'border-gray-200 text-gray-500 bg-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Description (optional)</label>
          <textarea
            placeholder="Add notes..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50 font-medium resize-none"
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="mt-2">
          {loading ? 'Saving...' : '💾 Save Task'}
        </Button>
      </div>
    </div>
  )
}
