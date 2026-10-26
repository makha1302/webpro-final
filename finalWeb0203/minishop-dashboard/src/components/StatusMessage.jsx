import { SearchX, TriangleAlert } from 'lucide-react'

// สถานะระหว่างเรียก API (ข้อ 4.2)
export function LoadingState({ text = 'Loading products...' }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-20">
      <span className="loading loading-spinner loading-md text-primary" />
      <p className="text-sm text-base-content/60">{text}</p>
    </div>
  )
}

export function ErrorAlert({ message, onRetry }) {
  return (
    <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm">
      <TriangleAlert className="size-5 shrink-0 text-warning" strokeWidth={1.8} />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-ghost" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}

// แสดงเมื่อไม่พบสินค้าที่ค้นหา (ข้อ 5.2)
export function EmptyState({ icon: Icon = SearchX, title = 'ไม่พบสินค้าที่ค้นหา', description, children }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-base-300 px-6 py-14 text-center">
      <span className="mb-2 grid size-14 place-items-center rounded-full bg-base-200">
        <Icon className="size-6 text-base-content/50" strokeWidth={1.6} />
      </span>
      <p className="text-lg font-medium">{title}</p>
      {description && <p className="text-sm text-base-content/60">{description}</p>}
      {children}
    </div>
  )
}
