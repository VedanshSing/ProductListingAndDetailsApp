import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    fontSize: "16px",
    lineHeight: "1"
  };

  const emptyStarStyle = { ...starStyle, transform: "scale(1.35)" };

  return (
    <>
      {Array(fullStars).fill(null).map((_, i) => (
        <span key={`full-${i}`} style={starStyle}>⭐</span>
      ))}
      {hasHalfStar && <span style={starStyle}>⭐</span>}
      {Array(emptyStars).fill(null).map((_, i) => (
        <span key={`empty-${i}`} style={emptyStarStyle}>☆</span>
      ))}
    </>
  );
}

function ProductCard({ product }) {
    const navigate = useNavigate();
  return (
    <div className="card" key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
      <img
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="card-body">
        <h3>{product.title}</h3>

        <h2>${product.price}</h2>

        <p>{renderStars(product.rating)} ({product.rating.toFixed(1)})</p>
      </div>
    </div>
  );
}

export default ProductCard;
