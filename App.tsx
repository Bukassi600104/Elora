import React, { useEffect, useState } from 'react';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { EstateAdminDashboard } from './pages/EstateAdminDashboard';
import { ResidentDashboard } from './pages/ResidentDashboard';
import { GuardDashboard } from './pages/GuardDashboard';
import { store } from './services/store';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [user, setUser] = useState(store.getCurrentUser());

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      setUser(store.getCurrentUser());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Public Routes (Unauthenticated)
  if (!user) {
    if (route === '#/login') {
      return <Login />;
    }
    // Default to Landing page
    return <Landing />;
  }

  // Protected Routes (Authenticated)
  // Route matching mostly by prefix to handle sub-routes like /estate-admin/logs
  if (route.startsWith('#/super-admin')) {
    return <SuperAdminDashboard />;
  }
  if (route.startsWith('#/estate-admin')) {
    return <EstateAdminDashboard />;
  }
  if (route.startsWith('#/resident')) {
    return <ResidentDashboard />;
  }
  if (route.startsWith('#/guard')) {
    return <GuardDashboard />;
  }

  // Fallback to Dashboard/Home if logged in but unknown route
  // We can redirect based on role or just show default Dashboard logic
  if (user.role === 'SUPER_ADMIN') return <SuperAdminDashboard />;
  if (user.role === 'ESTATE_ADMIN') return <EstateAdminDashboard />;
  if (user.role === 'RESIDENT') return <ResidentDashboard />;
  if (user.role === 'GUARD') return <GuardDashboard />;

  return <Login />;
};

export default App;