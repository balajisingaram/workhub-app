'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_EMPLOYEES, MOCK_ENTERPRISE } from '@/lib/data'
import { cn, getWeightTierInfo } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'overview',   icon: '⊞',  label: 'Overview' },
  { id: 'employees',  icon: '👥', label: 'Employees' },
  { id: 'shifts',     icon: '📅', label: 'Shifts' },
  { id: 'attendance', icon: '📍', label: 'Attendance' },
  { id: 'payroll',    icon: '💰', label: 'Payroll' },
  { id: 'upload',     icon: '📤', label: 'Bulk upload' },
  { id: 'settings',   icon: '⚙️', label: 'Settings' },
]

function EmployeeRow({ emp }: { emp: (typeof MOCK_EMPLOYEES)[0] }) {
  const statusColors: Record<string, string> = {
    active:   'bg-[var(--accent-light)] text-[var(--accent)]',
    deployed: 'bg-[var(--blueL,#e5f0fa)] text-[var(--blue,#1a5a8a)]',
    pending:  'bg-[var(--amberL,#fdf0e0)] text-[var(--amber,#c2620a)]',
    inactive: 'bg-[var(--bg2)] text-[var(--ink3)]',
  }

  return (
    <tr className="border-b border-[var(--border2)] last:border-0 hover:bg-[var(--bg)] transition-smooth">
      <td className="p-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--bg2)] flex items-center justify-center text-base shrink-0">{emp.avatarEmoji}</div>
          <div>
            <div className="text-sm font-medium text-[var(--ink)]">{emp.name}</div>
            <div className="text-xs text-[var(--ink3)]">{emp.email}</div>
          </div>
        </div>
      </td>
      <td className="p-4 text-sm text-[var(--ink2)]">{emp.role}</td>
      <td className="p-4 text-sm text-[var(--ink3)]">{emp.department ?? '—'}</td>
      <td className="p-4">
        {emp.weightTier ? (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: getWeightTierInfo(emp.weightTier).bgColor, color: getWeightTierInfo(emp.weightTier).color }}>
            {getWeightTierInfo(emp.weightTier).label}
          </span>
        ) : <span className="text-[var(--ink3)] text-sm">—</span>}
      </td>
      <td className="p-4">
        <span className={cn('px-2.5 py-1 rounded-full text-[11px] font-semibold', statusColors[emp.status])}>
          {emp.status}
        </span>
      </td>
      <td className="p-4">
        {emp.emailVerified
          ? <span className="text-[var(--accent)] text-sm font-medium">✓ Verified</span>
          : <span className="text-[var(--amber,#c2620a)] text-sm font-medium">⏳ Pending</span>}
      </td>
      <td className="p-4">
        {emp.clockedIn
          ? <span className="flex items-center gap-1 text-xs text-[var(--accent)] font-medium"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />Clocked in</span>
          : <span className="text-xs text-[var(--ink3)]">Off shift</span>}
      </td>
      <td className="p-4 px-6">
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--ink3)] transition-smooth">View</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--ink3)] transition-smooth">Assign</button>
        </div>
      </td>
    </tr>
  )
}

