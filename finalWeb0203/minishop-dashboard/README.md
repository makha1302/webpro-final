# MiniShop Product Dashboard — finalWeb0203

ข้อสอบปฏิบัติปลายภาค รายวิชา Web Programming · Makha (67050203)

เว็บแอปพลิเคชันสำหรับแสดงรายการสินค้า เพิ่มสินค้า ค้นหา และจัดการข้อมูลสินค้า
พัฒนาด้วย **React 19 + Vite 6 + Tailwind CSS v4 + DaisyUI 5 + React Router v6**

## วิธีรัน

ต้องใช้ Node.js 18 ขึ้นไป (ทดสอบแล้วบน Node 20.11.1 และ 22)

```bash
cd finalWeb0203/minishop-dashboard
npm install
npm run dev      # เปิด http://localhost:5173
```

ไม่ต้องรัน API Server เอง เพราะหน้าร้านดึงข้อมูลจาก https://fakestoreapi.com/products โดยตรง

## หน้าเว็บ (Routes)

| Path | หน้า | ข้อมูล |
| --- | --- | --- |
| `/` | Home: Banner, Featured Products, หมวดหมู่, Add to Cart | Fake Store API |
| `/products` | รายการสินค้าทั้งหมด + ค้นหา + กรองหมวดหมู่ | Fake Store API |
| `/products/:id` | Product Detail: รูป รายละเอียด ราคา คะแนนรีวิว จำนวน Add to Cart | Fake Store API |
| `/cart` | Shopping Cart: ปรับจำนวน ลบสินค้า สรุปราคา Checkout | React Context + localStorage |
| `/profile` | Profile: ฟอร์มแก้ไขโปรไฟล์ เปลี่ยนรูป ประวัติคำสั่งซื้อ | localStorage |
| `/about` | ข้อมูลเกี่ยวกับแอปพลิเคชัน | — |
| `/admin` | Admin Dashboard: สรุปสินค้า กราฟยอดขาย คำสั่งซื้อล่าสุด | Mock Data |
| `/admin/products` | จัดการสินค้า: สรุป เพิ่ม ค้นหา กรอง ลบ | Mock Data (ข้อ 2.1) |
| `*` | 404 Not Found | — |

## ตำแหน่งโค้ดตามข้อสอบ

| ข้อ | สิ่งที่ทำ | ไฟล์ |
| --- | --- | --- |
| 1.1 | โปรเจกต์ Vite ชื่อ `minishop-dashboard` | `package.json`, `vite.config.js` |
| 1.2 | 5 หน้าหลัก, Header / Nav (Home, Products, About) / Main / Footer, Semantic HTML (`header`, `nav`, `main`, `aside`, `section`, `article`, `footer`) | `src/components/Header.jsx`, `Footer.jsx`, `Layout.jsx`, `AdminLayout.jsx` |
| 2.1 | Mock Data 5 รายการ (id, name, category, price, stock), แสดงด้วย `map()`, สถานะ In Stock / Low Stock / Out of Stock | `src/data/mockProducts.js`, `src/components/InventoryCard.jsx`, `StockBadge.jsx` |
| 2.2 | Responsive 1 / 2 / 3 คอลัมน์ (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) | `src/pages/admin/ManageProducts.jsx`, `src/pages/Products.jsx` |
| 2.3 | สรุป 3 รายการ: จำนวนสินค้า, มูลค่ารวม `price × stock` (`reduce`), จำนวนสินค้าหมดสต็อก | `src/utils/inventory.js`, `src/components/SummaryCards.jsx` |
| 3.1 | ค้นหาด้วยชื่อ: `useState` + `onChange` + `filter()` + `toLowerCase()` | `src/pages/admin/ManageProducts.jsx`, `src/components/SearchFilterBar.jsx` |
| 3.2 | Dropdown: All Categories / Accessories / Display / Camera ทำงานร่วมกับการค้นหา | `src/components/SearchFilterBar.jsx` |
| 3.3 | ฟอร์มเพิ่มสินค้า (Name, Category, Price, Stock) + ตรวจชื่อว่าง ราคา > 0 จำนวนเป็นจำนวนเต็ม ≥ 0 | `src/components/AddProductForm.jsx` |
| 4.1 | ดึงข้อมูล Fake Store API: `useEffect` + `fetch()` + `async/await` + `useState` | `src/services/productApi.js`, `src/hooks/useStoreProducts.js` |
| 4.2 | Loading products... / Error (แสดงข้อความ + ปุ่ม Retry + ใช้ Mock Data แทน) / Success | `src/hooks/useStoreProducts.js`, `src/components/StatusMessage.jsx` |
| 4.3 | ปุ่ม Delete (มี Modal ยืนยัน) ลบผ่าน React State ข้อมูลสรุปอัปเดตทันที | `src/context/InventoryProvider.jsx`, `src/pages/admin/ManageProducts.jsx` |
| 5.1 | React Router: `/`, `/products`, `/about` และหน้าอื่น ๆ ใช้ `NavLink` / `Link` | `src/App.jsx`, `src/main.jsx` |
| 5.2 | สีและตัวอักษร, Hover Effect, Transition / Animation, ข้อความเมื่อไม่พบสินค้า, Label ทุกช่องกรอก, ระยะห่างสม่ำเสมอ, รองรับมือถือ, Dark Mode | ทุกหน้า, `src/index.css`, `src/components/ThemeToggle.jsx` |

