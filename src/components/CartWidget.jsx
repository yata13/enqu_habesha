import { useCart } from "../context/CartContext";
import "./cart.css";

export default function CartWidget() {
  const { state, total, count, dispatch } = useCart();
  const entries = Object.entries(state.items);

  return (
    <div className="cart-widget">
      <details>
        <summary>🛒 Cart ({count})</summary>
        <div className="cart-panel">
          {entries.length === 0 ? <p className="empty">Your cart is empty.</p> : null}
          {entries.map(([key, it]) => (
            <div className="row" key={key}>
              <img src={it.image} alt={it.title} />
              <div className="meta">
                <div className="title">{it.title}</div>
                <div className="muted">Size: {it.size||"—"}</div>
                <div className="muted">{it.price.toLocaleString()} Br</div>
              </div>
              <div className="qty">
                <button onClick={()=>dispatch({type:"DEC", key})}>-</button>
                <span>{it.qty}</span>
                <button onClick={()=>dispatch({type:"INC", key})}>+</button>
              </div>
              <button className="remove" onClick={()=>dispatch({type:"REMOVE", key})}>×</button>
            </div>
          ))}
          <div className="total">
            <span>Total</span>
            <strong>{total.toLocaleString()} Br</strong>
          </div>
          <button className="checkout" disabled={entries.length===0}>Checkout</button>
        </div>
      </details>
    </div>
  );
}
