import React, { useState } from 'react';
import { store } from '../services/store';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign Up specific fields
  const [fullName, setFullName] = useState('');
  const [estateName, setEstateName] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
        const user = store.login(email);
        if (user) {
            window.location.hash = getDashboardRoute(user.role);
            window.location.reload();
        } else {
            setError("User not found. Please check credentials or sign up.");
        }
    } else {
        // Sign Up Logic
        if (fullName && email && estateName) {
            // Create new Estate and Admin
            store.createEstate(estateName, "123 New Estate Blvd", fullName, email);
            const user = store.login(email);
            if (user) {
                window.location.hash = '/estate-admin';
                window.location.reload();
            }
        } else {
            setError("Please fill in all fields.");
        }
    }
  };

  const getDashboardRoute = (role: UserRole) => {
      switch(role) {
        case UserRole.SUPER_ADMIN: return '/super-admin';
        case UserRole.ESTATE_ADMIN: return '/estate-admin';
        case UserRole.RESIDENT: return '/resident';
        case UserRole.GUARD: return '/guard';
        default: return '/';
      }
  };

  const handleDemoFill = (demoEmail: string) => {
      setEmail(demoEmail);
      setPassword('password');
  };

  const handleBackToHome = (e: React.MouseEvent) => {
      e.preventDefault();
      window.location.hash = '';
  };

  return (
    <div className="font-display bg-white text-slate-900 antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden">
        <div className="relative min-h-screen flex flex-col lg:flex-row w-full">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between px-6 py-8 lg:px-12 xl:px-24 bg-white relative z-10">
                <a onClick={handleBackToHome} href="#" className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary border border-primary/5 shadow-sm group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-2xl">security</span>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold leading-none tracking-tight text-slate-900">Basic Security</h2>
                        <span className="text-xs font-semibold text-primary/80 tracking-wide uppercase">Admin Portal</span>
                    </div>
                </a>

                <div className="w-full max-w-[420px] mx-auto py-12 lg:py-0">
                    <a onClick={handleBackToHome} href="#" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-6 group">
                        <span className="material-symbols-outlined text-lg mr-1 transition-transform group-hover:-translate-x-1">arrow_back</span>
                        Back to Home
                    </a>

                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 text-slate-900">
                            {isLogin ? "Welcome Back" : "Get Started"}
                        </h1>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            {isLogin ? "Enter your credentials to access the estate dashboard." : "Create your estate admin account in seconds."}
                        </p>
                    </div>

                    <div className="bg-surface-light p-1.5 rounded-xl flex mb-8 border border-slate-100">
                        <button 
                            onClick={() => { setIsLogin(true); setError(null); }}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white shadow-sm border border-slate-200/60 text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        >
                            Log In
                        </button>
                        <button 
                            onClick={() => { setIsLogin(false); setError(null); }}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white shadow-sm border border-slate-200/60 text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {!isLogin && (
                             <div className="space-y-2 animate-fade-in-up">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">person</span>
                                    </div>
                                    <input required={!isLogin} value={fullName} onChange={e => setFullName(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-surface-light border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all shadow-sm" placeholder="John Doe" />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                             <div className="space-y-2 animate-fade-in-up">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Estate Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">domain</span>
                                    </div>
                                    <input required={!isLogin} value={estateName} onChange={e => setEstateName(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-surface-light border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all shadow-sm" placeholder="Green Valley Estate" />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="email">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">mail</span>
                                </div>
                                <input required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-surface-light border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all shadow-sm" id="email" placeholder="name@company.com" type="email"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
                                {isLogin && <a className="text-xs font-bold text-primary hover:text-accent transition-colors" href="#">Forgot Password?</a>}
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                                <input required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-11 py-3.5 bg-surface-light border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all shadow-sm" id="password" placeholder="••••••••" type="password"/>
                                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary cursor-pointer transition-colors" type="button">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm font-medium ml-1">{error}</p>}

                        {isLogin && (
                            <div className="flex items-center gap-3 ml-1">
                                <div className="flex items-center h-5">
                                    <input className="w-4 h-4 border border-slate-300 rounded bg-slate-50 focus:ring-offset-0 focus:ring-2 focus:ring-primary text-primary transition-all cursor-pointer" id="remember" type="checkbox"/>
                                </div>
                                <label className="text-sm font-medium text-slate-600 select-none cursor-pointer" htmlFor="remember">Remember this device</label>
                            </div>
                        )}

                        <button className="group w-full py-4 px-4 btn-gradient text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 mt-2">
                            <span>{isLogin ? "Access Dashboard" : "Create Account"}</span>
                            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </button>
                    </form>
                    
                    {/* Demo Hints for User Convenience */}
                    {isLogin && (
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Demo Access</p>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => handleDemoFill('super@basic.com')} className="text-xs text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 font-medium transition">Super Admin</button>
                                <button onClick={() => handleDemoFill('admin@royalpalms.com')} className="text-xs text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 font-medium transition">Estate Admin</button>
                                <button onClick={() => handleDemoFill('john@royalpalms.com')} className="text-xs text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 font-medium transition">Resident</button>
                                <button onClick={() => handleDemoFill('guard@royalpalms.com')} className="text-xs text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 font-medium transition">Guard</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-slate-400 border-t border-slate-100 pt-6 mt-4">
                    <p>© 2024 Basic Security Systems</p>
                    <div className="flex gap-4">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Contact Support</a>
                    </div>
                </div>
            </div>

            {/* Right Hero */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVnzlb7ib_VosEZDRiRQFypjuzquD08ATedHeVJOdNJegKgeylzK66L8g2cKl7ODpDQ0uD06X04jR-iTGfWdbQcnaj_qITieUgPPK0hyBFGKU9EtkascFjev5_CDlPCusa9xQEISpDMIZ0Md5zrpnJzbEr2u_yJEW2b1qPB7zN2GNEt5uMqMYZ5gRYxcQ5E7HWukDiVBPN6VMUpeczVGTAjHOsMsQnj7IKEme2v-bYxRrO1s7FvbMu8jxAf_YwLR6JVqfzZhNX3IM")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-indigo-900/85 to-slate-900/95 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                
                <div className="relative z-10 flex flex-col justify-end h-full p-12 xl:p-24 w-full text-white">
                    <div className="space-y-8 max-w-lg">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/10 backdrop-blur-md shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                            </span>
                            <span className="text-xs font-semibold tracking-wide text-white">System Operational</span>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl xl:text-5xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/70">
                                Secure Your Estate with Intelligent Control.
                            </h2>
                            <p className="text-lg text-indigo-100/80 leading-relaxed font-light">
                                Manage guests, residents, and staff with enterprise-grade security protocols. 
                                Real-time monitoring and seamless access control.
                            </p>
                        </div>
                        <div className="pt-8 flex gap-10 border-t border-white/10">
                            <div>
                                <p className="text-3xl font-bold text-white tracking-tight">99.9%</p>
                                <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider mt-1">Uptime</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white tracking-tight">24/7</p>
                                <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider mt-1">Monitoring</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white tracking-tight">ISO</p>
                                <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider mt-1">Certified</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};