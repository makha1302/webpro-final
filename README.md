# webpro-final — MiniShop Product Dashboard

ข้อสอบปฏิบัติปลายภาค รายวิชา Web Programming · Makha (รหัสนักศึกษา 67050203)

งานอยู่ในโฟลเดอร์ **[`finalWeb0203/minishop-dashboard`](finalWeb0203/minishop-dashboard)**
ดูรายละเอียด ตำแหน่งโค้ดตามข้อสอบแต่ละข้อ และผลการทดสอบได้ที่ **[README ของโปรเจกต์](finalWeb0203/minishop-dashboard/README.md)**

## วิธีรัน

```bash
cd finalWeb0203/minishop-dashboard
npm install
npm run dev      # เปิด http://localhost:5173
```

ต้องใช้ Node.js 18 ขึ้นไป · ไม่ต้องรัน API Server เอง (ใช้ https://fakestoreapi.com)

## เทคโนโลยี

React 19 · Vite 6 · React Router v6 · Tailwind CSS v4 · DaisyUI 5 · Fetch API · Lucide Icons

## หน้าที่ควรเปิดดู

| Path | หน้า |
| --- | --- |
| `/` | Home: Banner, Featured Products, หมวดหมู่, Add to Cart |
| `/products` | สินค้าจาก Fake Store API + ค้นหา / กรอง / เรียงลำดับ |
| `/products/1` | Product Detail |
| `/cart` | Shopping Cart |
| `/profile` | Profile + ประวัติคำสั่งซื้อ |
| `/login`, `/register` | ระบบผู้ใช้ (Mock) · บัญชีตัวอย่าง **demo@minishop.com / 123456** |
| `/admin` | MiniShop Dashboard: สรุปสินค้า (ข้อ 2.3), ข้อมูลสดจาก API, กราฟยอดขาย, คำสั่งซื้อ |
| `/admin/products` | **ส่วนที่ 2–3 และข้อ 4.3:** รายการสินค้า + สถานะสต็อก, ค้นหา, กรองหมวดหมู่, ฟอร์มเพิ่มสินค้า, ลบสินค้า |
