import React from 'react';

const EmployeeHistoryTab = ({ history }) => {
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
    <div style={{ animation: 'up .4s .18s ease both' }}>
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--txt)', marginBottom: '4px' }}>Ticket History</h2>
        <p style={{ fontSize: '14.5px', color: 'var(--dim)' }}>Comprehensive activity timeline of all your submitted feedback.</p>
      </div>

      <div style={{ background: 'var(--surf)', border: '1px solid var(--b)', borderRadius: '13px', padding: '24px' }}>
        {history.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--dim)', fontSize: '14px' }}>
            No history recorded yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {history.map((log, i) => {
              const newSc = getStatusColor(log.new_status);
              const isLast = i === history.length - 1;
              return (
                <div key={log._id} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  {!isLast && (
                    <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: '-20px', width: '2px', background: 'var(--b)' }}></div>
                  )}
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surf)', border: '2px solid var(--b)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: newSc.color }}></div>
                  </div>
                  <div style={{ flex: 1, paddingBottom: isLast ? '0' : '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div style={{ fontSize: '14.5px', color: 'var(--txt)', lineHeight: '1.4' }}>
                        <span style={{ fontWeight: '700', color: 'var(--txt)' }}>{log.feedback_id?.title || 'Deleted Ticket'}</span> was updated to{' '}
                        <span style={{ 
                          fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px',
                          padding: '2px 6px', borderRadius: '99px', background: newSc.bg, color: newSc.color, display: 'inline-block', verticalAlign: 'middle', margin: '0 4px'
                        }}>{log.new_status}</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--dim)', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '2px' }}>
                        {new Date(log.changed_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </div>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--mid)' }}>
                      Updated by {log.changed_by?.name || 'System'} ({log.changed_by?.role || 'Unknown'})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHistoryTab;
