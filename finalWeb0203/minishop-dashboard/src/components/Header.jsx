import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogIn, LogOut, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/admin', label: 'Admin' }
]

export default function Header() {
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // ค้นหาจาก Header แล้วพาไปหน้า Products พร้อมคำค้นหาใน URL
  function handleSearch(event) {
    event.preventDefault()
    const q = keyword.trim()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setMenuOpen(false)
  }

  // หน้าปัจจุบันแสดงเส้นใต้สีมัสตาร์ด
  const linkClass = ({ isActive }) =>
    `relative py-2 text-[15px] transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform after:duration-300 ${
      isActive
        ? 'font-medium text-base-content after:scale-x-100'
        : 'text-base-content/70 after:scale-x-0 hover:text-base-content'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2.5 transition-colors ${
      isActive ? 'bg-base-200 font-medium' : 'hover:bg-base-200'
    }`

  const searchForm = (
    <form onSubmit={handleSearch} role="search" className="w-full">
      <label className="input input-sm h-9 w-full rounded-full bg-base-200 border-transparent focus-within:border-base-300">
        <Search className="size-4 opacity-50" />
        <input
          type="search"
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
      </label>
    </form>
  )

  return (
    <header className="sticky top-0 z-30 border-b border-base-300/70 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Logo onClick={() => setMenuOpen(false)} />

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden w-60 lg:block">{searchForm}</div>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <ThemeToggle />

          <Link to="/cart" className="btn btn-ghost btn-sm btn-circle relative" aria-label={`Cart (${cartCount} items)`}>
            <ShoppingBag className="size-[18px]" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-content">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/profile" className="btn btn-ghost btn-sm btn-circle" aria-label="Profile" title={user ? user.name : 'Profile'}>
            {user ? (
              <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-medium text-primary-content">
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User className="size-[18px]" strokeWidth={1.8} />
            )}
          </Link>

          {!user && (
            <Link to="/login" className="btn btn-primary btn-sm ml-1 hidden rounded-full px-4 font-normal sm:inline-flex">
              Log in
            </Link>
          )}

          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle md:hidden"
            onClick={() => setMenuOpen(open => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" strokeWidth={1.8} /> : <Menu className="size-5" strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* เมนูสำหรับมือถือ */}
      {menuOpen && (
        <div className="animate-fade-up border-t border-base-300/70 px-4 pb-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 py-3">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left hover:bg-base-200"
                onClick={() => { logout(); setMenuOpen(false) }}
              >
                <LogOut className="size-4" strokeWidth={1.8} /> Log out ({user.name})
              </button>
            ) : (
              <NavLink to="/login" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                <span className="flex items-center gap-2"><LogIn className="size-4" strokeWidth={1.8} /> Log in</span>
              </NavLink>
            )}
          </nav>
          {searchForm}
        </div>
      )}

      {/* แสดงช่องค้นหาบนแท็บเล็ต (จอ md) */}
      <div className="mx-auto hidden max-w-7xl px-6 pb-3 md:block lg:hidden">{searchForm}</div>
    </header>
  )
}