> **หมายเหตุเรื่องข้อมูล:** Fake Store API ไม่มีฟิลด์ `stock` และหมวดหมู่ไม่ตรงกับข้อ 3.2
> จึงแบ่งเป็น 2 ส่วน คือหน้าร้าน (Home / Products / Detail / Cart) ใช้ **Fake Store API**
> ส่วนหน้า Admin ที่ต้องใช้ `stock` ใช้ **Mock Data ตามข้อ 2.1**
> ถ้าเรียก API ไม่ได้ หน้าร้านจะแสดงข้อความแจ้งเตือนและใช้ Mock Data แทนอัตโนมัติ

## โครงสร้างโปรเจกต์

```
src/
├── main.jsx               # BrowserRouter + Context Providers
├── App.jsx                # Routes ทั้งหมด
├── index.css              # Tailwind + DaisyUI + Theme + Animation
├── components/            # Header, Footer, Layout, AdminLayout, ProductCard, SummaryCards, ...
├── pages/                 # Home, Products, ProductDetail, Cart, Profile, About, NotFound
│   └── admin/             # Dashboard, ManageProducts
├── services/productApi.js # เรียก Fake Store API (fetch + async/await)
├── hooks/useStoreProducts.js
├── context/               # ตะกร้าสินค้า (Cart) และคลังสินค้า (Inventory)
├── data/                  # Mock Data
└── utils/                 # จัดรูปแบบราคา, คำนวณสรุป, localStorage
```

## ผลการทดสอบ

| ทดสอบ | ผล |
| --- | --- |
| เปิดหน้า Home / Products / Detail ดึงสินค้าจาก API | ✅ |
| ค้นหา "SSD" / "MOUSE" (ไม่แยกตัวพิมพ์เล็ก-ใหญ่) | ✅ แสดงเฉพาะสินค้าที่ตรง |
| ค้นหาคำที่ไม่มี | ✅ แสดง "ไม่พบสินค้าที่ค้นหา" |
| กรองหมวด Display | ✅ แสดงเฉพาะ Monitor 24 inch |
| เพิ่มสินค้าโดยเว้นชื่อว่าง / ราคา 0 | ✅ ไม่บันทึก แสดงข้อความ Error ใต้ช่อง |
| เพิ่ม Gaming Headset ฿1,500 × 3 | ✅ สินค้า 5 → 6, มูลค่า ฿46,420 → ฿50,920 |
| ลบ Wireless Mouse | ✅ สินค้า 6 → 5, มูลค่า ฿50,920 → ฿41,920 |
| Add to Cart, ปรับจำนวน, Checkout | ✅ ยอดรวมถูกต้อง คำสั่งซื้อไปแสดงใน Profile |
| `/products/999` | ✅ Product not found |
| API ล่ม | ✅ แสดงข้อความแจ้งเตือน + ปุ่ม Retry + ใช้ Mock Data |
| สลับ Dark Mode แล้ว Refresh | ✅ ยังเป็น Dark |
| จอ 375 / 768 / 1366 px | ✅ ไม่ล้นจอ |
