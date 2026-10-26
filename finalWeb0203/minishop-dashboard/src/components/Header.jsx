import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import ThemeToggle from './ThemeToggle'
import { CartIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from './Icons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/admin', label: 'Admin' }
]

export default function Header() {
  const { cartCount } = useCart()
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

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-200'
    }`

  const searchForm = (
    <form onSubmit={handleSearch} role="search" className="w-full">
      <label className="input input-sm w-full">
        <SearchIcon className="size-4 opacity-50" />
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
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold" onClick={() => setMenuOpen(false)}>
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-content">M</span>
          MiniShop
        </Link>

        <nav aria-label="Main navigation" className="ml-4 hidden gap-1 md:flex">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden w-56 lg:block">{searchForm}</div>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <ThemeToggle />

          <Link to="/cart" className="btn btn-ghost btn-sm btn-circle relative" aria-label={`Cart (${cartCount} items)`}>
            <CartIcon />
            {cartCount > 0 && (
              <span className="badge badge-primary badge-xs absolute -right-1 -top-1 h-4 min-w-4 px-1">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/profile" className="btn btn-ghost btn-sm btn-circle" aria-label="Profile">
            <UserIcon />
          </Link>

          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle md:hidden"
            onClick={() => setMenuOpen(open => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* เมนูสำหรับมือถือ */}
      {menuOpen && (
        <div className="animate-fade-up border-t border-base-300 px-4 pb-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 py-3">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          {searchForm}
        </div>
      )}

      {/* แสดงช่องค้นหาบนแท็บเล็ต (จอ md) */}
      <div className="mx-auto hidden max-w-7xl px-6 pb-3 md:block lg:hidden">{searchForm}</div>
    </header>
  )
}
