import { CircleCheck } from 'lucide-react'
import { useCart } from '../context/cartContext'

// ข้อความแจ้งเตือนมุมจอ เมื่อเพิ่มสินค้าลงตะกร้า
export default function CartToast() {
  const { toast } = useCart()
  if (!toast) return null

  return (
    <div className="toast toast-end toast-bottom z-50">
      <div role="status" className="animate-fade-up flex items-center gap-3 rounded-xl bg-neutral px-4 py-3 text-sm text-neutral-content shadow-lg">
        <CircleCheck className="size-5 shrink-0 text-accent" strokeWidth={1.8} />
        <span>{toast}</span>
      </div>
    </div>
  )
}
