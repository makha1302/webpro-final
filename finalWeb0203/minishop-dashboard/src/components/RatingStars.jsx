import { Star } from 'lucide-react'

// แสดงคะแนนรีวิว — rating เป็น Object จึงต้องอ่าน rating.rate และ rating.count
export default function RatingStars({ rating, size = 'text-sm' }) {
  const rate = rating?.rate ?? 0
  const count = rating?.count ?? 0

  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
      <span className="font-medium">{rate.toFixed(1)}</span>
      <span className="text-base-content/50">({count} reviews)</span>
    </div>
  )
}
