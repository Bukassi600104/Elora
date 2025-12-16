import React from 'react';
import { store } from '../services/store';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, role, title }) => {
  const handleLogout = () => {
    store.logout();
    window.location.hash = '/';
    window.location.reload();
  };

  const currentPath = window.location.hash;
  const user = store.getCurrentUser();

  const NavItem = ({ icon, label, path }: { icon: string, label: string, path: string }) => {
    const isActive = currentPath === path;
    return (
        <a 
            href={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                ? 'bg-primary/10 border border-primary/20 text-primary shadow-sm font-bold' 
                : 'text-text-secondary hover:bg-surface-highlight hover:text-text-main font-medium'
            }`}
        >
            <span className="material-symbols-outlined text-[24px]">{icon}</span>
            <span className="text-sm">{label}</span>
        </a>
    );
  };

  return (
    <div className="flex h-screen w-full bg-surface-alt font-display text-text-main overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-full bg-surface border-r border-border-light flex-shrink-0 z-20 shadow-sm transition-all">
        <div className="p-6 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow text-white">
                <span className="material-symbols-outlined text-[24px]">security</span>
            </div>
            <div>
                <h1 className="text-text-main text-lg font-bold leading-none tracking-tight">Basic Security</h1>
                <p className="text-text-secondary text-xs font-medium mt-1">{role.replace('_', ' ')} Portal</p>
            </div>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
            {role === UserRole.SUPER_ADMIN && (
                <NavItem icon="grid_view" label="Overview" path="#/super-admin" />
            )}

            {role === UserRole.ESTATE_ADMIN && (
                <>
                    <NavItem icon="grid_view" label="Dashboard" path="#/estate-admin" />
                    <NavItem icon="group" label="Residents" path="#/estate-admin/residents" />
                    <NavItem icon="list_alt" label="Access Logs" path="#/estate-admin/logs" />
                </>
            )}

            {role === UserRole.RESIDENT && (
                <>
                    <NavItem icon="dashboard" label="Dashboard" path="#/resident" />
                    <NavItem icon="badge" label="My Passes" path="#/resident" />
                    <NavItem icon="settings_phone" label="Authorized Phones" path="#/resident/phones" />
                </>
            )}

            {role === UserRole.GUARD && (
                 <NavItem icon="qr_code_scanner" label="Scanner" path="#/guard" />
            )}
            
            <div className="my-2 border-t border-border-light"></div>
            <a onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/5 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[24px]">logout</span>
                <span className="text-sm font-medium">Log Out</span>
            </a>
        </nav>

        <div className="p-4 border-t border-border-light">
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-surface-highlight border border-border-light flex items-center justify-center text-primary font-bold">
                    {user?.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-text-main truncate">{user?.name}</p>
                    <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-border-light bg-surface flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-2">
                 <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">security</span>
                </div>
                <span className="font-bold text-text-main">Basic Security</span>
            </div>
            <button onClick={handleLogout} className="text-text-secondary">
                <span className="material-symbols-outlined">logout</span>
            </button>
        </header>

        <div className="flex-1 overflow-y-auto bg-surface-alt relative scroll-smooth">
             {/* Gradient Background Effect */}
             <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/4"></div>
             </div>
             
             <div className="relative z-10 min-h-full flex flex-col">
                {children}
             </div>
        </div>
      </main>
    </div>
  );
};