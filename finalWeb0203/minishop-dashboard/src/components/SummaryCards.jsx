import { Package, PackageX, Wallet } from 'lucide-react'
import { getInventorySummary } from '../utils/inventory'
import { formatTHB } from '../utils/format'

// ส่วนสรุปข้อมูลด้านบนของ Dashboard 3 รายการ (ข้อ 2.3) คำนวณจากข้อมูลสินค้าจริงใน State
export default function SummaryCards({ products }) {
  const { totalProducts, stockValue, outOfStock } = getInventorySummary(products)

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      description: 'จำนวนสินค้าทั้งหมด',
      tone: 'bg-primary/10 text-primary'
    },
    {
      title: 'Stock Value',
      value: formatTHB(stockValue),
      icon: Wallet,
      description: 'มูลค่ารวมสินค้าคงเหลือ (price × stock)',
      tone: 'bg-accent/20 text-warning'
    },
    {
      title: 'Out of Stock',
      value: outOfStock,
      icon: PackageX,
      description: 'จำนวนสินค้าที่หมดสต็อก',
      tone: 'bg-error/10 text-error'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(stat => (
        <div key={stat.title} className="rounded-2xl border border-base-300/60 bg-base-100 p-5 transition-shadow duration-300 hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-base-content/60">{stat.title}</p>
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${stat.tone}`}>
              <stat.icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
            </span>
          </div>
          <p className="mt-1 text-3xl font-semibold tracking-tight">{stat.value}</p>
          <p className="mt-1 text-xs text-base-content/50">{stat.description}</p>
        </div>
      ))}
    </div>
  )
}
