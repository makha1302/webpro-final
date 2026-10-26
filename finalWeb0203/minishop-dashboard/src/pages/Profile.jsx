import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, CircleCheck, LogIn, LogOut, Package, UserRound } from 'lucide-react'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'
import { sampleOrders, orderStatusClass } from '../data/dashboardData'
import { loadJSON, saveJSON } from '../utils/storage'
import { formatUSD } from '../utils/format'

const defaultProfile = {
  name: 'Makha',
  email: 'makha@example.com',
  phone: '081-234-5678',
  bio: 'Computer Science student | Web Programming',
  photo: ''
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'กรุณากรอกชื่อ'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
  if (form.phone && !/^[0-9+\-\s]{9,15}$/.test(form.phone.trim())) errors.phone = 'เบอร์โทรไม่ถูกต้อง'
  return errors
}

// เข้าสู่ระบบแล้ว: ใช้ชื่อ/อีเมลจากบัญชี และแยกเก็บโปรไฟล์ตามบัญชี
// ยังไม่เข้าสู่ระบบ: แสดงโปรไฟล์ตัวอย่างเดิม
export default function Profile() {
  const { user, logout, updateAccount } = useAuth()
  return <ProfileView key={user?.email ?? 'guest'} user={user} onLogout={logout} onUpdateAccount={updateAccount} />
}

// ย่อรูปให้ด้านยาวไม่เกิน 256px ก่อนเก็บ เพราะ localStorage มีพื้นที่จำกัด
function resizeImage(dataUrl, maxSize = 256) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

function ProfileView({ user, onLogout, onUpdateAccount }) {
  const { orders } = useCart()
  const storageKey = user ? `minishop-profile:${user.email}` : 'minishop-profile'
  const initialProfile = user
    ? { ...defaultProfile, name: user.name, email: user.email, phone: '', bio: '' }
    : defaultProfile
  const [profile, setProfile] = useState(() => loadJSON(storageKey, initialProfile))
  const [form, setForm] = useState(profile)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  // คำสั่งซื้อจริงจากหน้า Cart + ตัวอย่างคำสั่งซื้อเดิม
  const recentOrders = [...orders, ...sampleOrders].slice(0, 5)

  function handleChange(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    setErrors(current => ({ ...current, [name]: undefined }))
    setSaved(false)
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const photo = await resizeImage(reader.result)
      setForm(current => ({ ...current, photo }))
      setSaved(false)
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formErrors = validate(form)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    const next = { ...form, name: form.name.trim(), email: form.email.trim() }
    setProfile(next)
    setForm(next)
    saveJSON(storageKey, next)
    // เข้าสู่ระบบอยู่: อัปเดตชื่อและรูปของบัญชีด้วย ให้ Header แสดงตาม
    if (user) onUpdateAccount({ name: next.name, photo: next.photo })
    setSaved(true)
  }

  const avatar = (src, size) =>
    src ? (
      <img src={src} alt="Profile" className={`${size} rounded-full object-cover`} />
    ) : (
      <span className={`${size} grid place-items-center rounded-full bg-primary/10 text-3xl font-light text-primary`} aria-hidden="true">
        {profile.name.charAt(0).toUpperCase() || <UserRound className="size-1/2" strokeWidth={1.5} />}
      </span>
    )

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-2xl bg-base-200 p-6 text-center">
        <div className="mx-auto w-fit">{avatar(profile.photo, 'size-20')}</div>
        <p className="mt-3 font-medium">{profile.name}</p>
        <p className="text-sm text-base-content/60">{profile.email}</p>

        <ul className="menu mt-4 w-full p-0 text-left">
          <li><a href="#profile-info" className="menu-active"><UserRound className="size-4" strokeWidth={1.7} /> Profile</a></li>
          <li><a href="#orders"><Package className="size-4" strokeWidth={1.7} /> Orders</a></li>
        </ul>

        <div className="mt-4 border-t border-base-300 pt-4">
          {user ? (
            <button type="button" onClick={onLogout} className="btn btn-ghost btn-sm w-full justify-start font-normal text-base-content/70">
              <LogOut className="size-4" strokeWidth={1.7} /> Log out
            </button>
          ) : (
            <>
              <p className="mb-2 text-xs text-base-content/60">ยังไม่ได้เข้าสู่ระบบ (แสดงข้อมูลตัวอย่าง)</p>
              <Link to="/login" className="btn btn-primary btn-sm w-full rounded-full font-normal">
                <LogIn className="size-4" strokeWidth={1.7} /> Log in
              </Link>
            </>
          )}
        </div>
      </aside>

      <div className="min-w-0 space-y-6">
        <section id="profile-info" className="rounded-2xl border border-base-300/60 p-5 md:p-8">
          <h1 className="text-2xl font-normal tracking-tight">Profile Information</h1>

          <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-6 md:grid-cols-[1fr_180px]">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-base-content/70">Full Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} className={`input w-full ${errors.name ? 'input-error' : ''}`} />
                {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-base-content/70">Email Address</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={`input w-full ${errors.email ? 'input-error' : ''}`} />
                {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm text-base-content/70">Phone Number</label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} className={`input w-full ${errors.phone ? 'input-error' : ''}`} />
                {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="bio" className="mb-1 block text-sm text-base-content/70">Bio</label>
                <textarea id="bio" name="bio" rows="3" value={form.bio} onChange={handleChange} className="textarea w-full rounded-xl" />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="btn btn-primary rounded-full px-6 font-normal">Save Changes</button>
                {saved && (
                  <span role="status" className="flex items-center gap-1.5 text-sm text-success">
                    <CircleCheck className="size-4" strokeWidth={1.8} />
                    บันทึกข้อมูลแล้ว
                  </span>
                )}
              </div>
            </div>

            <div className="order-first flex flex-col items-center gap-3 md:order-none">
              {avatar(form.photo, 'size-28')}
              <label className="btn btn-outline btn-primary btn-sm rounded-full font-normal">
                <Camera className="size-4" strokeWidth={1.7} />
                Change Photo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
          </form>
        </section>

        <section id="orders" className="rounded-2xl border border-base-300/60 p-5 md:p-8">
          <h2 className="text-xl font-normal tracking-tight">Recent Orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-base-200">
                    <td className="font-medium text-primary">{order.id}</td>
                    <td>{order.date}</td>
                    <td>{formatUSD(order.total)}</td>
                    <td><span className={`badge badge-soft badge-sm ${orderStatusClass[order.status]}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
