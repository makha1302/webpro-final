import { useEffect, useState } from 'react'
import { InventoryContext } from './inventoryContext'
import { mockProducts } from '../data/mockProducts'
import { loadJSON, saveJSON } from '../utils/storage'

// เก็บสินค้าในคลัง (Mock Data ข้อ 2.1) ไว้ใน React State ให้หน้า Admin ใช้ร่วมกัน
export default function InventoryProvider({ children }) {
  const [products, setProducts] = useState(() =>
    loadJSON('minishop-inventory', mockProducts)
  )

  useEffect(() => {
    saveJSON('minishop-inventory', products)
  }, [products])

  // เพิ่มสินค้าใหม่ โดยให้ id ต่อจาก id ที่มากที่สุด (ข้อ 3.3)
  function addProduct(product) {
    setProducts(current => {
      const nextId = Math.max(0, ...current.map(item => item.id)) + 1
      return [...current, { id: nextId, ...product }]
    })
  }

  // ลบสินค้าผ่าน React State — รายการและข้อมูลสรุปอัปเดตทันที (ข้อ 4.3)
  function deleteProduct(id) {
    setProducts(current => current.filter(product => product.id !== id))
  }

  function resetProducts() {
    setProducts(mockProducts)
  }

  const value = { products, addProduct, deleteProduct, resetProducts }

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}
