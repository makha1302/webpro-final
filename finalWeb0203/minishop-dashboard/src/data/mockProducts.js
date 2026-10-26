// ข้อมูลจำลอง (Mock Data) ตามข้อ 2.1 — ใช้ในหน้า Admin สำหรับจัดการสต็อกสินค้า
export const mockProducts = [
  {
    id: 1,
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 450,
    stock: 20
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    category: 'Accessories',
    price: 1200,
    stock: 10
  },
  {
    id: 3,
    name: 'Monitor 24 inch',
    category: 'Display',
    price: 3500,
    stock: 5
  },
  {
    id: 4,
    name: 'USB-C Hub',
    category: 'Accessories',
    price: 850,
    stock: 0
  },
  {
    id: 5,
    name: 'Webcam HD',
    category: 'Camera',
    price: 990,
    stock: 8
  }
]

// หมวดหมู่สำหรับ Dropdown ข้อ 3.2 และฟอร์มเพิ่มสินค้าข้อ 3.3
export const inventoryCategories = ['Accessories', 'Display', 'Camera']

