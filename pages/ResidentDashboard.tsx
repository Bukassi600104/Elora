import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { UserRole, PassCode, PassCodeType } from '../types';
import { store } from '../services/store';
import { formatDate } from '../constants';

export const ResidentDashboard: React.FC = () => {
  const currentUser = store.getCurrentUser();
  const [codes, setCodes] = useState<PassCode[]>([]);
  const [authorizedPhones, setAuthorizedPhones] = useState(currentUser?.authorizedPhones || []);
  const [view, setView] = useState<'codes' | 'phones'>('codes');

  // Modal States
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  
  // Forms
  const [codeForm, setCodeForm] = useState({ guestName: '', type: PassCodeType.GUEST });
  const [phoneForm, setPhoneForm] = useState({ name: '', number: '' });

  useEffect(() => {
    if (currentUser) {
        setCodes(store.getCodesByResident(currentUser.id));
        setAuthorizedPhones(currentUser.authorizedPhones || []);
    }
    
    const hash = window.location.hash;
    if (hash.includes('/phones')) setView('phones');
    else setView('codes');
  }, [currentUser, window.location.hash]);

  const handleGenerateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if(currentUser) {
        store.generateCode(currentUser.id, codeForm.type, codeForm.guestName);
        setCodes(store.getCodesByResident(currentUser.id));
        setShowCodeModal(false);
        setCodeForm({ guestName: '', type: PassCodeType.GUEST });
    }
  };

  const handleAddPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if(currentUser) {
        try {
            store.addAuthorizedPhone(currentUser.id, {
                id: `ph-${Date.now()}`,
                name: phoneForm.name,
                number: phoneForm.number,
                status: 'PENDING'
            });
            const updatedUser = store.getCurrentUser();
            setAuthorizedPhones(updatedUser?.authorizedPhones || []);
            setShowPhoneModal(false);
            setPhoneForm({ name: '', number: '' });
        } catch (err: any) {
            alert(err.message);
        }
    }
  };

  const DashboardView = () => (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-text-main">
                    Welcome Home, <span className="text-primary">{currentUser?.houseNumber}</span>
                </h1>
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary bg-white shadow-sm w-fit px-4 py-2 rounded-full border border-border-light">
                    <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                    </div>
                    <p>Security Status: <span className="text-success font-bold">Secure</span> • All Systems Nominal</p>
                </div>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl h-11 px-6 bg-error/5 text-error border border-error/20 hover:bg-error/10 hover:shadow-lg transition-all font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">emergency_home</span>
                <span>Emergency Contact</span>
            </button>
        </header>

        {/* Quick Actions */}
        <section>
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-warning/10 text-warning ring-1 ring-warning/20">
                    <span className="material-symbols-outlined text-[20px] block">bolt</span>
                </div>
                <h2 className="text-xl font-bold text-text-main">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Guest Pass Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-xl hover:shadow-primary/10 transition-all border border-border-light">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex flex-col sm:flex-row h-full">
                         <div className="w-full sm:w-2/5 h-48 sm:h-auto bg-cover bg-center relative bg-slate-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-white/20">qr_code_2</span>
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                         </div>
                         <div className="p-8 flex flex-col justify-center flex-1 gap-6 z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-text-main group-hover:text-primary transition-colors mb-2">New Guest Pass</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">Generate a temporary, single-use access code for visitors, delivery, or cabs.</p>
                            </div>
                            <button onClick={() => { setCodeForm(f => ({...f, type: PassCodeType.GUEST})); setShowCodeModal(true); }} className="mt-auto w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Generate Code
                            </button>
                         </div>
                    </div>
                </div>

                {/* Staff Pass Card */}
                 <div className="group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-xl hover:shadow-secondary/10 transition-all border border-border-light">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex flex-col sm:flex-row h-full">
                         <div className="w-full sm:w-2/5 h-48 sm:h-auto bg-cover bg-center relative bg-slate-800 flex items-center justify-center">
                             <span className="material-symbols-outlined text-6xl text-white/20">badge</span>
                            <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay"></div>
                         </div>
                         <div className="p-8 flex flex-col justify-center flex-1 gap-6 z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-text-main group-hover:text-secondary transition-colors mb-2">New Staff Pass</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">Manage recurring access schedules for domestic help, maintenance, or contractors.</p>
                            </div>
                            <button onClick={() => { setCodeForm(f => ({...f, type: PassCodeType.DOMESTIC})); setShowCodeModal(true); }} className="mt-auto w-full sm:w-auto bg-text-main hover:bg-black text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-text-main/20 hover:-translate-y-0.5">
                                <span className="material-symbols-outlined text-[20px]">person_add</span>
                                Manage Staff
                            </button>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Active Passes */}
        <section>
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10 text-success ring-1 ring-success/20">
                        <span className="material-symbols-outlined text-[20px] block">timer</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-main">Active Passes</h2>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {codes.filter(c => Date.now() < c.expiresAt && (!c.isUsed || c.type === PassCodeType.DOMESTIC)).map(code => (
                    <div key={code.id} className="relative bg-white rounded-2xl p-6 shadow-soft border border-border-light hover:border-primary/30 transition-colors group">
                        <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full shadow-[0_0_10px_rgba(0,0,0,0.1)] ${code.type === PassCodeType.GUEST ? 'bg-primary' : 'bg-secondary'}`}></div>
                        <div className="flex justify-between items-start mb-4 pl-3">
                            <div>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide mb-2 border ${
                                    code.type === PassCodeType.GUEST ? 'bg-primary/5 text-primary border-primary/10' : 'bg-secondary/5 text-secondary border-secondary/10'
                                }`}>
                                    {code.type === PassCodeType.GUEST ? 'Single Use' : 'Recurring'}
                                </span>
                                <h4 className="text-lg font-bold text-text-main truncate w-32 md:w-auto">{code.guestName}</h4>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-text-secondary font-medium">Expires</p>
                                <p className="text-sm font-mono font-bold text-text-main">{new Date(code.expiresAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-surface-alt rounded-xl p-3 border border-border-light ml-3">
                            <span className="text-3xl font-mono font-black tracking-widest text-text-main">{code.code}</span>
                            <div className="flex gap-1">
                                <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-primary transition-all shadow-sm hover:shadow" title="Share">
                                    <span className="material-symbols-outlined text-[20px]">share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {codes.filter(c => Date.now() < c.expiresAt && (!c.isUsed || c.type === PassCodeType.DOMESTIC)).length === 0 && (
                     <div className="col-span-full py-12 text-center text-text-secondary bg-surface-alt/50 rounded-2xl border border-dashed border-border-light">
                         <span className="material-symbols-outlined text-4xl mb-2 opacity-50">qr_code_2</span>
                         <p>No active passes at the moment.</p>
                     </div>
                )}
            </div>
        </section>
    </div>
  );

  const PhonesView = () => (
      <div className="max-w-[800px] mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-main">Authorized Phone Numbers</h3>
            <button 
                onClick={() => setShowPhoneModal(true)} 
                disabled={authorizedPhones.length >= 2}
                className={`text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition ${
                    authorizedPhones.length >= 2 ? 'bg-text-secondary cursor-not-allowed' : 'bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30'
                }`}
            >
                <span className="material-symbols-outlined text-[18px]">add</span> Add Number
            </button>
        </div>

        <div className="bg-white rounded-xl border border-border-light overflow-hidden shadow-sm">
            {authorizedPhones.length === 0 ? (
                 <div className="text-center py-12 text-text-secondary">
                    <span className="material-symbols-outlined text-4xl mb-4 opacity-50">phonelink_setup</span>
                    <p>No authorized numbers added.</p>
                    <p className="text-xs mt-2">Add up to 2 numbers that can generate codes on your behalf.</p>
                </div>
            ) : (
                <div className="divide-y divide-border-light">
                    {authorizedPhones.map(phone => (
                        <div key={phone.id} className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-surface-alt flex items-center justify-center text-text-secondary border border-border-light">
                                    <span className="material-symbols-outlined text-[20px]">smartphone</span>
                                </div>
                                <div>
                                    <p className="font-bold text-text-main">{phone.name}</p>
                                    <p className="text-text-secondary font-mono">{phone.number}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    phone.status === 'APPROVED' ? 'bg-success/10 text-success' :
                                    phone.status === 'REJECTED' ? 'bg-error/10 text-error' :
                                    'bg-warning/10 text-warning'
                                }`}>
                                    {phone.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
  );

  return (
    <Layout role={UserRole.RESIDENT} title={view === 'codes' ? 'Resident Portal' : 'Authorized Phones'}>
        {view === 'codes' && <DashboardView />}
        {view === 'phones' && <PhonesView />}

        {showCodeModal && (
             <div className="fixed inset-0 bg-surface-alt/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-border-light">
                    <h3 className="text-xl font-bold mb-4 font-display text-text-main">
                        Generate {codeForm.type === PassCodeType.GUEST ? 'Guest' : 'Staff'} Code
                    </h3>
                    <form onSubmit={handleGenerateCode} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-1">Visitor Name</label>
                            <input required className="w-full border border-border-light rounded-lg px-3 py-2 bg-surface-alt focus:bg-white transition-colors"
                                value={codeForm.guestName} onChange={e => setCodeForm({...codeForm, guestName: e.target.value})} />
                        </div>
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                            <div className="flex gap-2 text-sm text-text-secondary">
                                <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                                <p>{codeForm.type === PassCodeType.GUEST 
                                    ? "This code will expire in 6 hours or immediately after use." 
                                    : "This code will remain valid for 6 months."}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button type="button" onClick={() => setShowCodeModal(false)} className="px-4 py-2 text-text-secondary hover:bg-surface-alt rounded-lg font-medium">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20">Generate Code</button>
                        </div>
                    </form>
                </div>
             </div>
        )}

        {showPhoneModal && (
             <div className="fixed inset-0 bg-surface-alt/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-border-light">
                    <h3 className="text-xl font-bold mb-4 font-display text-text-main">Add Authorized Phone</h3>
                    <form onSubmit={handleAddPhone} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-1">Owner Name</label>
                            <input required className="w-full border border-border-light rounded-lg px-3 py-2 bg-surface-alt focus:bg-white transition-colors"
                                placeholder="e.g. Spouse"
                                value={phoneForm.name} onChange={e => setPhoneForm({...phoneForm, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-1">Phone Number</label>
                            <input required type="tel" className="w-full border border-border-light rounded-lg px-3 py-2 bg-surface-alt focus:bg-white transition-colors"
                                placeholder="+1..."
                                value={phoneForm.number} onChange={e => setPhoneForm({...phoneForm, number: e.target.value})} />
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button type="button" onClick={() => setShowPhoneModal(false)} className="px-4 py-2 text-text-secondary hover:bg-surface-alt rounded-lg font-medium">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20">Add Number</button>
                        </div>
                    </form>
                </div>
             </div>
        )}
    </Layout>
  );
};