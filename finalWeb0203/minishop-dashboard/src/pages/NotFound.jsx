import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="rounded-3xl bg-base-100 p-12 text-center shadow-sm">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="mt-2 text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 opacity-70">ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/" className="btn btn-primary mt-6">Back to Home</Link>
    </section>
  )
}
