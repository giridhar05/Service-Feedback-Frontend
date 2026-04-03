import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ role: '', team_id: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, teamsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/teams')
      ]);
      setUsers(usersRes.data);
      setTeams(teamsRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (u) => {
    setEditingUserId(u._id);
    setEditForm({ role: u.role, team_id: u.team_id?._id || '' });
  };

  const handleSave = async (userId) => {
    try {
      await api.put(`/admin/users/${userId}`, {
        role: editForm.role,
        team_id: editForm.team_id || null
      });
      setEditingUserId(null);
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Failed to update user');
    }
  };

  if (loading) return <div style={{ color: 'var(--dim)' }}>Loading users...</div>;

  return (
    <div className="tab-container">
      <div className="tab-header" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--txt)' }}>User Management</h2>
        <p style={{ fontSize: '14px', color: 'var(--dim)' }}>Manage user roles and team assignments.</p>
      </div>

      <div style={{ background: 'var(--surf)', borderRadius: '12px', border: '1px solid var(--b)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--b)' }}>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Team</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderBottom: '1px solid var(--b)' }}>
                <td style={{ padding: '14px 20px', color: 'var(--txt)', fontSize: '14px', fontWeight: '500' }}>{u.name}</td>
                <td style={{ padding: '14px 20px', color: 'var(--dim)', fontSize: '13px' }}>{u.email}</td>
                
                <td style={{ padding: '14px 20px' }}>
                  {editingUserId === u._id ? (
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm(f => ({ ...f, role: e.target.value }))}
                      style={{ background: 'var(--surf)', color: 'var(--txt)', border: '1px solid var(--b)', borderRadius: '6px', padding: '6px' }}
                    >
                      <option value="Employee">Employee</option>
                      <option value="Team Member">Team Member</option>
                      <option value="Admin">Admin</option>
                    </select>
                  ) : (
                    <span style={{ fontSize: '12.5px', padding: '4px 10px', borderRadius: '99px', background: 'var(--bg)', color: 'var(--mid)', border: '1px solid var(--b)' }}>
                      {u.role}
                    </span>
                  )}
                </td>

                <td style={{ padding: '14px 20px' }}>
                  {editingUserId === u._id ? (
                    <select
                      value={editForm.team_id}
                      onChange={(e) => setEditForm(f => ({ ...f, team_id: e.target.value }))}
                      style={{ background: 'var(--surf)', color: 'var(--txt)', border: '1px solid var(--b)', borderRadius: '6px', padding: '6px' }}
                    >
                      <option value="">No Team</option>
                      {teams.map(t => (
                        <option key={t._id} value={t._id}>{t.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span style={{ color: 'var(--mid)', fontSize: '13px' }}>{u.team_id?.name || '—'}</span>
                  )}
                </td>

                <td style={{ padding: '14px 20px' }}>
                  {editingUserId === u._id ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleSave(u._id)} style={{ padding: '6px 12px', background: 'var(--acc)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Save</button>
                      <button onClick={() => setEditingUserId(null)} style={{ padding: '6px 12px', background: 'transparent', color: 'var(--dim)', border: '1px solid var(--b)', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => handleEditClick(u)} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', color: 'var(--mid)', border: '1px solid var(--b)', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', transition: 'all 0.2s' }}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--dim)', fontSize: '14px' }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersTab;
