import { deleteUser } from "./api";

export default function UserList({ users, edit, setUsers }) {
  const handleDelete = async (id) => {
    if (window.confirm("तुम्हाला खात्री आहे का?")) {
      try {
        await deleteUser(id);
        // Safe update: check if prev is array
        setUsers(prev => Array.isArray(prev) ? prev.filter(u => u.id !== id) : []);
      } catch (err) {
        console.error(err);
        alert("Delete अयशस्वी झाले");
      }
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(u => (
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
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              कोणीही युजर सापडले नाही
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
