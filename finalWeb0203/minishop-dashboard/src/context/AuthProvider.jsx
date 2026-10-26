import { useEffect, useState } from 'react'
import { AuthContext, DEMO_USER } from './authContext'
import { loadJSON, saveJSON } from '../utils/storage'

// ระบบผู้ใช้แบบจำลอง (Mock) — เก็บบัญชีและสถานะการเข้าสู่ระบบไว้ใน localStorage
// หมายเหตุ: เป็นการจำลองเพื่อการเรียนเท่านั้น ระบบจริงต้องตรวจรหัสผ่านที่ Backend
export default function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = loadJSON('minishop-users', [])
    return saved.some(user => user.email === DEMO_USER.email) ? saved : [DEMO_USER, ...saved]
  })
  const [sessionEmail, setSessionEmail] = useState(() => loadJSON('minishop-session', null))

  useEffect(() => {
    saveJSON('minishop-users', users)
  }, [users])

  useEffect(() => {
    saveJSON('minishop-session', sessionEmail)
  }, [sessionEmail])

  const account = users.find(user => user.email === sessionEmail)
  const user = account ? { name: account.name, email: account.email } : null

  function register({ name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    if (users.some(item => item.email === normalizedEmail)) {
      return { ok: false, field: 'email', message: 'อีเมลนี้ถูกใช้สมัครแล้ว' }
    }
    setUsers(current => [...current, { name: name.trim(), email: normalizedEmail, password }])
    setSessionEmail(normalizedEmail)
    return { ok: true }
  }

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase()
    const found = users.find(item => item.email === normalizedEmail)
    if (!found || found.password !== password) {
      return { ok: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
    }
    setSessionEmail(normalizedEmail)
    return { ok: true }
  }

  function logout() {
    setSessionEmail(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
