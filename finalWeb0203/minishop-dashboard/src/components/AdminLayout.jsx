import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Store } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

const menu = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/', label: 'View Store', icon: Store, end: true }
]

// Layout ของหน้า Admin: Sidebar ด้านซ้าย (มือถือจะย้ายไปอยู่ด้านบน)
export default function AdminLayout() {
  const location = useLocation()

  const navClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
      isActive
        ? 'bg-primary/10 font-medium text-primary'
        : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
    }`

  return (
    <div className="min-h-screen bg-base-200 text-base-content md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-base-300 bg-base-100 md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-2 px-4 py-4 md:px-5 md:py-5">
          <Logo to="/admin" />
          <ThemeToggle />
        </div>

        <p className="hidden px-5 pb-2 text-xs font-medium uppercase tracking-wider text-base-content/50 md:block">
          Menu
        </p>
        <nav aria-label="Admin navigation" className="flex gap-1 overflow-x-auto px-4 pb-3 md:flex-col md:px-3">
          {menu.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
              <item.icon className="size-[18px] shrink-0" strokeWidth={1.7} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main key={location.pathname} className="animate-fade-up mx-auto w-full min-w-0 max-w-7xl p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
