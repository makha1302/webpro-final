import { CircleDollarSign, Package, Star, Tag } from 'lucide-react'
import { useStoreProducts } from '../hooks/useStoreProducts'
import { LoadingState, ErrorAlert } from './StatusMessage'
import { formatUSD } from '../utils/format'

// สรุปข้อมูลจริงจาก Fake Store API สำหรับหน้า Admin Dashboard
export default function ApiStats() {
  const { products, loading, error, reload } = useStoreProducts()

  const count = products.length
  const categories = new Set(products.map(product => product.category)).size
  const avgRating = count ? products.reduce((sum, product) => sum + (product.rating?.rate ?? 0), 0) / count : 0
  const avgPrice = count ? products.reduce((sum, product) => sum + product.price, 0) / count : 0

  const stats = [
    { title: 'API Products', value: count, icon: Package, description: 'จำนวนสินค้าจาก API' },
    { title: 'Categories', value: categories, icon: Tag, description: 'จำนวนหมวดหมู่จาก API' },
    { title: 'Avg. Rating', value: avgRating.toFixed(2), icon: Star, description: 'คะแนนรีวิวเฉลี่ย (rating.rate)' },
    { title: 'Avg. Price', value: formatUSD(avgPrice), icon: CircleDollarSign, description: 'ราคาเฉลี่ยต่อชิ้น' }
  ]

  return (
    <section aria-labelledby="api-stats-title" className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 id="api-stats-title" className="font-medium">Live data from Fake Store API</h2>
        <span className="badge badge-soft badge-primary badge-sm">GET /products</span>
      </div>

      {loading ? (
        <LoadingState />
      ) : (
        <>
          {error && <ErrorAlert message={error} onRetry={reload} />}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.title} className="flex items-center gap-4 rounded-2xl border border-base-300/60 bg-base-100 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <stat.icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-base-content/60">{stat.title}</p>
                  <p className="text-xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="truncate text-xs text-base-content/50">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
