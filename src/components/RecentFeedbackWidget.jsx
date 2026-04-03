import React, { useState, useEffect } from 'react';
import api from '../api';

const RecentFeedbackWidget = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentTickets();
  }, []);

  const fetchRecentTickets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/feedback');
      // Sort by newest first and take top 4 (assuming _id timestamp or createdAt)
      // Usually MongoDB _id has timestamp, or createdAt is available. If using createdAt:
      // const sorted = data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      // Let's just reverse and take 4 for now assuming natural insertion order
      setTickets([...data].reverse().slice(0, 4));
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

  return (
    <div style={{ animation: 'up .4s .25s ease both' }}>
      <div className="sec-hd" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span className="sec-ttl" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--mid)' }}>Recent Feedback</span>
        <button onClick={fetchRecentTickets} style={{ background: 'none', border: 'none', color: 'var(--acc)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Refresh</button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {loading ? (
           <div style={{ color: 'var(--dim)', fontSize: '13px' }}>Loading recent tickets...</div>
        ) : tickets.length > 0 ? (
          tickets.map(t => (
            <div key={t._id} style={{ 
              background: 'var(--surf)', border: '1px solid var(--b)', borderRadius: '12px', 
              padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'border-color 0.15s'
            }} className="ncard">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '9px', background: 'var(--bg)', border: '1px solid var(--b)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dim)'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '3px' }}>{t.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--dim)' }}>{t.category} • {t.employee_id?.name || 'Unknown User'}</div>
                </div>
              </div>
              <span style={{ 
                fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px',
                padding: '4px 8px', borderRadius: '99px',
                background: getStatusColor(t.status).bg, color: getStatusColor(t.status).color 
              }}>
                {t.status}
              </span>
            </div>
          ))
        ) : (
          <div style={{ color: 'var(--dim)', fontSize: '13px' }}>No feedback submitted yet.</div>
        )}
      </div>
    </div>
  );
};

export default RecentFeedbackWidget;
