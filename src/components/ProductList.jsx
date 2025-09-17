import ProductCard from "./ProductCard";
import Loader from "./Loader";

export default function ProductList({ products, loading }) {
  if (loading) return <Loader />;
  if (!products.length) return <p style={{ textAlign: "center" }}>No products found.</p>;

  return (
    <div className="product-list">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
