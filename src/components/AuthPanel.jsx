import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function AuthPanel({ onAuthed }) {
  const [mode, setMode] = useState('signup');
  const [role, setRole] = useState('vendor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = mode === 'signup' ? `${API}/auth/signup` : `${API}/auth/login`;
      const body = mode === 'signup' ? { name, email, password, role } : { email, password };
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error((await res.json()).detail || 'Request failed');
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      onAuthed(data.user, data.access_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border">
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('signup')} className={`px-3 py-1.5 rounded ${mode==='signup'?'bg-gray-900 text-white':'bg-gray-100'}`}>Sign Up</button>
        <button onClick={() => setMode('login')} className={`px-3 py-1.5 rounded ${mode==='login'?'bg-gray-900 text-white':'bg-gray-100'}`}>Login</button>
      </div>
      <form onSubmit={submit} className="space-y-3 w-full sm:w-[360px]">
        {mode === 'signup' && (
          <>
            <div>
              <label className="block text-sm text-gray-700">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full rounded border px-3 py-2">
                <option value="vendor">Manufacturer</option>
                <option value="buyer">Buyer</option>
                <option value="investor">Investor</option>
                <option value="employee">Job Seeker</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button disabled={loading} className="w-full px-4 py-2 rounded bg-indigo-600 text-white">{loading ? 'Please wait...' : (mode==='signup'?'Create account':'Sign in')}</button>
      </form>
    </div>
  );
}
