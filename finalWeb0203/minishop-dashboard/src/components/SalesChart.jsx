// กราฟเส้นยอดขายรายวันแบบ SVG (ไม่ต้องติดตั้ง Library เพิ่ม)
const WIDTH = 600
const HEIGHT = 240
const PAD = { top: 16, right: 16, bottom: 28, left: 40 }

export default function SalesChart({ data }) {
  const max = Math.ceil(Math.max(...data.map(point => point.amount)) / 200) * 200
  const innerW = WIDTH - PAD.left - PAD.right
  const innerH = HEIGHT - PAD.top - PAD.bottom

  const points = data.map((point, index) => ({
    ...point,
    x: PAD.left + (index / (data.length - 1)) * innerW,
    y: PAD.top + innerH - (point.amount / max) * innerH
  }))

  const line = points.map(point => `${point.x},${point.y}`).join(' ')
  const area = `${PAD.left},${PAD.top + innerH} ${line} ${PAD.left + innerW},${PAD.top + innerH}`
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(ratio => Math.round(max * ratio))

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full text-primary"
      role="img"
      aria-label="Sales overview chart for this week"
    >
      {ticks.map(tick => {
        const y = PAD.top + innerH - (tick / max) * innerH
        return (
          <g key={tick}>
            <line x1={PAD.left} x2={WIDTH - PAD.right} y1={y} y2={y} className="stroke-base-300" strokeWidth="1" />
            <text x={PAD.left - 8} y={y + 4} textAnchor="end" className="fill-base-content text-[11px] opacity-60">
              {tick}
            </text>
          </g>
        )
      })}

      <polygon points={area} className="fill-current opacity-15" />
      <polyline points={line} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

      {points.map(point => (
        <g key={point.day}>
          <circle cx={point.x} cy={point.y} r="4" className="fill-base-100" stroke="currentColor" strokeWidth="2">
            <title>{`${point.day}: $${point.amount}`}</title>
          </circle>
          <text x={point.x} y={HEIGHT - 8} textAnchor="middle" className="fill-base-content text-[11px] opacity-60">
            {point.day}
          </text>
        </g>
      ))}
    </svg>
  )
}
