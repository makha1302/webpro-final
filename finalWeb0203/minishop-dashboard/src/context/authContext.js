import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

// บัญชีตัวอย่างสำหรับทดลองเข้าสู่ระบบ
export const DEMO_USER = { name: 'Demo User', email: 'demo@minishop.com', password: '123456' }

export function useAuth() {
  return useContext(AuthContext)
}
