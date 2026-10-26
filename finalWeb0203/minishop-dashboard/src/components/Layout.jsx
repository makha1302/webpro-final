import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartToast from './CartToast'

// Layout ของหน้าร้าน: Header + เนื้อหาตาม Route + Footer
export default function Layout() {
  const location = useLocation()
  // หน้า Home มีแบนเนอร์เต็มจอ จึงไม่ใส่ระยะขอบให้
  const isHome = location.pathname === '/'

  return (
    <div className="flex min-h-screen flex-col bg-base-100 text-base-content">
      <Header />

      {/* key = pathname ทำให้ Animation เล่นใหม่ทุกครั้งที่เปลี่ยนหน้า */}
      <main
        key={location.pathname}
        className={`animate-fade-up flex-1 ${isHome ? '' : 'mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12'}`}
      >
        <Outlet />
      </main>

      <Footer />
      <CartToast />
    </div>
  )
}
