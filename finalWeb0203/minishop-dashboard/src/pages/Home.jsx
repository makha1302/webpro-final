import { Link } from 'react-router-dom'
import { ArrowRight, Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { useStoreProducts } from '../hooks/useStoreProducts'
import ProductCard from '../components/ProductCard'
import { LoadingState, ErrorAlert } from '../components/StatusMessage'
import { capitalize } from '../utils/format'

// รูปแบนเนอร์จาก Unsplash (ถ้าโหลดไม่ได้จะเห็นเป็นพื้นสีเขียวเข้มแทน)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80'

const perks = [
  { icon: Truck, title: 'Free Shipping', text: 'เมื่อซื้อครบ $100' },
  { icon: RotateCcw, title: 'Easy Returns', text: 'คืนสินค้าได้ภายใน 30 วัน' },
  { icon: ShieldCheck, title: 'Secure Payment', text: 'ชำระเงินปลอดภัย 100%' },
  { icon: Headphones, title: 'Support 24/7', text: 'ทีมงานพร้อมช่วยเหลือ' }
]

export default function Home() {
  const { products, loading, error, reload } = useStoreProducts()

  const featured = products.slice(0, 4)

  // หมวดหมู่ละ 1 รายการ เพื่อใช้รูปสินค้าเป็นภาพของหมวดหมู่
  const categories = [...new Set(products.map(product => product.category))].map(category => ({
    name: category,
    product: products.find(product => product.category === category)
  }))

  return (
    <>
      {/* Banner */}
      <section
        className="relative flex min-h-[460px] items-center justify-center bg-neutral bg-cover bg-center px-4 py-24 text-center text-white sm:min-h-[560px]"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/80">New Collection 2026</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
            Everyday Essentials, Thoughtfully Chosen
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-white/85">
            Discover the best products with great prices and fast delivery.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 border border-white px-8 py-3 text-sm tracking-wide transition-colors duration-300 hover:bg-white hover:text-neutral"
          >
            Shop now
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 lg:py-20">
        {/* จุดเด่นของร้าน */}
        <section aria-label="Store benefits" className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {perks.map(perk => (
            <div key={perk.title} className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <perk.icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium">{perk.title}</p>
                <p className="text-xs text-base-content/60">{perk.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Featured Products */}
        <section aria-labelledby="featured-title">
          <div className="mb-8 text-center">
            <h2 id="featured-title" className="text-3xl font-normal tracking-tight sm:text-4xl">Featured Products</h2>
            <p className="mt-2 text-base-content/60">สินค้าแนะนำประจำสัปดาห์</p>
          </div>

          {loading ? (
            <LoadingState />
          ) : (
            <div className="space-y-6">
              {error && <ErrorAlert message={error} onRetry={reload} />}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center">
                <Link to="/products" className="btn btn-outline btn-primary rounded-full px-8 font-normal">
                  View all products
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Shop by Category */}
        {!loading && categories.length > 0 && (
          <section aria-labelledby="category-title" className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
            <div>
              <h2 id="category-title" className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                Shop By Category
              </h2>
              <p className="mt-4 leading-relaxed text-base-content/70">
                Explore our collection and find the perfect pieces for every day and every style.
              </p>
              <Link to="/products" className="btn btn-accent mt-6 rounded-none px-8 font-normal">
                View More
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {categories.map(({ name, product }) => (
                <Link
                  key={name}
                  to={`/products?category=${encodeURIComponent(name)}`}
                  className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl bg-[#efece4]"
                >
                  {product?.image && (
                    <img
                      src={product.image}
                      alt=""
                      loading="lazy"
                      className="h-3/4 w-full object-contain p-6 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="mt-auto flex items-center justify-between gap-2 p-4 text-[#24302d]">
                    <span className="font-medium leading-tight">{capitalize(name)}</span>
                    <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
