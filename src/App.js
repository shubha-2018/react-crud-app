import { useEffect, useState } from "react";
import { getUsers } from "./api";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      {/* <h2 className="">User Manager</h2> */}
      <div className="flex items-center justify-center min-h-screen">
 <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 bg-clip-text text-transparent mx-auto w-fit">
  User Manager
</h2>
</div>
      <UserForm selected={selected} reload={load} />
      <UserList users={users} edit={setSelected} reload={load} />
    </div>
  );
}
