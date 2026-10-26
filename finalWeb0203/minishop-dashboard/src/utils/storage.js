// อ่าน/เขียน localStorage แบบปลอดภัย (บาง Browser ปิด Storage ไว้จะ throw Error)
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ถ้าบันทึกไม่ได้ ข้อมูลยังอยู่ใน State ตามปกติ
  }
}
