import { Camera, Gem, Keyboard, Laptop, Monitor, Package, Shirt } from 'lucide-react'

// เลือกไอคอนตามหมวดหมู่สินค้า (ทั้ง Mock Data และ Fake Store API)
const icons = {
  accessories: Keyboard,
  display: Monitor,
  camera: Camera,
  electronics: Laptop,
  jewelery: Gem,
  "men's clothing": Shirt,
  "women's clothing": Shirt
}

export default function CategoryIcon({ category = '', className = 'size-5' }) {
  const Icon = icons[category.toLowerCase()] || Package
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />
}
