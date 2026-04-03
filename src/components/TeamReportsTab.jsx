import React from 'react';

const TeamReportsTab = ({ feedbacks }) => {
  const total = feedbacks.length;
  const resolved = feedbacks.filter(f => f.status === 'Resolved' || f.status === 'Closed').length;
  const rate = total === 0 ? '0' : ((resolved / total) * 100).toFixed(1);
  const open = feedbacks.filter(f => f.status === 'Open').length;
  const inProgress = feedbacks.filter(f => f.status === 'In Progress').length;

  const P_BG = 'rgba(255,255,255,.02)';
  const P_BORDER = '1px solid var(--b)';

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  // Group by priority
  const priorityCount = { High: 0, Medium: 0, Low: 0 };
  feedbacks.forEach(f => {
    if (priorityCount[f.priority] !== undefined) priorityCount[f.priority]++;
  });

  return (
    <div style={{ animation: 'up .4s .18s ease both' }}>
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--txt)', marginBottom: '4px' }}>Team Analytics</h2>
        <p style={{ fontSize: '14.5px', color: 'var(--dim)' }}>Comprehensive overview of your team's support performance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '22px' }}>
        <div style={{ background: 'var(--surf)', border: P_BORDER, borderRadius: '13px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '6px' }}>Total Assigned</div>
          <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', color: 'var(--txt)', lineHeight: '1' }}>{total}</div>
        </div>
        <div style={{ background: 'var(--surf)', border: P_BORDER, borderRadius: '13px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '6px' }}>Resolved / Closed</div>
          <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', color: '#22c55e', lineHeight: '1' }}>{resolved}</div>
        </div>
        <div style={{ background: 'var(--surf)', border: P_BORDER, borderRadius: '13px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '6px' }}>Resolution Rate</div>
          <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', color: '#a855f7', lineHeight: '1' }}>{rate}<span style={{ fontSize: '24px', color: 'var(--dim)', letterSpacing: '-.5px' }}>%</span></div>
          <div style={{ height: '2px', background: 'var(--b)', borderRadius: '99px', marginTop: '14px', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '99px', width: `${rate}%`, background: '#a855f7' }}></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ background: 'var(--surf)', border: P_BORDER, borderRadius: '13px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--txt)', marginBottom: '16px' }}>Pipeline Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div>Open</span>
              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--txt)' }}>{open}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></div>In Progress</span>
              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--txt)' }}>{inProgress}</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--surf)', border: P_BORDER, borderRadius: '13px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--txt)', marginBottom: '16px' }}>Ticket Priority Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['High', 'Medium', 'Low'].map(p => (
              <div key={p} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getPriorityColor(p) }}></div>{p}</span>
                <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--txt)' }}>{priorityCount[p]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeamReportsTab;
