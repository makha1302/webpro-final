import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

export default function Logo({ to = '/', onClick, className = '' }) {
  return (
    <Link to={to} onClick={onClick} className={`flex shrink-0 items-center gap-2 ${className}`}>
      <ShoppingBag className="size-6 text-primary" strokeWidth={1.6} aria-hidden="true" />
      <span className="text-xl font-semibold tracking-tight">
        Mini<span className="font-light">Shop</span>
      </span>
    </Link>
  )
}
