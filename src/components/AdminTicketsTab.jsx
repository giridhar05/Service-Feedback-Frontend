import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminTicketsTab = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/feedback');
      setTickets(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' };
      case 'In Progress': return { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' };
      case 'Resolved': return { bg: 'rgba(34,197,94,0.1)', color: '#22c55e' };
      case 'Closed': return { bg: 'rgba(100,116,139,0.1)', color: '#94a3b8' };
      default: return { bg: 'rgba(255,255,255,0.05)', color: '#cbd5e1' };
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  if (loading) return <div style={{ color: 'var(--dim)' }}>Loading tickets...</div>;

  return (
    <div className="tab-container">
      <div className="tab-header" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--txt)' }}>Ticket Oversight</h2>
        <p style={{ fontSize: '14px', color: 'var(--dim)' }}>View and monitor all feedback tickets across the platform.</p>
      </div>

      <div style={{ background: 'var(--surf)', borderRadius: '12px', border: '1px solid var(--b)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--b)' }}>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ticket</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assigned Team</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reporter</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t._id} style={{ borderBottom: '1px solid var(--b)' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ color: 'var(--txt)', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{t.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--dim)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: getPriorityColor(t.priority) }}></span>
                    {t.priority} Priority
                  </div>
                </td>
                
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: '12.5px', padding: '4px 10px', borderRadius: '6px', background: 'var(--bg)', color: 'var(--mid)', border: '1px solid var(--b)' }}>
                    {t.category}
                  </span>
                </td>

                <td style={{ padding: '14px 20px' }}>
                   <span style={{ 
                      fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px',
                      padding: '4px 8px', borderRadius: '99px',
                      background: getStatusColor(t.status).bg, color: getStatusColor(t.status).color 
                    }}>
                      {t.status}
                    </span>
                </td>

                <td style={{ padding: '14px 20px', color: 'var(--mid)', fontSize: '13px' }}>
                  {t.team_id?.name || 'Unassigned'}
                </td>
                
                <td style={{ padding: '14px 20px', color: 'var(--mid)', fontSize: '13px' }}>
                  {t.employee_id?.name || 'Unknown'}
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--dim)', fontSize: '14px' }}>No tickets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTicketsTab;
