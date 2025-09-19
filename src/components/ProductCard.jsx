import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./product-card.css";

export default function ProductCard({ product }) {
  const { state, dispatch } = useCart();
  const [size, setSize] = useState(product.sizes?.[0] || "S");
  const fav = state.favorites.includes(product.id);

  const add = () => {
    dispatch({ type: "ADD", item: { id: product.id, title: product.title, price: product.price, size, image: product.angles[0] } });
  };

  const toggleFav = () => dispatch({ type: "TOGGLE_FAVORITE", id: product.id });

  return (
    <div className="pcard" tabIndex={0}>
      <button className={"fav" + (fav ? " active" : "")} onClick={toggleFav} aria-label="favorite">❤</button>
      <img className="pcard-img" src={product.angles[0]} alt={product.title} />
      <div className="pcard-body">
        <h3 className="pcard-title">{product.title}</h3>
        <p className="pcard-price">{product.price.toLocaleString()} Br</p>
        {product.sizes?.length ? (
          <select className="pcard-size" value={size} onChange={e=>setSize(e.target.value)}>
            {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        ) : null}
        <button className="pcard-add" onClick={add}>Add to Cart</button>
      </div>
    </div>
  );
}
