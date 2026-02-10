import { useState, useEffect } from "react";
import { getUsers } from "./api";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function App() {
  const [users, setUsers] = useState([]); // Always initialize as array
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      const res = await getUsers();
      setUsers(Array.isArray(res) ? res : []); // Always ensure array
    } catch (err) {
      console.error("Load users failed", err);
      setUsers([]); // Fallback to empty array
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>User Manager</h2>
      <UserForm
        selected={selected}
        setSelected={setSelected}
        users={users}
        setUsers={setUsers}
      />
      <UserList users={users} edit={setSelected} setUsers={setUsers} />
    </div>
  );
}
