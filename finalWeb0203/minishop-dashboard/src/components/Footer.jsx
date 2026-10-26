import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p className="font-bold">MiniShop</p>

        <nav aria-label="Footer navigation" className="flex gap-4">
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/products" className="link link-hover">Products</Link>
          <Link to="/about" className="link link-hover">About</Link>
        </nav>

        <p className="opacity-70">© 2026 MiniShop. All rights reserved.</p>
      </div>
    </footer>
  )
}
