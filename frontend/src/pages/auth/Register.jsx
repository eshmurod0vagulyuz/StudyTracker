import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export default function Register() {
  const navigate = useNavigate()
  const { register, loading, error } = useAuthStore()
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleSubmit = async () => {
    const ok = await register(form)
    if (ok) navigate('/dashboard')
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="bg-primary px-6 pt-16 pb-10 text-white">
        <div className="text-4xl mb-4">🎓</div>
        <h1 className="font-display font-bold text-2xl">Create Account</h1>
        <p className="text-white/70 text-sm mt-1">Start your study journey today</p>
      </div>

      <div className="flex-1 bg-white rounded-t-3xl -mt-4 px-6 pt-8 pb-10 flex flex-col gap-4">
        <Input
          label="Username"
          placeholder="Choose a username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Min 8 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
        <Button onClick={handleSubmit} disabled={loading} className="mt-2">
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
