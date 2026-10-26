import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useStoreProducts } from '../hooks/useStoreProducts'
import ProductCard from '../components/ProductCard'
import SearchFilterBar from '../components/SearchFilterBar'
import { LoadingState, ErrorAlert, EmptyState } from '../components/StatusMessage'
import { capitalize } from '../utils/format'

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' }
]

const sorters = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating.rate - a.rating.rate
}

// หน้าแสดงสินค้าทั้งหมดจาก Fake Store API พร้อมค้นหา กรองหมวดหมู่ และเรียงลำดับ
export default function Products() {
  const { products, loading, error, reload } = useStoreProducts()

  // เก็บคำค้นหา/หมวดหมู่/การเรียงไว้ใน URL เพื่อให้ช่องค้นหาใน Header ใช้งานร่วมกันได้
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? 'all'
  const sort = searchParams.get('sort') ?? 'recommended'

  function updateParam(key, value, emptyValue) {
    const next = new URLSearchParams(searchParams)
    if (value === emptyValue) next.delete(key)
    else next.set(key, value)
    setSearchParams(next, { replace: true })
  }

  const categories = [...new Set(products.map(product => product.category))]

  // ค้นหาแบบไม่แยกตัวพิมพ์เล็ก-ใหญ่ และกรองตามหมวดหมู่
  const keyword = search.trim().toLowerCase()
  const filtered = products.filter(product => {
    const matchName = product.title.toLowerCase().includes(keyword)
    const matchCategory = category === 'all' || product.category === category
    return matchName && matchCategory
  })
  const sorted = sorters[sort] ? [...filtered].sort(sorters[sort]) : filtered

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-normal tracking-tight sm:text-5xl">All Products</h1>
        <p className="mt-3 text-base-content/60">สินค้าทั้งหมดจาก Fake Store API</p>
        <p className="mt-2 text-sm text-base-content/60">
          ต้องการดูสต็อก เพิ่ม หรือลบสินค้า?{' '}
          <Link to="/admin/products" className="inline-flex items-center gap-1 text-primary hover:underline">
            ไปที่ Admin → Products <ArrowRight className="size-3.5" strokeWidth={1.8} />
          </Link>
        </p>
      </div>

      <SearchFilterBar
        search={search}
        onSearchChange={value => updateParam('q', value, '')}
        category={category}
        onCategoryChange={value => updateParam('category', value, 'all')}
        categories={categories}
        formatCategory={capitalize}
        sort={sort}
        onSortChange={value => updateParam('sort', value, 'recommended')}
        sortOptions={sortOptions}
      />

      {loading ? (
        <LoadingState />
      ) : (
        <>
          {error && <ErrorAlert message={error} onRetry={reload} />}

          <p className="text-sm text-base-content/60">
            We have found <span className="font-medium text-base-content">{sorted.length}</span> of {products.length} items
          </p>

          {sorted.length === 0 ? (
            <EmptyState description={search ? `ไม่มีสินค้าที่ชื่อตรงกับ "${search}"` : 'ไม่มีสินค้าในหมวดหมู่นี้'}>
              <button type="button" className="btn btn-primary btn-sm mt-3 rounded-full px-5 font-normal" onClick={() => setSearchParams({})}>
                Clear filters
              </button>
            </EmptyState>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
