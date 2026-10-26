import { useState } from 'react'
import { CircleCheck, Plus } from 'lucide-react'
import { inventoryCategories } from '../data/mockProducts'

const emptyForm = {
  name: '',
  category: inventoryCategories[0],
  price: '',
  stock: ''
}

// ตรวจสอบข้อมูลก่อนเพิ่มสินค้า (ข้อ 3.3) — คืนค่า Object ของข้อความ Error ตามช่อง
function validate(form) {
  const errors = {}
  const price = Number(form.price)
  const stock = Number(form.stock)

  if (!form.name.trim()) {
    errors.name = 'กรุณากรอกชื่อสินค้า'
  }
  if (form.price === '' || !Number.isFinite(price) || price <= 0) {
    errors.price = 'ราคาต้องเป็นตัวเลขที่มากกว่า 0'
  }
  if (form.stock === '' || !Number.isInteger(stock) || stock < 0) {
    errors.stock = 'จำนวนต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป'
  }

  return errors
}

export default function AddProductForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    // ลบข้อความ Error ของช่องนั้นเมื่อผู้ใช้เริ่มแก้ไข
    setErrors(current => ({ ...current, [name]: undefined }))
    setSuccess('')
  }

  function handleSubmit(event) {
    event.preventDefault() // ไม่ให้ Browser โหลดหน้าใหม่

    const formErrors = validate(form)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    const name = form.name.trim()
    onAdd({
      name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock)
    })

    setForm(emptyForm)
    setErrors({})
    setSuccess(`เพิ่ม "${name}" สำเร็จ`)
  }

  const fieldClass = hasError => (hasError ? 'input-error' : '')

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-base-300/60 bg-base-100 p-5 md:p-6">
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-medium">Add New Product</h2>
          <p className="text-sm text-base-content/60">กรอกข้อมูลให้ครบ แล้วกด Add Product</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <label htmlFor="product-name" className="mb-1 block text-sm text-base-content/70">Product Name</label>
            <input
              id="product-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="เช่น Gaming Headset"
              className={`input w-full ${fieldClass(errors.name)}`}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="product-category" className="mb-1 block text-sm text-base-content/70">Category</label>
            <select
              id="product-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="select w-full"
            >
              {inventoryCategories.map(name => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="product-price" className="mb-1 block text-sm text-base-content/70">Price (฿)</label>
            <input
              id="product-price"
              name="price"
              type="number"
              min="1"
              step="any"
              value={form.price}
              onChange={handleChange}
              placeholder="0"
              className={`input w-full ${fieldClass(errors.price)}`}
              aria-invalid={Boolean(errors.price)}
            />
            {errors.price && <p className="mt-1 text-xs text-error">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="product-stock" className="mb-1 block text-sm text-base-content/70">Stock</label>
            <input
              id="product-stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              placeholder="0"
              className={`input w-full ${fieldClass(errors.stock)}`}
              aria-invalid={Boolean(errors.stock)}
            />
            {errors.stock && <p className="mt-1 text-xs text-error">{errors.stock}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {success && (
            <span role="status" className="mr-auto flex items-center gap-1.5 text-sm text-success">
              <CircleCheck className="size-4" strokeWidth={1.8} />
              {success}
            </span>
          )}
          <button type="submit" className="btn btn-primary rounded-full px-6 font-normal">
            <Plus className="size-4" strokeWidth={2} />
            Add Product
          </button>
        </div>
      </div>
    </form>
  )
}
