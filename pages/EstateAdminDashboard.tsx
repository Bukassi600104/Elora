import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { UserRole, User, AccessLog } from '../types';
import { store } from '../services/store';
import { formatDate } from '../constants';
import { GenAIInsights } from '../components/GenAIInsights';

export const EstateAdminDashboard: React.FC = () => {
  const currentUser = store.getCurrentUser();
  const estateId = currentUser?.estateId || '';
  
  const [view, setView] = useState<'dashboard' | 'residents' | 'logs'>('dashboard');
  const [users, setUsers] = useState<User[]>(store.getUsersByEstate(estateId));
  const [logs, setLogs] = useState<AccessLog[]>(store.getLogs(estateId));
  
  // Wizard State
  const [showWizard, setShowWizard] = useState(false);
  const [wizardData, setWizardData] = useState({ name: '', email: '', houseNumber: '' });
  const [wizardStep, setWizardStep] = useState(1);

  // Navigation Logic from Sidebar
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('/residents')) setView('residents');
    else if (hash.includes('/logs')) setView('logs');
    else setView('dashboard');
  }, [window.location.hash]);

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
        id: `u-${Date.now()}`,
        name: wizardData.name,
        email: wizardData.email,
        houseNumber: wizardData.houseNumber,
        role: UserRole.RESIDENT,
        estateId: estateId,
        authorizedPhones: []
    };
    store.addUser(newUser);
    setUsers(store.getUsersByEstate(estateId));
    setShowWizard(false);
    setWizardData({ name: '', email: '', houseNumber: '' });
    setWizardStep(1);
  };

  const handleApprovePhone = (residentId: string, phoneId: string) => {
    store.approvePhone(residentId, phoneId);
    setUsers(store.getUsersByEstate(estateId));
  };

  const DashboardView = () => (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-black text-text-main tracking-tight">Dashboard Overview</h2>
            <p className="text-sm text-text-secondary flex items-center gap-2 mt-1">
                <span className="size-2 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></span>
                System Status: Normal Operation
            </p>
        </div>
        <button onClick={() => setShowWizard(true)} className="flex items-center gap-2 px-4 h-10 rounded-lg bg-gradient-to-r from-primary to-primary-hover text-white text-sm font-bold shadow-glow hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Onboard Resident
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="p-6 rounded-2xl bg-surface border border-border-light shadow-card hover:shadow-card-hover relative overflow-hidden group transition-all duration-300">
            <div className="absolute right-0 top-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-text-secondary text-sm font-medium">Total Residents</p>
                    <h3 className="text-3xl font-bold text-text-main mt-1">{users.filter(u => u.role === UserRole.RESIDENT).length}</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <span className="material-symbols-outlined text-[24px]">groups</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm relative z-10">
                <span className="text-success font-bold flex items-center bg-success/10 px-1.5 py-0.5 rounded">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span> 2%
                </span>
                <span className="text-text-secondary">vs last month</span>
            </div>
        </div>

        {/* Stat Card 2 */}
        <div className="p-6 rounded-2xl bg-surface border border-border-light shadow-card hover:shadow-card-hover relative overflow-hidden group transition-all duration-300">
            <div className="absolute right-0 top-0 p-32 bg-success/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-success/10"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-text-secondary text-sm font-medium">Approved Entries</p>
                    <h3 className="text-3xl font-bold text-text-main mt-1">{logs.filter(l => l.status === 'ALLOWED').length}</h3>
                </div>
                <div className="p-2 bg-success/10 rounded-lg text-success">
                    <span className="material-symbols-outlined text-[24px]">check_circle</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm relative z-10">
                <span className="text-success font-bold flex items-center bg-success/10 px-1.5 py-0.5 rounded">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span> 5%
                </span>
                <span className="text-text-secondary">activity spike</span>
            </div>
        </div>

        {/* Stat Card 3 */}
        <div className="p-6 rounded-2xl bg-surface border border-border-light shadow-card hover:shadow-card-hover relative overflow-hidden group transition-all duration-300">
            <div className="absolute right-0 top-0 p-32 bg-error/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-error/10"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-text-secondary text-sm font-medium">Denied Entries</p>
                    <h3 className="text-3xl font-bold text-text-main mt-1">{logs.filter(l => l.status === 'DENIED').length}</h3>
                </div>
                <div className="p-2 bg-error/10 rounded-lg text-error">
                    <span className="material-symbols-outlined text-[24px]">block</span>
                </div>
            </div>
             <div className="flex items-center gap-2 text-sm relative z-10">
                <span className="text-text-secondary">Requires attention</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
             {/* Pending Approvals Table */}
            <div className="bg-surface rounded-2xl border border-border-light shadow-card overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-border-light flex items-center justify-between bg-surface">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-text-main">Pending Phone Approvals</h3>
                        {users.flatMap(u => (u.authorizedPhones || []).filter(p => p.status === 'PENDING')).length > 0 && (
                             <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-glow">Action Req.</span>
                        )}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-highlight text-xs uppercase text-text-secondary font-semibold tracking-wider border-b border-border-light">
                                <th className="px-6 py-4">Resident</th>
                                <th className="px-6 py-4">Phone Owner</th>
                                <th className="px-6 py-4">Number</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                            {users.flatMap(u => 
                                (u.authorizedPhones || [])
                                .filter(p => p.status === 'PENDING')
                                .map(p => ({ ...p, resident: u }))
                            ).length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-text-secondary">No pending approvals found.</td>
                                </tr>
                            ) : (
                                users.flatMap(u => 
                                    (u.authorizedPhones || [])
                                    .filter(p => p.status === 'PENDING')
                                    .map(p => (
                                        <tr key={p.id} className="group hover:bg-surface-highlight transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-text-main">{u.name}</p>
                                                        <p className="text-xs text-text-secondary">Unit {u.houseNumber}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-text-main font-medium">{p.name}</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary font-mono">{p.number}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleApprovePhone(u.id, p.id)} className="size-8 flex items-center justify-center rounded-lg bg-success/10 text-success hover:bg-success hover:text-white transition-all">
                                                        <span className="material-symbols-outlined text-[18px]">check</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Live Logs */}
            <div className="bg-surface rounded-2xl border border-border-light shadow-card flex flex-col flex-1 max-h-[600px]">
                <div className="px-6 py-5 border-b border-border-light flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                        </span>
                        Recent Activity
                    </h3>
                    <button onClick={() => setView('logs')} className="text-sm text-primary font-bold hover:text-primary-hover transition-colors">View All</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {logs.slice(0, 5).map(log => (
                        <div key={log.id} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${log.status === 'ALLOWED' ? 'bg-surface hover:bg-surface-highlight border-transparent hover:border-border-light' : 'bg-error/5 border-error/10'}`}>
                            <div className={`p-2 rounded bg-white border border-border-light shadow-sm ${log.status === 'ALLOWED' ? 'text-text-secondary' : 'text-error'}`}>
                                <span className="material-symbols-outlined text-[20px]">{log.passCodeType === 'GUEST' ? 'person' : 'badge'}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className={`text-sm font-medium ${log.status === 'ALLOWED' ? 'text-text-main' : 'text-error'}`}>
                                        {log.status === 'ALLOWED' ? 'Access Granted' : 'Access Denied'}
                                    </p>
                                    <span className="text-xs text-text-secondary">{formatDate(log.timestamp)}</span>
                                </div>
                                <p className="text-xs text-text-secondary mt-0.5">
                                    Guest: {log.guestName} • Resident: {log.residentName} ({log.houseNumber})
                                </p>
                            </div>
                        </div>
                    ))}
                    {logs.length === 0 && <p className="text-center text-text-secondary text-sm py-4">No recent activity.</p>}
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-8">
            <div className="bg-surface rounded-2xl border border-border-light shadow-card p-6">
                <h3 className="text-lg font-bold text-text-main mb-4">Gate Status</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-2 rounded-full bg-success shadow-[0_0_8px_#10b981]"></div>
                            <span className="text-sm font-medium text-text-main">Main Entrance (A)</span>
                        </div>
                        <span className="text-xs text-success font-bold bg-success/10 px-2 py-1 rounded">ONLINE</span>
                    </div>
                </div>
            </div>
             <div className="bg-surface rounded-2xl border border-border-light shadow-card h-48 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB3FdvhFd92cBtaGRw2Ei2yOcBaSL_3olM6E4AqrchL5eW4L7Fo5t85JZeZbrXNlfPNNDNDTiSc07O4BeVklCil1WAzGpofykGFjNb_sYN-hnYxb8wraoATlw1KT7g83_LOzEMyqV4tvGHrkCsELbXMHbQUnZqrz9aMdUi4hQZ--5GESGdpI5PppR9YnUdgxQzrONBYGPktvmlrCSSoE2yGfSzI2WBPXSzOEzMp6qto7NCuE56BaDYGF8bjGyRokg8XJAF8fqO3aiM")'}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Live Map</p>
                        <h4 className="text-white font-bold">Estate View</h4>
                    </div>
                    <div className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <span className="material-symbols-outlined text-[18px]">open_in_full</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  const ResidentsView = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-text-main">Resident Directory</h3>
            <button onClick={() => setShowWizard(true)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition">
                <span className="material-symbols-outlined text-[20px]">add</span> Add Resident
            </button>
        </div>
        <div className="bg-surface rounded-xl border border-border-light overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
                <thead className="bg-surface-highlight text-text-secondary font-medium">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">House #</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Authorized Phones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                    {users.filter(u => u.role === UserRole.RESIDENT).map(u => (
                        <tr key={u.id} className="hover:bg-surface-highlight transition">
                            <td className="px-6 py-4 font-medium text-text-main">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                                        {u.name.charAt(0)}
                                    </div>
                                    {u.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-text-secondary font-mono">{u.houseNumber}</td>
                            <td className="px-6 py-4 text-text-secondary">{u.email}</td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-2">
                                {u.authorizedPhones?.map(p => (
                                    <span key={p.id} className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${
                                        p.status === 'APPROVED' ? 'bg-success/5 border-success/20 text-success' : 'bg-warning/5 border-warning/20 text-warning'
                                    }`}>
                                        <span className="material-symbols-outlined text-[12px]">smartphone</span> {p.number}
                                    </span>
                                ))}
                                {(!u.authorizedPhones || u.authorizedPhones.length === 0) && <span className="text-text-muted italic">None</span>}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  const LogsView = () => (
      <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <GenAIInsights logs={logs} />
          </div>

          <div className="bg-surface rounded-xl border border-border-light overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border-light bg-surface-highlight flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-secondary">search</span>
                  <input placeholder="Search logs by resident, guest or code..." className="bg-transparent text-sm outline-none text-text-main w-full placeholder:text-text-muted"/>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-surface text-text-secondary font-medium border-b border-border-light">
                    <tr>
                        <th className="px-6 py-3">Timestamp</th>
                        <th className="px-6 py-3">Guest</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Resident</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                    {logs.map(log => (
                        <tr key={log.id} className="hover:bg-surface-highlight">
                            <td className="px-6 py-4 text-text-secondary font-mono text-xs">{formatDate(log.timestamp)}</td>
                            <td className="px-6 py-4 font-medium text-text-main">{log.guestName}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${log.passCodeType === 'GUEST' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                                    {log.passCodeType}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-text-secondary">{log.residentName} <span className="text-xs text-text-muted">({log.houseNumber})</span></td>
                            <td className="px-6 py-4">
                                {log.status === 'ALLOWED' ? (
                                    <span className="flex items-center gap-1 text-success font-medium"><span className="material-symbols-outlined text-sm">check</span> Allowed</span>
                                ) : (
                                    <span className="flex items-center gap-1 text-error font-medium"><span className="material-symbols-outlined text-sm">close</span> Denied</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
              </table>
          </div>
      </div>
  );

  return (
    <Layout role={UserRole.ESTATE_ADMIN} title={view === 'residents' ? 'Resident Management' : view === 'logs' ? 'Access Logs' : 'Estate Dashboard'}>
        {view === 'dashboard' && <DashboardView />}
        {view === 'residents' && <ResidentsView />}
        {view === 'logs' && <LogsView />}

        {/* Resident Onboarding Wizard Overlay */}
        {showWizard && (
             <div className="fixed inset-0 bg-surface-alt/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl h-[90vh] bg-surface rounded-2xl shadow-2xl border border-border-light overflow-hidden flex flex-col md:flex-row relative animate-fade-in-up">
                    <button onClick={() => setShowWizard(false)} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white hover:bg-surface-highlight shadow-sm border border-border-light">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    
                    {/* Sidebar */}
                    <aside className="w-full md:w-80 bg-surface-alt/50 border-r border-border-light flex flex-col justify-between p-8">
                         <div className="flex flex-col gap-8">
                             <div>
                                 <h1 className="text-text-main text-xl font-bold font-display mb-1">Onboard Resident</h1>
                                 <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">Step 1 of 4</p>
                             </div>
                             <div className="flex flex-col gap-2 relative pl-1">
                                <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-border-light -z-10">
                                    <div className="h-1/4 w-full bg-gradient-to-b from-primary to-border-light"></div>
                                </div>
                                <div className="group flex items-center gap-4 p-3 -ml-3 rounded-xl bg-white border border-primary/10 shadow-soft cursor-pointer transition-all relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-primary"></div>
                                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled">person</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-text-main text-sm font-bold">Resident Identity</span>
                                        <span className="text-primary text-xs font-medium">In Progress</span>
                                    </div>
                                </div>
                                {/* Other steps purely visual for now */}
                                <div className="group flex items-center gap-4 p-3 -ml-3 rounded-xl opacity-50">
                                    <div className="size-10 rounded-full bg-white border border-border-light flex items-center justify-center text-text-secondary shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">home</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-text-secondary text-sm font-medium">Property Details</span>
                                    </div>
                                </div>
                             </div>
                         </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-1 flex flex-col bg-white">
                        <div className="flex justify-between items-start p-10 border-b border-dashed border-border-light/50">
                             <div className="flex flex-col gap-2 max-w-lg">
                                 <h2 className="text-text-main text-3xl font-bold font-display leading-tight tracking-tight">Let's start with the basics</h2>
                                 <p className="text-text-secondary text-sm leading-relaxed">Enter the resident's personal information. They will be able to update their photo later via the mobile app.</p>
                             </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-10 bg-gradient-soft">
                             <form onSubmit={handleAddResident} id="wizard-form" className="flex flex-col gap-8 max-w-3xl mx-auto">
                                 <div className="flex items-center gap-6 p-4 bg-white rounded-xl border border-border-light shadow-sm">
                                    <div className="size-20 rounded-full bg-surface-alt border-2 border-dashed border-border-light flex items-center justify-center">
                                        <span className="material-symbols-outlined text-text-secondary text-3xl">add_a_photo</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-text-main font-semibold">Profile Photo</p>
                                        <p className="text-text-secondary text-xs">Supports JPG, PNG. Max 5MB.</p>
                                    </div>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <label className="flex flex-col flex-1 gap-2">
                                         <p className="text-text-main text-sm font-semibold">Full Name</p>
                                         <input required className="w-full rounded-lg border border-border-light bg-white text-text-main h-12 px-4 shadow-sm" placeholder="e.g. Jonathan Doe" 
                                            value={wizardData.name} onChange={e => setWizardData({...wizardData, name: e.target.value})}
                                         />
                                     </label>
                                     <label className="flex flex-col flex-1 gap-2">
                                         <p className="text-text-main text-sm font-semibold">Email Address</p>
                                         <input required type="email" className="w-full rounded-lg border border-border-light bg-white text-text-main h-12 px-4 shadow-sm" placeholder="jonathan@example.com" 
                                            value={wizardData.email} onChange={e => setWizardData({...wizardData, email: e.target.value})}
                                         />
                                     </label>
                                     <label className="flex flex-col flex-1 gap-2 md:col-span-2">
                                         <p className="text-text-main text-sm font-semibold">House Number</p>
                                         <input required className="w-full rounded-lg border border-border-light bg-white text-text-main h-12 px-4 shadow-sm" placeholder="e.g. A-102" 
                                            value={wizardData.houseNumber} onChange={e => setWizardData({...wizardData, houseNumber: e.target.value})}
                                         />
                                     </label>
                                 </div>
                             </form>
                        </div>
                        <div className="p-8 border-t border-border-light bg-surface-highlight flex justify-between items-center">
                            <button onClick={() => setShowWizard(false)} className="px-6 h-12 rounded-lg text-text-secondary hover:text-text-main font-bold text-sm">Cancel</button>
                            <button form="wizard-form" type="submit" className="px-8 h-12 rounded-lg bg-gradient-primary text-white font-bold text-sm shadow-lg hover:shadow-primary/30 flex items-center gap-2">
                                Create Resident <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
             </div>
        )}
    </Layout>
  );
};