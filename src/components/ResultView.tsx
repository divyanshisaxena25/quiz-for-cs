import React, { useState } from 'react';
import { QuizAttempt, UserProfile } from '../types';
import { 
  Trophy, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Clock, 
  ArrowRight, 
  RotateCcw, 
  BarChart2, 
  LayoutDashboard,
  Sparkles,
  AlertTriangle,
  Award,
  Download,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';
import { generateDirectCertificatePDF } from '../utils/certificateUtils';

interface ResultViewProps {
  attempt: QuizAttempt;
  user?: UserProfile;
  onOpenDetailedAnalysis: () => void;
  onRetakeSubjectQuiz: () => void;
  onOpenStudyAnalysis: () => void;
  onBackToDashboard: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  attempt,
  user,
  onOpenDetailedAnalysis,
  onRetakeSubjectQuiz,
  onOpenStudyAnalysis,
  onBackToDashboard
}) => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isDownloadingDirectPdf, setIsDownloadingDirectPdf] = useState(false);
  const attemptedCount = attempt.rightCount + attempt.wrongCount;

  // Grade descriptor
  const getGradeInfo = (percentage: number) => {
    if (percentage >= 90) {
      return { label: 'Outstanding Mastery', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' };
    }
    if (percentage >= 75) {
      return { label: 'Strong Proficiency', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800' };
    }
    if (percentage >= 50) {
      return { label: 'Satisfactory Performance', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' };
    }
    return { label: 'Needs Comprehensive Review', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800' };
  };

  const grade = getGradeInfo(attempt.percentage);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              Quiz<span className="text-blue-600 dark:text-blue-400">Master</span>
            </span>
            <span className="text-xs text-slate-400">/ Official Examination Scorecard</span>
          </div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center space-x-1"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Scorecard Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10 space-y-8">
        {/* Scorecard Hero Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Exam Complete: {attempt.subjectName}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Your Examination Score
            </h1>
            <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold border mt-2 ${grade.bg} ${grade.color}`}>
              {grade.label}
            </div>
          </div>

          {/* Primary Score Counter */}
          <div className="flex items-baseline justify-center space-x-2">
            <span className="text-6xl sm:text-7xl font-black tracking-tight text-blue-600 dark:text-blue-400">
              {attempt.score}
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-slate-400">
              / {attempt.totalQuestions}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Final Accuracy: {attempt.percentage}% • Time Taken: {formatDuration(attempt.durationSeconds)} of 30m
          </p>

          {/* 4 Crucial Performance Pillars (Attempted, Right, Wrong, Unattempted) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            {/* Total Attempted */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Questions Attempted
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-200">
                {attemptedCount}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">out of 30</span>
            </div>

            {/* Right (Correct) */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  Right Answers
                </span>
              </div>
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {attempt.rightCount}
              </span>
              <span className="text-[11px] text-emerald-600/80 block mt-0.5">+1 mark each</span>
            </div>

            {/* Wrong (Incorrect) */}
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                  Wrong Answers
                </span>
              </div>
              <span className="text-2xl font-black text-rose-700 dark:text-rose-300">
                {attempt.wrongCount}
              </span>
              <span className="text-[11px] text-rose-600/80 block mt-0.5">review below</span>
            </div>

            {/* Unattempted */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Unattempted
                </span>
              </div>
              <span className="text-2xl font-black text-slate-600 dark:text-slate-300">
                {attempt.unattemptedCount}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">0 marks</span>
            </div>
          </div>

          {/* DIGITAL CERTIFICATE SECTION */}
          <div className="pt-2">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/5 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-800/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-md flex items-center justify-center shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-[10px] font-black uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span>Official Credential Conferred</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Digital Certificate of Completion (PDF)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                    Congratulations! Your proctored exam in <strong className="text-slate-900 dark:text-white">{attempt.subjectName}</strong> has been audited and approved. Your cryptographically verified certificate is ready to download.
                  </p>
                  <p className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                    Certificate ID: QM-CERT-{new Date(attempt.completedAt).getFullYear()}-{(attempt.id || 'QM').slice(0, 8).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
                <button
                  id="btn-preview-cert"
                  type="button"
                  onClick={() => setIsCertModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  <span>Preview &amp; Edit Name</span>
                </button>

                <button
                  id="btn-download-cert-pdf-direct"
                  type="button"
                  onClick={async () => {
                    setIsDownloadingDirectPdf(true);
                    try {
                      generateDirectCertificatePDF(attempt, user);
                    } catch (e) {
                      console.error(e);
                      setIsCertModalOpen(true);
                    } finally {
                      setTimeout(() => setIsDownloadingDirectPdf(false), 1500);
                    }
                  }}
                  disabled={isDownloadingDirectPdf}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-black text-xs shadow-md shadow-amber-500/25 transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>{isDownloadingDirectPdf ? 'Downloading PDF...' : 'Download Certificate (PDF)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* CRITICAL USER REQUIREMENT:
              "and a link pf detailed analysis in the click of detailed analyis the answer of wrong questions with full explanation will show" */}
          <div className="pt-2">
            <div 
              id="link-detailed-analysis"
              onClick={onOpenDetailedAnalysis}
              className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition flex flex-col sm:flex-row items-center justify-between gap-4 text-left group"
            >
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Comprehensive Question Diagnosis</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Open Detailed Analysis &amp; Explanations
                </h3>
                <p className="text-xs text-blue-100 max-w-xl">
                  {attempt.wrongCount > 0
                    ? `Click to view all ${attempt.wrongCount} wrong questions with complete conceptual explanations, correct solutions, and error diagnosis.`
                    : `You answered all attempted questions correctly! Click to review every question and explanation.`}
                </p>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <span>View Detailed Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-retake-quiz"
            type="button"
            onClick={onRetakeSubjectQuiz}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-blue-500" />
            <span>Retake 30 Questions ({attempt.subjectName})</span>
          </button>

          <button
            id="btn-go-study-analysis"
            type="button"
            onClick={onOpenStudyAnalysis}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs"
          >
            <BarChart2 className="w-4 h-4 text-indigo-500" />
            <span>Open Study Analysis</span>
          </button>

          <button
            id="btn-back-dashboard"
            type="button"
            onClick={onBackToDashboard}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-transparent bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </main>

      {/* Official Certificate Modal */}
      {isCertModalOpen && (
        <CertificateModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          attempt={attempt}
          user={user || { id: attempt.userId, name: 'Student', email: '', avatarUrl: '', provider: 'google', loggedInAt: attempt.completedAt }}
        />
      )}
    </div>
  );
};
