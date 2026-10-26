// ข้อมูลจำลองสำหรับกราฟยอดขายและคำสั่งซื้อในหน้า Admin Dashboard
export const weeklySales = [
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 210 },
  { day: 'Wed', amount: 180 },
  { day: 'Thu', amount: 260 },
  { day: 'Fri', amount: 230 },
  { day: 'Sat', amount: 390 },
  { day: 'Sun', amount: 610 }
]

export const sampleOrders = [
  { id: '#000124', customer: 'John Doe', date: '2026-10-24', total: 109.95, status: 'Delivered' },
  { id: '#000123', customer: 'Jane Smith', date: '2026-10-22', total: 79.99, status: 'Processing' },
  { id: '#000122', customer: 'Mike Johnson', date: '2026-10-20', total: 48.0, status: 'Shipped' },
  { id: '#000121', customer: 'Sarah Lee', date: '2026-10-18', total: 115.0, status: 'Pending' },
  { id: '#000120', customer: 'David Kim', date: '2026-10-15', total: 69.99, status: 'Delivered' }
]

export const orderStatusClass = {
  Delivered: 'badge-success',
  Processing: 'badge-warning',
  Shipped: 'badge-info',
  Pending: 'badge-neutral'
}
