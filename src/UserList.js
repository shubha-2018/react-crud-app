import { deleteUser } from "./api";

export default function UserList({ users, edit, reload }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteUser(id);
      reload();
    }
  };

  return (
    <div style={{ padding: "1rem", overflowX:"auto" }}>
      <table style={{ width:"100%", minWidth:"600px", borderCollapse:"collapse" }}>
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
          {users.length > 0 ? users.map(u => (
            <tr key={u.id}>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.phone}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={()=>edit(u)} style={{ marginRight:"0.25rem" }}>Edit</button>
                <button onClick={()=>handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
