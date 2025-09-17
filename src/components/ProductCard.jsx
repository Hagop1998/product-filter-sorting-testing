import "../style/ProductCard.css";

export default function ProductCard({ product }) {
  const fallback =
    "data:image/svg+xml;utf8,\"<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23121a30'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23a3adc2' font-family='Arial' font-size='20'>Image unavailable</text></svg>\"";

  const handleImgError = (e) => {
    if (e.target.src !== fallback) {
      e.target.src = fallback;
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onError={handleImgError}
        />
      </div>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price}</p>
      <p>⭐ {product.rating}</p>
    </div>
  );
}
