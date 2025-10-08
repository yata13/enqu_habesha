// src/components/QuickOrderForm.jsx
import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

const QuickOrderForm = ({ selected, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [fabric, setFabric]     = useState("");
  const [color, setColor]       = useState("");
  const [size, setSize]         = useState("");
  const [notes, setNotes]       = useState("");

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Use SAME Formspree form or a different one if you prefer
  const [state, handleSubmit] = useForm("movngdar");

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setPreviewUrl(f ? URL.createObjectURL(f) : "");
  };

  useEffect(() => {
    if (state.succeeded) {
      setFullName("");
      setEmail("");
      setFabric("");
      setColor("");
      setSize("");
      setNotes("");
      setFile(null);
      setPreviewUrl("");
    }
  }, [state.succeeded]);

  const productName = selected?.name || "";
  const productId   = selected?.id || "";

  return (
    <>
      {state.succeeded ? (
        <div className="custom-form" style={{ textAlign: "center" }}>
          <h3>Thanks! Your custom order request was sent 🎉</h3>
          <p>We’ll reply to <b>{email || "your email"}</b> soon.</p>
          <button className="cta" type="button" onClick={() => state.setSucceeded(false)}>
            Send another
          </button>
        </div>
      ) : (
        <form
          className="custom-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"   // for file uploads
        >
          <input type="hidden" name="mode" value="custom" />
          <input type="hidden" name="product" value={productName} />
          <input type="hidden" name="productId" value={productId} />

          <div className="form-row two">
            <div>
              <label>Full Name</label>
              <input
                id="fullName"
                name="fullName"
                required
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
                placeholder="Your name"
              />
              <ValidationError prefix="Full Name" field="fullName" errors={state.errors} />
            </div>
            <div>
              <label>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
          </div>

          <div className="form-row two">
            <div>
              <label>Main Fabric</label>
              <input
                id="fabric"
                name="fabric"
                value={fabric}
                onChange={(e)=>setFabric(e.target.value)}
                placeholder="e.g. Silk, Cotton"
              />
              <ValidationError prefix="Fabric" field="fabric" errors={state.errors} />
            </div>
            <div>
              <label>Color</label>
              <input
                id="color"
                name="color"
                value={color}
                onChange={(e)=>setColor(e.target.value)}
                placeholder="e.g. Ivory, Gold"
              />
              <ValidationError prefix="Color" field="color" errors={state.errors} />
            </div>
          </div>

          <div className="form-row">
            <label>Size</label>
            <select id="size" name="size" value={size} onChange={(e)=>setSize(e.target.value)}>
              <option value="">Select size</option>
              {["S","M","L","XL","XXL"].map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
            <ValidationError prefix="Size" field="size" errors={state.errors} />
          </div>

          <div className="form-row">
            <label>Reference Image (optional)</label>
            <input id="referenceImage" name="referenceImage" type="file" accept="image/*" onChange={onFileChange} />
            {previewUrl && (
              <div className="upload-preview">
                <img src={previewUrl} alt="upload preview" />
                <button
                  type="button"
                  className="link-btn"
                  onClick={()=>{setFile(null); setPreviewUrl("");}}
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          <div className="form-row">
            <label>Notes (embroidery, fit, link, etc.)</label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
              placeholder="Anything specific you want…"
            />
            <ValidationError prefix="Notes" field="notes" errors={state.errors} />
          </div>

          <button className="cta" type="submit" disabled={state.submitting}>
            {state.submitting ? "Sending..." : "Submit Custom Order"}
          </button>
        </form>
      )}
    </>
  );
};

export default QuickOrderForm;
