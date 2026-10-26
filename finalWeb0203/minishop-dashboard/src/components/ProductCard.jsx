import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import { formatUSD, capitalize } from '../utils/format'
import ProductImage from './ProductImage'
import RatingStars from './RatingStars'

// การ์ดสินค้าของหน้าร้าน (ข้อมูลจาก Fake Store API)
export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="group card bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block p-3 pb-0">
        <ProductImage product={product} />
      </Link>

      <div className="card-body gap-2 p-4">
        <span className="badge badge-ghost badge-sm">{capitalize(product.category)}</span>

        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold">
          <Link to={`/products/${product.id}`} className="hover:text-primary">
            {product.title}
          </Link>
        </h3>

        <p className="text-lg font-bold text-primary">{formatUSD(product.price)}</p>
        <RatingStars rating={product.rating} size="text-xs" />

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="btn btn-primary btn-sm mt-2"
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}