export default function AgencyDashboard() {
  const [activeNav, setActiveNav]   = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [uploadDragging, setUploadDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadDone, setUploadDone] = useState(false)

  const ent = MOCK_ENTERPRISE
  const active   = MOCK_EMPLOYEES.filter(e => e.status === 'active').length
  const deployed = MOCK_EMPLOYEES.filter(e => e.status === 'deployed').length
  const pending  = MOCK_EMPLOYEES.filter(e => e.status === 'pending').length

  function simulateUpload(name: string) {
    setUploadedFile(name)
    setUploadProgress(0)
    setUploadDone(false)
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) { clearInterval(interval); setUploadDone(true); return 100 }
        return p + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen flex" style={{ background: ent.brandColor + '08' }}>
      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full z-40 hidden lg:flex flex-col border-r transition-all duration-300',
        sidebarOpen ? 'w-60' : 'w-20'
      )} style={{ background: ent.brandColor, borderColor: ent.brandColor + '60' }}>
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,.15)' }}>
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white text-sm">A</div>
              <div>
                <div className="font-bold text-sm text-white leading-none">{ent.companyName.split(' ')[0]}</div>
                <div className="text-[10px] text-white/50 mt-0.5">HR Portal</div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white text-sm mx-auto">A</div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-white/50 hover:text-white transition-smooth text-sm">
            {sidebarOpen ? '◂' : '▸'}
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 flex flex-col gap-0.5">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth text-left w-full',
                activeNav === item.id ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
              )}>
              <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

        <div className={cn('p-4 border-t', sidebarOpen ? 'flex items-center gap-3' : 'flex justify-center')}
          style={{ borderColor: 'rgba(255,255,255,.15)' }}>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">HR</div>
          {sidebarOpen && (
            <div>
              <div className="text-xs font-medium text-white truncate">HR Manager</div>
              <div className="text-[10px] text-white/50">{ent.customDomain}</div>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className={cn('flex-1 flex flex-col transition-all duration-300', sidebarOpen ? 'lg:ml-60' : 'lg:ml-20')}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-[var(--border2)] flex items-center px-6 gap-4 sticky top-0 z-30">
          <div className="font-semibold text-[var(--ink)] capitalize">{activeNav}</div>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-xs px-3 py-1.5 rounded-full font-bold" style={{ background: ent.brandColor + '15', color: ent.brandColor }}>
              {ent.companyName}
            </div>
            <button className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--border2)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">🔔</button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">

          {/* ── OVERVIEW ── */}
          {activeNav === 'overview' && (
            <div>
              <div className="mb-8">
                <h1 className="font-display font-black text-2xl tracking-tight mb-1" style={{ color: ent.brandColor }}>
                  {ent.companyName} — HR Dashboard
                </h1>
                <p className="text-[var(--ink3)] text-sm">{ent.customDomain} · Powered by WorkHub (white-label)</p>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '👥', label: 'Total employees', value: String(MOCK_EMPLOYEES.length), color: ent.brandColor },
                  { icon: '✅', label: 'Active',           value: String(active),   color: '#27ae60' },
                  { icon: '🏗️', label: 'Deployed',         value: String(deployed), color: '#1a5a8a' },
                  { icon: '⏳', label: 'Pending verify',   value: String(pending),  color: '#c2620a' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-[var(--border2)] p-6 hover:shadow-soft transition-smooth">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: s.color + '15' }}>{s.icon}</div>
                    <div className="font-display font-black text-3xl tracking-tight mb-1" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-sm text-[var(--ink3)]">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: '📤', title: 'Bulk upload employees', desc: 'Import CSV / Excel file',       action: () => setActiveNav('upload') },
                  { icon: '📅', title: 'Create shift',          desc: 'Assign staff to new shift',     action: () => setActiveNav('shifts') },
                  { icon: '📊', title: 'Attendance report',     desc: 'Export attendance data',        action: () => setActiveNav('attendance') },
                ].map(qa => (
                  <button key={qa.title} onClick={qa.action}
                    className="bg-white rounded-2xl border border-[var(--border2)] p-5 text-left hover:shadow-soft hover:-translate-y-0.5 transition-smooth group">
                    <div className="text-2xl mb-3">{qa.icon}</div>
                    <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth">{qa.title}</div>
                    <div className="text-xs text-[var(--ink3)] mt-0.5">{qa.desc}</div>
                  </button>
                ))}
              </div>

              {/* Employee table */}
              <div className="bg-white rounded-2xl border border-[var(--border2)] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-[var(--border2)]">
                  <h2 className="font-semibold text-[var(--ink)]">Employee roster</h2>
                  <button onClick={() => setActiveNav('upload')}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-white transition-smooth"
                    style={{ background: ent.brandColor }}>
                    + Add employees
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="text-xs font-bold text-[var(--ink3)] uppercase tracking-wider border-b border-[var(--border2)] bg-[var(--bg)]">
                        {['Employee','Role','Department','Weight tier','Status','Email','Clock','Actions'].map(h => (
                          <th key={h} className={cn('text-left p-4 font-bold', h === 'Employee' || h === 'Actions' ? 'px-6' : '')}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_EMPLOYEES.map(emp => <EmployeeRow key={emp.id} emp={emp} />)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── BULK UPLOAD ── */}
          {activeNav === 'upload' && (
            <div className="max-w-2xl">
              <h1 className="font-display font-black text-2xl tracking-tight mb-2" style={{ color: ent.brandColor }}>Bulk employee upload</h1>
              <p className="text-[var(--ink3)] text-sm mb-8">Upload a CSV or Excel file to add multiple employees at once. A branded verification email will be sent from {ent.fromEmailName} &lt;hr@{ent.customDomain?.replace('portal.','')}&gt;.</p>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setUploadDragging(true) }}
                onDragLeave={() => setUploadDragging(false)}
                onDrop={e => { e.preventDefault(); setUploadDragging(false); const f = e.dataTransfer.files[0]; if (f) simulateUpload(f.name) }}
                className={cn('border-2 border-dashed rounded-2xl p-12 text-center transition-smooth cursor-pointer mb-8',
                  uploadDragging ? 'border-[var(--accent)] bg-[var(--accent-light)] scale-[1.01]' : 'border-[var(--border)] hover:border-[var(--ink3)] bg-[var(--bg)]')}
                onClick={() => { const inp = document.getElementById('file-inp') as HTMLInputElement; inp?.click() }}>
                <input id="file-inp" type="file" accept=".csv,.xlsx,.xls" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) simulateUpload(f.name) }} />
                <div className="text-4xl mb-4">📊</div>
                <div className="font-semibold text-[var(--ink)] mb-1">Drop CSV or Excel file here</div>
                <div className="text-sm text-[var(--ink3)] mb-4">or click to browse your files</div>
                <div className="text-xs text-[var(--ink3)]">Required columns: Name, Email, Role, Department, Weight tier (optional), Phone</div>
              </div>

              {/* Upload progress */}
              {uploadedFile && (
                <div className="bg-white rounded-2xl border border-[var(--border2)] p-6 mb-8 animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-xl">📄</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-[var(--ink)]">{uploadedFile}</div>
                      <div className="text-xs text-[var(--ink3)]">{uploadDone ? 'Processing complete' : 'Parsing and validating…'}</div>
                    </div>
                    {uploadDone && <span className="text-[var(--accent)] text-xl">✅</span>}
                  </div>
                  <div className="w-full h-2 bg-[var(--bg3)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%`, background: ent.brandColor }} />
                  </div>
                  <div className="text-xs text-[var(--ink3)] mt-2">{uploadProgress}% complete</div>
                </div>
              )}

              {uploadDone && (
                <div className="bg-[var(--accent-light)] rounded-2xl p-6 border border-[rgba(26,107,60,.2)] animate-fade-in mb-6">
                  <div className="font-semibold text-[var(--accent)] mb-2">✅ Upload successful</div>
                  <div className="text-sm text-[var(--ink2)] leading-relaxed">
                    6 employees parsed and validated. Branded verification emails are being sent from <strong>{ent.fromEmailName} &lt;hr@acmecorp.com&gt;</strong>.
                    Each employee will receive a link to set their password and complete their profile on <strong>{ent.customDomain}</strong>.
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => setActiveNav('employees')}
                      className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-smooth"
                      style={{ background: ent.brandColor }}>
                      View employee roster →
                    </button>
                    <button onClick={() => { setUploadedFile(null); setUploadDone(false); setUploadProgress(0) }}
                      className="px-5 py-2 rounded-full text-sm font-medium border border-[var(--border)] hover:border-[var(--ink3)] transition-smooth">
                      Upload another file
                    </button>
                  </div>
                </div>
              )}

              {/* Email preview */}
              <div className="bg-white rounded-2xl border border-[var(--border2)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--border2)] bg-[var(--bg)]">
                  <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-wider">Branded verification email preview</div>
                </div>
                <div className="p-6">
                  <div className="max-w-sm mx-auto border border-[var(--border2)] rounded-xl overflow-hidden text-sm">
                    {/* Email header */}
                    <div className="px-5 py-4 text-white" style={{ background: ent.brandColor }}>
                      <div className="font-bold text-lg">{ent.companyName}</div>
                      <div className="text-white/60 text-xs mt-0.5">HR Department</div>
                    </div>
                    <div className="p-5">
                      <div className="font-semibold text-[var(--ink)] mb-3">Welcome to {ent.companyName}</div>
                      <p className="text-[var(--ink3)] text-xs leading-relaxed mb-4">
                        You've been added to our team portal. Click below to verify your email address and set your password.
                      </p>
                      <button className="w-full py-2.5 rounded-lg text-white text-sm font-semibold" style={{ background: ent.brandColor }}>
                        Verify my account →
                      </button>
                      <div className="mt-4 pt-4 border-t border-[var(--border2)] text-[10px] text-[var(--ink3)] text-center">
                        © {ent.companyName} · {ent.customDomain}
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-xs text-[var(--ink3)] mt-4">No mention of WorkHub anywhere — only your company branding.</p>
                </div>
              </div>
            </div>
          )}

          {activeNav !== 'overview' && activeNav !== 'upload' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="text-5xl mb-4">{NAV_ITEMS.find(n=>n.id===activeNav)?.icon}</div>
              <h2 className="font-display font-bold text-xl mb-2 capitalize" style={{ color: ent.brandColor }}>{activeNav}</h2>
              <p className="text-[var(--ink3)] text-sm mb-6">Coming in the next build sprint</p>
              <button onClick={() => setActiveNav('overview')}
                className="px-6 py-2.5 rounded-full text-white text-sm font-medium transition-smooth"
                style={{ background: ent.brandColor }}>
                Back to overview
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
