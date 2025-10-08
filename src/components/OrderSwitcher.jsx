// src/components/OrderSwitcher.jsx
import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import QuickOrderForm from "./QuickOrderForm";
import "../style/EmailOrderBar.css";

export default function OrderSwitcher({ selected, onClose }) {
  const [mode, setMode] = useState("self");

  // visible fields
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [message, setMessage] = useState("");

  // image preview state
  const [imgIndex, setImgIndex] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [imgError, setImgError] = useState(false);

  // ✅ Formspree React hook
  const [state, handleSubmit] = useForm("movngdar");

  // auto-switch to Existing when a product is chosen
  useEffect(() => {
    if (selected) setMode("existing");
    setImgIndex(0);
    setImgError(false);
  }, [selected]);

  useEffect(() => setImgError(false), [imgIndex, selected]);

  const currentImg = selected?.images?.[imgIndex] || selected?.image || "";
  const hasImage = Boolean((selected?.images?.length || selected?.image) && !imgError);

  // optional: clear inputs after a successful submit
  useEffect(() => {
    if (state.succeeded) {
      setEmail("");
      setSize("");
      setMessage("");
    }
  }, [state.succeeded]);

  return (
    <section className="order-wrap">
      <div className="order-toggle">
        <button
          className={`toggle-btn ${mode === "existing" ? "active" : ""}`}
          onClick={() => setMode("existing")}
          type="button"
        >
          Order Existing Style
        </button>
        <button
          className={`toggle-btn ${mode === "self" ? "active" : ""}`}
          onClick={() => setMode("self")}
          type="button"
        >
          Create Custom Design (Order by Self)
        </button>
      </div>

      {mode === "existing" && (
        <>
          {state.succeeded ? (
            <div className="custom-form" style={{ textAlign: "center" }}>
              <h3>Thanks! We received your order 🎉</h3>
              <p>We’ll email you soon.</p>
              <button className="cta" type="button" onClick={() => setMode("self")}>
                Create a Custom Order
              </button>
            </div>
          ) : (
            // ✅ Hook-based submit — no manual fetch/AJAX needed
            <form className="custom-form" onSubmit={handleSubmit}>
              {/* preview */}
              <div className="existing-preview">
                <div
                  className={`preview-main ${!hasImage ? "is-empty" : ""}`}
                  onClick={() => hasImage && setShowBox(true)}
                  title={hasImage ? "Click to preview" : ""}
                >
                  {hasImage ? (
                    <img
                      src={currentImg}
                      alt={selected?.name || "Selected style"}
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="preview-placeholder">No image</div>
                  )}
                </div>

                {selected?.images?.length > 1 && (
                  <div className="preview-thumbs">
                    {selected.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`thumb-${i}`}
                        className={`thumb ${i === imgIndex ? "active" : ""}`}
                        onClick={() => setImgIndex(i)}
                        onError={(e) => (e.currentTarget.style.opacity = 0.4)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* visible inputs (MUST have name=... for Formspree) */}
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />

              <label htmlFor="size">Size</label>
              <select
                id="size"
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              >
                <option value="">Select size</option>
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ValidationError prefix="Size" field="size" errors={state.errors} />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Any instructions (hem length, sleeve, etc.)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              {/* hidden metadata (also sent to Formspree) */}
              <input type="hidden" name="mode" value="existing" />
              <input type="hidden" name="product" value={selected?.name || ""} />
              <input type="hidden" name="productId" value={selected?.id || ""} />
              <input type="hidden" name="imageUrl" value={currentImg} />
              <input type="hidden" name="imgIndex" value={String(imgIndex)} />
              <input
                type="hidden"
                name="_subject"
                value={`Existing style order: ${selected?.name || "-"}`}
              />

              <button className="cta" type="submit" disabled={state.submitting}>
                {state.submitting ? "Sending..." : "Place Order"}
              </button>

              {/* lightbox */}
              {showBox && hasImage && (
                <div className="lightbox" onClick={() => setShowBox(false)}>
                  <div className="lightbox-content">
                    <img src={currentImg} alt="preview" />
                  </div>
                </div>
              )}
            </form>
          )}
        </>
      )}

      {mode === "self" && <QuickOrderForm selected={selected} onClose={onClose} />}
    </section>
  );
}
