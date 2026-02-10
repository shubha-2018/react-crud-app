// import { useState, useEffect } from "react";
// import { fields } from "./fieldConfig";
// import { addUser, updateUser } from "./api";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

//   .uf-wrapper {
//     font-family: 'Sora', sans-serif;
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: #0d0f14;
//     padding: 2rem;
//   }

//   .uf-card {
//     background: #13161e;
//     border: 1px solid #1e2330;
//     border-radius: 20px;
//     padding: 2.5rem;
//     width: 100%;
//     max-width: 480px;
//     box-shadow:
//       0 0 0 1px rgba(99,179,237,0.04),
//       0 20px 60px rgba(0,0,0,0.6),
//       0 0 80px rgba(56,139,253,0.04);
//     position: relative;
//     overflow: hidden;
//   }

//   .uf-card::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0; right: 0;
//     height: 2px;
//     background: linear-gradient(90deg, transparent, #388bfd, #a78bfa, transparent);
//     opacity: 0.7;
//   }

//   .uf-header {
//     margin-bottom: 2rem;
//   }

//   .uf-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     background: rgba(56,139,253,0.1);
//     border: 1px solid rgba(56,139,253,0.2);
//     color: #388bfd;
//     font-family: 'JetBrains Mono', monospace;
//     font-size: 0.7rem;
//     font-weight: 500;
//     padding: 4px 10px;
//     border-radius: 6px;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     margin-bottom: 1rem;
//   }

//   .uf-badge::before {
//     content: '';
//     width: 6px; height: 6px;
//     border-radius: 50%;
//     background: #388bfd;
//     box-shadow: 0 0 6px #388bfd;
//     animation: uf-pulse 2s ease-in-out infinite;
//   }

//   @keyframes uf-pulse {
//     0%, 100% { opacity: 1; }
//     50% { opacity: 0.3; }
//   }

//   .uf-title {
//     font-size: 1.6rem;
//     font-weight: 600;
//     color: #e6edf3;
//     margin: 0 0 0.25rem 0;
//     letter-spacing: -0.02em;
//   }

//   .uf-subtitle {
//     font-size: 0.82rem;
//     color: #6e7681;
//     margin: 0;
//     font-weight: 300;
//   }

//   .uf-form {
//     display: flex;
//     flex-direction: column;
//     gap: 1.1rem;
//   }

//   .uf-field {
//     display: flex;
//     flex-direction: column;
//     gap: 0.4rem;
//   }

//   .uf-label {
//     font-size: 0.74rem;
//     font-weight: 500;
//     color: #8b949e;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     font-family: 'JetBrains Mono', monospace;
//   }

//   .uf-input-wrap {
//     position: relative;
//   }

//   .uf-input {
//     width: 100%;
//     background: #0d1117;
//     border: 1px solid #21262d;
//     border-radius: 10px;
//     color: #e6edf3;
//     font-family: 'Sora', sans-serif;
//     font-size: 0.88rem;
//     font-weight: 400;
//     padding: 0.7rem 0.95rem;
//     outline: none;
//     transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
//     box-sizing: border-box;
//     -webkit-appearance: none;
//   }

//   .uf-input::placeholder {
//     color: #3d444d;
//   }

//   .uf-input:hover {
//     border-color: #30363d;
//     background: #0f1318;
//   }

//   .uf-input:focus {
//     border-color: #388bfd;
//     background: #0d1117;
//     box-shadow: 0 0 0 3px rgba(56,139,253,0.12), inset 0 1px 2px rgba(0,0,0,0.2);
//   }

//   .uf-input:focus + .uf-input-line {
//     transform: scaleX(1);
//   }

//   .uf-input-line {
//     position: absolute;
//     bottom: 0; left: 10%; right: 10%;
//     height: 1px;
//     background: linear-gradient(90deg, #388bfd, #a78bfa);
//     transform: scaleX(0);
//     transition: transform 0.3s ease;
//     border-radius: 1px;
//   }

//   .uf-divider {
//     height: 1px;
//     background: linear-gradient(90deg, transparent, #1e2330, transparent);
//     margin: 0.5rem 0;
//   }

//   .uf-actions {
//     display: flex;
//     gap: 0.75rem;
//     padding-top: 0.5rem;
//   }

//   .uf-btn-primary {
//     flex: 1;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     background: linear-gradient(135deg, #388bfd, #a78bfa);
//     border: none;
//     border-radius: 10px;
//     color: #fff;
//     font-family: 'Sora', sans-serif;
//     font-size: 0.88rem;
//     font-weight: 600;
//     padding: 0.78rem 1.25rem;
//     cursor: pointer;
//     letter-spacing: 0.02em;
//     transition: opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
//     position: relative;
//     overflow: hidden;
//   }

