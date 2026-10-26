const features = [
  { icon: '🛍️', title: 'Online Store', text: 'ดึงสินค้าจาก Fake Store API พร้อมค้นหาและกรองหมวดหมู่' },
  { icon: '🛒', title: 'Shopping Cart', text: 'เพิ่ม ปรับจำนวน ลบสินค้า และสรุปราคาอัตโนมัติ' },
  { icon: '📊', title: 'Admin Dashboard', text: 'สรุปสต็อก กราฟยอดขาย และจัดการสินค้า (เพิ่ม / ลบ)' },
  { icon: '🌙', title: 'Dark Mode', text: 'สลับธีมสว่าง / มืด และจำค่าไว้ใน Browser' }
]

const stack = ['React 19', 'Vite', 'React Router v6', 'Tailwind CSS v4', 'DaisyUI 5', 'Fetch API']

export default function About() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-base-100 p-6 shadow-sm md:p-10">
        <h1 className="text-3xl font-bold">About MiniShop Dashboard</h1>
        <p className="mt-4 max-w-3xl leading-relaxed opacity-80">
          MiniShop Product Dashboard เป็นเว็บแอปพลิเคชันสำหรับแสดงรายการสินค้า เพิ่มสินค้า ค้นหา
          และจัดการข้อมูลสินค้า พัฒนาด้วย React ร่วมกับ Vite และ Tailwind CSS
          เป็นโปรเจกต์สอบปฏิบัติปลายภาค รายวิชา Web Programming
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map(item => (
            <span key={item} className="badge badge-primary badge-outline">{item}</span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(feature => (
          <div key={feature.title} className="rounded-2xl bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="text-3xl" aria-hidden="true">{feature.icon}</span>
            <h2 className="mt-3 font-bold">{feature.title}</h2>
            <p className="mt-1 text-sm opacity-70">{feature.text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-base-100 p-6 shadow-sm">
        <h2 className="text-xl font-bold">Developer</h2>
        <p className="mt-2 opacity-80">Makha — รหัสนักศึกษา 67050203</p>
      </section>
    </div>
  )
}
