// สินค้าจาก Fake Store API ใช้ราคาเป็น USD
export function formatUSD(value) {
  return `$${Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

// สินค้าในคลัง (Mock Data) ใช้ราคาเป็นบาท
export function formatTHB(value) {
  return `฿${Number(value).toLocaleString('en-US')}`
}

// ขึ้นต้นแต่ละคำด้วยตัวพิมพ์ใหญ่ เช่น "men's clothing" → "Men's Clothing"
export function capitalize(text) {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
