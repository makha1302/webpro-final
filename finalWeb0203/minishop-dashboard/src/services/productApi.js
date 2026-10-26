// รวมการเรียก Fake Store API ไว้ที่ไฟล์เดียว (ข้อ 4.1)
const API_URL = 'https://fakestoreapi.com'
const TIMEOUT_MS = 10000

async function request(path) {
  // ถ้า API ไม่ตอบภายในเวลาที่กำหนด ให้ยกเลิก Request เพื่อไม่ให้ค้างที่ Loading
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(`${API_URL}${path}`, { signal: controller.signal })

    // fetch() ไม่ throw เองเมื่อได้ 404/500 จึงต้องตรวจ response.ok
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

// GET /products — สินค้าทั้งหมด (id, title, price, description, category, image, rating)
export async function getProducts() {
  return request('/products')
}
