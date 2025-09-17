export default function Filters({ filters, setFilters, toggleVisible, isVisible, sort, setSort, onClear }) {
  const categories = ["Electronics", "Footwear", "Clothing"];
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];

  return (
    <div className={`filters ${isVisible ? "show" : ""}`}>
      <button className="close-btn" onClick={toggleVisible} aria-label="Close filters">✖</button>

      <h3 className="text-xs uppercase tracking-wide text-slate-400 font-bold mb-2">Category</h3>
      {categories.map(cat => (
        <label key={cat} className="flex items-center gap-2 text-sm text-slate-200 mb-1">
          <input
            type="checkbox"
            aria-label={`Category ${cat}`}
            checked={filters.category.includes(cat)}
            onChange={(e) => {
              if (e.target.checked) {
                setFilters(prev => ({ ...prev, category: [...prev.category, cat] }));
              } else {
                setFilters(prev => ({
                  ...prev,
                  category: prev.category.filter(c => c !== cat)
                }));
              }
            }}
            className="w-4 h-4 accent-indigo-500"
          />
          {cat}
        </label>
      ))}

      <h3 className="text-xs uppercase tracking-wide text-slate-400 font-bold mt-4 mb-2">Brand</h3>
      <select
        aria-label="Brand filter"
        value={filters.brand}
        onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
        className="w-full bg-[rgba(12,18,35,0.8)] text-slate-200 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All</option>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <h3 className="text-xs uppercase tracking-wide text-slate-400 font-bold mt-4 mb-2">Price Range</h3>
      <input
        type="number"
        placeholder="Min"
        aria-label="Min price"
        value={filters.minPrice}
        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
        className="w-full bg-[rgba(12,18,35,0.8)] text-slate-200 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
      />
      <input
        type="number"
        placeholder="Max"
        aria-label="Max price"
        value={filters.maxPrice}
        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
        className="w-full bg-[rgba(12,18,35,0.8)] text-slate-200 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <h3 className="text-xs uppercase tracking-wide text-slate-400 font-bold mt-4 mb-2">Rating</h3>
      <input
        type="number"
        step="0.1"
        min="0"
        max="5"
        aria-label="Minimum rating"
        value={filters.rating}
        onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
        className="w-full bg-[rgba(12,18,35,0.8)] text-slate-200 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <h3 className="text-xs uppercase tracking-wide text-slate-400 font-bold mt-4 mb-2">Sort By</h3>
      <select
        aria-label="Sort by"
        value={sort.by}
        onChange={(e) => setSort(prev => ({ ...prev, by: e.target.value }))}
        className="w-full bg-[rgba(12,18,35,0.8)] text-slate-200 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="none">None</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
      </select>
      <select
        aria-label="Sort order"
        value={sort.order}
        onChange={(e) => setSort(prev => ({ ...prev, order: e.target.value }))}
        className="w-full bg-[rgba(12,18,35,0.8)] text-slate-200 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      <div className="mt-3">
        <button aria-label="Clear filters" onClick={onClear} className="w-full border border-indigo-500 rounded-lg px-3 py-2 text-slate-200 hover:bg-indigo-500/20 transition-colors">Clear</button>
      </div>
    </div>
  );
}
