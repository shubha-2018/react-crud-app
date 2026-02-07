import { useEffect, useState } from "react";
import { fields } from "./fieldConfig";
import { addUser, updateUser } from "./api";

export default function UserForm({ selected, reload }) {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(selected || {});
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();
    console.log("Form submitting:", form);
    setIsSubmitting(true);
    try {
      if (selected && selected.id) {
        await updateUser(selected.id, form);
      } else {
        await addUser(form);
      }
      reload();
      setForm({});
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">{selected ? "Update User" : "Add New User"}</h2>
        <form onSubmit={submit} className="user-form">
          <div className="form-grid">
            {fields.map((f) => (
              <div key={f.name} className="form-group">
                <label htmlFor={f.name} className="form-label">
                  {f.label} {f.required && <span className="required">*</span>}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={`Enter ${f.label.toLowerCase()}`}
                  required={f.required}
                  value={form[f.name] || ""}
                  onChange={(e) =>
                    setForm({ ...form, [f.name]: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? "Processing..." : selected ? "Update User" : "Add User"}
            </button>
            {selected && (
              <button
                type="button"
                onClick={() => {
                  setForm({});
                  reload();
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <style>{`
        .form-container { display:flex; justify-content:center; padding:1rem; min-height:100vh; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); }
        .form-card { background:white; border-radius:16px; box-shadow:0 20px 60px rgba(0,0,0,0.3); padding:1.5rem; width:100%; max-width:600px; }
        .form-title { font-size:1.5rem; font-weight:700; text-align:center; margin-bottom:1.5rem; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .form-grid { display:grid; grid-template-columns:1fr; gap:1rem; }
        @media(min-width:640px){ .form-grid { grid-template-columns:repeat(2,1fr); } }
        .form-group { display:flex; flex-direction:column; gap:0.5rem; }
        .form-label { font-size:0.875rem; font-weight:600; color:#374151; }
        .required { color:#ef4444; margin-left:0.25rem; }
        .form-input { width:100%; padding:0.75rem 1rem; font-size:1rem; border:2px solid #e5e7eb; border-radius:8px; outline:none; background:#f9fafb; }
        .form-input:focus { border-color:#667eea; background:white; box-shadow:0 0 0 3px rgba(102,126,234,0.1); }
        .form-actions { display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem; }
        @media(min-width:640px){ .form-actions { flex-direction:row; } }
        .submit-button, .cancel-button { flex:1; padding:0.75rem 1rem; font-size:1rem; font-weight:600; border-radius:8px; cursor:pointer; border:none; touch-action:manipulation; }
        .submit-button { background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:white; }
        .cancel-button { background:white; border:2px solid #e5e7eb; color:#6b7280; }
        .cancel-button:hover { background:#f9fafb; }
      `}</style>
    </div>
  );
}
