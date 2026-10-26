import { Link } from 'react-router-dom'
import { useInventory } from '../../context/inventoryContext'
import { useCart } from '../../context/cartContext'
import SummaryCards from '../../components/SummaryCards'
import SalesChart from '../../components/SalesChart'
import StockBadge from '../../components/StockBadge'
import { weeklySales, sampleOrders, orderStatusClass } from '../../data/dashboardData'
import { categoryIcons } from '../../data/mockProducts'
import { formatTHB, formatUSD } from '../../utils/format'

export default function Dashboard() {
  const { products } = useInventory()
  const { orders } = useCart()

  const recentOrders = [...orders, ...sampleOrders].slice(0, 5)
  const weekTotal = weeklySales.reduce((sum, day) => sum + day.amount, 0)

  // สินค้าที่มีมูลค่าคงเหลือสูงสุด 4 อันดับ
  const topProducts = [...products]
    .sort((a, b) => b.price * b.stock - a.price * a.stock)
    .slice(0, 4)

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 opacity-70">ภาพรวมสินค้าและยอดขายของ MiniShop</p>
        </div>
        <p className="text-sm opacity-60">Today, {today}</p>
      </div>

      {/* ส่วนสรุปข้อมูลด้านบน (ข้อ 2.3) */}
      <SummaryCards products={products} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="card min-w-0 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="card-title">Sales Overview</h2>
              <span className="badge badge-ghost">This Week · {formatUSD(weekTotal)}</span>
            </div>
            <SalesChart data={weeklySales} />
          </div>
        </section>

        <section className="card min-w-0 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-base-200">
                      <td className="font-medium text-primary">{order.id}</td>
                      <td className="whitespace-nowrap">{order.customer || 'Makha'}</td>
                      <td>{formatUSD(order.total)}</td>
                      <td><span className={`badge badge-sm ${orderStatusClass[order.status]}`}>{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <section className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between gap-3">
            <h2 className="card-title">Top Products by Stock Value</h2>
            <Link to="/admin/products" className="link link-primary text-sm">Manage →</Link>
          </div>

          {topProducts.length === 0 ? (
            <p className="opacity-70">ยังไม่มีสินค้าในระบบ</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topProducts.map(product => (
                <li key={product.id} className="flex items-center gap-3 rounded-xl bg-base-200 p-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-base-100 text-2xl" aria-hidden="true">
                    {categoryIcons[product.category] || '📦'}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{product.name}</p>
                    <p className="text-sm text-primary">{formatTHB(product.price * product.stock)}</p>
                    <StockBadge stock={product.stock} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
