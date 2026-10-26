import { NavLink, Outlet, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { BoxIcon, DashboardIcon, StoreIcon } from './Icons'

const menu = [
  { to: '/admin', label: 'Dashboard', icon: DashboardIcon, end: true },
  { to: '/admin/products', label: 'Products', icon: BoxIcon }
]

// Layout ของหน้า Admin: Sidebar ด้านซ้าย (มือถือจะย้ายไปอยู่ด้านบน)
export default function AdminLayout() {
  const location = useLocation()

  const navClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-primary text-primary-content' : 'hover:bg-white/10'
    }`

  return (
    <div className="min-h-screen bg-base-200 text-base-content md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-neutral text-neutral-content md:sticky md:top-0 md:h-screen">
        <div className="flex items-center justify-between gap-2 p-4 md:p-5">
          <NavLink to="/admin" className="flex items-center gap-2 text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-content">M</span>
            MiniShop
          </NavLink>

          <ThemeToggle />
        </div>

        <nav aria-label="Admin navigation" className="flex gap-1 overflow-x-auto px-4 pb-4 md:flex-col md:px-3">
          {menu.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
              <item.icon className="size-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/" className={navClass}>
            <StoreIcon className="size-5 shrink-0" />
            View Store
          </NavLink>
        </nav>
      </aside>

      <div className="min-w-0">
        <main key={location.pathname} className="animate-fade-up mx-auto max-w-7xl p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
