import { useEffect, useMemo, useState } from "react";
import productsData from "./data/product";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

function App() {
  const [filters, setFilters] = useState(() => {
    try {
      const saved = localStorage.getItem("pf_filters");
      return saved ? JSON.parse(saved) : {
        category: [],
        brand: "",
        minPrice: "",
        maxPrice: "",
        rating: ""
      };
    } catch {
      return {
        category: [],
        brand: "",
        minPrice: "",
        maxPrice: "",
        rating: ""
      };
    }
  });
  const [sort, setSort] = useState(() => {
    try {
      const saved = localStorage.getItem("pf_sort");
      return saved ? JSON.parse(saved) : { by: "none", order: "asc" };
    } catch {
      return { by: "none", order: "asc" };
    }
  });
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    try {
      localStorage.setItem("pf_filters", JSON.stringify(filters));
    } catch {}
  }, [filters]);

  useEffect(() => {
    try {
      localStorage.setItem("pf_sort", JSON.stringify(sort));
    } catch {}
  }, [sort]);

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    if (debouncedFilters.category.length) {
      result = result.filter(p => debouncedFilters.category.includes(p.category));
    }
    if (debouncedFilters.brand) {
      result = result.filter(p => p.brand === debouncedFilters.brand);
    }
    if (debouncedFilters.minPrice) {
      result = result.filter(p => p.price >= parseFloat(debouncedFilters.minPrice));
    }
    if (debouncedFilters.maxPrice) {
      result = result.filter(p => p.price <= parseFloat(debouncedFilters.maxPrice));
    }
    if (debouncedFilters.rating) {
      result = result.filter(p => p.rating >= parseFloat(debouncedFilters.rating));
    }

    if (sort.by !== "none") {
      const dir = sort.order === "desc" ? -1 : 1;
      result.sort((a, b) => {
        let av = a[sort.by];
        let bv = b[sort.by];
        if (typeof av === "string") {
          return av.localeCompare(bv) * dir;
        }
        if (av < bv) return -1 * dir;
        if (av > bv) return 1 * dir;
        return 0;
      });
    }

    return result;
  }, [debouncedFilters, sort]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, [debouncedFilters, sort]);

  const handleClear = () => {
    setFilters({ category: [], brand: "", minPrice: "", maxPrice: "", rating: "" });
    setSort({ by: "none", order: "asc" });
  };

  return (
    <div className="app">
      <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
        Filters
      </button>
      <div className={`content ${showFilters ? 'with-filters' : 'no-filters'}`}>
        <Filters
          filters={filters}
          setFilters={setFilters}
          sort={sort}
          setSort={setSort}
          onClear={handleClear}
          isVisible={showFilters}
          toggleVisible={() => setShowFilters(false)}
        />
        <ProductList products={filteredProducts} loading={loading} />
      </div>
    </div>
  );
}

export default App;
