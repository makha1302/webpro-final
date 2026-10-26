import { LayoutDashboard, Moon, ShoppingCart, Store } from 'lucide-react'

const features = [
  { icon: Store, title: 'Online Store', text: 'ดึงสินค้าจาก Fake Store API พร้อมค้นหา กรองหมวดหมู่ และเรียงลำดับ' },
  { icon: ShoppingCart, title: 'Shopping Cart', text: 'เพิ่ม ปรับจำนวน ลบสินค้า และสรุปราคาอัตโนมัติ' },
  { icon: LayoutDashboard, title: 'Admin Dashboard', text: 'สรุปสต็อก กราฟยอดขาย และจัดการสินค้า (เพิ่ม / ลบ)' },
  { icon: Moon, title: 'Dark Mode', text: 'สลับธีมสว่าง / มืด และจำค่าไว้ใน Browser' }
]

const stack = ['React 19', 'Vite', 'React Router v6', 'Tailwind CSS v4', 'DaisyUI 5', 'Fetch API', 'Lucide Icons']

export default function About() {
  return (
    <div className="space-y-14">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">About us</p>
        <h1 className="mt-3 text-4xl font-normal tracking-tight sm:text-5xl">MiniShop Product Dashboard</h1>
        <p className="mt-6 leading-relaxed text-base-content/70">
          เว็บแอปพลิเคชันสำหรับแสดงรายการสินค้า เพิ่มสินค้า ค้นหา และจัดการข้อมูลสินค้า
          พัฒนาด้วย React ร่วมกับ Vite และ Tailwind CSS
          เป็นโปรเจกต์สอบปฏิบัติปลายภาค รายวิชา Web Programming
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {stack.map(item => (
            <span key={item} className="badge badge-outline border-base-300 px-3 py-3 text-base-content/70">{item}</span>
          ))}
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(feature => (
          <div key={feature.title} className="rounded-2xl border border-base-300/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
              <feature.icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-medium">{feature.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-base-content/60">{feature.text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-base-200 p-8 text-center">
        <h2 className="text-xl font-normal">Developer</h2>
        <p className="mt-2 text-base-content/70">Makha — รหัสนักศึกษา 67050203</p>
      </section>
    </div>
  )
}
