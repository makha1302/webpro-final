import { useCart } from '../context/cartContext'

// ข้อความแจ้งเตือนมุมจอ เมื่อเพิ่มสินค้าลงตะกร้า
export default function CartToast() {
  const { toast } = useCart()
  if (!toast) return null

  return (
    <div className="toast toast-end toast-bottom z-50">
      <div role="status" className="alert alert-success animate-fade-up shadow-lg">
        <span>✅ {toast}</span>
      </div>
    </div>
  )
}
