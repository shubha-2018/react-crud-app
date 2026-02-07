import { useState, useEffect } from "react";
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
      if (selected && selected.id) {
        await updateUser(selected.id, form);
      } else {
        await addUser(form);
      }
      setForm({});
      reload();
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
        {fields.map(f => (
          <div key={f.name} style={{ display:"flex", flexDirection:"column" }}>
            <label>{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              placeholder={f.label}
              required={f.required}
              value={form[f.name] || ""}
              onChange={e => setForm({ ...form, [f.name]: e.target.value })}
              style={{ padding:"0.5rem", fontSize:"1rem" }}
            />
          </div>
        ))}
        <button type="submit" disabled={isSubmitting} style={{ padding:"0.5rem", fontSize:"1rem", cursor:"pointer" }}>
          {selected ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
}
