import { useEffect, useState } from "react";
import "./ProductListing.css";
import ProductCard from "../Components/ProductCard/ProductCard";

const LIMIT = 8;
const VISIBLE_PAGES = 4;

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${
          (page - 1) * LIMIT
        }`
      );

      const data = await res.json();

      setProducts(data.products);
      setTotal(data.total);
    };

    fetchProducts();
  }, [page]);

  const startPage =
    Math.floor((page - 1) / VISIBLE_PAGES) * VISIBLE_PAGES + 1;

  const endPage = Math.min(
    startPage + VISIBLE_PAGES - 1,
    totalPages
  );

  return (
    <div className="container">
      <div className="products">

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Previous
        </button>


        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((num) => (
          <button
            key={num}
            className={page === num ? "active" : ""}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}


        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>

      </div>
    </div>
  );
}

export default ProductListing;