import { Trash2 } from 'lucide-react'
import { formatTHB } from '../utils/format'
import StockBadge from './StockBadge'
import CategoryIcon from './CategoryIcon'

// การ์ดสินค้าในคลัง (ข้อ 2.1): ชื่อ หมวดหมู่ ราคา จำนวนคงเหลือ และสถานะ
export default function InventoryCard({ product, onDelete }) {
  return (
    <article className="animate-fade-up flex flex-col gap-4 rounded-2xl border border-base-300/60 bg-base-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <CategoryIcon category={product.category} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-medium">{product.name}</h3>
            <p className="text-sm text-base-content/50">#{product.id} · {product.category}</p>
          </div>
        </div>
        <StockBadge stock={product.stock} />
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-base-200 px-3 py-2">
          <dt className="text-xs text-base-content/50">Price</dt>
          <dd className="font-semibold text-primary">{formatTHB(product.price)}</dd>
        </div>
        <div className="rounded-xl bg-base-200 px-3 py-2">
          <dt className="text-xs text-base-content/50">Stock</dt>
          <dd className={`font-semibold ${product.stock === 0 ? 'text-error' : ''}`}>
            {product.stock} ชิ้น
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => onDelete(product)}
        className="btn btn-ghost btn-sm font-normal text-error hover:bg-error/10"
      >
        <Trash2 className="size-4" strokeWidth={1.7} />
        Delete
      </button>
    </article>
  )
}
