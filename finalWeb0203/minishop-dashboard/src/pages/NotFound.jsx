import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="py-16 text-center">
      <p className="text-8xl font-light tracking-tight text-primary">404</p>
      <h1 className="mt-4 text-2xl font-normal">Page Not Found</h1>
      <p className="mt-2 text-base-content/60">ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/" className="btn btn-primary mt-8 rounded-full px-6 font-normal">
        <ArrowLeft className="size-4" strokeWidth={1.8} />
        Back to Home
      </Link>
    </section>
  )
}
