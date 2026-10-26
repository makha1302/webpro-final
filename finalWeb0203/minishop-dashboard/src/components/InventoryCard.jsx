import { categoryIcons } from '../data/mockProducts'
import { formatTHB } from '../utils/format'
import StockBadge from './StockBadge'
import { TrashIcon } from './Icons'

// การ์ดสินค้าในคลัง (ข้อ 2.1): ชื่อ หมวดหมู่ ราคา จำนวนคงเหลือ และสถานะ
export default function InventoryCard({ product, onDelete }) {
  return (
    <article className="card animate-fade-up bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="card-body gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl" aria-hidden="true">
              {categoryIcons[product.category] || '📦'}
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{product.name}</h3>
              <p className="text-sm opacity-60">#{product.id} · {product.category}</p>
            </div>
          </div>
          <StockBadge stock={product.stock} />
        </div>

        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-base-200 p-2">
            <dt className="opacity-60">Price</dt>
            <dd className="font-bold text-primary">{formatTHB(product.price)}</dd>
          </div>
          <div className="rounded-lg bg-base-200 p-2">
            <dt className="opacity-60">Stock</dt>
            <dd className={`font-bold ${product.stock === 0 ? 'text-error' : ''}`}>
              {product.stock} ชิ้น
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => onDelete(product)}
          className="btn btn-outline btn-error btn-sm"
        >
          <TrashIcon className="size-4" />
          Delete
        </button>
      </div>
    </article>
  )
}
