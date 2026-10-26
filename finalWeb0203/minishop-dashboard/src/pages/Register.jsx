import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../context/authContext'
import AuthCard from '../components/AuthCard'

const emptyForm = { name: '', email: '', password: '', confirm: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'กรุณากรอกชื่อ'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
  if (form.password.length < 6) errors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
  if (form.confirm !== form.password) errors.confirm = 'รหัสผ่านไม่ตรงกัน'
  return errors
}

const fields = [
  { name: 'name', label: 'Full Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
  { name: 'confirm', label: 'Confirm Password', type: 'password', autoComplete: 'new-password' }
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    setErrors(current => ({ ...current, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formErrors = validate(form)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    const result = register(form)
    if (!result.ok) {
      setErrors({ [result.field]: result.message })
      return
    }
    navigate('/profile')
  }

  return (
    <AuthCard icon={UserPlus} title="Sign up" subtitle="สมัครสมาชิก MiniShop (ข้อมูลเก็บไว้ใน LocalStorage)">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {fields.map(field => (
          <div key={field.name}>
            <label htmlFor={`register-${field.name}`} className="mb-1 block text-sm text-base-content/70">{field.label}</label>
            <input
              id={`register-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={form[field.name]}
              onChange={handleChange}
              className={`input w-full ${errors[field.name] ? 'input-error' : ''}`}
              aria-invalid={Boolean(errors[field.name])}
            />
            {errors[field.name] && <p className="mt-1 text-xs text-error">{errors[field.name]}</p>}
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-full rounded-full font-normal">Create account</button>
      </form>

      <p className="mt-5 text-center text-sm text-base-content/60">
        มีบัญชีอยู่แล้ว? <Link to="/login" className="text-primary hover:underline">เข้าสู่ระบบ</Link>
      </p>
    </AuthCard>
  )
}
