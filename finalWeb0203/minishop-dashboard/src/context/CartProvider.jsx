import { useEffect, useRef, useState } from 'react'
import { CartContext } from './cartContext'
import { loadJSON, saveJSON } from '../utils/storage'

const FREE_SHIPPING_MIN = 100
const SHIPPING_FEE = 5

// เก็บตะกร้าสินค้าและประวัติคำสั่งซื้อ ใช้ร่วมกันทุกหน้า และจำค่าไว้ใน localStorage
export default function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadJSON('minishop-cart', []))
  const [orders, setOrders] = useState(() => loadJSON('minishop-orders', []))
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  useEffect(() => {
    saveJSON('minishop-cart', items)
  }, [items])

  useEffect(() => {
    saveJSON('minishop-orders', orders)
  }, [orders])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  function showToast(message) {
    clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = setTimeout(() => setToast(''), 2500)
  }

  function addToCart(product, quantity = 1) {
    setItems(current => {
      const existing = current.find(item => item.id === product.id)
      if (existing) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...current,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity
        }
      ]
    })
    showToast(`เพิ่ม "${product.title}" ลงตะกร้าแล้ว`)
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) return
    setItems(current =>
      current.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }

  function removeFromCart(id) {
    setItems(current => current.filter(item => item.id !== id))
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  // สร้างคำสั่งซื้อจำลองจากตะกร้า แล้วล้างตะกร้า
  function checkout() {
    const order = {
      id: `#${String(Date.now()).slice(-6)}`,
      date: new Date().toISOString().slice(0, 10),
      items: cartCount,
      total,
      status: 'Processing'
    }
    setOrders(current => [order, ...current])
    setItems([])
    return order
  }

  const value = {
    items,
    orders,
    toast,
    cartCount,
    subtotal,
    shipping,
    total,
    freeShippingMin: FREE_SHIPPING_MIN,
    addToCart,
    updateQuantity,
    removeFromCart,
    checkout
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
