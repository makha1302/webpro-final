// รูปสินค้าจาก API (ถ้าเป็นข้อมูลจำลองที่ไม่มีรูป จะแสดง Emoji แทน)
export default function ProductImage({ product, className = 'h-48' }) {
  return (
    <div className={`flex items-center justify-center overflow-hidden rounded-xl bg-white p-4 ${className}`}>
      {product.image ? (
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <span className="text-6xl" aria-hidden="true">{product.icon || '📦'}</span>
      )}
    </div>
  )
}
