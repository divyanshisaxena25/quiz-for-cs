import React, { useState, useEffect } from 'react';
import { 
  VisitorMetrics, 
  VisitorRecord, 
  VisitorQuizSummary,
  EmailNotificationLog,
  LoginHistoryEntry
} from '../types';
import { 
  fetchVisitorsData, 
  deleteVisitorRecord,
  sendAdminTestEmail
} from '../utils/visitorService';
import { 
  Users, 
  ArrowLeft, 
  RefreshCw, 
  Download, 
  Search, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Trash2, 
  Eye, 
  X, 
  SlidersHorizontal,
  Smartphone,
  Laptop,
  Flame,
  Award,
  Database,
  Mail,
  Send,
  History,
  AlertCircle
} from 'lucide-react';

interface DeveloperPortalProps {
  onBack: () => void;
  developerEmail?: string;
}

export const DeveloperPortal: React.FC<DeveloperPortalProps> = ({ onBack, developerEmail }) => {
  const [metrics, setMetrics] = useState<VisitorMetrics>({
    totalVisitors: 0,
    totalLogins: 0,
    googleCount: 0,
    linkedinCount: 0,
    totalQuizzesTaken: 0,
    averageScore: 0,
    activeToday: 0,
    totalEmailsSent: 0
  });
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailNotificationLog[]>([]);
  const [activeTab, setActiveTab] = useState<'roster' | 'emails' | 'database'>('roster');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'google' | 'linkedin'>('all');
  const [selectedVisitorForHistory, setSelectedVisitorForHistory] = useState<VisitorRecord | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());
  
  // Test email state
  const [testEmailInput, setTestEmailInput] = useState('divyanshisaxena245@gmail.com');
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState<string | null>(null);

  const loadData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const data = await fetchVisitorsData();
      setMetrics(data.metrics);
      setVisitors(data.visitors);
      if (data.emailLogs) setEmailLogs(data.emailLogs);
      setLastRefreshedAt(new Date());
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, []);

  // Auto-refresh interval if enabled
  useEffect(() => {
    if (!autoRefresh) return;
    const timer = setInterval(() => {
      loadData(false);
    }, 15000);
    return () => clearInterval(timer);
  }, [autoRefresh]);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Remove visitor record for "${name}" from the log and database?`)) {
      await deleteVisitorRecord(id);
      await loadData(false);
    }
  };

  const handleSendTestMail = async () => {
    if (!testEmailInput.trim()) return;
    setIsSendingTestEmail(true);
    setTestEmailStatus(null);
    try {
      const success = await sendAdminTestEmail(testEmailInput.trim(), 'Admin Tester');
      if (success) {
        setTestEmailStatus('Email notification dispatched successfully! Check inbox / spam.');
        await loadData(false);
      } else {
        setTestEmailStatus('Simulation logged in sent emails list.');
      }
    } catch (e) {
      setTestEmailStatus('Failed to send test email.');
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  const handleExportCSV = () => {
    if (visitors.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Provider', 'First Login', 'Last Active', 'Logins Count', 'Quizzes Taken', 'Avg Score %', 'Device'];
    const rows = visitors.map(v => [
      v.id,
      `"${v.name.replace(/"/g, '""')}"`,
      `"${v.email}"`,
      v.provider,
      v.firstLoginAt,
      v.lastActiveAt,
      v.loginCount,
      v.quizzesAttempted,
      v.averageScore || 0,
      `"${v.deviceInfo || 'Browser'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quizmaster-visitor-log-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ metrics, visitors, emailLogs }, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `quizmaster-full-database-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter visitors
  const filteredVisitors = visitors.filter(v => {
    const matchesSearch = 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = 
      providerFilter === 'all' || v.provider === providerFilter;
    return matchesSearch && matchesProvider;
  });

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center space-x-2 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Quiz</span>
            </button>
            <div className="h-6 w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Developer & Admin Portal
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Telemetry</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Database className="w-3 h-3 text-blue-400" />
                  <span>Firestore Sync</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                User accounts database, login history, and automated login security emails
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{lastRefreshedAt.toLocaleTimeString()}</span>
            </div>

            <button
              type="button"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center space-x-1.5 ${
                autoRefresh 
                  ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
              }`}
              title="Toggle 15-second automatic telemetry polling"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Auto (15s)' : 'Manual'}</span>
            </button>

            <button
              type="button"
              onClick={() => loadData(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
              title="Refresh Data Now"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md shadow-blue-500/20 flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {/* Card 1: Total Visitors */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Saved Users</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.totalVisitors}</span>
              <p className="text-[11px] text-slate-400 mt-1">In Database</p>
            </div>
          </div>

          {/* Card 2: Total Logins */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Sign-in Events</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.totalLogins}</span>
              <p className="text-[11px] text-slate-400 mt-1">Recorded History</p>
            </div>
          </div>

          {/* Card 3: Emails Sent */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Login Emails</span>
              <Mail className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{emailLogs.length}</span>
              <p className="text-[11px] text-indigo-400/80 mt-1">Sent to Gmail</p>
            </div>
          </div>

          {/* Card 4: Google Logins */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Google Accounts</span>
              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center">G</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.googleCount}</span>
              <p className="text-[11px] text-blue-400/80 mt-1">Gmail identities</p>
            </div>
          </div>

          {/* Card 5: LinkedIn Logins */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>LinkedIn</span>
              <span className="w-4 h-4 rounded-xs bg-[#0077B5]/30 text-[#0077B5] text-[10px] font-bold flex items-center justify-center">in</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.linkedinCount}</span>
              <p className="text-[11px] text-[#0077B5] mt-1">Professional</p>
            </div>
          </div>

          {/* Card 6: Quizzes Taken */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Tests Completed</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.totalQuizzesTaken}</span>
              <p className="text-[11px] text-emerald-400/80 mt-1">Quiz attempts</p>
            </div>
          </div>

          {/* Card 7: Average Score */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Cohort Avg</span>
              <span className="text-xs font-bold text-purple-400">%</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {metrics.averageScore > 0 ? `${metrics.averageScore}%` : '--'}
              </span>
              <p className="text-[11px] text-purple-400/80 mt-1">Avg score</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Live Dispatch Test */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab('roster')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'roster'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Database & History ({filteredVisitors.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('emails')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'emails'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Sent Login Emails ({emailLogs.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('database')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Firebase Schema & Raw JSON</span>
            </button>
          </div>

          {/* Quick Mail Test Input */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <input
              type="email"
              value={testEmailInput}
              onChange={(e) => setTestEmailInput(e.target.value)}
              placeholder="Enter email to test dispatch..."
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 w-full sm:w-64"
            />
            <button
              type="button"
              onClick={handleSendTestMail}
              disabled={isSendingTestEmail}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center space-x-1.5 disabled:opacity-50 shrink-0 cursor-pointer"
            >
              <Send className={`w-3.5 h-3.5 ${isSendingTestEmail ? 'animate-spin' : ''}`} />
              <span>{isSendingTestEmail ? 'Sending...' : 'Test Mail'}</span>
            </button>
          </div>
        </div>

        {testEmailStatus && (
          <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-700/50 text-indigo-300 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{testEmailStatus}</span>
            </div>
            <button
              type="button"
              onClick={() => setTestEmailStatus(null)}
              className="text-indigo-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* TAB 1: USER ROSTER & HISTORY */}
        {activeTab === 'roster' && (
          <div className="space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or device..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                <span className="text-xs text-slate-400 flex items-center space-x-1.5 mr-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filter:</span>
                </span>

                {(['all', 'google', 'linkedin'] as const).map(provider => (
                  <button
                    key={provider}
                    type="button"
                    onClick={() => setProviderFilter(provider)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition cursor-pointer ${
                      providerFilter === provider
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {provider === 'all' ? 'All Providers' : provider}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-blue-400" />
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    Registered Google & LinkedIn Users ({filteredVisitors.length})
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span>Owner & Developer:</span>
                  <span className="font-semibold text-blue-400">{developerEmail || 'divyanshisaxena245@gmail.com'}</span>
                </div>
              </div>

              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                  <p className="text-xs text-slate-400">Fetching live database records...</p>
                </div>
              ) : filteredVisitors.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Users className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">No visitors found matching filter</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Once a user signs in with Google, their history and email alert will automatically be saved and displayed here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800/80 bg-slate-900/50 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        <th className="py-3 px-5">User & Google Account</th>
                        <th className="py-3 px-4">Provider</th>
                        <th className="py-3 px-4">First Sign-In</th>
                        <th className="py-3 px-4">Last Active</th>
                        <th className="py-3 px-4 text-center">Sessions</th>
                        <th className="py-3 px-4 text-center">Tests Taken</th>
                        <th className="py-3 px-4">Avg Score</th>
                        <th className="py-3 px-4">Client Device</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300 font-normal">
                      {filteredVisitors.map((visitor) => (
                        <tr 
                          key={visitor.id} 
                          className="hover:bg-slate-900/40 transition group"
                        >
                          {/* Name & Email */}
                          <td className="py-3.5 px-5">
                            <div className="flex items-center space-x-3">
                              <img
                                src={visitor.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(visitor.name)}`}
                                alt={visitor.name}
                                className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="font-bold text-white truncate group-hover:text-blue-400 transition">
                                  {visitor.name}
                                </p>
                                <p className="text-[11px] text-slate-400 font-mono truncate">
                                  {visitor.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Provider Badge */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {visitor.provider === 'google' ? (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-semibold">
                                <span className="w-3 h-3 flex items-center justify-center font-bold text-xs">G</span>
                                <span>Google</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#0077B5]/20 border border-[#0077B5]/40 text-[#40b1e8] text-[11px] font-semibold">
                                <span className="font-bold text-xs">in</span>
                                <span>LinkedIn</span>
                              </span>
                            )}
                          </td>

                          {/* First Seen */}
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                            {new Date(visitor.firstLoginAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>

                          {/* Last Active */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center space-x-1.5 text-slate-300 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>{formatRelativeTime(visitor.lastActiveAt)}</span>
                            </span>
                          </td>

                          {/* Login Count */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                              {visitor.loginCount || 1} logins
                            </span>
                          </td>

                          {/* Tests Taken */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                              visitor.quizzesAttempted > 0 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                : 'bg-slate-800/80 text-slate-500'
                            }`}>
                              {visitor.quizzesAttempted}
                            </span>
                          </td>

                          {/* Average Score */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {visitor.averageScore ? (
                              <div className="flex items-center space-x-2">
                                <span className={`font-bold text-xs ${
                                  visitor.averageScore >= 80 
                                    ? 'text-emerald-400' 
                                    : visitor.averageScore >= 60 
                                    ? 'text-blue-400' 
                                    : 'text-amber-400'
                                }`}>
                                  {visitor.averageScore}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-600 text-xs">No exams</span>
                            )}
                          </td>

                          {/* Device info */}
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                            {visitor.deviceInfo || 'Browser'}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                type="button"
                                onClick={() => setSelectedVisitorForHistory(visitor)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center space-x-1"
                                title="Inspect Complete User History & Quizzes"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span className="text-[11px]">History</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(visitor.id, visitor.name)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                                title="Delete User from Database"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SENT LOGIN EMAILS LOG */}
        {activeTab === 'emails' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-indigo-200 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>Automatic Login Email Notifications System</span>
                </h3>
                <p className="text-xs text-indigo-300/80 mt-1">
                  Whenever any student or user signs in using their Gmail or LinkedIn account, QuizMaster automatically generates and delivers a security confirmation email to their address detailing their sign-in time, device information, and quiz progress.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Dispatched Emails Audit ({emailLogs.length})</h3>
                <span className="text-xs text-slate-400">Delivered via Nodemailer Service</span>
              </div>

              {emailLogs.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Mail className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">No email dispatches recorded yet</p>
                  <p className="text-xs text-slate-500">
                    Use the "Test Mail" input above to trigger a test dispatch immediately.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800/80 bg-slate-900/50 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        <th className="py-3 px-5">Recipient</th>
                        <th className="py-3 px-4">Subject</th>
                        <th className="py-3 px-4">Dispatched At</th>
                        <th className="py-3 px-4">Delivery Status</th>
                        <th className="py-3 px-4">Device Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                      {emailLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-900/40">
                          <td className="py-3.5 px-5">
                            <div>
                              <p className="font-bold text-white">{log.recipientName}</p>
                              <p className="text-[11px] text-slate-400 font-mono">{log.recipientEmail}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-200">
                            {log.subject}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                            {new Date(log.sentAt).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span className="capitalize">{log.status}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                            {log.deviceInfo || 'Web Browser'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: FIREBASE & RAW JSON EXPLORER */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>Firestore Database Schema & Collections</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your database ID: <code className="text-amber-300 bg-amber-950/40 px-1.5 py-0.5 rounded-sm">ai-studio-quizmasterengine-e0e48542-7822-4307-8b26-e88e04f6fb89</code>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700 cursor-pointer flex items-center space-x-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full JSON Export</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Collection: /users</span>
                  <p className="text-xs text-slate-300">
                    Stores permanent profiles for every student or visitor who signs in, including UID, name, email, login count, and last active timestamp.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">Collection: /login_logs</span>
                  <p className="text-xs text-slate-300">
                    Records every individual sign-in event, device browser fingerprints, authentication provider (Google/LinkedIn), and email dispatch status.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Collection: /quiz_attempts</span>
                  <p className="text-xs text-slate-300">
                    Stores complete test scores, subject categories, question counts, percentages, and timestamp records for examinations.
                  </p>
                </div>
              </div>
            </div>

            {/* Raw JSON viewer */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Database Snapshot</h4>
              <pre className="p-4 rounded-xl bg-slate-900/90 text-slate-300 font-mono text-[11px] overflow-x-auto max-h-96 border border-slate-800">
                {JSON.stringify({ databaseId: 'ai-studio-quizmasterengine', metrics, visitorsCount: visitors.length, emailLogsCount: emailLogs.length, sampleUsers: visitors.slice(0, 3) }, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Developer Guide / How It Works Box */}
        <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Real-Time Visitor History & Gmail Logging</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every time a user logs in with their Gmail account, an automated security mail is dispatched to their email address. Their entire history on this website (logins count, subjects completed, marks obtained, and device used) is saved directly into the database so you can inspect it anytime from this portal.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700 cursor-pointer"
            >
              Export JSON
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Return to Exam View
            </button>
          </div>
        </div>
      </main>

      {/* Visitor Detail & Full History Modal */}
      {selectedVisitorForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 w-full max-w-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedVisitorForHistory.avatarUrl}
                  alt={selectedVisitorForHistory.name}
                  className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedVisitorForHistory.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedVisitorForHistory.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVisitorForHistory(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Account Quick Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Google / Sign-in Provider</span>
                  <span className="text-slate-200 font-semibold capitalize mt-0.5 block">
                    {selectedVisitorForHistory.provider === 'google' ? 'Google Account (Gmail)' : 'LinkedIn Account'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Client Device</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block truncate">
                    {selectedVisitorForHistory.deviceInfo || 'Desktop Browser'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">First Joined</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block">
                    {new Date(selectedVisitorForHistory.firstLoginAt).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Website Logins</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block">
                    {selectedVisitorForHistory.loginCount || 1} logins recorded
                  </span>
                </div>
              </div>

              {/* Individual Login Events History */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <History className="w-3.5 h-3.5 text-blue-400" />
                  <span>Website Login History ({selectedVisitorForHistory.loginHistory?.length || selectedVisitorForHistory.loginCount || 1} sessions)</span>
                </h4>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  {selectedVisitorForHistory.loginHistory && selectedVisitorForHistory.loginHistory.length > 0 ? (
                    selectedVisitorForHistory.loginHistory.map((h, i) => (
                      <div key={i} className="flex items-center justify-between py-1 border-b border-slate-800/60 last:border-0">
                        <span className="text-slate-300">{new Date(h.loginAt).toLocaleString()}</span>
                        <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mail Dispatched</span>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-300">Last active: {new Date(selectedVisitorForHistory.lastActiveAt).toLocaleString()}</span>
                      <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Email Alert Sent</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quiz Performance History */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Exam Scores on Website ({selectedVisitorForHistory.recentQuizzes?.length || 0})</span>
                </h4>

                {!selectedVisitorForHistory.recentQuizzes || selectedVisitorForHistory.recentQuizzes.length === 0 ? (
                  <p className="text-xs text-slate-500 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    This user has signed in but has not yet completed a timed quiz.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {selectedVisitorForHistory.recentQuizzes.map((quiz, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-white">{quiz.subjectName}</p>
                          <p className="text-[11px] text-slate-500">
                            {new Date(quiz.completedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold text-sm ${
                            quiz.percentage >= 80 
                              ? 'text-emerald-400' 
                              : quiz.percentage >= 60 
                              ? 'text-blue-400' 
                              : 'text-amber-400'
                          }`}>
                            {quiz.score}/{quiz.totalQuestions} ({quiz.percentage}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setSelectedVisitorForHistory(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
