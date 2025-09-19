// src/components/EmailOrderBar.jsx
import { useState } from "react";

/**
 * Sticky bottom bar that allows a user to submit their email and an optional
 * message along with the currently selected product (identified by id and
 * name).  When submitted, the data is posted to a Formspree endpoint so
 * that you receive an email notification without needing your own backend.
 *
 * NOTE: Replace the placeholder FORM_ENDPOINT value with your actual
 * form ID from https://formspree.io.  Visit your Formspree dashboard,
 * create a new form, and copy the unique endpoint (e.g. "https://formspree.io/f/abcdefg").
 */
// Replace the placeholder with your actual Formspree endpoint.  This will
// send the form submission to your Formspree account.  The user
// provided endpoint is used here.
const FORM_ENDPOINT = "https://formspree.io/f/movngdar";

export default function EmailOrderBar({ selected, onClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Track the chosen size.  The user must select a size before submitting.
  const [size, setSize] = useState("");
  const [status, setStatus] = useState(null);

  // Only enable the submit button when an item is selected and both
  // email and message fields have been filled out.
  // Only enable the submit button when an item is selected and the user
  // has provided an email, a size and a message.
  const canSubmit = Boolean(selected) && email.trim() !== "" && size.trim() !== "" && message.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    // Construct form data to send to Formspree.  Use FormData since
    // Formspree expects form-encoded values by default.  Include
    // hidden fields for the product id and name, as well as the
    // message and user's email.  The `_subject` field sets the
    // subject line of the email you receive.
    const formData = new FormData();
    formData.append("email", email);
    formData.append("message", message);
    formData.append("size", size);
    formData.append("imageId", selected.id ?? "");
    formData.append("imageName", selected.name ?? "");
    formData.append("_subject", `New dress selection: ${selected.name}`);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setStatus("success");
        // Optionally clear the form and selection after successful submission
        setEmail("");
        setSize("");
        setMessage("");
        onClose?.();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form className="email-bar" onSubmit={handleSubmit}>
      <div className="pick">
        {selected ? (
          <>
            <img className="pick-thumb" src={selected.image} alt={selected.name} />
            <div className="pick-meta">
              <strong className="pick-name">{selected.name}</strong>
              <small className="pick-id">ID: {selected.id}</small>
            </div>
          </>
        ) : (
          <span className="pick-empty">Select a dress to order</span>
        )}
      </div>
      {/* Hidden fields so the data is included when the form posts.  These
          values mirror the ones appended to FormData in handleSubmit. */}
      <input type="hidden" name="imageId" value={selected?.id ?? ""} />
      <input type="hidden" name="imageName" value={selected?.name ?? ""} />
      <input type="hidden" name="_subject" value={selected ? `New dress selection: ${selected.name}` : ""} />

      {/* Email input */}
      <input
        type="email"
        className="email-input"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* Submit button */}
      <button className="email-submit" type="submit" disabled={!canSubmit}>
        Submit
      </button>
      {/* Size select spans the full width to allow the user to choose a size */}
      <div className="size-wrapper">
        <select
          className="size-select"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        >
          <option value="">Select size</option>
          <option value="S">Small (S)</option>
          <option value="M">Medium (M)</option>
          <option value="L">Large (L)</option>
          <option value="XL">Extra Large (XL)</option>
        </select>
      </div>

      {/* Message textarea occupies a full row in the grid */}
      <div className="message-wrapper">
        <textarea
          className="email-message"
          placeholder="Write a short message (e.g. your size or notes)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      {/* Show a simple status after submission */}
      {status === "success" && (
        <div className="form-status">Thanks! We'll be in touch soon.</div>
      )}
      {status === "error" && (
        <div className="form-status">Oops! There was a problem submitting your form.</div>
      )}
    </form>
  );
}
