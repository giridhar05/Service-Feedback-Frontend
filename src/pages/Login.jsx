import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data, data.token);
      switch (data.role) {
        case 'Employee':    navigate('/dashboard/employee'); break;
        case 'Team Member': navigate('/dashboard/team');     break;
        case 'Admin':       navigate('/dashboard/admin');    break;
        default:            navigate('/dashboard/employee');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally { setLoading(false); }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --slate1:   #f8fafc;
      --slate2:   #f1f5f9;
      --slate3:   #e2e8f0;
      --slate4:   #cbd5e1;
      --slate5:   #94a3b8;
      --slate6:   #64748b;
      --slate7:   #475569;
      --slate8:   #334155;
      --slate9:   #1e293b;
      --slate10:  #0f172a;
      --white:    #ffffff;
      --v1:       #3b82f6;
      --v2:       #6366f1;
      --v3:       #4f46e5;
      --grad:     linear-gradient(135deg, #0ea5e9 0%, #3b82f6 45%, #6366f1 100%);
      --accentbg: #faf5ff;
      --accentbd: #e9d5ff;
      --accenttx: #7c3aed;
      --red:      #ef4444;
      --redbg:    #fef2f2;
      --redbd:    #fecaca;
      --green:    #22c55e;
      --fn:       'Geist', sans-serif;
      --mono:     'Geist Mono', monospace;
    }

    .p {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      font-family: var(--fn);
      background: var(--slate1);
    }
    @media (max-width: 860px) {
      .p { grid-template-columns: 1fr; }
      .l { display: none !important; }
    }

    /* ═══════════════ LEFT PANEL ═══════════════ */
    .l {
      background: linear-gradient(145deg, #081226 0%, #11284a 30%, #1d4680 65%, #2563eb 100%);
      border-right: none;
      display: flex;
      flex-direction: column;
      padding: 48px 52px;
      position: relative;
      overflow: hidden;
    }

    /* animated mesh blobs */
    .l-blob {
      position: absolute; inset: 0; pointer-events: none; overflow: hidden;
    }
    .l-blob::before {
      content: '';
      position: absolute; top: -80px; right: -80px;
      width: 420px; height: 420px; border-radius: 50%;
      background: radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 65%);
    }
    .l-blob::after {
      content: '';
      position: absolute; bottom: -60px; left: -60px;
      width: 340px; height: 340px; border-radius: 50%;
      background: radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 65%);
    }

    /* brand */
    .brand {
      display: flex; align-items: center; gap: 11px;
      margin-bottom: auto; padding-bottom: 56px;
      position: relative; z-index: 1;
    }
    .brand-mark {
      width: 36px; height: 36px; border-radius: 10px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .brand-text { font-size: 15px; font-weight: 600; color: #fff; letter-spacing: -0.2px; }
    .brand-pipe { width: 1px; height: 14px; background: rgba(255,255,255,0.25); }
    .brand-sub  { font-size: 12.5px; color: rgba(255,255,255,0.5); font-weight: 400; }

    /* headline section */
    .hero {
      position: relative; z-index: 1;
      margin-bottom: 48px;
    }
    .hero-tag {
      display: inline-flex; align-items: center; gap: 7px;
      background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
      border-radius: 100px; padding: 4px 12px 4px 8px;
      font-size: 11.5px; font-weight: 500; color: rgba(255,255,255,0.9);
      letter-spacing: -0.1px; margin-bottom: 20px;
      backdrop-filter: blur(4px);
    }
    .hero-tag-dot {
      width: 5px; height: 5px; border-radius: 50%; background: #f9a8d4; opacity: 0.9;
    }
    .hero-h1 {
      font-size: 40px; font-weight: 700; line-height: 1.1;
      letter-spacing: -1.5px; color: #fff;
      margin-bottom: 16px;
    }
    .hero-h1 span {
      background: linear-gradient(135deg, #f9a8d4, #fde68a);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero-p {
      font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.6);
      font-weight: 400; max-width: 330px;
    }

    /* feature list */
    .feats { position: relative; z-index: 1; margin-bottom: 40px; }
    .feat {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 14px 0; border-top: 1px solid rgba(255,255,255,0.1);
    }
    .feat:last-child { border-bottom: 1px solid rgba(255,255,255,0.1); }
    .feat-ico {
      width: 30px; height: 30px; border-radius: 7px;
      background: rgba(255,255,255,0.12);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .feat-t  { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; letter-spacing: -0.1px; }
    .feat-d  { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.5; }



    /* ═══════════════ RIGHT PANEL ═══════════════ */
    .r {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 48px 40px;
      background: var(--slate1);
    }
    .form-wrap {
      width: 100%; max-width: 380px;
      animation: fadeup 0.45s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes fadeup {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* form header */
    .fh { margin-bottom: 28px; }
    .fh-title {
      font-size: 26px; font-weight: 700; color: var(--slate10);
      letter-spacing: -0.8px; margin-bottom: 5px; line-height: 1.2;
    }
    .fh-sub { font-size: 13.5px; color: var(--slate5); }
    .fh-sub a { color: var(--v1); text-decoration: none; font-weight: 500; }
    .fh-sub a:hover { color: var(--v2); text-decoration: underline; }

    /* error */
    .err {
      display: flex; align-items: flex-start; gap: 8px;
      background: var(--redbg); border: 1px solid var(--redbd);
      border-radius: 8px; padding: 10px 12px;
      font-size: 13px; color: var(--red); margin-bottom: 18px; line-height: 1.45;
      animation: shake 0.3s ease;
    }
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      25%      { transform: translateX(-4px); }
      75%      { transform: translateX(4px); }
    }
    .err svg { flex-shrink: 0; margin-top: 1px; }

    /* fields */
    .fg { margin-bottom: 14px; }
    .flrow { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .flbl  { font-size: 12.5px; font-weight: 500; color: var(--slate7); }
    .fgt   { font-size: 12px; color: var(--slate5); text-decoration: none; transition: color 0.13s; }
    .fgt:hover { color: var(--v1); }

    .fw { position: relative; }
    .fi {
      width: 100%;
      background: var(--white);
      border: 1.5px solid var(--slate3);
      border-radius: 8px;
      padding: 10px 13px;
      font-size: 14px; font-family: var(--fn);
      color: var(--slate9); outline: none;
      transition: border-color 0.14s, box-shadow 0.14s;
      -webkit-appearance: none;
    }
    .fi::placeholder { color: var(--slate4); }
    .fi:hover { border-color: var(--slate4); }
    .fi:focus { border-color: var(--v1); box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
    .fi.pw { padding-right: 42px; }

    .eye {
      position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer; color: var(--slate4);
      display: flex; align-items: center; border-radius: 4px; padding: 2px;
      transition: color 0.13s;
    }
    .eye:hover { color: var(--slate6); }

    /* submit */
    .btn {
      width: 100%;
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 45%, #ec4899 100%);
      border: none; border-radius: 8px;
      font-family: var(--fn); font-size: 14px; font-weight: 600; color: #fff;
      padding: 11.5px; cursor: pointer; margin-top: 20px;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      letter-spacing: -0.1px;
      transition: opacity 0.14s, transform 0.12s, box-shadow 0.14s;
    }
    .btn:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(168,85,247,0.35);
    }
    .btn:active:not(:disabled) { transform: translateY(0); opacity: 1; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }

    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin 0.75s linear infinite; }

    /* card footer */
    .foot {
      margin-top: 20px; padding-top: 18px;
      border-top: 1px solid var(--slate3);
      display: flex; align-items: center; justify-content: space-between;
    }
    .ssl { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--slate5); }
    .ssl-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
    .flinks { display: flex; gap: 14px; }
    .flink { font-size: 12px; color: var(--slate5); text-decoration: none; transition: color 0.13s; }
    .flink:hover { color: var(--slate7); }

    .caption {
      margin-top: 18px; font-size: 11.5px;
      color: var(--slate5); text-align: center; line-height: 1.6;
    }
    .caption a { color: var(--v1); text-decoration: none; }
    .caption a:hover { text-decoration: underline; }
  `;

  const feats = [
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      title: 'Unified submissions', desc: 'Employees submit from any device into one central feed.',
    },
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
      title: 'Real-time triage', desc: 'Teams assign, escalate and close issues 3× faster.',
    },
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      title: 'Role-based access', desc: 'Employees, leads and admins each see exactly what they need.',
    },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="p">

        {/* ── LEFT ── */}
        <aside className="l">
          <div className="l-blob" />

          <div className="brand">
            <div className="brand-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
                <path d="M8 9h8M8 13h5" stroke="#fff" strokeWidth="1.8"/>
              </svg>
            </div>
            <span className="brand-text">OSFS</span>
            <span className="brand-pipe" />
            <span className="brand-sub">Employee Portal</span>
          </div>

          <div className="hero">
            <div className="hero-tag"><span className="hero-tag-dot"/>Internal Feedback Platform</div>
            <h1 className="hero-h1">Every voice.<br/><span>Every issue.</span><br/>Resolved.</h1>
            <p className="hero-p">A unified portal where employees submit feedback, teams triage it in real-time, and nothing falls through the cracks.</p>
          </div>

          <div className="feats">
            {feats.map((f, i) => (
              <div className="feat" key={i}>
                <div className="feat-ico">{f.icon}</div>
                <div><div className="feat-t">{f.title}</div><div className="feat-d">{f.desc}</div></div>
              </div>
            ))}
          </div>


        </aside>

        {/* ── RIGHT ── */}
        <main className="r">
          <div className="form-wrap">

            <div className="fh">
              <h2 className="fh-title">Sign in to OSFS</h2>
              <p className="fh-sub">No account? <Link to="/register">Create one free →</Link></p>
            </div>

            {error && (
              <div className="err">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="fg">
                <div className="flrow"><label className="flbl">Work email</label></div>
                <div className="fw">
                  <input type="email" required className="fi" placeholder="you@company.com"
                    value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
              </div>

              <div className="fg">
                <div className="flrow">
                  <label className="flbl">Password</label>
                  <a href="#" className="fgt">Forgot password?</a>
                </div>
                <div className="fw">
                  <input type={showPw ? 'text' : 'password'} required className="fi pw" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}/>
                  <button type="button" className="eye" onClick={() => setShowPw(v => !v)} tabIndex={-1}>
                    {showPw
                      ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              <button type="submit" className="btn" disabled={loading}>
                {loading
                  ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spin" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Signing in…</>
                  : <>Sign in <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></>
                }
              </button>
            </form>

            <div className="foot">
              <div className="ssl"><span className="ssl-dot"/>SSL encrypted</div>
              <div className="flinks">
                <a href="#" className="flink">Privacy</a>
                <a href="#" className="flink">Terms</a>
                <a href="#" className="flink">Help</a>
              </div>
            </div>

          </div>

          <p className="caption">
            By signing in you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </main>

      </div>
    </>
  );
};

export default Login;