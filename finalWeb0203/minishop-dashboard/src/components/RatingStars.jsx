// แสดงคะแนนรีวิว — rating เป็น Object จึงต้องอ่าน rating.rate และ rating.count
export default function RatingStars({ rating, size = 'text-sm' }) {
  const rate = rating?.rate ?? 0
  const count = rating?.count ?? 0

  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <span className="text-warning" aria-hidden="true">★</span>
      <span className="font-medium">{rate.toFixed(1)}</span>
      <span className="opacity-60">({count} reviews)</span>
    </div>
  )
}
