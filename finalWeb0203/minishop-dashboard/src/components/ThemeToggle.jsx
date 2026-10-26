import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('minishop-theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // อ่าน localStorage ไม่ได้ ใช้ค่าจากระบบแทน
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// ปุ่มสลับ Light / Dark Mode — ตั้ง data-theme ที่ <html> ให้ DaisyUI เปลี่ยนชุดสี
export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('minishop-theme', theme)
    } catch {
      // บันทึกไม่ได้ก็ยังสลับ Theme ได้ตามปกติ
    }
  }, [theme])

  const isDark = theme === 'dark'
  const Icon = isDark ? Sun : Moon

  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm btn-circle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      <Icon className="size-[18px]" strokeWidth={1.8} />
    </button>
  )
}
