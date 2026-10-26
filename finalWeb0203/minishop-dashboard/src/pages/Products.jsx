import { useSearchParams } from 'react-router-dom'
import { useStoreProducts } from '../hooks/useStoreProducts'
import ProductCard from '../components/ProductCard'
import SearchFilterBar from '../components/SearchFilterBar'
import { LoadingState, ErrorAlert, EmptyState } from '../components/StatusMessage'
import { capitalize } from '../utils/format'

// หน้าแสดงสินค้าทั้งหมดจาก Fake Store API พร้อมค้นหาและกรองหมวดหมู่
export default function Products() {
  const { products, loading, error, reload } = useStoreProducts()

  // เก็บคำค้นหาและหมวดหมู่ไว้ใน URL (?q=...&category=...) เพื่อให้ช่องค้นหาใน Header ใช้งานร่วมกันได้
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? 'all'

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

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-1 opacity-70">สินค้าทั้งหมดจาก Fake Store API</p>
      </div>

      <div className="rounded-box bg-base-100 p-4 shadow-sm">
        <SearchFilterBar
          search={search}
          onSearchChange={value => updateParam('q', value, '')}
          category={category}
          onCategoryChange={value => updateParam('category', value, 'all')}
          categories={categories}
          formatCategory={capitalize}
        />
      </div>

      {loading ? (
        <LoadingState />
      ) : (
        <>
          {error && <ErrorAlert message={error} onRetry={reload} />}

          <p className="text-sm opacity-70">
            Showing {filtered.length} of {products.length} products
          </p>

          {filtered.length === 0 ? (
            <EmptyState description={search ? `ไม่มีสินค้าที่ชื่อตรงกับ "${search}"` : 'ไม่มีสินค้าในหมวดหมู่นี้'}>
              <button type="button" className="btn btn-primary btn-sm mt-2" onClick={() => setSearchParams({})}>
                Clear filters
              </button>
            </EmptyState>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
