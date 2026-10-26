// สถานะสินค้า In Stock / Low Stock / Out of Stock (ข้อ 2.1)
export default function StockBadge({ stock }) {
  if (stock === 0) {
    return <span className="badge badge-error badge-sm">Out of Stock</span>
  }
  if (stock <= 5) {
    return <span className="badge badge-warning badge-sm">Low Stock</span>
  }
  return <span className="badge badge-success badge-sm">In Stock</span>
}
