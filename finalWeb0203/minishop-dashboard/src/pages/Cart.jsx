import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CircleCheck, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/cartContext'
import { useStoreProducts } from '../hooks/useStoreProducts'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'
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
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-normal tracking-tight">Shopping Cart</h1>
        <p className="mt-2 text-base-content/60">{cartCount} items in your cart</p>
      </div>

      {placedOrder && (
        <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-sm">
          <CircleCheck className="size-5 shrink-0 text-success" strokeWidth={1.8} />
          <span className="flex-1">สั่งซื้อสำเร็จ! หมายเลขคำสั่งซื้อ {placedOrder.id} ยอดรวม {formatUSD(placedOrder.total)}</span>
          <Link to="/profile" className="btn btn-ghost btn-sm font-normal">View Orders</Link>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-base-300 px-6 py-16 text-center">
          <span className="mb-2 grid size-14 place-items-center rounded-full bg-base-200">
            <ShoppingBag className="size-6 text-base-content/50" strokeWidth={1.6} />
          </span>
          <p className="text-lg font-medium">ตะกร้าของคุณยังว่างอยู่</p>
          <Link to="/products" className="btn btn-primary mt-3 rounded-full px-6 font-normal">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <section className="min-w-0 space-y-4">
            <ul className="space-y-3">
              {items.map(item => (
                <li
                  key={item.id}
                  className="animate-fade-up grid grid-cols-[72px_1fr] gap-4 rounded-2xl border border-base-300/60 p-4 sm:grid-cols-[88px_1fr_auto] sm:items-center"
                >
                  <Link to={`/products/${item.id}`}>
                    <ProductImage product={item} className="h-20 p-2" />
                  </Link>

                  <div className="min-w-0">
                    <Link to={`/products/${item.id}`} className="line-clamp-2 transition-colors hover:text-primary">
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-base-content/60">{formatUSD(item.price)} / ชิ้น</p>
                  </div>

                  <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-end">
                    <div className="flex items-center rounded-full border border-base-300">
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs btn-circle"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease ${item.title}`}
                      >
                        <Minus className="size-3.5" strokeWidth={1.8} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs btn-circle"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase ${item.title}`}
                      >
                        <Plus className="size-3.5" strokeWidth={1.8} />
                      </button>
                    </div>

                    <p className="w-24 text-right font-semibold">{formatUSD(item.price * item.quantity)}</p>

                    <button
                      type="button"
                      className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:bg-error/10 hover:text-error"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="size-4" strokeWidth={1.7} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/products" className="btn btn-outline btn-primary rounded-full px-6 font-normal">
              <ArrowLeft className="size-4" strokeWidth={1.8} />
              Continue Shopping
            </Link>
          </section>

          <aside className="h-fit rounded-2xl bg-base-200 p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-medium">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-base-content/60">Subtotal</dt>
                <dd>{formatUSD(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-base-content/60">Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatUSD(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-base-300 pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatUSD(total)}</dd>
              </div>
            </dl>
            {shipping > 0 && (
              <p className="mt-3 text-xs text-base-content/50">ซื้อครบ {formatUSD(freeShippingMin)} ส่งฟรี</p>
            )}
            <button type="button" className="btn btn-primary mt-6 w-full rounded-full font-normal" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}

      {suggestions.length > 0 && (
        <section aria-labelledby="suggest-title">
          <h2 id="suggest-title" className="mb-6 text-2xl font-normal tracking-tight sm:text-3xl">You might also like</h2>
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
