import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import EmployeeHistoryTab from '../components/EmployeeHistoryTab';
import EmployeeSortedTab from '../components/EmployeeSortedTab';

const S = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f8fafc;--surf:#ffffff;--b:#e2e8f0;--bh:#cbd5e1;
  --txt:#0f172a;--mid:#475569;--dim:#64748b;--deep:#94a3b8;
  --acc:#7c3aed;--accg:rgba(124,58,237,.12);--acch:#9333ea;
  --fn:'Geist',sans-serif;
}
.app{display:flex;min-height:100vh;background:var(--bg);font-family:var(--fn);color:var(--txt)}
.sb{width:230px;flex-shrink:0;background:var(--surf);border-right:1px solid var(--b);display:flex;flex-direction:column;padding:20px 14px;position:sticky;top:0;height:100vh}
@media(max-width:768px){.sb{display:none}}
.sb-brand{display:flex;align-items:center;gap:10px;padding:4px 6px 20px;border-bottom:1px solid var(--b);margin-bottom:16px}
.sb-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px rgba(124,58,237,.25)}
.sb-nm{font-size:16px;font-weight:700;letter-spacing:-.3px;color:var(--txt)}
.sb-tag{font-size:9.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:2px 6px;border-radius:4px;margin-left:auto}
.nav-sec{font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--deep);padding:0 8px;margin-bottom:6px}
.nav-item{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:9px;font-size:14px;font-weight:500;color:var(--dim);cursor:pointer;transition:all .15s;margin-bottom:1px}
.nav-item:hover{background:var(--bg);color:var(--mid)}
.nav-item.active{background:var(--accg);color:var(--acc);font-weight:600}
.sb-bot{margin-top:auto;padding-top:14px;border-top:1px solid var(--b)}
.ucard{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:10px;border:1px solid var(--b);background:var(--bg)}
.uav{width:32px;height:32px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}
.unm{font-size:13px;font-weight:500;color:var(--txt);line-height:1.2}
.url{font-size:11.5px;color:var(--dim)}
.uout{margin-left:auto;background:none;border:none;color:var(--dim);cursor:pointer;display:flex;border-radius:4px;padding:3px;transition:color .15s}
.uout:hover{color:#ef4444}
.main{flex:1;overflow-x:hidden;display:flex;flex-direction:column}
.topbar{height:54px;border-bottom:1px solid var(--b);display:flex;align-items:center;padding:0 28px;justify-content:space-between;position:sticky;top:0;z-index:20;background:rgba(255,255,255,.85);backdrop-filter:blur(14px);flex-shrink:0}
.tb-title{font-size:15px;font-weight:500;color:var(--mid)}
.tb-btn{background:var(--acc);border:none;color:#fff;font-family:var(--fn);font-size:13.5px;font-weight:600;padding:8px 18px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:7px;transition:background .15s,transform .12s}
.tb-btn:hover{background:var(--acch);transform:translateY(-1px)}
.content{padding:24px 28px;flex:1}
.ph{margin-bottom:20px}
.ptitle{font-size:24px;font-weight:700;letter-spacing:-.6px;color:var(--txt);margin-bottom:4px}
.psub{font-size:14.5px;color:var(--dim)}
.schips{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.schip{background:var(--surf);border:1px solid var(--b);border-radius:10px;padding:11px 16px;display:flex;align-items:center;gap:9px;animation:up .4s ease both}
.schip:nth-child(1){animation-delay:.04s}
.schip:nth-child(2){animation-delay:.09s}
.schip:nth-child(3){animation-delay:.14s}
@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.sdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.sval{font-size:20px;font-weight:700;color:var(--txt);letter-spacing:-.3px}
.slbl{font-size:12px;font-weight:500;color:var(--dim);text-transform:uppercase;letter-spacing:.5px}
.filters{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}
.fbtn{font-family:var(--fn);font-size:13px;font-weight:600;padding:6px 15px;border-radius:99px;cursor:pointer;border:1px solid var(--b);background:transparent;color:var(--dim);transition:all .15s}
.fbtn:hover{border-color:var(--bh);color:var(--mid)}
.fbtn.on{background:rgba(124,58,237,.12);border-color:rgba(124,58,237,.28);color:var(--acc)}
.tcard{background:var(--surf);border:1px solid var(--b);border-radius:13px;overflow:hidden;animation:up .4s .18s ease both;box-shadow:0 1px 3px rgba(0,0,0,0.02);}
.thead{padding:14px 20px;border-bottom:1px solid var(--b);display:flex;align-items:center;justify-content:space-between}
.th-ttl{font-size:14px;font-weight:600;color:var(--mid)}
.th-cnt{font-size:11.5px;color:var(--deep);background:var(--bg);padding:2px 9px;border-radius:99px}
.empty{padding:56px 24px;display:flex;flex-direction:column;align-items:center;gap:9px}
.empty-ico{width:46px;height:46px;border-radius:12px;background:var(--bg);border:1px solid var(--b);display:flex;align-items:center;justify-content:center;color:var(--dim);margin-bottom:3px}
.empty-t{font-size:15px;font-weight:600;color:var(--mid)}
.empty-s{font-size:13px;color:var(--dim)}
.tlist{list-style:none}
.trow{padding:14px 20px;border-bottom:1px solid var(--b);display:flex;align-items:center;gap:16px;transition:background .12s;animation:up .3s ease both}
.trow:last-child{border-bottom:none}
.trow:hover{background:var(--bg)}
.tr-main{flex:1;min-width:0}
.tr-title{font-size:14.5px;font-weight:500;color:var(--txt);margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tr-tags{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.tag{font-size:11.5px;font-weight:500;padding:3px 9px;border-radius:99px}
.tr-meta{display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0}
.status{display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;padding:4px 11px;border-radius:99px}
.sdot2{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.tr-date{font-size:11.5px;color:var(--dim)}
/* MODAL */
.ov{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center;padding:24px;animation:fi .18s ease}
@keyframes fi{from{opacity:0}to{opacity:1}}
.modal{background:var(--surf);border:1px solid var(--bh);border-radius:16px;width:100%;max-width:500px;box-shadow:0 12px 40px rgba(0,0,0,.15);animation:mi .22s cubic-bezier(.34,1.4,.64,1);overflow:hidden}
@keyframes mi{from{opacity:0;transform:scale(.94) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
.mhd{padding:20px 22px 18px;border-bottom:1px solid var(--b);display:flex;align-items:center;justify-content:space-between}
.mttl{font-size:18px;font-weight:700;letter-spacing:-.4px;color:var(--txt)}
.mcls{width:28px;height:28px;background:var(--bg);border:none;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--dim);transition:background .15s,color .15s}
.mcls:hover{background:var(--b);color:var(--mid)}
.mbody{padding:20px 22px}
.mft{padding:14px 22px;border-top:1px solid var(--b);display:flex;justify-content:flex-end;gap:10px;background:var(--bg)}
.merr{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.22);color:#ef4444;font-size:13.5px;padding:11px 13px;border-radius:9px;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.mfg{margin-bottom:13px}
.mgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:13px}
.mlbl{display:block;font-size:12.5px;font-weight:500;color:var(--mid);margin-bottom:6px;text-transform:uppercase;letter-spacing:.4px}
.mi,.ms,.mta{width:100%;background:var(--surf);border:1.5px solid var(--b);border-radius:9px;padding:12px 14px;font-size:14.5px;font-family:var(--fn);color:var(--txt);outline:none;transition:border-color .15s,box-shadow .15s}
.mi::placeholder,.mta::placeholder{color:var(--dim)}
.mi:focus,.ms:focus,.mta:focus{border-color:var(--acc);box-shadow:0 0 0 3px var(--accg)}
.mta{resize:vertical;min-height:96px}
.ms option{background:var(--surf)}
.btn-c{background:var(--bg);border:1px solid var(--b);color:var(--mid);font-family:var(--fn);font-size:13.5px;font-weight:600;padding:9px 18px;border-radius:9px;cursor:pointer;transition:background .15s}
.btn-c:hover{background:var(--bh)}
.btn-s{background:var(--acc);border:none;color:#fff;font-family:var(--fn);font-size:13.5px;font-weight:600;padding:9px 20px;border-radius:9px;cursor:pointer;display:flex;align-items:center;gap:7px;transition:background .15s}
.btn-s:hover:not(:disabled){background:var(--acch)}
.btn-s:disabled{opacity:.5;cursor:not-allowed}
@keyframes spin{to{transform:rotate(360deg)}}
.spin{animation:spin .7s linear infinite}
`;;

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title:'', description:'', category:'Bug Report', priority:'Low' });
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('My Feedback');

  const load = async () => {
    try { 
      const [fb, hist] = await Promise.all([
        api.get('/feedback/my'),
        api.get('/feedback/history')
      ]);
      setFeedbacks(fb.data); 
      setHistory(hist.data);
    }
    catch (e) { console.error(e); } finally { setLoaded(true); }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      await api.post('/feedback', form);
      setShowModal(false);
      setForm({ title:'', description:'', category:'Bug Report', priority:'Low' });
      setError(''); load();
    } catch (e) { setError(e.response?.data?.message || 'Failed to submit.'); }
    finally { setSubmitting(false); }
  };

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

  const filters = ['All','Open','In Progress','Resolved','Closed'];
  const shown = filter==='All' ? feedbacks : feedbacks.filter(f=>f.status===filter);
  const open = feedbacks.filter(f=>f.status==='Open').length;
  const inp  = feedbacks.filter(f=>f.status==='In Progress').length;
  const res  = feedbacks.filter(f=>f.status==='Resolved').length;

  const NavIcon1 = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const NavIcon2 = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const NavIcon3 = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/></svg>;

  return (
    <>
      <style>{S}</style>
      <div className="app">
        <aside className="sb">
          <div className="sb-brand">
            <div className="sb-ico" style={{background:'linear-gradient(135deg,#4f6ef7,#06b6d4)'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="sb-nm">OSFS</span>
            <span className="sb-tag" style={{color:'#06b6d4',background:'rgba(6,182,212,.1)',border:'1px solid rgba(6,182,212,.22)'}}>Employee</span>
          </div>
          <div className="nav-sec">Menu</div>
          {[{i:NavIcon1,l:'My Feedback', id:'My Feedback'},{i:NavIcon2,l:'History', id:'History'},{i:NavIcon3,l:'Sorted View', id:'Sorted View'}].map(n=>(
            <div key={n.id} onClick={() => setActiveTab(n.id)} className={`nav-item${activeTab === n.id ? ' active' : ''}`}>{n.i}<span>{n.l}</span></div>
          ))}
          <div className="sb-bot">
            <div className="ucard">
              <div className="uav" style={{background:'linear-gradient(135deg,#4f6ef7,#06b6d4)'}}>{(user?.name||'E').charAt(0).toUpperCase()}</div>
              <div><div className="unm">{user?.name||'Employee'}</div><div className="url">Employee</div></div>
              <button className="uout" onClick={logout} title="Sign out">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <span className="tb-title">My Feedback</span>
            <button className="tb-btn" onClick={()=>setShowModal(true)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/></svg>
              New submission
            </button>
          </div>
          <div className="content">
            {activeTab === 'History' && <EmployeeHistoryTab history={history} />}
            {activeTab === 'Sorted View' && <EmployeeSortedTab feedbacks={feedbacks} />}
            
            {activeTab === 'My Feedback' && (
              <>
                <div className="ph"><h1 className="ptitle">My Feedback</h1><p className="psub">Track and manage your submitted feedback</p></div>
                {loaded&&(
                  <div className="schips">
                    {[{dot:'#eab308',v:open,l:'Open'},{dot:'#4f6ef7',v:inp,l:'In Progress'},{dot:'#22c55e',v:res,l:'Resolved'}].map(s=>(
                      <div className="schip" key={s.l}>
                        <div className="sdot" style={{background:s.dot}}/>
                        <span className="sval">{s.v}</span>
                        <span className="slbl">{s.l}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="filters">
                  {filters.map(f=>(
                    <button key={f} className={`fbtn${filter===f?' on':''}`} onClick={()=>setFilter(f)}>{f}</button>
                  ))}
                </div>
                <div className="tcard">
                  <div className="thead">
                    <span className="th-ttl">Submissions</span>
                    <span className="th-cnt">{shown.length} items</span>
                  </div>
                  {shown.length===0?(
                    <div className="empty">
                      <div className="empty-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                      <div className="empty-t">{filter==='All'?'No submissions yet':`No ${filter} items`}</div>
                      <div className="empty-s">{filter==='All'?'Click "New submission" to get started.':'Try a different filter.'}</div>
                    </div>
                  ):(
                    <ul className="tlist">
                      {shown.map((item,i)=>{
                        const sc=SC[item.status]||SC['Closed'];
                        const pc=PC[item.priority]||PC['Low'];
                        return (
                          <li key={item._id} className="trow" style={{animationDelay:`${i*.04}s`}}>
                            <div className="tr-main">
                              <div className="tr-title">{item.title}</div>
                              <div className="tr-tags">
                                <span className="tag" style={{background:'rgba(255,255,255,.06)',color:'#475569'}}>{item.category}</span>
                                <span className="tag" style={{background:pc.bg,color:pc.color}}>{item.priority}</span>
                              </div>
                            </div>
                            <div className="tr-meta">
                              <div className="status" style={{background:sc.bg,color:sc.color}}>
                                <div className="sdot2" style={{background:sc.dot}}/>{item.status}
                              </div>
                              <div className="tr-date">{new Date(item.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>
                            </div>
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

      {showModal&&(
        <div className="ov" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="modal">
            <div className="mhd">
              <div className="mttl">New submission</div>
              <button className="mcls" onClick={()=>setShowModal(false)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/></svg>
              </button>
            </div>
            <form onSubmit={submit}>
              <div className="mbody">
                {error&&<div className="merr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round"/></svg>{error}</div>}
                <div className="mfg"><label className="mlbl">Title</label><input type="text" required className="mi" placeholder="Brief summary" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
                <div className="mgrid">
                  <div><label className="mlbl">Category</label><select className="ms" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Bug Report</option><option>Feature Request</option><option>Complaint</option><option>Usability Feedback</option></select></div>
                  <div><label className="mlbl">Priority</label><select className="ms" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Low</option><option>Medium</option><option>High</option></select></div>
                </div>
                <div className="mfg"><label className="mlbl">Description</label><textarea required className="mta" placeholder="Provide clear details…" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
              </div>
              <div className="mft">
                <button type="button" className="btn-c" onClick={()=>setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-s" disabled={submitting}>
                  {submitting?<><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round"/></svg>Submitting…</>:<>Submit feedback →</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default EmployeeDashboard;