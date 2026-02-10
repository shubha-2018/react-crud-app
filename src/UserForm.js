import { useState, useEffect } from "react";
import { fields } from "./fieldConfig";
import { addUser, updateUser } from "./api";

export default function UserForm({ selected, setSelected, users, setUsers }) {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(selected || {}); // Populate form if user is selected
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selected?.id) {
        const updatedUser = await updateUser(selected.id, form);
        setUsers(prev => Array.isArray(prev) ? prev.map(u => u.id === selected.id ? updatedUser : u) : [updatedUser]);
      } else {
        const newUser = await addUser(form);
        setUsers(prev => Array.isArray(prev) ? [...prev, newUser] : [newUser]);
      }

      setForm({});
      setSelected(null);
    } catch (err) {
      console.error("Submit error", err);
      alert(err.response?.data?.error || "User add/update अयशस्वी झाले");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit}>
      {fields.map(f => (
        <input
          key={f.name}
          placeholder={f.label}
          value={form[f.name] || ""}
          onChange={e => setForm({ ...form, [f.name]: e.target.value })}
          required={f.required}
        />
      ))}
      <button type="submit" disabled={isSubmitting}>
        {selected ? "Update" : "Add"}
      </button>
    </form>
  );
}
