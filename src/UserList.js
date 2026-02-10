import { deleteUser } from "./api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  .ul-wrapper {
    font-family: 'Sora', sans-serif;
    background: #0d0f14;
    min-height: 100vh;
    padding: 2rem;
  }

  .ul-card {
    background: #13161e;
    border: 1px solid #1e2330;
    border-radius: 20px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(99,179,237,0.04),
      0 20px 60px rgba(0,0,0,0.6),
      0 0 80px rgba(56,139,253,0.04);
    position: relative;
  }

  .ul-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #388bfd, #a78bfa, transparent);
    opacity: 0.7;
    z-index: 1;
  }

  .ul-header {
    padding: 1.75rem 2rem 1.5rem;
    border-bottom: 1px solid #1e2330;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .ul-header-left {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .ul-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(56,139,253,0.1);
    border: 1px solid rgba(56,139,253,0.2);
    color: #388bfd;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    width: fit-content;
  }

  .ul-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #388bfd;
    box-shadow: 0 0 6px #388bfd;
    animation: ul-pulse 2s ease-in-out infinite;
  }

  @keyframes ul-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .ul-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #e6edf3;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .ul-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(167,139,250,0.12);
    border: 1px solid rgba(167,139,250,0.2);
    color: #a78bfa;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 20px;
    margin-left: 0.6rem;
  }

  .ul-table-wrap {
    overflow-x: auto;
  }

  .ul-table {
    width: 100%;
    border-collapse: collapse;
  }

  .ul-table thead tr {
    border-bottom: 1px solid #1e2330;
    background: rgba(255,255,255,0.015);
  }

  .ul-table thead th {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 500;
    color: #6e7681;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.85rem 1.25rem;
    text-align: left;
    white-space: nowrap;
  }

  .ul-table thead th:last-child {
    text-align: center;
  }

  .ul-table tbody tr {
    border-bottom: 1px solid #1a1f2b;
    transition: background 0.15s ease;
  }

  .ul-table tbody tr:last-child {
    border-bottom: none;
  }

  .ul-table tbody tr:hover {
    background: rgba(56,139,253,0.04);
  }

  .ul-table tbody td {
    font-size: 0.86rem;
    color: #c9d1d9;
    padding: 1rem 1.25rem;
    font-weight: 400;
  }

  .ul-table tbody td:first-child {
    color: #e6edf3;
    font-weight: 500;
  }

  .ul-td-mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: #8b949e !important;
  }

  .ul-td-actions {
    text-align: center;
    white-space: nowrap;
  }

  .ul-btn-edit {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(56,139,253,0.1);
    border: 1px solid rgba(56,139,253,0.2);
    border-radius: 7px;
    color: #388bfd;
    font-family: 'Sora', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    padding: 0.38rem 0.8rem;
    cursor: pointer;
    transition: background 0.18s ease, border-color 0.18s ease, transform 0.12s ease;
    margin-right: 0.4rem;
  }

  .ul-btn-edit:hover {
    background: rgba(56,139,253,0.18);
    border-color: rgba(56,139,253,0.4);
    transform: translateY(-1px);
  }

  .ul-btn-edit:active {
    transform: translateY(0);
  }

  .ul-btn-delete {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(248,81,73,0.08);
    border: 1px solid rgba(248,81,73,0.18);
    border-radius: 7px;
    color: #f85149;
    font-family: 'Sora', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    padding: 0.38rem 0.8rem;
    cursor: pointer;
    transition: background 0.18s ease, border-color 0.18s ease, transform 0.12s ease;
  }

  .ul-btn-delete:hover {
    background: rgba(248,81,73,0.16);
    border-color: rgba(248,81,73,0.35);
    transform: translateY(-1px);
  }

  .ul-btn-delete:active {
    transform: translateY(0);
  }

  .ul-empty {
    padding: 3.5rem 2rem;
    text-align: center;
  }

  .ul-empty-icon {
    font-size: 2.2rem;
    margin-bottom: 0.75rem;
    opacity: 0.4;
  }

  .ul-empty-text {
    color: #6e7681;
    font-size: 0.88rem;
    font-weight: 300;
  }

  .ul-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px; height: 28px;
    border-radius: 8px;
    background: linear-gradient(135deg, #388bfd22, #a78bfa22);
    border: 1px solid #388bfd33;
    color: #388bfd;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 600;
    margin-right: 0.55rem;
    flex-shrink: 0;
    vertical-align: middle;
    text-transform: uppercase;
  }

  .ul-name-cell {
    display: flex;
    align-items: center;
  }
`;

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

  const userCount = Array.isArray(users) ? users.length : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="ul-wrapper">
        <div className="ul-card">
          <div className="ul-header">
            <div className="ul-header-left">
              <div className="ul-badge">User Records</div>
              <h2 className="ul-title">
                All Users
                {userCount > 0 && (
                  <span className="ul-count">{userCount}</span>
                )}
              </h2>
            </div>
          </div>

          <div className="ul-table-wrap">
            <table className="ul-table">
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
                      <td>
                        <div className="ul-name-cell">
                          <span className="ul-avatar">
                            {u.firstName?.[0] || "?"}
                          </span>
                          {u.firstName}
                        </div>
                      </td>
                      <td>{u.lastName}</td>
                      <td className="ul-td-mono">{u.phone}</td>
                      <td className="ul-td-mono">{u.email}</td>
                      <td className="ul-td-actions">
                        <button
                          className="ul-btn-edit"
                          onClick={() => edit(u)}
                        >
                          ✎ Edit
                        </button>
                        <button
                          className="ul-btn-delete"
                          onClick={() => handleDelete(u.id)}
                        >
                          ✕ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="ul-empty">
                        <div className="ul-empty-icon">◎</div>
                        <div className="ul-empty-text"></div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}