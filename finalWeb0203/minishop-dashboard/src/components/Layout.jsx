import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartToast from './CartToast'

// Layout ของหน้าร้าน: Header + เนื้อหาตาม Route + Footer
export default function Layout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-base-200 text-base-content">
      <Header />

      {/* key = pathname ทำให้ Animation เล่นใหม่ทุกครั้งที่เปลี่ยนหน้า */}
      <main key={location.pathname} className="animate-fade-up mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <Outlet />
      </main>

      <Footer />
      <CartToast />
    </div>
  )
}
