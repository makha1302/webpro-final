import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, ShoppingBag } from 'lucide-react'

const shopLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' }
]

const accountLinks = [
  { to: '/cart', label: 'Shopping Cart' },
  { to: '/profile', label: 'My Profile' },
  { to: '/admin', label: 'Admin Dashboard' }
]

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <p className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <ShoppingBag className="size-6 text-accent" strokeWidth={1.6} aria-hidden="true" />
            <span>Mini<span className="font-light">Shop</span></span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-70">
            Everyday essentials, thoughtfully chosen. Quality products at fair prices with fast delivery.
          </p>
        </div>

        <nav aria-label="Shop links">
          <p className="mb-3 text-sm font-medium">Shop</p>
          <ul className="space-y-2 text-sm opacity-70">
            {shopLinks.map(link => (
              <li key={link.to}><Link to={link.to} className="transition-opacity hover:opacity-100 hover:text-accent">{link.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Account links">
          <p className="mb-3 text-sm font-medium">Account</p>
          <ul className="space-y-2 text-sm opacity-70">
            {accountLinks.map(link => (
              <li key={link.to}><Link to={link.to} className="transition-opacity hover:opacity-100 hover:text-accent">{link.label}</Link></li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <p className="mb-3 text-sm font-medium">Contact</p>
          <ul className="space-y-2 text-sm opacity-70">
            <li className="flex items-center gap-2"><MapPin className="size-4" strokeWidth={1.6} /> Bangkok, Thailand</li>
            <li className="flex items-center gap-2"><Phone className="size-4" strokeWidth={1.6} /> 02-123-4567</li>
            <li className="flex items-center gap-2"><Mail className="size-4" strokeWidth={1.6} /> hello@minishop.com</li>
          </ul>
        </address>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs opacity-60 sm:px-6">
          © 2026 MiniShop. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
