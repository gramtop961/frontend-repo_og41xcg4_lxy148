import { Factory, Building2, BriefcaseBusiness, LineChart } from "lucide-react";

const roles = [
  { key: 'vendor', title: 'Manufacturer', icon: Factory, desc: 'Register your company, list capabilities, and win tenders.' },
  { key: 'buyer', title: 'Corporate Buyer', icon: Building2, desc: 'Post procurement requirements and source verified vendors.' },
  { key: 'investor', title: 'Investor', icon: LineChart, desc: 'Invest in verified manufacturing projects with milestone tracking.' },
  { key: 'employee', title: 'Job Seeker', icon: BriefcaseBusiness, desc: 'Create a profile, apply to jobs, and grow your career.' },
];

export default function JoinGrid({ onSelect }) {
  return (
    <section id="join" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Join as</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map(({ key, title, icon: Icon, desc }) => (
            <button key={key} onClick={() => onSelect(key)} className="text-left p-5 rounded-2xl border hover:shadow transition bg-white">
              <Icon className="h-6 w-6 text-indigo-600" />
              <div className="mt-3 font-medium">{title}</div>
              <div className="text-sm text-gray-600 mt-1">{desc}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
