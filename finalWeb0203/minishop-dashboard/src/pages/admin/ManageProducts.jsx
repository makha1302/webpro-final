import { useState } from 'react'
import { RotateCcw, TriangleAlert } from 'lucide-react'
import { useInventory } from '../../context/inventoryContext'
import SummaryCards from '../../components/SummaryCards'
import AddProductForm from '../../components/AddProductForm'
import SearchFilterBar from '../../components/SearchFilterBar'
import InventoryCard from '../../components/InventoryCard'
import { EmptyState } from '../../components/StatusMessage'
import { inventoryCategories } from '../../data/mockProducts'

export default function ManageProducts() {
  const { products, addProduct, deleteProduct, resetProducts } = useInventory()

  // useState เก็บข้อความค้นหาและหมวดหมู่ที่เลือก (ข้อ 3.1, 3.2)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [pendingDelete, setPendingDelete] = useState(null)

  // filter(): ค้นหาจากชื่อแบบไม่แยกตัวพิมพ์เล็ก-ใหญ่ + กรองหมวดหมู่
  const keyword = search.trim().toLowerCase()
  const filteredProducts = products.filter(product => {
    const matchName = product.name.toLowerCase().includes(keyword)
    const matchCategory = category === 'all' || product.category === category
    return matchName && matchCategory
  })

  function confirmDelete() {
    deleteProduct(pendingDelete.id)
    setPendingDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="breadcrumbs text-sm text-base-content/60">
        <ul>
          <li>Admin</li>
          <li>Products</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-normal tracking-tight">Product Management</h1>
          <p className="mt-1 text-base-content/60">เพิ่ม ค้นหา และลบสินค้าในคลัง</p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm font-normal" onClick={resetProducts}>
          <RotateCcw className="size-4" strokeWidth={1.7} />
          Reset data
        </button>
      </div>

      <SummaryCards products={products} />

      <AddProductForm onAdd={addProduct} />

      <section className="space-y-4">
        <div className="rounded-2xl border border-base-300/60 bg-base-100 p-5">
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={inventoryCategories}
          />
        </div>

        <p className="text-sm text-base-content/60">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {filteredProducts.length === 0 ? (
          <EmptyState
            description={products.length === 0 ? 'ยังไม่มีสินค้าในระบบ — เพิ่มสินค้าจากฟอร์มด้านบน' : 'ลองเปลี่ยนคำค้นหาหรือหมวดหมู่'}
          />
        ) : (
          // Responsive: มือถือ 1 คอลัมน์, จอกลาง 2 คอลัมน์, จอใหญ่ 3 คอลัมน์ (ข้อ 2.2)
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <InventoryCard key={product.id} product={product} onDelete={setPendingDelete} />
            ))}
          </div>
        )}
      </section>

      {/* Modal ยืนยันก่อนลบ */}
      {pendingDelete && (
        <div className="modal modal-open" role="dialog" aria-labelledby="delete-title">
          <div className="modal-box max-w-sm text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-error/10 text-error">
              <TriangleAlert className="size-6" strokeWidth={1.7} />
            </span>
            <h3 id="delete-title" className="mt-4 text-lg font-medium">ยืนยันการลบสินค้า</h3>
            <p className="py-2 text-base-content/70">ต้องการลบ "{pendingDelete.name}" ใช่หรือไม่?</p>
            <div className="modal-action justify-center">
              <button type="button" className="btn btn-ghost rounded-full px-6 font-normal" onClick={() => setPendingDelete(null)}>Cancel</button>
              <button type="button" className="btn btn-error rounded-full px-6 font-normal" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setPendingDelete(null)} />
        </div>
      )}
    </div>
  )
}
