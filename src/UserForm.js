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
      if (selected?.id) {
        await updateUser(selected.id, form);
      } else {
        await addUser(form);
      }

      setForm({});
      reload();
    } catch (err) {
      console.error("Submit error", err);
      alert("User add/update failed. Check backend.");
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
      <button type="submit">
        {selected ? "Update" : "Add"}
      </button>
    </form>
  );
}
