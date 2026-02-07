import { deleteUser } from "./api";

export default function UserList({ users, edit, reload }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-blue-100 p-10">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
        👥 User Management
      </h2>

      <div className="bg-white shadow-xl rounded-xl p-4">
        <table className="w-full border-2 border-gray-600 border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border-2 border-gray-600 p-3 text-center">
                First Name
              </th>
              <th className="border-2 border-gray-600 p-3 text-center">
                Last Name
              </th>
              <th className="border-2 border-gray-600 p-3 text-center">
                Phone Number
              </th>
              <th className="border-2 border-gray-600 p-3 text-center">
                Email
              </th>
              <th className="border-2 border-gray-600 p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-blue-50">
                <td className="border-2 border-gray-600 p-3 text-center">
                  {u.firstName}
                </td>
                <td className="border-2 border-gray-600 p-3 text-center">
                  {u.lastName}
                </td>
                <td className="border-2 border-gray-600 p-3 text-center">
                  {u.phone}
                </td>
                <td className="border-2 border-gray-600 p-3 text-center">
                  {u.email}
                </td>
                <td className="border-2 border-gray-600 p-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => edit(u)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="border-2 border-gray-600 p-5 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
