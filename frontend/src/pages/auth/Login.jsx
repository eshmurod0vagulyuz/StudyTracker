import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuthStore()
  const [form, setForm] = useState({ username: '', password: '' })

  const handleSubmit = async () => {
    const ok = await login(form)
    if (ok) navigate('/dashboard')
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="bg-primary px-6 pt-16 pb-10 text-white">
        <div className="text-4xl mb-4">👋</div>
        <h1 className="font-display font-bold text-2xl">Welcome back!</h1>
        <p className="text-white/70 text-sm mt-1">Sign in to continue studying</p>
      </div>

      <div className="flex-1 bg-white rounded-t-3xl -mt-4 px-6 pt-8 pb-10 flex flex-col gap-5">
        <Input
          label="Username"
          placeholder="Enter your username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
        <Button onClick={handleSubmit} disabled={loading} className="mt-2">
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold">Register</Link>
        </p>
      </div>
    </div>
  )
}
