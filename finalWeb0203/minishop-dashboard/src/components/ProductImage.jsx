import CategoryIcon from './CategoryIcon'

// รูปสินค้าจาก API (ถ้าเป็นข้อมูลจำลองที่ไม่มีรูป จะแสดงไอคอนหมวดหมู่แทน)
export default function ProductImage({ product, className = 'h-56' }) {
  return (
    <div className={`flex items-center justify-center overflow-hidden rounded-xl bg-white p-6 ${className}`}>
      {product.image ? (
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <CategoryIcon category={product.category} className="size-16 text-primary/60" />
      )}
    </div>
  )
}
