import "./sidebar.css";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

function normalizeCategory(c) {
  if (!c) return { slug: "", name: "" };
  if (typeof c === "string") return { slug: c, name: c };
  if (typeof c === "object") return { slug: c.slug || c.name || String(c), name: c.name || c.slug || String(c) };
  return { slug: String(c), name: String(c) };
}

function Sidebar({ selectedCategories = [], onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [catError, setCatError] = useState(null);
  const [selected, setSelected] = useState({});

  const fetchCategories = async () => {
    setLoadingCategories(true);
    setCatError(null);

    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      const normalized = (Array.isArray(data) ? data : []).map(normalizeCategory);
      setCategories(normalized);
      const init = {};
      normalized.forEach((c) => (init[c.slug] = selectedCategories.includes(c.slug)));
      setSelected(init);
    } catch (err) {
      console.error("Categories fetch error:", err);
      setCatError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) fetchCategories();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // sync selectedCategories prop into local state when it changes
    if (!selectedCategories || selectedCategories.length === 0) return;
    setSelected((s) => {
      const next = { ...s };
      selectedCategories.forEach((slug) => (next[slug] = true));
      return next;
    });
  }, [selectedCategories]);

  const toggleCategory = (slug) => {
    setSelected((current) => {
      const next = { ...current, [slug]: !current[slug] };
      const active = Object.keys(next).filter((k) => next[k]);
      if (onCategoryChange) onCategoryChange(active);
      return next;
    });
  };

  return (
    <div className="sidebar filter-sidebar">
      <div className="search-box">
        <FaSearch className="sidebar-input-search-icon" />
        <input type="text" placeholder="Search..." />
      </div>

      <h3>Categories</h3>

      {loadingCategories && <div>Loading categories...</div>}
      {catError && (
        <div style={{ color: "#c00" }}>
          <p>Error: {catError}</p>
          <button
            onClick={fetchCategories}
            style={{ padding: "6px 12px", background: "#f59e0b", border: "none", color: "white", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
          >
            Retry
          </button>
        </div>
      )}

      {!loadingCategories && !catError && (
        <div>
          {categories.map((cat) => (
            <label key={cat.slug}>
              <input type="checkbox" checked={!!selected[cat.slug]} onChange={() => toggleCategory(cat.slug)} /> {" "}
              {cat.name}
            </label>
          ))}
        </div>
      )}

      <h3>Price Range</h3>

      <div className="price-inputs">
        <input type="number" placeholder="Min" />
        <input type="number" placeholder="Max" />
      </div>

      <button className="apply-btn">Apply</button>

      <h3>Brands</h3>

      <label>
        <input type="checkbox" /> Apple
      </label>

      <label>
        <input type="checkbox" /> Samsung
      </label>

      <label>
        <input type="checkbox" /> Xiaomi
      </label>
    </div>
  );
}

export default Sidebar;