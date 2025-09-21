import React from 'react';
import Dashboard from './Dashboard'; // 👈 Import your actual Dashboard component

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Creative Upaay</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: "🏠", label: "Home", active: true },
            { icon: "📋", label: "Tasks" },
            { icon: "👥", label: "Members" },
            { icon: "📂", label: "Projects" },
            { icon: "📊", label: "Reports" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                item.active
                  ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3">
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tasks..."
                className="bg-transparent ml-2 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
              SU
            </div>
          </div>
        </header>

        {/* Dashboard Content — YOUR ACTUAL DASHBOARD */}
        <main className="flex-1 overflow-auto p-6">
          <Dashboard /> {/* 👈 This renders your Kanban board */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;