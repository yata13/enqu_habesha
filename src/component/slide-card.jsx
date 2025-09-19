import React from 'react';

const SlideCard = ({
  id,
  name,
  image,
  star,
  price = "100$",
  sizes = ["S", "M", "L", "XL"],
  onSelect,
}) => {
  /**
   * Render a single slide card.  When the card is clicked, call the
   * provided onSelect handler (if any) so that the parent can track
   * which item has been chosen.  In addition to the image and title
   * passed via props, each card displays a price row (star icon and
   * price) and a sizes row.  These elements can be customised via
   * props, and their appearance is controlled in the CSS.
   */
  const handleClick = () => {
    if (typeof onSelect === "function") {
      onSelect();
    }
  };

  return (
    <div className="img-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="img-wrap">
        {/* Use the provided image and name to populate the card */}
        <img className="img-slid" src={image} alt={name} />
      </div>
      {/* Info block containing price and size information */}
      <div className="card-info">
        <div className="price-row">
          {/* Star icon and price */}
          <img className="star-icon" src={star} alt="star" />
          <span className="price">{price}</span>
        </div>
        <div className="sizes-row">
          <span className="size-label">Sizes:</span>
          {sizes.map((sz, idx) => (
            <span key={idx} className="size-item">
              {sz}
            </span>
          ))}
        </div>
      </div>
      <h3 className="slider-title">{name}</h3>
    </div>
  );
};

export default SlideCard;