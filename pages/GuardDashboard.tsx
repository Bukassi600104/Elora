import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { UserRole, PassCode } from '../types';
import { store } from '../services/store';

export const GuardDashboard: React.FC = () => {
  const currentUser = store.getCurrentUser();
  const estateId = currentUser?.estateId || '';

  const [inputCode, setInputCode] = useState('');
  const [validationResult, setValidationResult] = useState<{valid: boolean; message: string; passCode?: PassCode} | null>(null);

  const handleValidate = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputCode) return;
      
      const result = store.validateCode(inputCode, estateId);
      setValidationResult(result);
  };

  const handleAction = (status: 'ALLOWED' | 'DENIED') => {
      if (validationResult?.passCode) {
          store.confirmAccess(validationResult.passCode.id, status);
          setInputCode('');
          setValidationResult(null);
      }
  };

  return (
    <Layout role={UserRole.GUARD} title="Access Control">
      <div className="w-full h-full min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        {/* Left Side: Keypad */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 relative overflow-y-auto bg-surface-alt">
             {/* Background decoration */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-xl z-10 flex flex-col gap-10">
                {!validationResult ? (
                    <>
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-end border-b border-border-light pb-4">
                                <div>
                                    <h1 className="text-2xl font-extrabold text-text-main tracking-tight mb-1">Validate Entry</h1>
                                    <p className="text-text-secondary text-sm">Enter the 6-digit visitor code below</p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success border border-success/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wide">System Active</span>
                                </div>
                            </div>
                            
                            <form onSubmit={handleValidate} className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500"></div>
                                <div className="relative bg-surface rounded-2xl shadow-soft p-2 flex items-center border border-border-light group-focus-within:border-primary/50 transition-colors">
                                    <div className="pl-6 flex items-center justify-center text-text-secondary">
                                        <span className="material-symbols-outlined text-[32px]">dialpad</span>
                                    </div>
                                    <input 
                                        autocomplete="off" 
                                        autofocus 
                                        className="w-full bg-transparent border-none text-text-main rounded-xl py-6 pl-6 pr-40 text-4xl md:text-5xl font-black tracking-[0.25em] focus:ring-0 placeholder:text-border-light transition-colors uppercase font-mono" 
                                        id="access-code" 
                                        maxLength={6} 
                                        placeholder="______" 
                                        type="text"
                                        value={inputCode}
                                        onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
                                    />
                                    <div className="absolute inset-y-2 right-2">
                                        <button disabled={inputCode.length < 6} className="h-full px-8 bg-gradient-to-r from-primary to-primary-hover disabled:from-text-secondary disabled:to-text-secondary disabled:opacity-30 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 flex items-center gap-2 transform active:scale-95">
                                            <span>VERIFY</span>
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            
                            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10 text-primary text-sm">
                                <span className="material-symbols-outlined text-lg mt-0.5">info</span>
                                <p>For security, please verify the resident name and photo ID match the visitor before granting access.</p>
                            </div>
                        </div>

                        {/* Recent Scans (Mock UI for now, could connect to logs) */}
                        <div className="mt-4">
                            <h3 className="text-text-secondary text-xs font-bold tracking-widest uppercase mb-4 pl-1">Recent Scans</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border-light opacity-50">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-full flex items-center justify-center bg-success/10 text-success">
                                            <span className="material-symbols-outlined">check</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-main">Previous Entry</p>
                                            <p className="text-xs text-text-secondary font-medium">Logged</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full bg-surface rounded-3xl shadow-2xl p-8 border border-border-light animate-fade-in-up text-center">
                        <div className={`inline-flex items-center justify-center size-24 rounded-full mb-6 border-4 ${
                            validationResult.valid ? 'bg-success border-success-light text-white' : 'bg-error border-red-100 text-white'
                        }`}>
                             <span className="material-symbols-outlined text-[48px]">{validationResult.valid ? 'check' : 'close'}</span>
                        </div>
                        
                        <h2 className={`text-3xl font-black tracking-tight mb-2 ${validationResult.valid ? 'text-success' : 'text-error'}`}>
                            {validationResult.message}
                        </h2>
                        
                        <p className="text-text-secondary mb-8">
                            {validationResult.valid ? 'Code verified successfully.' : 'This code is invalid or expired.'}
                        </p>

                        {!validationResult.valid && (
                            <button onClick={() => { setInputCode(''); setValidationResult(null); }} className="w-full py-4 rounded-xl bg-text-main text-white font-bold text-lg hover:bg-black transition-colors">
                                Try Again
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Right Side: Validation Result Card */}
        <div className="lg:col-span-5 bg-surface border-l border-border-light flex flex-col h-full shadow-2xl shadow-text-main/10 z-20">
            <div className="p-8 pb-4">
                <h3 className="text-text-main text-xl font-bold">Validation Result</h3>
                <p className="text-text-secondary text-sm mt-1">Live details for current scan.</p>
            </div>
            
            <div className="flex-1 p-8 pt-2 overflow-y-auto">
                {validationResult?.valid && validationResult.passCode ? (
                    <div className="flex flex-col gap-6 animate-fade-in-up">
                        <div className="relative overflow-hidden rounded-2xl shadow-glow bg-gradient-to-br from-success to-emerald-600 text-white p-6 transform transition-all duration-500">
                             <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        <span className="material-symbols-outlined text-base">verified_user</span>
                                        <span className="text-xs font-bold uppercase tracking-wider">Approved</span>
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-2xl">lock_open</span>
                                    </div>
                                </div>
                                <h2 className="text-3xl font-black mb-2 tracking-tight">ACCESS GRANTED</h2>
                                <p className="text-emerald-50 font-medium text-sm opacity-90">Code verified. Authorization valid.</p>
                            </div>
                        </div>

                        {/* Guest Details */}
                        <div className="bg-surface rounded-2xl border border-border-light overflow-hidden shadow-sm">
                            <div className="p-5">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-text-main font-bold text-2xl leading-none mb-2">{validationResult.passCode.guestName}</h3>
                                        <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                                            {validationResult.passCode.type} Visitor
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-border-light border-t border-border-light">
                                <div className="p-4 bg-surface-alt/50">
                                    <p className="text-text-secondary text-[10px] font-bold uppercase tracking-wider mb-2">Code Type</p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-text-secondary">confirmation_number</span>
                                        <p className="text-text-main font-bold text-sm">{validationResult.passCode.type}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-surface-alt/50">
                                    <p className="text-text-secondary text-[10px] font-bold uppercase tracking-wider mb-2">Expires At</p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-text-secondary">timer</span>
                                        <p className="text-text-main font-bold text-sm">{new Date(validationResult.passCode.expiresAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface rounded-2xl p-5 border border-border-light shadow-sm flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-2xl">home_pin</span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs font-bold uppercase">Destination</p>
                                    <p className="text-sm text-text-secondary">Resident ID: {validationResult.passCode.residentId}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-surface-alt/50 rounded-2xl border border-border-light mt-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => handleAction('DENIED')} className="py-3 px-4 rounded-xl border border-error/20 text-error hover:bg-error/5 font-bold text-sm transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">block</span>
                                    Deny Entry
                                </button>
                                <button onClick={() => handleAction('ALLOWED')} className="py-3 px-4 rounded-xl bg-text-main text-white hover:bg-black shadow-lg shadow-text-main/20 font-bold text-sm transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    Next Scan
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-text-secondary opacity-50">
                        <span className="material-symbols-outlined text-6xl mb-4">qr_code_scanner</span>
                        <p className="text-center text-sm font-medium">Ready to scan.<br/>Details will appear here.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </Layout>
  );
};