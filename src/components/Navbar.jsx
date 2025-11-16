import { Menu, Factory, BriefcaseBusiness, Building2, LineChart, User } from "lucide-react";

export default function Navbar({ onNavigate, authed, user, onLogout }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-400 grid place-items-center text-white font-bold">P</div>
          <span className="font-semibold">Proton</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <button onClick={() => onNavigate('home')} className="hover:text-gray-900">Home</button>
          <button onClick={() => onNavigate('stats')} className="hover:text-gray-900">Stats</button>
          <button onClick={() => onNavigate('testimonials')} className="hover:text-gray-900">Testimonials</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-gray-900">Contact</button>
        </nav>
        <div className="flex items-center gap-3">
          {authed ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-sm">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-xs capitalize">{user?.role}</span>
              </div>
              <button onClick={onLogout} className="text-sm text-gray-700 hover:text-gray-900">Logout</button>
            </div>
          ) : (
            <button onClick={() => onNavigate('auth')} className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm">Sign in</button>
          )}
          <button className="md:hidden p-2 rounded-lg border"><Menu className="h-4 w-4" /></button>
        </div>
      </div>
    </header>
  );
}
