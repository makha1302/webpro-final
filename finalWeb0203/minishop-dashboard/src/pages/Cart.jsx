import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import { useStoreProducts } from '../hooks/useStoreProducts'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'
import { TrashIcon } from '../components/Icons'
import { formatUSD } from '../utils/format'

export default function Cart() {
  const {
    items,
    cartCount,
    subtotal,
    shipping,
    total,
    freeShippingMin,
    updateQuantity,
    removeFromCart,
    checkout
  } = useCart()
  const { products } = useStoreProducts()
  const [placedOrder, setPlacedOrder] = useState(null)

  // แนะนำสินค้าที่ยังไม่อยู่ในตะกร้า
  const suggestions = products
    .filter(product => !items.some(item => item.id === product.id))
    .slice(0, 3)

  function handleCheckout() {
    setPlacedOrder(checkout())
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="mt-1 opacity-70">{cartCount} items in your cart</p>
      </div>

      {placedOrder && (
        <div role="alert" className="alert alert-success">
          <span>🎉 สั่งซื้อสำเร็จ! หมายเลขคำสั่งซื้อ {placedOrder.id} ยอดรวม {formatUSD(placedOrder.total)}</span>
          <Link to="/profile" className="btn btn-sm">View Orders</Link>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-base-100 px-6 py-14 text-center shadow-sm">
          <span className="text-6xl" aria-hidden="true">🛒</span>
          <p className="text-lg font-semibold">ตะกร้าของคุณยังว่างอยู่</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <section className="min-w-0 space-y-4">
            <ul className="space-y-3">
              {items.map(item => (
                <li
                  key={item.id}
                  className="animate-fade-up grid grid-cols-[72px_1fr] gap-4 rounded-2xl bg-base-100 p-4 shadow-sm sm:grid-cols-[88px_1fr_auto] sm:items-center"
                >
                  <Link to={`/products/${item.id}`}>
                    <ProductImage product={item} className="h-20 p-2" />
                  </Link>

                  <div className="min-w-0">
                    <Link to={`/products/${item.id}`} className="line-clamp-2 font-semibold hover:text-primary">
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm opacity-70">{formatUSD(item.price)} / ชิ้น</p>
                  </div>

                  <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-end">
                    <div className="join">
                      <button
                        type="button"
                        className="btn join-item btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease ${item.title}`}
                      >
                        −
                      </button>
                      <span className="join-item flex w-10 items-center justify-center border-y border-base-300 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="btn join-item btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase ${item.title}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="w-24 text-right font-bold">{formatUSD(item.price * item.quantity)}</p>

                    <button
                      type="button"
                      className="btn btn-ghost btn-sm btn-circle text-error"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/products" className="btn btn-outline btn-primary">← Continue Shopping</Link>
          </section>

          <aside className="h-fit rounded-2xl bg-base-100 p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="opacity-70">Subtotal</dt>
                <dd>{formatUSD(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="opacity-70">Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatUSD(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-base-300 pt-3 text-base font-bold">
                <dt>Total</dt>
                <dd>{formatUSD(total)}</dd>
              </div>
            </dl>
            {shipping > 0 && (
              <p className="mt-3 text-xs opacity-60">ซื้อครบ {formatUSD(freeShippingMin)} ส่งฟรี</p>
            )}
            <button type="button" className="btn btn-primary mt-5 w-full" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}

      {suggestions.length > 0 && (
        <section aria-labelledby="suggest-title">
          <h2 id="suggest-title" className="mb-4 text-2xl font-bold">You might also like</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
