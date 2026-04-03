import React, { useState } from 'react';

const EmployeeSortedTab = ({ feedbacks }) => {
  const [groupBy, setGroupBy] = useState('Priority'); // 'Priority' or 'Category'

  const SC = {
    'Open':        { dot:'#eab308', bg:'rgba(234,179,8,.1)',   color:'#fbbf24' },
    'In Progress': { dot:'#4f6ef7', bg:'rgba(79,110,247,.1)',  color:'#818cf8' },
    'Resolved':    { dot:'#22c55e', bg:'rgba(34,197,94,.1)',   color:'#4ade80' },
    'Closed':      { dot:'#475569', bg:'rgba(71,85,105,.14)',  color:'#94a3b8' },
  };
  const PC = {
    'High':  { bg:'rgba(239,68,68,.1)',  color:'#f87171' },
    'Medium':{ bg:'rgba(245,158,11,.1)', color:'#fbbf24' },
    'Low':   { bg:'rgba(34,197,94,.1)',  color:'#4ade80' },
  };

  const getGroupedData = () => {
    const groups = {};
    feedbacks.forEach(f => {
      const key = groupBy === 'Priority' ? f.priority : f.category;
      if (!groups[key]) groups[key] = [];
      groups[key].push(f);
    });
    return groups;
  };

  const groupedData = getGroupedData();
  const keys = Object.keys(groupedData).sort();

  return (
    <div style={{ animation: 'up .4s .18s ease both' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--txt)', marginBottom: '4px' }}>Sorted View</h2>
          <p style={{ fontSize: '14.5px', color: 'var(--dim)' }}>View your feedback organized by specific attributes.</p>
        </div>
        <div style={{ background: 'var(--bg)', border: '1px solid var(--b)', borderRadius: '9px', padding: '4px', display: 'flex', gap: '4px' }}>
          {['Priority', 'Category'].map(type => (
            <button
              key={type}
              onClick={() => setGroupBy(type)}
              style={{
                background: groupBy === type ? 'var(--acc)' : 'transparent',
                color: groupBy === type ? 'var(--txt)' : 'var(--dim)',
                border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit'
              }}
            >
              By {type}
            </button>
          ))}
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <div style={{ background: 'var(--surf)', border: '1px solid var(--b)', borderRadius: '13px', padding: '40px', textAlign: 'center', color: 'var(--dim)', fontSize: '14px' }}>
          No feedback submitted yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {keys.map(groupName => (
            <div key={groupName} style={{ background: 'var(--surf)', border: '1px solid var(--b)', borderRadius: '13px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--b)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {groupBy === 'Priority' && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: PC[groupName]?.color || '#94a3b8' }}></div>
                  )}
                  <span style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--txt)' }}>{groupName}</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--dim)', background: 'var(--b)', padding: '2px 8px', borderRadius: '99px' }}>
                  {groupedData[groupName].length} items
                </span>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {groupedData[groupName].map((item, i) => {
                  const sc = SC[item.status] || SC['Closed'];
                  const pc = PC[item.priority] || PC['Low'];
                  return (
                    <li key={item._id} style={{ padding: '14px 20px', borderBottom: i !== groupedData[groupName].length - 1 ? '1px solid var(--b)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '6px' }}>{item.title}</div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {groupBy !== 'Category' && <span style={{ fontSize: '11.5px', fontWeight: '600', padding: '2px 8px', borderRadius: '99px', background: 'var(--bg)', color: '#475569' }}>{item.category}</span>}
                          {groupBy !== 'Priority' && <span style={{ fontSize: '11.5px', fontWeight: '600', padding: '2px 8px', borderRadius: '99px', background: pc.bg, color: pc.color }}>{item.priority}</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px', background: sc.bg, color: sc.color, display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: sc.dot }}></div>
                          {item.status}
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--deep)' }}>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSortedTab;
