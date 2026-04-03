import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import AdminUsersTab from '../components/AdminUsersTab';
import AdminTicketsTab from '../components/AdminTicketsTab';
import RecentFeedbackWidget from '../components/RecentFeedbackWidget';

const SHARED_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f8fafc;--surf:#ffffff;--surf2:#f1f5f9;
  --b:#e2e8f0;--bh:#cbd5e1;
  --txt:#0f172a;--mid:#475569;--dim:#64748b;--deep:#94a3b8;
  --acc:#7c3aed;--accg:rgba(124,58,237,.12);--acch:#9333ea;
  --fn:'Geist',sans-serif;
}
.app{display:flex;min-height:100vh;background:var(--bg);font-family:var(--fn);color:var(--txt)}

/* SIDEBAR */
.sb{
  width:230px;flex-shrink:0;background:var(--surf);
  border-right:1px solid var(--b);
  display:flex;flex-direction:column;
  padding:20px 14px;position:sticky;top:0;height:100vh;
}
@media(max-width:768px){.sb{display:none}}
.sb-brand{display:flex;align-items:center;gap:10px;padding:4px 6px 20px;border-bottom:1px solid var(--b);margin-bottom:16px}
.sb-ico{
  width:34px;height:34px;border-radius:9px;
  background:linear-gradient(135deg,#7c3aed,#ec4899);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  box-shadow:0 4px 14px rgba(124,58,237,.25);
}
.sb-nm{font-size:16px;font-weight:700;letter-spacing:-.3px;color:var(--txt)}
.sb-tag{
  font-size:9.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;
  color:var(--acc);background:var(--accg);border:1px solid rgba(124,58,237,.2);
  padding:2px 6px;border-radius:4px;margin-left:auto;
}
.nav-sec{font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--deep);padding:0 8px;margin-bottom:6px}
.nav-item{
  display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:9px;
  font-size:14px;font-weight:500;color:var(--dim);cursor:pointer;
  transition:all .15s;margin-bottom:1px;text-decoration:none;
}
.nav-item:hover{background:var(--bg);color:var(--mid)}
.nav-item.active{background:var(--accg);color:var(--acc);font-weight:600}
.nav-badge{
  margin-left:auto;font-size:10px;font-weight:600;padding:2px 7px;border-radius:99px;
  background:rgba(124,58,237,.15);color:var(--acc);
}
.sb-bot{margin-top:auto;padding-top:14px;border-top:1px solid var(--b)}
.ucard{
  display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:10px;
  border:1px solid var(--b);background:var(--bg);
}
.uav{
  width:32px;height:32px;border-radius:8px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:700;color:#fff;
}
.unm{font-size:13px;font-weight:500;color:var(--txt);line-height:1.2}
.url{font-size:11.5px;color:var(--dim)}
.uout{
  margin-left:auto;background:none;border:none;color:var(--dim);
  cursor:pointer;display:flex;align-items:center;border-radius:4px;
  padding:3px;transition:color .15s;
}
.uout:hover{color:#ef4444}

/* MAIN */
.main{flex:1;overflow-x:hidden;display:flex;flex-direction:column}
.topbar{
  height:54px;border-bottom:1px solid var(--b);
  display:flex;align-items:center;padding:0 28px;justify-content:space-between;
  position:sticky;top:0;z-index:20;
  background:rgba(255,255,255,.85);backdrop-filter:blur(14px);flex-shrink:0;
}
.tb-left{display:flex;align-items:center;gap:12px}
.tb-title{font-size:15px;font-weight:500;color:var(--mid)}
.tb-live{display:flex;align-items:center;gap:6px}
.tb-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.15);animation:pulse 2s ease infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.15)}50%{box-shadow:0 0 0 6px rgba(34,197,94,.05)}}
.tb-lbl{font-size:12px;color:var(--dim)}
.content{padding:24px 28px;flex:1}
.ph{margin-bottom:22px}
.ptitle{font-size:24px;font-weight:700;letter-spacing:-.6px;color:var(--txt);margin-bottom:4px}
.psub{font-size:14.5px;color:var(--dim)}

