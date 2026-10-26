import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, PackageSearch, Plus, ShoppingBag } from 'lucide-react'
import { useStoreProducts } from '../hooks/useStoreProducts'
import { useCart } from '../context/cartContext'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'
import RatingStars from '../components/RatingStars'
import { LoadingState, ErrorAlert } from '../components/StatusMessage'
import { formatUSD, capitalize } from '../utils/format'

const tabs = ['Description', 'Details', 'Reviews']

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { products, loading, error, reload } = useStoreProducts()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('Description')

  if (loading) return <LoadingState text="Loading product..." />

  // id จาก URL เป็น String จึงแปลง id ของสินค้าเป็น String ก่อนเทียบ
  const product = products.find(item => String(item.id) === id)

  if (!product) {
    return (
      <section className="flex flex-col items-center rounded-2xl border border-dashed border-base-300 px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-base-200">
          <PackageSearch className="size-6 text-base-content/50" strokeWidth={1.6} />
        </span>
        <h1 className="mt-4 text-2xl font-medium">Product not found</h1>
        <p className="mt-2 text-base-content/60">ไม่พบสินค้า ID: {id}</p>
        <Link to="/products" className="btn btn-primary mt-6 rounded-full px-6 font-normal">
          <ArrowLeft className="size-4" strokeWidth={1.8} />
          Back to Products
        </Link>
      </section>
    )
  }

  const related = products
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 4)

  function handleBuyNow() {
    addToCart(product, quantity)
    navigate('/cart')
  }

  return (
    <div className="space-y-10">
      <div className="breadcrumbs text-sm text-base-content/60">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li className="max-w-48 truncate text-base-content sm:max-w-none">{product.title}</li>
        </ul>
      </div>

      {error && <ErrorAlert message={error} onRetry={reload} />}

      <section className="grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductImage product={product} className="h-80 border border-base-300/60 md:h-[460px]" />

        <div className="flex flex-col gap-4 md:py-4">
          <p className="text-xs uppercase tracking-wider text-base-content/50">{capitalize(product.category)}</p>
          <h1 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">{product.title}</h1>
          <RatingStars rating={product.rating} />
          <p className="text-3xl font-semibold text-primary">{formatUSD(product.price)}</p>
          <p className="leading-relaxed text-base-content/70">{product.description}</p>

          <div className="flex items-center gap-4 pt-2">
            <span className="text-sm text-base-content/70">Quantity</span>
            <div className="flex items-center rounded-full border border-base-300">
              <button
                type="button"
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" strokeWidth={1.8} />
              </button>
              <span className="w-10 text-center text-sm" aria-live="polite">{quantity}</span>
              <button
                type="button"
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="size-4" strokeWidth={1.8} />
              </button>
            </div>
          </div>

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <button type="button" className="btn btn-primary rounded-full font-normal" onClick={() => addToCart(product, quantity)}>
              <ShoppingBag className="size-4" strokeWidth={1.8} />
              Add to cart
            </button>
            <button type="button" className="btn btn-outline btn-primary rounded-full font-normal" onClick={handleBuyNow}>
              Buy now
            </button>
          </div>
        </div>
      </section>

      <section className="border-t border-base-300/70 pt-6">
        <div role="tablist" className="tabs tabs-border">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="animate-fade-up pt-5" key={activeTab}>
          {activeTab === 'Description' && <p className="max-w-3xl leading-relaxed text-base-content/70">{product.description}</p>}

          {activeTab === 'Details' && (
            <dl className="grid max-w-md grid-cols-2 gap-y-2 text-sm">
              <dt className="text-base-content/50">Product ID</dt>
              <dd>{product.id}</dd>
              <dt className="text-base-content/50">Category</dt>
              <dd>{capitalize(product.category)}</dd>
              <dt className="text-base-content/50">Price</dt>
              <dd>{formatUSD(product.price)}</dd>
            </dl>
          )}

          {activeTab === 'Reviews' && (
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-5xl font-medium">{product.rating.rate.toFixed(1)}</p>
                <p className="text-sm text-base-content/50">จาก 5 คะแนน</p>
              </div>
              <div className="min-w-48 flex-1 space-y-1">
                <progress className="progress progress-accent w-full" value={product.rating.rate} max="5" />
                <p className="text-sm text-base-content/60">{product.rating.count} reviews</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title">
          <h2 id="related-title" className="mb-6 text-2xl font-normal tracking-tight sm:text-3xl">You may also like</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
