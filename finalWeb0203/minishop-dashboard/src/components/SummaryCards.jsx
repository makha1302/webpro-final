import { getInventorySummary } from '../utils/inventory'
import { formatTHB } from '../utils/format'

// ส่วนสรุปข้อมูลด้านบนของ Dashboard 3 รายการ (ข้อ 2.3) คำนวณจากข้อมูลสินค้าจริงใน State
export default function SummaryCards({ products }) {
  const { totalProducts, stockValue, outOfStock } = getInventorySummary(products)

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: '📦',
      description: 'จำนวนสินค้าทั้งหมด',
      tone: 'bg-primary/10 text-primary'
    },
    {
      title: 'Stock Value',
      value: formatTHB(stockValue),
      icon: '💰',
      description: 'มูลค่ารวมสินค้าคงเหลือ (price × stock)',
      tone: 'bg-success/10 text-success'
    },
    {
      title: 'Out of Stock',
      value: outOfStock,
      icon: '⚠️',
      description: 'จำนวนสินค้าที่หมดสต็อก',
      tone: 'bg-error/10 text-error'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(stat => (
        <div key={stat.title} className="card bg-base-100 shadow-sm transition-shadow duration-300 hover:shadow-md">
          <div className="card-body flex-row items-center gap-4 p-5">
            <span className={`grid size-12 shrink-0 place-items-center rounded-xl text-2xl ${stat.tone}`} aria-hidden="true">
              {stat.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm opacity-70">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs opacity-60">{stat.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
