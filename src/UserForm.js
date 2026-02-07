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
    setIsSubmitting(true);
    try {
      if (selected) await updateUser(selected.id, form);
      else await addUser(form);
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
        <h2 className="form-title">
          {selected ? "Update User" : "Add New User"}
        </h2>
        <form onSubmit={submit} className="user-form">
          <div className="form-grid">
            {fields.map((f) => (
              <div key={f.name} className="form-group">
                <label htmlFor={f.name} className="form-label">
                  {f.label}
                  {f.required && <span className="required">*</span>}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  placeholder={`Enter ${f.label.toLowerCase()}`}
                  type={f.type}
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
              {isSubmitting ? (
                <span className="button-content">
                  <span className="spinner"></span>
                  Processing...
                </span>
              ) : (
                <span className="button-content">
                  {selected ? "Update User" : "Add User"}
                </span>
              )}
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

      <style jsx>{`
        .form-container {
          display: flex;
          justify-content: center;
          padding: 2rem;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .form-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 2.5rem;
          width: 100%;
          max-width: 600px;
          height: fit-content;
        }

        .form-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 2rem 0;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .user-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          transition: all 0.2s ease;
          outline: none;
          background: #f9fafb;
        }

        .form-input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input:hover {
          border-color: #d1d5db;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .submit-button,
        .cancel-button {
          flex: 1;
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .submit-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-button {
          background: white;
          color: #6b7280;
          border: 2px solid #e5e7eb;
        }

        .cancel-button:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 640px) {
          .form-container {
            padding: 1rem;
          }

          .form-card {
            padding: 1.5rem;
          }

          .form-title {
            font-size: 1.5rem;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}