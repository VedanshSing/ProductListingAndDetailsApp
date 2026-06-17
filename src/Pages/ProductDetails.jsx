import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h1>Loading...</h1>;

  return (
    <div className="details-page">
      <div className="details-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="details-body">
          <div className="left-section">
            <img src={product.images[0]} alt="" />
            <div className="pagination">
              <button>← Previous</button>

              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>5</button>
              <button>Next →</button>
            </div>
          </div>

          <div className="right-section">
            <h1>{product.title}</h1>
            <div className="price-row">
              <h2>${product.price}</h2>
              <span>⭐⭐⭐⭐⭐ ({product.rating})</span>
            </div>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <hr />
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
