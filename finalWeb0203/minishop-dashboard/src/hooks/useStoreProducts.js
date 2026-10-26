import { useEffect, useState } from 'react'
import { getProducts } from '../services/productApi'
import { mockProducts, categoryIcons } from '../data/mockProducts'

// ถ้าเรียก API ไม่ได้ ใช้ Mock Data ข้อ 2.1 แทน โดยแปลงให้มีรูปแบบเดียวกับ Fake Store API
const fallbackProducts = mockProducts.map(product => ({
  id: `mock-${product.id}`,
  title: product.name,
  price: Math.round((product.price / 35) * 100) / 100, // แปลงบาทเป็น USD โดยประมาณ
  description: `${product.name} — สินค้าจากข้อมูลจำลองของ MiniShop`,
  category: product.category.toLowerCase(),
  image: '',
  icon: categoryIcons[product.category],
  rating: { rate: 4.5, count: 10 }
}))

// Custom Hook: โหลดสินค้าจาก API เมื่อ Component โหลด (ข้อ 4.1–4.2)
export function useStoreProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false // ป้องกัน setState หลัง Component ถูกปิดไปแล้ว

    async function loadProducts() {
      try {
        const data = await getProducts()
        if (!ignore) setProducts(data)
      } catch {
        if (!ignore) {
          setError('ไม่สามารถดึงข้อมูลจาก Fake Store API ได้ — กำลังแสดงข้อมูลจำลองแทน')
          setProducts(fallbackProducts)
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      ignore = true
    }
  }, [reloadKey])

  function reload() {
    setLoading(true)
    setError('')
    setReloadKey(key => key + 1)
  }

  return { products, loading, error, reload }
}
