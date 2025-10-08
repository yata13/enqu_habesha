import React from 'react';

// Import component‑specific styles.  Separating the CSS into its own
// file keeps this component self‑contained and avoids polluting the
// global namespace.
import '../style/slide-card.css';

const SlideCard = ({
  id,
  name,
  image,
  star,
  price = "100$",
  sizes = ["S", "M", "L", "XL"],
  onSelect,
}) => {
  
  const handleClick = () => {
    if (typeof onSelect === "function") {
      onSelect();
    }
  };

  return (
    <div className="img-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="img-wrap">
        <img className="img-slid" src={image} alt={name} />
      </div>
      <div className="card-info">
        <p>difine {name}</p>
        <div className="price-row">
          <span className="price">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;