// TaskCreateForm - quick task creation modal/sheet
import { useState } from 'react'
import useTaskStore from '../../store/useTaskStore'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

export default function TaskCreateForm({ onClose, onCreated }) {
  const { createTask, subjects } = useTaskStore()
  const [form, setForm] = useState({ title: '', priority: 'medium' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.title.trim()) return
    setLoading(true)
    const ok = await createTask(form)
    setLoading(false)
    if (ok === true) {
      onCreated?.()
      onClose?.()
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <Input placeholder="Task title..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <div className="flex gap-2">
        {['low', 'medium', 'high'].map((p) => (
          <button key={p} onClick={() => setForm({ ...form, priority: p })}
            className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border-2 transition-all ${form.priority === p ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-500'}`}>
            {p}
          </button>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Saving...' : 'Add Task'}</Button>
    </div>
  )
}
