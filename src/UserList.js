import { deleteUser } from "./api";

export default function UserList({ users, edit, reload }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      reload();
    }
  };

  return (
    <div className="list-container">
      {/* Scrollable table on mobile */}
      <div className="overflow-x-auto">
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
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
                  <button onClick={() => edit(u)}>Edit</button>
                  <button onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .list-container { padding:1rem; max-width:100%; }
        .overflow-x-auto { overflow-x:auto; }
        .user-table { width:100%; border-collapse:collapse; min-width:600px; }
        .user-table th, .user-table td { border:1px solid #ccc; padding:0.5rem; text-align:center; }
        .user-table th { background-color:#667eea; color:white; }
        .user-table button { margin-right:0.25rem; padding:0.25rem 0.5rem; border:none; border-radius:4px; cursor:pointer; }
        .user-table button:first-child { background:#10b981; color:white; }
        .user-table button:last-child { background:#ef4444; color:white; }
      `}</style>
    </div>
  );
}