//   .uf-btn-primary::after {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
//     opacity: 0;
//     transition: opacity 0.2s ease;
//   }

//   .uf-btn-primary:hover:not(:disabled)::after {
//     opacity: 1;
//   }

//   .uf-btn-primary:hover:not(:disabled) {
//     box-shadow: 0 4px 20px rgba(56,139,253,0.35);
//     transform: translateY(-1px);
//   }

//   .uf-btn-primary:active:not(:disabled) {
//     transform: translateY(0);
//   }

//   .uf-btn-primary:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }

//   .uf-btn-secondary {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 6px;
//     background: transparent;
//     border: 1px solid #21262d;
//     border-radius: 10px;
//     color: #8b949e;
//     font-family: 'Sora', sans-serif;
//     font-size: 0.85rem;
//     font-weight: 500;
//     padding: 0.78rem 1rem;
//     cursor: pointer;
//     transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
//   }

//   .uf-btn-secondary:hover {
//     border-color: #30363d;
//     color: #e6edf3;
//     background: rgba(255,255,255,0.04);
//   }

//   .uf-spinner {
//     width: 14px; height: 14px;
//     border: 2px solid rgba(255,255,255,0.3);
//     border-top-color: #fff;
//     border-radius: 50%;
//     animation: uf-spin 0.7s linear infinite;
//     flex-shrink: 0;
//   }

//   @keyframes uf-spin {
//     to { transform: rotate(360deg); }
//   }
// `;

// export default function UserForm({ selected, setSelected, users, setUsers }) {
//   const [form, setForm] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     setForm(selected || {}); // Populate form if user is selected
//   }, [selected]);

//   const submit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       if (selected?.id) {
//         const updatedUser = await updateUser(selected.id, form);
//         setUsers(prev =>
//           Array.isArray(prev)
//             ? prev.map(u => u.id === selected.id ? updatedUser : u)
//             : [updatedUser]
//         );
//       } else {
//         const newUser = await addUser(form);
//         setUsers(prev =>
//           Array.isArray(prev) ? [...prev, newUser] : [newUser]
//         );
//       }
//       setForm({});
//       setSelected(null);
//     } catch (err) {
//       console.error("Submit error", err);
//       alert(err.response?.data?.error || "User add/update अयशस्वी झाले");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="uf-wrapper">
//         <div className="uf-card">
//           <div className="uf-header">
//             <div className="uf-badge">
//               {selected ? "Edit Mode" : "New Record"}
//             </div>
//             <h2 className="uf-title">
//               {selected ? "Update User" : "Add User"}
//             </h2>
//             <p className="uf-subtitle">
//               {selected
//                 ? "Modify the details below and save your changes."
//                 : "Fill in the details below to create a new user."}
//             </p>
//           </div>

//           <form className="uf-form" onSubmit={submit}>
//             {fields.map(f => (
//               <div className="uf-field" key={f.name}>
//                 <label className="uf-label" htmlFor={f.name}>
//                   {f.label}
//                 </label>
//                 <div className="uf-input-wrap">
//                   <input
//                     id={f.name}
//                     className="uf-input"
//                     type={f.type || "text"}
//                     placeholder={f.placeholder || f.label}
//                     value={form[f.name] || ""}
//                     onChange={e => setForm({ ...form, [f.name]: e.target.value })}
//                     required={f.required}
//                   />
//                   <span className="uf-input-line" />
//                 </div>
//               </div>
//             ))}

//             <div className="uf-divider" />

//             <div className="uf-actions">
//               <button
//                 type="submit"
//                 className="uf-btn-primary"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting && <span className="uf-spinner" />}
//                 {isSubmitting
//                   ? (selected ? "Updating..." : "Adding...")
//                   : (selected ? "Update" : "Add")}
//               </button>

//               {selected && (
//                 <button
//                   type="button"
//                   className="uf-btn-secondary"
//                   onClick={() => { setSelected(null); setForm({}); }}
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { fields } from "./fieldConfig";
import { addUser, updateUser } from "./api";

export default function UserForm({ selected, setSelected, users, setUsers }) {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(selected || {});
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (selected?.id) {
        const updatedUser = await updateUser(selected.id, form);
        setUsers(prev => prev.map(u => u.id === selected.id ? updatedUser : u));
      } else {
        const newUser = await addUser(form);
        setUsers(prev => [...prev, newUser]);
      }
      setForm({});
      setSelected(null);
    } catch (err) {
      console.error("Submit error", err);
      alert(err.response?.data?.error || "User add/update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="uf-wrapper">
      {/* Your styles & form JSX here */}
    </div>
  );
}
