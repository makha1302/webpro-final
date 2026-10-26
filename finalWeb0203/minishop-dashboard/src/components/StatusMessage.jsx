// สถานะระหว่างเรียก API (ข้อ 4.2)
export function LoadingState({ text = 'Loading products...' }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="opacity-70">{text}</p>
    </div>
  )
}

export function ErrorAlert({ message, onRetry }) {
  return (
    <div role="alert" className="alert alert-warning">
      <span>⚠️ {message}</span>
      {onRetry && (
        <button type="button" className="btn btn-sm" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}

// แสดงเมื่อไม่พบสินค้าที่ค้นหา (ข้อ 5.2)
export function EmptyState({ title = 'ไม่พบสินค้าที่ค้นหา', description, children }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-box bg-base-100 px-6 py-12 text-center shadow-sm">
      <span className="text-5xl" aria-hidden="true">🔍</span>
      <p className="text-lg font-semibold">{title}</p>
      {description && <p className="text-sm opacity-70">{description}</p>}
      {children}
    </div>
  )
}
