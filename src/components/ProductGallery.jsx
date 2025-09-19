import { useState } from "react";
import "./gallery.css";

export default function ProductGallery({ product }) {
  const [idx, setIdx] = useState(0);
  const current = product.angles[idx];

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={current} alt={product.title} className="gallery-hero" />
      </div>
      <div className="gallery-thumbs">
        {product.angles.map((src, i) => (
          <button key={i} className={"thumb" + (i===idx?" active":"")} onClick={()=>setIdx(i)}>
            <img src={src} alt={`${product.title} angle ${i+1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
