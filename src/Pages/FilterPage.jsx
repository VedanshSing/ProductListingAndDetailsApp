import { useEffect, useMemo, useState } from 'react'
import Sidebar from '../Components/SideBar/Sidebar'
import ProductCard from '../Components/ProductCard/ProductCard'
import './FilterPage.css'

function FilterPage() {
  const [products, setProducts] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('https://dummyjson.com/products')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (cancelled) return
        setProducts(data.products || [])
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Unable to load products')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchProducts()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return products
    return products.filter((product) => selectedCategories.includes(product.category))
  }, [products, selectedCategories])

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredProducts.slice(start, start + pageSize)
  }, [filteredProducts, currentPage])

  return (
    <div className="filter-page">
      <div className="filter-page__layout">
        <aside className="filter-page__sidebar">
          <Sidebar selectedCategories={selectedCategories} onCategoryChange={setSelectedCategories} />
        </aside>
        <section className="filter-page__main">
          <h2>Filter Options</h2>
          <p>Use the options on the left to narrow down products.</p>

          <div className="filter-page__summary">
            <p>
              Showing {filteredProducts.length} of {products.length} products
              {selectedCategories.length > 0 && (
                <> filtered by {selectedCategories.length} category(ies)</>
              )}
            </p>
          </div>

          <div className="filter-page__products-grid">
            {loading && <p>Loading products...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && filteredProducts.length === 0 && (
              <p>No products match the selected categories.</p>
            )}

            <div className="grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length > pageSize && (
              <div className="pagination">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  Prev
                </button>

                {/* sliding window of 5 page numbers: 1-5, 5-9, 9-13, ... */}
                {(() => {
                  const windowSize = 5
                  const step = 4
                  const total = Math.ceil(filteredProducts.length / pageSize)
                  const start = Math.min(1 + Math.floor((currentPage - 1) / step) * step, total)
                  const end = Math.min(start + windowSize - 1, total)
                  const pages = []
                  for (let p = start; p <= end; p++) pages.push(p)
                  return pages.map((p) => (
                    <button key={p} className={p === currentPage ? 'active' : ''} onClick={() => setCurrentPage(p)}>
                      {p}
                    </button>
                  ))
                })()}

                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default FilterPage
