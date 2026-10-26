import { Link } from 'react-router-dom'
import { useStoreProducts } from '../hooks/useStoreProducts'
import ProductCard from '../components/ProductCard'
import { LoadingState, ErrorAlert } from '../components/StatusMessage'
import { storeCategoryStyles, defaultCategoryStyle } from '../data/storeCategories'
import { capitalize } from '../utils/format'

export default function Home() {
  const { products, loading, error, reload } = useStoreProducts()

  const featured = products.slice(0, 4)
  const categories = [...new Set(products.map(product => product.category))]

  return (
    <div className="space-y-10">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-6 py-12 text-primary-content shadow-lg sm:px-12 sm:py-16">
        <div className="relative z-10 max-w-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest opacity-80">New season sale</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Welcome to MiniShop</h1>
          <p className="mt-4 opacity-90">
            Discover the best products with great prices and fast delivery.
          </p>
          <Link to="/products" className="btn mt-6 border-none bg-base-100 text-base-content hover:bg-base-200">
            Shop Now →
          </Link>
        </div>
        <div className="pointer-events-none absolute -right-6 bottom-0 hidden select-none text-[9rem] leading-none opacity-90 sm:block lg:right-12" aria-hidden="true">
          🎒🎧
        </div>
      </section>

      {/* Featured Products */}
      <section aria-labelledby="featured-title">
        <div className="mb-4 flex items-end justify-between">
          <h2 id="featured-title" className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="link link-primary text-sm">View All →</Link>
        </div>

        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-4">
            {error && <ErrorAlert message={error} onRetry={reload} />}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Categories */}
      {!loading && categories.length > 0 && (
        <section aria-labelledby="category-title">
          <h2 id="category-title" className="mb-4 text-2xl font-bold">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map(category => {
              const style = storeCategoryStyles[category] || defaultCategoryStyle
              return (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-base-100 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className={`grid size-14 place-items-center rounded-full text-3xl ${style.tone}`} aria-hidden="true">
                    {style.icon}
                  </span>
                  <span className="text-sm font-semibold">{capitalize(category)}</span>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
