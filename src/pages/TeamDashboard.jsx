import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import TeamReportsTab from '../components/TeamReportsTab';

const S = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f8fafc;--surf:#ffffff;--b:#e2e8f0;--bh:#cbd5e1;
  --txt:#0f172a;--mid:#475569;--dim:#64748b;--deep:#94a3b8;
  --acc:#a855f7;--accg:rgba(168,85,247,.15);--acch:#9333ea;
  --fn:'Geist',sans-serif;
}
.app{display:flex;min-height:100vh;background:var(--bg);font-family:var(--fn);color:var(--txt)}
.sb{width:230px;flex-shrink:0;background:var(--surf);border-right:1px solid var(--b);display:flex;flex-direction:column;padding:20px 14px;position:sticky;top:0;height:100vh}
@media(max-width:768px){.sb{display:none}}
.sb-brand{display:flex;align-items:center;gap:10px;padding:4px 6px 20px;border-bottom:1px solid var(--b);margin-bottom:16px}
.sb-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sb-nm{font-size:16px;font-weight:700;letter-spacing:-.3px;color:var(--txt)}
.sb-tag{font-size:9.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:2px 6px;border-radius:4px;margin-left:auto;color:var(--acc);background:var(--accg);border:1px solid rgba(168,85,247,.25)}
.nav-sec{font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--deep);padding:0 8px;margin-bottom:6px}
.nav-item{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:9px;font-size:14px;font-weight:500;color:var(--dim);cursor:pointer;transition:all .15s;margin-bottom:1px}
.nav-item:hover{background:var(--bg);color:var(--mid)}
.nav-item.active{background:var(--accg);color:var(--acc);font-weight:600}
.nav-badge{margin-left:auto;font-size:10px;font-weight:600;padding:2px 7px;border-radius:99px;background:rgba(168,85,247,.15);color:var(--acc)}
.sb-bot{margin-top:auto;padding-top:14px;border-top:1px solid var(--b)}
.ucard{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:10px;border:1px solid var(--b);background:var(--bg)}
.uav{width:32px;height:32px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}
.unm{font-size:13px;font-weight:500;color:var(--txt);line-height:1.2}
.url{font-size:11.5px;color:var(--dim)}
.uout{margin-left:auto;background:none;border:none;color:var(--dim);cursor:pointer;display:flex;border-radius:4px;padding:3px;transition:color .15s}
.uout:hover{color:#ef4444}
.main{flex:1;overflow-x:hidden;display:flex;flex-direction:column}
.topbar{height:54px;border-bottom:1px solid var(--b);display:flex;align-items:center;padding:0 28px;justify-content:space-between;position:sticky;top:0;z-index:20;background:rgba(255,255,255,.85);backdrop-filter:blur(14px);flex-shrink:0}
.tb-left{display:flex;align-items:center;gap:12px}
.tb-title{font-size:15px;font-weight:500;color:var(--mid)}
.tb-live{display:flex;align-items:center;gap:6px}
.tb-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.15);animation:pulse 2s ease infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.15)}50%{box-shadow:0 0 0 6px rgba(34,197,94,.05)}}
.tb-lbl{font-size:12px;color:var(--dim)}
.content{padding:24px 28px;flex:1}
.ph{margin-bottom:20px}
.ptitle{font-size:24px;font-weight:700;letter-spacing:-.6px;color:var(--txt);margin-bottom:4px}
.psub{font-size:14.5px;color:var(--dim)}
.schips{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.schip{background:var(--surf);border:1px solid var(--b);border-radius:10px;padding:11px 16px;display:flex;align-items:center;gap:9px;animation:up .4s ease both}
.schip:nth-child(1){animation-delay:.04s}.schip:nth-child(2){animation-delay:.09s}.schip:nth-child(3){animation-delay:.14s}
@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.sdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.sval{font-size:20px;font-weight:700;color:var(--txt);letter-spacing:-.3px}
.slbl{font-size:12px;font-weight:500;color:var(--dim);text-transform:uppercase;letter-spacing:.5px}
.ferr{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.22);color:#ef4444;font-size:13.5px;padding:11px 14px;border-radius:10px;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.filters{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}
.fbtn{font-family:var(--fn);font-size:13px;font-weight:600;padding:6px 15px;border-radius:99px;cursor:pointer;border:1px solid var(--b);background:transparent;color:var(--dim);transition:all .15s}
.fbtn:hover{border-color:var(--bh);color:var(--mid)}
.fbtn.on{background:var(--accg);border-color:rgba(168,85,247,.28);color:var(--acc)}
.tcard{background:var(--surf);border:1px solid var(--b);border-radius:13px;overflow:hidden;animation:up .4s .18s ease both;box-shadow:0 1px 3px rgba(0,0,0,0.02);}
.thead{padding:14px 20px;border-bottom:1px solid var(--b);display:flex;align-items:center;justify-content:space-between}
.th-ttl{font-size:14px;font-weight:600;color:var(--mid)}
.th-cnt{font-size:11.5px;color:var(--deep);background:var(--bg);padding:2px 9px;border-radius:99px}
.empty{padding:56px 24px;display:flex;flex-direction:column;align-items:center;gap:9px}
.empty-ico{width:46px;height:46px;border-radius:12px;background:var(--bg);border:1px solid var(--b);display:flex;align-items:center;justify-content:center;color:var(--dim);margin-bottom:3px}
.empty-t{font-size:15px;font-weight:600;color:var(--mid)}
.empty-s{font-size:13px;color:var(--dim)}
.tlist{list-style:none}
.ticket{border-bottom:1px solid var(--b);transition:background .12s;animation:up .3s ease both}
.ticket:last-child{border-bottom:none}
.ticket:hover{background:var(--bg)}
.tk-main{padding:14px 20px;display:flex;align-items:flex-start;gap:16px;cursor:pointer}
.tk-left{flex:1;min-width:0}
.tk-top{display:flex;align-items:center;gap:9px;margin-bottom:6px}
.tk-ref{font-size:11px;font-weight:600;color:var(--dim);letter-spacing:.5px;font-variant-numeric:tabular-nums}
.tk-title{font-size:14.5px;font-weight:500;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:460px}
.tk-tags{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.tag{font-size:11.5px;font-weight:500;padding:3px 9px;border-radius:99px}
.tk-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0}
.ss-wrap{position:relative}
.ss{appearance:none;-webkit-appearance:none;background:var(--surf);font-family:var(--fn);font-size:12.5px;font-weight:600;padding:6px 26px 6px 11px;border-radius:99px;cursor:pointer;border-width:1px;border-style:solid;outline:none;transition:box-shadow .15s;letter-spacing:.1px}
.ss:focus{box-shadow:0 0 0 3px var(--accg)}
.ss:disabled{opacity:.5;cursor:not-allowed}
.ss-arr{position:absolute;right:7px;top:50%;transform:translateY(-50%);pointer-events:none;display:flex}
.spinning{animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.tk-date{font-size:11.5px;color:var(--dim)}
.tk-chev{display:flex;align-items:center;color:var(--dim);transition:transform .2s}
.tk-chev.open{transform:rotate(180deg)}
.tk-desc{background:var(--bg);padding:14px 20px;font-size:13.5px;color:var(--txt);line-height:1.65;border-top:1px solid var(--b)}
.tk-from{font-size:12px;color:var(--dim);margin-top:7px}
`;

const TeamDashboard = () => {
  const { user, logout } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError]         = useState('');
  const [loaded, setLoaded]       = useState(false);
  const [updating, setUpdating]   = useState(null);
  const [filter, setFilter]       = useState('All');
  const [expanded, setExpanded]   = useState(null);
  const [activeTab, setActiveTab] = useState('Team Inbox');

  const load = async () => {
    try { const { data } = await api.get('/feedback/team'); setFeedbacks(data); }
    catch (e) { console.error(e); setError('Failed to load team feedbacks.'); }
    finally { setLoaded(true); }
  };
  useEffect(() => { load(); }, []);

  const changeStatus = async (id, s) => {
    setUpdating(id);
    try {
      await api.put(`/feedback/${id}/status`, { status: s });
      setFeedbacks(p => p.map(f => f._id===id ? {...f,status:s} : f));
    } catch (e) { setError('Failed to update status.'); }
    finally { setUpdating(null); }
  };

  const SC = {
    'Open':        { dot:'#eab308', bg:'rgba(234,179,8,.1)',   color:'#fbbf24', border:'rgba(234,179,8,.22)' },
    'In Progress': { dot:'#a855f7', bg:'rgba(168,85,247,.1)',  color:'#c084fc', border:'rgba(168,85,247,.22)' },
    'Resolved':    { dot:'#22c55e', bg:'rgba(34,197,94,.1)',   color:'#4ade80', border:'rgba(34,197,94,.22)' },
    'Closed':      { dot:'#475569', bg:'rgba(71,85,105,.14)',  color:'#94a3b8', border:'rgba(71,85,105,.22)' },
  };
  const PC = {
    'High':  { bg:'rgba(239,68,68,.1)',  color:'#f87171' },
    'Medium':{ bg:'rgba(245,158,11,.1)', color:'#fbbf24' },
    'Low':   { bg:'rgba(34,197,94,.1)',  color:'#4ade80' },
  };

  const filters = ['All','Open','In Progress','Resolved','Closed'];
  const shown   = filter==='All' ? feedbacks : feedbacks.filter(f=>f.status===filter);
  const open    = feedbacks.filter(f=>f.status==='Open').length;
  const inp     = feedbacks.filter(f=>f.status==='In Progress').length;
  const res     = feedbacks.filter(f=>f.status==='Resolved').length;

  const I1=<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const I2=<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const I3=<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round"/></svg>;

  return (
    <>
      <style>{S}</style>
      <div className="app">
        <aside className="sb">
          <div className="sb-brand">
            <div className="sb-ico" style={{background:'linear-gradient(135deg,#a855f7,#ec4899)',boxShadow:'0 4px 14px rgba(168,85,247,.3)'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="sb-nm">OSFS</span>
            <span className="sb-tag">Team</span>
          </div>
          <div className="nav-sec">Menu</div>
          {[
            {id:'Team Inbox', i:I1,l:'Team Inbox', b:open>0?String(open):null},
            {id:'Resolved', i:I2,l:'Resolved'},
            {id:'Reports', i:I3,l:'Reports'},
          ].map(n=>(
            <div key={n.id} onClick={() => { setActiveTab(n.id); if (n.id === 'Team Inbox') setFilter('All'); else if (n.id === 'Resolved') setFilter('Resolved'); }} className={`nav-item${activeTab === n.id ? ' active' : ''}`}>
              {n.i}<span>{n.l}</span>
              {n.b&&<span className="nav-badge">{n.b}</span>}
            </div>
          ))}
          <div className="sb-bot">
            <div className="ucard">
              <div className="uav" style={{background:'linear-gradient(135deg,#a855f7,#ec4899)'}}>{(user?.name||'T').charAt(0).toUpperCase()}</div>
              <div><div className="unm">{user?.name||'Team Member'}</div><div className="url">Team Member</div></div>
              <button className="uout" onClick={logout} title="Sign out">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="tb-left">
              <span className="tb-title">Team Inbox</span>
              <div className="tb-live"><div className="tb-dot"/><span className="tb-lbl">Live</span></div>
            </div>
          </div>
          <div className="content">
            {activeTab === 'Reports' ? (
              <TeamReportsTab feedbacks={feedbacks} />
            ) : (
              <>
                <div className="ph"><h1 className="ptitle">{activeTab === 'Resolved' ? 'Resolved Tickets' : 'Team Inbox'}</h1><p className="psub">{activeTab === 'Resolved' ? 'Tickets successfully resolved by your team' : 'Triage and resolve feedback assigned to your team'}</p></div>
                {loaded && activeTab === 'Team Inbox' && (
                  <div className="schips">
                    {[{dot:'#eab308',v:open,l:'Open'},{dot:'#a855f7',v:inp,l:'In Progress'},{dot:'#22c55e',v:res,l:'Resolved'}].map(s=>(
                      <div className="schip" key={s.l}>
                        <div className="sdot" style={{background:s.dot}}/>
                        <span className="sval">{s.v}</span>
                        <span className="slbl">{s.l}</span>
                      </div>
                    ))}
                  </div>
                )}
                {error&&<div className="ferr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round"/></svg>{error}</div>}
                {activeTab === 'Team Inbox' && (
                  <div className="filters">
                    {filters.map(f=>(<button key={f} className={`fbtn${filter===f?' on':''}`} onClick={()=>setFilter(f)}>{f}</button>))}
                  </div>
                )}
                <div className="tcard">
                  <div className="thead">
                    <span className="th-ttl">{activeTab === 'Resolved' ? 'Resolved tickets' : 'Assigned tickets'}</span>
                    <span className="th-cnt">{shown.length} items</span>
                  </div>
                  {shown.length===0?(
                    <div className="empty">
                      <div className="empty-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                      <div className="empty-t">{filter==='All'?'Inbox is clear':`No ${filter} tickets`}</div>
                      <div className="empty-s">{filter==='All'?'No tickets assigned to your team.':'Try a different filter.'}</div>
                    </div>
                  ):(
                    <ul className="tlist">
                      {shown.map((item,i)=>{
                        const sc=SC[item.status]||SC['Closed'];
                        const pc=PC[item.priority]||PC['Low'];
                        const isU=updating===item._id;
                        const isE=expanded===item._id;
                        return (
                          <li key={item._id} className="ticket" style={{animationDelay:`${i*.04}s`}}>
                            <div className="tk-main" onClick={()=>setExpanded(isE?null:item._id)}>
                              <div className="tk-left">
                                <div className="tk-top">
                                  <span className="tk-title">{item.title}</span>
                                </div>
                                <div className="tk-tags">
                                  {item.employee_id?.name&&<span className="tag" style={{background:'rgba(255,255,255,.06)',color:'#475569'}}>{item.employee_id.name}</span>}
                                  <span className="tag" style={{background:'rgba(255,255,255,.06)',color:'#475569'}}>{item.category}</span>
                                  <span className="tag" style={{background:pc.bg,color:pc.color}}>{item.priority}</span>
                                </div>
                              </div>
                              <div className="tk-right">
                                <div className="ss-wrap" onClick={e=>e.stopPropagation()}>
                                  <select className="ss" style={{background:sc.bg,color:sc.color,borderColor:sc.border}} value={item.status} disabled={isU} onChange={e=>changeStatus(item._id,e.target.value)}>
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Closed">Closed</option>
                                  </select>
                                  <span className="ss-arr" style={{color:sc.color}}>
                                    {isU
                                      ?<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spinning"><path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round"/></svg>
                                      :<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    }
                                  </span>
                                </div>
                                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                                  <span className="tk-date">{new Date(item.updated_at).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span>
                                  <span className={`tk-chev${isE?' open':''}`}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                </div>
                              </div>
                            </div>
                            {isE&&item.description&&(
                              <div className="tk-desc">
                                {item.description}
                                {item.employee_id?.name&&<div className="tk-from">Submitted by {item.employee_id.name}</div>}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};
export default TeamDashboard;