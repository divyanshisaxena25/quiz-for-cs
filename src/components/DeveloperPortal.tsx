import React, { useState, useEffect } from 'react';
import { 
  VisitorMetrics, 
  VisitorRecord, 
  VisitorQuizSummary 
} from '../types';
import { 
  fetchVisitorsData, 
  deleteVisitorRecord 
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
  Award
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
    activeToday: 0
  });
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'google' | 'linkedin'>('all');
  const [selectedVisitorForHistory, setSelectedVisitorForHistory] = useState<VisitorRecord | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());

  const loadData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const data = await fetchVisitorsData();
      setMetrics(data.metrics);
      setVisitors(data.visitors);
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
    if (window.confirm(`Remove visitor record for "${name}" from the log?`)) {
      await deleteVisitorRecord(id);
      await loadData(false);
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
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ metrics, visitors }, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `quizmaster-visitors-${new Date().toISOString().split('T')[0]}.json`);
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
              </div>
              <p className="text-xs text-slate-400">
                Tracking all visitors, authentications, and exam engagements across devices
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

            <div className="dropdown relative">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Card 1: Total Visitors */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Unique Visitors</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.totalVisitors}</span>
              <p className="text-[11px] text-slate-400 mt-1">Individual profiles</p>
            </div>
          </div>

          {/* Card 2: Total Logins */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Total Sign-ins</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.totalLogins}</span>
              <p className="text-[11px] text-slate-400 mt-1">Active sessions</p>
            </div>
          </div>

          {/* Card 3: Google Logins */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Google Logins</span>
              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center">G</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.googleCount}</span>
              <p className="text-[11px] text-blue-400/80 mt-1">Google accounts</p>
            </div>
          </div>

          {/* Card 4: LinkedIn Logins */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>LinkedIn Logins</span>
              <span className="w-4 h-4 rounded-sm bg-[#0077B5]/30 text-[#0077B5] text-[10px] font-bold flex items-center justify-center">in</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.linkedinCount}</span>
              <p className="text-[11px] text-[#0077B5] mt-1">Professional accounts</p>
            </div>
          </div>

          {/* Card 5: Quizzes Taken */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Quizzes Taken</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metrics.totalQuizzesTaken}</span>
              <p className="text-[11px] text-emerald-400/80 mt-1">Assessments finished</p>
            </div>
          </div>

          {/* Card 6: Average Score */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Cohort Avg</span>
              <span className="text-xs font-bold text-purple-400">%</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {metrics.averageScore > 0 ? `${metrics.averageScore}%` : '--'}
              </span>
              <p className="text-[11px] text-purple-400/80 mt-1">Overall proficiency</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by visitor name or email..."
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

        {/* Visitors Table Section */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-white tracking-wide">
                Identified Visitor Roster ({filteredVisitors.length})
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>Developer Owner:</span>
              <span className="font-semibold text-blue-400">{developerEmail || 'divyanshisaxena245@gmail.com'}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-xs text-slate-400">Fetching live telemetry logs from server...</p>
            </div>
          ) : filteredVisitors.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Users className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No visitors found matching filter</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Once external users or visitors log in with Google or LinkedIn, their identity, timestamps, and test results will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-900/50 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    <th className="py-3 px-5">Visitor Identity</th>
                    <th className="py-3 px-4">Provider</th>
                    <th className="py-3 px-4">First Sign-In</th>
                    <th className="py-3 px-4">Last Active</th>
                    <th className="py-3 px-4 text-center">Sessions</th>
                    <th className="py-3 px-4 text-center">Tests Taken</th>
                    <th className="py-3 px-4">Average Score</th>
                    <th className="py-3 px-4">Latest Activity</th>
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
                          {visitor.loginCount || 1}x
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
                            <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  visitor.averageScore >= 80 
                                    ? 'bg-emerald-500' 
                                    : visitor.averageScore >= 60 
                                    ? 'bg-blue-500' 
                                    : 'bg-amber-500'
                                }`}
                                style={{ width: `${visitor.averageScore}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-600 text-xs">No exams yet</span>
                        )}
                      </td>

                      {/* Latest Activity */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px] max-w-[160px] truncate">
                        {visitor.lastQuizSubject ? (
                          <span title={`${visitor.lastQuizSubject} (${visitor.lastQuizScore}/30)`}>
                            {visitor.lastQuizSubject}: <strong className="text-slate-200">{visitor.lastQuizScore}/30</strong>
                          </span>
                        ) : (
                          <span className="text-slate-600">Logged in</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setSelectedVisitorForHistory(visitor)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                            title="Inspect Detailed History"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(visitor.id, visitor.name)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                            title="Delete Record"
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

        {/* Developer Guide / How It Works Box */}
        <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>How Real-Time Visitor Logging Operates</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every time someone clicks <strong>Sign in with Google</strong> or <strong>Sign in with LinkedIn</strong> on your application URL, the central backend API logs their identity, email, device footprint, and session count. As visitors complete 30-minute quizzes, their scores and completed subjects are automatically linked to their profile in real time.
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

      {/* Visitor Detail Modal */}
      {selectedVisitorForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedVisitorForHistory.avatarUrl}
                  alt={selectedVisitorForHistory.name}
                  className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedVisitorForHistory.name}</h3>
                  <p className="text-xs text-slate-400">{selectedVisitorForHistory.email}</p>
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
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Sign-in Provider</span>
                  <span className="text-slate-200 font-semibold capitalize mt-0.5 block">
                    {selectedVisitorForHistory.provider}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Client Device</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block truncate">
                    {selectedVisitorForHistory.deviceInfo || 'Desktop Browser'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">First Connected</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block">
                    {new Date(selectedVisitorForHistory.firstLoginAt).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Sessions</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block">
                    {selectedVisitorForHistory.loginCount || 1} logins
                  </span>
                </div>
              </div>

              {/* Quiz History List */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Completed Quiz Assessments ({selectedVisitorForHistory.recentQuizzes?.length || 0})
                </h4>

                {!selectedVisitorForHistory.recentQuizzes || selectedVisitorForHistory.recentQuizzes.length === 0 ? (
                  <p className="text-xs text-slate-500 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    This user has logged in but has not yet finished a timed quiz.
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
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedVisitorForHistory(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
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
