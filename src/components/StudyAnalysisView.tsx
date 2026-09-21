import React from 'react';
import { QuizAttempt, SubjectId } from '../types';
import { SUBJECTS } from '../data/questionBank';
import { 
  ArrowLeft, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface StudyAnalysisViewProps {
  attempts: QuizAttempt[];
  onBackToDashboard: () => void;
  onSelectAttemptForReview: (attempt: QuizAttempt) => void;
  onStartNewQuiz: () => void;
}

export const StudyAnalysisView: React.FC<StudyAnalysisViewProps> = ({
  attempts,
  onBackToDashboard,
  onSelectAttemptForReview,
  onStartNewQuiz
}) => {
  const totalTests = attempts.length;
  const totalQuestions = attempts.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const totalRight = attempts.reduce((acc, curr) => acc + curr.rightCount, 0);
  const totalWrong = attempts.reduce((acc, curr) => acc + curr.wrongCount, 0);
  const totalUnattempted = attempts.reduce((acc, curr) => acc + curr.unattemptedCount, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalRight / totalQuestions) * 100) : 0;

  // Subject-wise stats
  const subjectStats: Record<SubjectId, { attemptsCount: number; right: number; total: number; best: number }> = {
    dbms: { attemptsCount: 0, right: 0, total: 0, best: 0 },
    daa: { attemptsCount: 0, right: 0, total: 0, best: 0 },
    web: { attemptsCount: 0, right: 0, total: 0, best: 0 },
    maths4: { attemptsCount: 0, right: 0, total: 0, best: 0 },
    python: { attemptsCount: 0, right: 0, total: 0, best: 0 }
  };

  attempts.forEach((att) => {
    if (subjectStats[att.subject]) {
      subjectStats[att.subject].attemptsCount++;
      subjectStats[att.subject].right += att.rightCount;
      subjectStats[att.subject].total += att.totalQuestions;
      if (att.score > subjectStats[att.subject].best) {
        subjectStats[att.subject].best = att.score;
      }
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              id="btn-back-dashboard-from-analysis"
              type="button"
              onClick={onBackToDashboard}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-lg text-slate-900 dark:text-white">
                Study Analysis &amp; Performance Diagnostics
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track curriculum accuracy, subject proficiencies, and review past test errors
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartNewQuiz}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Take New Quiz</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Cumulative Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold">Total Tests</span>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalTests}</p>
            <span className="text-[11px] text-slate-400 mt-1 block">30 questions each</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold">Cumulative Accuracy</span>
              <TrendingUp className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {totalTests > 0 ? `${overallAccuracy}%` : '—'}
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">{totalRight} correct answers</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold">Right Answers</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{totalRight}</p>
            <span className="text-[11px] text-emerald-600/70 mt-1 block">+1 point earned</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold">Wrong Answers</span>
              <XCircle className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">{totalWrong}</p>
            <span className="text-[11px] text-rose-600/70 mt-1 block">available for review</span>
          </div>
        </div>

        {/* Subject-Wise Proficiency Section */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Subject-Wise Proficiency</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Breakdown of your accuracy across DBMS, DAA, Web Technology, Maths 4, and Python
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUBJECTS.map((sub) => {
              const stat = subjectStats[sub.id];
              const acc = stat.total > 0 ? Math.round((stat.right / stat.total) * 100) : 0;

              return (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{sub.name}</span>
                      <span className="text-[11px] text-slate-400 block">{sub.code}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-300">
                      {stat.attemptsCount} {stat.attemptsCount === 1 ? 'quiz' : 'quizzes'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      <span>Subject Accuracy</span>
                      <span>{stat.total > 0 ? `${acc}%` : 'Not Attempted'}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${acc}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-750">
                    <span>Best Score: {stat.attemptsCount > 0 ? `${stat.best} / 30` : '—'}</span>
                    <span>40 Questions Bank</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Historical Quiz Attempts Log */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Examination History</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any attempt to inspect the detailed analysis with wrong answers &amp; explanations
              </p>
            </div>
          </div>

          {attempts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Exams Recorded Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Once you complete a 30-minute subject quiz, your full attempt history, accuracy scorecards, and wrong answer explanations will be cataloged here.
              </p>
              <button
                type="button"
                onClick={onStartNewQuiz}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
              >
                Start Your First Quiz Now
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {attempts.map((att, idx) => (
                <div
                  key={att.id}
                  onClick={() => onSelectAttemptForReview(att)}
                  className="py-4 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                      #{attempts.length - idx}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {att.subjectName}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {att.score} / {att.totalQuestions} ({att.percentage}%)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(att.completedAt).toLocaleDateString()} at{' '}
                        {new Date(att.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Duration: {Math.floor(att.durationSeconds / 60)}m {att.durationSeconds % 60}s
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-xs font-semibold">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {att.rightCount} right
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-rose-600 dark:text-rose-400">
                        {att.wrongCount} wrong
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      <span>Review Explanations</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
