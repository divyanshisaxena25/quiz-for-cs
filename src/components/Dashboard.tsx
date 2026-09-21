import React from 'react';
import { UserProfile, QuizAttempt } from '../types';
import { 
  GraduationCap, 
  BarChart3, 
  Award, 
  Clock, 
  LogOut, 
  CheckCircle, 
  TrendingUp, 
  ChevronRight,
  BookMarked,
  Sparkles,
  Terminal,
  Activity
} from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  attempts: QuizAttempt[];
  onSelectQuiz: () => void;
  onSelectStudyAnalysis: () => void;
  onLogout: () => void;
  onOpenDeveloperPortal?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  attempts,
  onSelectQuiz,
  onSelectStudyAnalysis,
  onLogout,
  onOpenDeveloperPortal
}) => {
  // Aggregate statistics
  const totalTests = attempts.length;
  const totalQuestions = attempts.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const totalRight = attempts.reduce((acc, curr) => acc + curr.rightCount, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalRight / totalQuestions) * 100) : 0;
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Quiz<span className="text-blue-600 dark:text-blue-400">Master</span>
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Student Portal
              </span>
            </div>
          </div>

          {/* User profile & logout */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {onOpenDeveloperPortal && (
              <button
                id="btn-dashboard-dev-portal"
                type="button"
                onClick={onOpenDeveloperPortal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20"
                title="Developer Portal - Real-Time Visitor Telemetry"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Developer Portal</span>
              </button>
            )}

            <div className="flex items-center space-x-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{user.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px] mt-0.5">{user.email}</p>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                    via {user.provider}
                  </span>
                </div>
              </div>
            </div>

            <button
              id="btn-logout"
              type="button"
              onClick={onLogout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 space-y-10">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
          
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-medium backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Welcome Back, {user.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What would you like to do today?
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Select <span className="font-semibold text-white">Quiz</span> to launch a 30-minute timed exam with 30 non-repeating MCQs, or choose <span className="font-semibold text-white">Study Analysis</span> to examine previous tests and review full explanations for wrong answers.
            </p>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15 relative z-10">
            <div>
              <p className="text-xs text-blue-200">Quizzes Attempted</p>
              <p className="text-2xl font-bold text-white mt-0.5">{totalTests}</p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Overall Accuracy</p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {totalTests > 0 ? `${overallAccuracy}%` : '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Best Score</p>
              <p className="text-2xl font-bold text-white mt-0.5">
                {totalTests > 0 ? `${bestScore} / 30` : '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Curriculum Subjects</p>
              <p className="text-2xl font-bold text-white mt-0.5">5 Subjects</p>
            </div>
          </div>
        </div>

        {/* PRIMARY TWO OPTIONS SECTION: "QUIZ" & "STUDY ANALYSIS" */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Choose an Option
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select one of the two core modules below
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPTION 1: QUIZ */}
            <div
              id="card-option-quiz"
              onClick={onSelectQuiz}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookMarked className="w-7 h-7" />
                </div>

                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 mb-2">
                    Timed Examination
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    Quiz
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                    Select a subject (DBMS, DAA, Web Technology, Maths 4, or Python) to take a full 30-minute exam with 30 unique, non-repeating MCQs chosen from our 40-question question bank.
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Strict 30-minute countdown with timer alerts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>30 distinct MCQs per attempt (Zero repeating questions)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Instant scorecard with Right, Wrong & Unattempted totals</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-blue-600 dark:text-blue-400 font-bold text-sm">
                <span>Start Subject Quiz</span>
                <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* OPTION 2: STUDY ANALYSIS */}
            <div
              id="card-option-study-analysis"
              onClick={onSelectStudyAnalysis}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-7 h-7" />
                </div>

                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 mb-2">
                    Performance Diagnostics
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    Study Analysis
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                    View in-depth performance analytics across all subjects, track your accuracy trends, and open detailed breakdowns showing wrong answers with full step-by-step explanations.
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Subject-wise proficiency and accuracy percentages</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Wrong questions diagnosis with full answer explanations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Complete historical log of all previous exam attempts</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <span>Open Study Analysis</span>
                <span className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Attempts Quick View */}
        {attempts.length > 0 && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Quiz Attempts</h3>
              <button
                type="button"
                onClick={onSelectStudyAnalysis}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Full Analysis →
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {attempts.slice(0, 3).map((attempt) => (
                <div key={attempt.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {attempt.subjectName}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      {new Date(attempt.completedAt).toLocaleDateString()} at{' '}
                      {new Date(attempt.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {attempt.score} / {attempt.totalQuestions} ({attempt.percentage}%)
                    </span>
                    <span className="text-xs text-rose-500 font-medium">
                      {attempt.wrongCount} wrong
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer with Developer Link */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-6 text-center text-xs text-slate-500 dark:text-slate-400 mt-12 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} QuizMaster Academic Portal. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            {onOpenDeveloperPortal && (
              <button
                type="button"
                onClick={onOpenDeveloperPortal}
                className="text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-1.5 cursor-pointer font-medium"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Developer Telemetry Logs</span>
              </button>
            )}
            <span>Privacy Policy</span>
            <span>Academic Integrity</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
