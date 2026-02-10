import { deleteUser } from "./api";

export default function UserList({ users, edit, setUsers }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        setUsers(prev => prev.filter(u => u.id !== id));
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>First</th><th>Last</th><th>Phone</th><th>Email</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.phone}</td>
            <td>{u.email}</td>
            <td>
              <button onClick={() => edit(u)}>Edit</button>
              <button onClick={() => handleDelete(u.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
