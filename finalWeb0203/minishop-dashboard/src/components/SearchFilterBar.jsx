import { SearchIcon } from './Icons'

// ช่องค้นหา + Dropdown หมวดหมู่ (ข้อ 3.1, 3.2) ใช้ได้ทั้งหน้าร้านและหน้า Admin
export default function SearchFilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  formatCategory = name => name
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
      <label className="form-control w-full">
        <span className="mb-1 block text-sm font-medium">Search by name</span>
        <span className="input w-full">
          <SearchIcon className="size-4 opacity-50" />
          <input
            type="search"
            value={search}
            onChange={event => onSearchChange(event.target.value)}
            placeholder="เช่น mouse, keyboard..."
          />
        </span>
      </label>

      <label className="form-control w-full">
        <span className="mb-1 block text-sm font-medium">Category</span>
        <select
          value={category}
          onChange={event => onCategoryChange(event.target.value)}
          className="select w-full"
        >
          <option value="all">All Categories</option>
          {categories.map(name => (
            <option key={name} value={name}>
              {formatCategory(name)}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
