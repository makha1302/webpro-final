import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import { formatUSD, capitalize } from '../utils/format'
import ProductImage from './ProductImage'
import RatingStars from './RatingStars'

// การ์ดสินค้าของหน้าร้าน (ข้อมูลจาก Fake Store API)
export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="group flex flex-col rounded-2xl border border-base-300/60 bg-base-100 p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-12px_rgb(0_0_0/0.15)]">
      <Link to={`/products/${product.id}`} className="block">
        <ProductImage product={product} />
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 px-2 pb-2 pt-4">
        <p className="text-xs uppercase tracking-wider text-base-content/50">{capitalize(product.category)}</p>

        <h3 className="line-clamp-2 min-h-12 leading-snug">
          <Link to={`/products/${product.id}`} className="transition-colors hover:text-primary">
            {product.title}
          </Link>
        </h3>

        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-semibold text-primary">{formatUSD(product.price)}</p>
          <RatingStars rating={product.rating} size="text-xs" />
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="btn btn-primary btn-sm mt-3 rounded-full font-normal"
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}
