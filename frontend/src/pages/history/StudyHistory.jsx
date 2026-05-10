import { useEffect, useState } from 'react'
import { historyAPI } from '../../api/endpoints'
import TopBar from '../../components/layout/TopBar'
import dayjs from 'dayjs'

export default function StudyHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)

  const fetchHistory = () => {
    setLoading(true)
    historyAPI.list()
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : (data.results || [])
        setHistory(list)
      })
      .catch(() => setHistory([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchHistory() }, [])

  const totalMinutes = history.reduce((sum, h) => sum + (h.duration_minutes || 0), 0)

  return (
    <div className="min-h-dvh bg-surface-secondary">
      <TopBar
        title="Study History"
        back
        right={
          <button
            onClick={() => setShowAdd(true)}
            className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="px-5 py-4 flex flex-col gap-4 fade-in">
          {/* Total */}
          <div className="bg-primary rounded-2xl p-4 text-white flex items-center gap-4">
            <span className="text-3xl">📚</span>
            <div>
              <p className="text-white/70 text-sm">Total Study Time</p>
              <p className="font-display font-bold text-2xl">
                {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
              </p>
              <p className="text-xs text-white/60">{history.length} sessions</p>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-3">📖</p>
              <p className="font-semibold">No study sessions yet</p>
              <p className="text-sm mt-1">Tap + to log your first session</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {history.map((h) => (
                <div key={h.id} className="bg-white rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    📘
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate">
                      {h.subject?.name || 'General'}
                    </p>
                    <p className="text-xs text-gray-400">{dayjs(h.studied_at).format('MMM D, YYYY')}</p>
                    {h.notes && <p className="text-xs text-gray-500 mt-0.5 truncate">{h.notes}</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display font-bold text-primary">{h.duration_minutes}m</p>
                    <p className="text-xs text-gray-400">
                      {Math.floor(h.duration_minutes / 60) > 0 ? `${Math.floor(h.duration_minutes / 60)}h ` : ''}
                      {h.duration_minutes % 60 > 0 ? `${h.duration_minutes % 60}m` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Session Modal */}
      {showAdd && (
        <AddSessionModal
          onClose={() => setShowAdd(false)}
          onSaved={() => { setShowAdd(false); fetchHistory() }}
        />
      )}
    </div>
  )
}

function AddSessionModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ subject_id: '', duration_minutes: '', studied_at: dayjs().format('YYYY-MM-DD'), notes: '' })
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    import('../../api/endpoints').then(({ subjectAPI }) => {
      subjectAPI.list().then(({ data }) => {
        const list = Array.isArray(data) ? data : (data.results || [])
        setSubjects(list)
      }).catch(() => {})
    })
  }, [])

  const handleSave = async () => {
    if (!form.subject_id || !form.duration_minutes) return
    setLoading(true)
    try {
      await historyAPI.create({
        subject: Number(form.subject_id),
        duration_minutes: Number(form.duration_minutes),
        studied_at: form.studied_at,
        notes: form.notes,
      })
      onSaved()
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-w-[430px] mx-auto rounded-t-3xl p-6 flex flex-col gap-4 slide-up">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display font-bold text-lg">Log Study Session</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">✕</button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Subject</label>
          <select
            value={form.subject_id}
            onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50"
          >
            <option value="">Select subject</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Duration (minutes)</label>
          <input
            type="number"
            placeholder="e.g. 60"
            min="1"
            value={form.duration_minutes}
            onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Date</label>
          <input
            type="date"
            value={form.studied_at}
            onChange={(e) => setForm({ ...form, studied_at: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Notes (optional)</label>
          <textarea
            placeholder="What did you study?"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50 resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading || !form.subject_id || !form.duration_minutes}
          className="bg-primary text-white font-bold rounded-2xl py-4 w-full active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? 'Saving...' : '💾 Save Session'}
        </button>
      </div>
    </div>
  )
}
