import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, TriangleAlert } from 'lucide-react'
import { useAuth, DEMO_USER } from '../context/authContext'
import AuthCard from '../components/AuthCard'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.email.trim() || !form.password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }
    const result = login(form.email, form.password)
    if (!result.ok) {
      setError(result.message)
      return
    }
    navigate('/profile')
  }

  function fillDemo() {
    setForm({ email: DEMO_USER.email, password: DEMO_USER.password })
    setError('')
  }

  return (
    <AuthCard icon={LogIn} title="Log in" subtitle="เข้าสู่ระบบเพื่อดูโปรไฟล์และคำสั่งซื้อของคุณ">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm text-base-content/70">Email</label>
          <input id="login-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} className="input w-full" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm text-base-content/70">Password</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={handleChange} className="input w-full" />
        </div>

        {error && (
          <p role="alert" className="flex items-center gap-2 text-sm text-error">
            <TriangleAlert className="size-4 shrink-0" strokeWidth={1.8} />
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full rounded-full font-normal">Log in</button>
      </form>

      <div className="mt-5 rounded-xl bg-base-200 px-4 py-3 text-sm">
        <p className="text-base-content/70">
          บัญชีตัวอย่าง: <span className="font-medium text-base-content">{DEMO_USER.email}</span> / <span className="font-medium text-base-content">{DEMO_USER.password}</span>
        </p>
        <button type="button" onClick={fillDemo} className="mt-1 text-primary hover:underline">
          ใช้บัญชีตัวอย่าง
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-base-content/60">
        ยังไม่มีบัญชี? <Link to="/register" className="text-primary hover:underline">สมัครสมาชิก</Link>
      </p>
    </AuthCard>
  )
}
