import { useState, useEffect } from "react";
import { getUsers } from "./api";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>User Manager</h2>
      <UserForm selected={selected} setSelected={setSelected} users={users} setUsers={setUsers} />
      <UserList users={users} edit={setSelected} setUsers={setUsers} />
    </div>
  );
}