/* METRIC CARDS */
.mcards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px}
@media(max-width:640px){.mcards{grid-template-columns:1fr}}
.mcard{
  background:var(--surf);border:1px solid var(--b);border-radius:13px;padding:20px;
  transition:border-color .2s,transform .2s;
  animation:up .45s ease both;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
.mcard:nth-child(1){animation-delay:.04s}
.mcard:nth-child(2){animation-delay:.1s}
.mcard:nth-child(3){animation-delay:.16s}
.mcard:hover{border-color:var(--bh);transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.05)}
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.mc-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.mc-ico{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center}
.mc-chg{font-size:12px;font-weight:600;padding:3px 9px;border-radius:99px;display:flex;align-items:center;gap:3px}
.up{background:rgba(34,197,94,.1);color:#16a34a}
.mc-lbl{font-size:12px;font-weight:500;color:var(--dim);text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px}
.mc-val{font-size:42px;font-weight:700;letter-spacing:-1.5px;color:var(--txt);line-height:1;display:flex;align-items:baseline;gap:2px}
.mc-sfx{font-size:24px;color:var(--dim);letter-spacing:-.5px}
.mc-bar{height:2px;background:var(--bg);border-radius:99px;margin-top:14px;overflow:hidden}
.mc-fill{height:100%;border-radius:99px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}

/* NOTICE SECTION */
.sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.sec-ttl{font-size:15px;font-weight:500;color:var(--mid)}
.sec-badge{font-size:11.5px;color:#d97706;background:rgba(217,119,6,.1);border:1px solid rgba(217,119,6,.2);padding:2px 9px;border-radius:99px;font-weight:600}
.ngrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;animation:up .4s .25s ease both}
@media(max-width:560px){.ngrid{grid-template-columns:1fr}}
.ncard{
  background:var(--surf);border:1px solid var(--b);border-radius:12px;padding:16px 18px;
  display:flex;align-items:flex-start;gap:13px;transition:border-color .15s;
}
.ncard:hover{border-color:var(--bh)}
.n-ico{
  width:36px;height:36px;border-radius:9px;background:var(--bg);border:1px solid var(--b);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--dim);
}
.n-ttl{font-size:14px;font-weight:500;color:var(--txt);margin-bottom:3px}
.n-dsc{font-size:12.5px;color:var(--dim);line-height:1.5}
`;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ total: 0, resolved: 0, resolutionRate: 0 });
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    (async () => {
      try { const { data } = await api.get('/admin/analytics'); setStats(data); }
      catch (e) { console.error(e); }
      finally { setLoaded(true); }
    })();
  }, []);

  const metrics = [
    { label:'Total Feedback',   value:stats.total,          suffix:'',  change:'+12%', color:'#4f6ef7', bg:'rgba(79,110,247,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label:'Resolved',          value:stats.resolved,       suffix:'',  change:'+8%',  color:'#22c55e', bg:'rgba(34,197,94,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label:'Resolution Rate',   value:stats.resolutionRate, suffix:'%', change:'+3%',  color:'#f59e0b', bg:'rgba(245,158,11,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round"/></svg> },
  ];



  const navItems = [
    { id: 'Overview', icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>, label:'Overview' },
    { id: 'Tickets', icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round"/></svg>, label:'Tickets' },
    { id: 'Users', icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4"/></svg>, label:'Users' },
  ];

  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div className="app">
        <aside className="sb">
          <div className="sb-brand">
            <div className="sb-ico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            <span className="sb-nm">OSFS</span>
            <span className="sb-tag">Admin</span>
          </div>
          <div className="nav-sec">Menu</div>
          {navItems.map(n=>(
            <div key={n.id} onClick={() => setActiveTab(n.id)} className={`nav-item${activeTab === n.id ? ' active' : ''}`}>
              {n.icon}<span>{n.label}</span>
              {n.badge&&<span className="nav-badge">{n.badge}</span>}
            </div>
          ))}
          <div className="sb-bot">
            <div className="ucard">
              <div className="uav" style={{background:'linear-gradient(135deg,#4f6ef7,#7c3aed)'}}>{(user?.name||'A').charAt(0).toUpperCase()}</div>
              <div><div className="unm">{user?.name||'Admin'}</div><div className="url">Administrator</div></div>
              <button className="uout" onClick={logout} title="Sign out">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="tb-left">
              <span className="tb-title">Admin Console</span>
              <div className="tb-live"><div className="tb-dot"/><span className="tb-lbl">Live</span></div>
            </div>
          </div>
          <div className="content">
            {activeTab === 'Overview' && (
              <>
                <div className="ph">
                  <h1 className="ptitle">System Overview</h1>
                  <p className="psub">Real-time analytics and platform health</p>
                </div>
                <div className="mcards">
                  {metrics.map((m,i)=>(
                    <div className="mcard" key={i}>
                      <div className="mc-top">
                        <div className="mc-ico" style={{background:m.bg,color:m.color}}>{m.icon}</div>
                        <div className="mc-chg up">↑ {m.change}</div>
                      </div>
                      <div className="mc-lbl">{m.label}</div>
                      <div className="mc-val">{loaded?m.value:'—'}{m.suffix&&<span className="mc-sfx">{m.suffix}</span>}</div>
                      {m.suffix==='%'&&<div className="mc-bar"><div className="mc-fill" style={{width:loaded?`${Math.min(m.value,100)}%`:'0%',background:m.color}}/></div>}
                    </div>
                  ))}
                </div>
                <RecentFeedbackWidget />
              </>
            )}

            {activeTab === 'Users' && <AdminUsersTab />}
            {activeTab === 'Tickets' && <AdminTicketsTab />}
          </div>
        </main>
      </div>
    </>
  );
};
export default AdminDashboard;