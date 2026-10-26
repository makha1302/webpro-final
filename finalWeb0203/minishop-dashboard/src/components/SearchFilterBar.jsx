import { Search } from 'lucide-react'

// ช่องค้นหา + Dropdown หมวดหมู่ (ข้อ 3.1, 3.2) และตัวเลือกเรียงลำดับ (ถ้าส่ง sortOptions มา)
export default function SearchFilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  formatCategory = name => name,
  sort,
  onSortChange,
  sortOptions
}) {
  const hasSort = Boolean(sortOptions)

  return (
    <div className={`grid gap-3 ${hasSort ? 'sm:grid-cols-2 lg:grid-cols-[1fr_200px_200px]' : 'sm:grid-cols-[1fr_220px]'}`}>
      <div className={hasSort ? 'sm:col-span-2 lg:col-span-1' : ''}>
        <label htmlFor="search-name" className="mb-1.5 block text-sm text-base-content/70">Search by name</label>
        <label className="input w-full">
          <Search className="size-4 opacity-50" />
          <input
            id="search-name"
            type="search"
            value={search}
            onChange={event => onSearchChange(event.target.value)}
            placeholder="เช่น mouse, keyboard..."
          />
        </label>
      </div>

      <div>
        <label htmlFor="filter-category" className="mb-1.5 block text-sm text-base-content/70">Category</label>
        <select
          id="filter-category"
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
      </div>

      {hasSort && (
        <div>
          <label htmlFor="sort-by" className="mb-1.5 block text-sm text-base-content/70">Sort by</label>
          <select
            id="sort-by"
            value={sort}
            onChange={event => onSortChange(event.target.value)}
            className="select w-full"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
