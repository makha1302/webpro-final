import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
      <section className="card bg-base-100 p-10 text-center shadow-sm">
        <p className="text-5xl" aria-hidden="true">😕</p>
        <h1 className="mt-3 text-2xl font-bold">Product not found</h1>
        <p className="mt-2 opacity-70">ไม่พบสินค้า ID: {id}</p>
        <Link to="/products" className="btn btn-primary mx-auto mt-6">← Back to Products</Link>
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
    <div className="space-y-8">
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li className="max-w-48 truncate sm:max-w-none">{product.title}</li>
        </ul>
      </div>

      {error && <ErrorAlert message={error} onRetry={reload} />}

      <section className="grid gap-8 rounded-3xl bg-base-100 p-5 shadow-sm md:grid-cols-2 md:p-8">
        <ProductImage product={product} className="h-72 md:h-96" />

        <div className="flex flex-col gap-4">
          <span className="badge badge-ghost">{capitalize(product.category)}</span>
          <h1 className="text-2xl font-bold sm:text-3xl">{product.title}</h1>
          <p className="text-3xl font-bold text-primary">{formatUSD(product.price)}</p>
          <RatingStars rating={product.rating} />
          <p className="leading-relaxed opacity-80">{product.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Quantity</span>
            <div className="join">
              <button
                type="button"
                className="btn join-item btn-sm"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="join-item flex w-12 items-center justify-center border-y border-base-300 text-sm" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                className="btn join-item btn-sm"
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-auto grid gap-3 pt-2 sm:grid-cols-2">
            <button type="button" className="btn btn-primary" onClick={() => addToCart(product, quantity)}>
              Add to Cart
            </button>
            <button type="button" className="btn btn-outline btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-base-100 p-5 shadow-sm md:p-8">
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
          {activeTab === 'Description' && <p className="leading-relaxed opacity-80">{product.description}</p>}

          {activeTab === 'Details' && (
            <dl className="grid max-w-md grid-cols-2 gap-y-2 text-sm">
              <dt className="opacity-60">Product ID</dt>
              <dd>{product.id}</dd>
              <dt className="opacity-60">Category</dt>
              <dd>{capitalize(product.category)}</dd>
              <dt className="opacity-60">Price</dt>
              <dd>{formatUSD(product.price)}</dd>
            </dl>
          )}

          {activeTab === 'Reviews' && (
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-5xl font-bold">{product.rating.rate.toFixed(1)}</p>
                <p className="text-sm opacity-60">จาก 5 คะแนน</p>
              </div>
              <div className="min-w-48 flex-1 space-y-1">
                <progress className="progress progress-warning w-full" value={product.rating.rate} max="5" />
                <p className="text-sm opacity-70">{product.rating.count} reviews</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title">
          <h2 id="related-title" className="mb-4 text-2xl font-bold">You may also like</h2>
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
