import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JoinGrid from './components/JoinGrid';
import AuthPanel from './components/AuthPanel';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function App() {
  const [section, setSection] = useState('home');
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [selectedRole, setSelectedRole] = useState('vendor');

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${t}` }})
        .then(r => r.ok ? r.json() : null)
        .then(u => { if (u) { setAuthed(true); setUser(u); setToken(t); } })
        .catch(() => {});
    }
  }, []);

  const handleAuthed = (u, t) => {
    setAuthed(true); setUser(u); setToken(t); setSection('dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthed(false); setUser(null); setToken(''); setSection('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar onNavigate={setSection} authed={authed} user={user} onLogout={logout} />
      <main className="pt-16">
        {section === 'home' && (
          <>
            <Hero />
            <JoinGrid onSelect={(role) => { setSelectedRole(role); setSection('auth'); }} />
          </>
        )}
        {section === 'auth' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <AuthPanel onAuthed={handleAuthed} defaultRole={selectedRole} />
          </div>
        )}
        {section === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
            <p className="text-gray-600 mt-2">Your role: <span className="capitalize font-medium">{user?.role}</span></p>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border bg-white">
                <div className="text-sm text-gray-600">Quick Links</div>
                <ul className="list-disc list-inside mt-2 text-sm">
                  <li>Post a product (vendors)</li>
                  <li>Create a requirement (buyers)</li>
                  <li>Explore projects (investors)</li>
                  <li>View jobs</li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl border bg-white">
                <div className="text-sm text-gray-600">Status</div>
                <div className="mt-2 text-3xl font-semibold">Active</div>
              </div>
              <div className="p-5 rounded-2xl border bg-white">
                <div className="text-sm text-gray-600">Notifications</div>
                <div className="mt-2 text-sm text-gray-700">No new notifications</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
