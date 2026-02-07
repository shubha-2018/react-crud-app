import { useState, useEffect } from "react";
import { getUsers } from "./api";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Load users failed", err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>User Manager</h2>
      <UserForm selected={selected} reload={load} />
      <UserList users={users} edit={setSelected} reload={load} />
    </div>
  );
}
