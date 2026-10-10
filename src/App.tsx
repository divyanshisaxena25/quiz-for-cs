import React, { useState, useEffect } from 'react';
import { 
  AppView, 
  UserProfile, 
  QuizAttempt, 
  SubjectId, 
  Question 
} from './types';
import { 
  getStoredUser, 
  setStoredUser, 
  getStoredAttempts, 
  saveAttempt 
} from './utils/storage';
import { 
  getSubjectById, 
  getRandom30Questions 
} from './data/questionBank';

import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { SubjectModal } from './components/SubjectModal';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { DetailedAnalysisView } from './components/DetailedAnalysisView';
import { StudyAnalysisView } from './components/StudyAnalysisView';
import { DeveloperPortal } from './components/DeveloperPortal';
import { recordVisitorQuizCompleted } from './utils/visitorService';
import { auth, fbSignOut } from './firebase';

export const ADMIN_EMAILS = [
  'divyanshisaxena245@gmail.com'
];

export const isUserAdmin = (user?: UserProfile | null): boolean => {
  if (!user) return false;
  if (user.isAdmin === true) return true;
  if (user.email && ADMIN_EMAILS.includes(user.email.trim().toLowerCase())) return true;
  return false;
};

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => getStoredUser());
  const [currentView, setCurrentView] = useState<AppView>(() => (getStoredUser() ? 'dashboard' : 'login'));
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => getStoredAttempts());

  const isAdmin = isUserAdmin(user);

  // Subject selector & pre-quiz terms modal state
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  // Active quiz session state
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId>('dbms');
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[]>([]);

  // Selected attempt for Result & Detailed Analysis
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);

  // Persist user changes
  useEffect(() => {
    setStoredUser(user);
    if (!user) {
      setCurrentView('login');
    }
  }, [user]);

  // Login handler
  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
  };

  // Logout handler
  const handleLogout = () => {
    fbSignOut(auth).catch(() => {});
    setUser(null);
    setCurrentView('login');
    setCurrentAttempt(null);
  };

  // Triggered when user agrees to terms & 30-min timing for a subject in SubjectModal
  const handleStartQuiz = (subjectId: SubjectId) => {
    try {
      // Draw 30 non-repeating questions randomly from 40-question subject bank
      const drawn30Questions = getRandom30Questions(subjectId);
      setActiveSubjectId(subjectId);
      setActiveQuizQuestions(drawn30Questions);
      setIsSubjectModalOpen(false);
      setCurrentView('quiz');
    } catch (err) {
      console.error('Failed to generate 30 questions for subject', err);
    }
  };

  // Triggered when quiz submits (either by user click or 30-min timer expiration)
  const handleCompleteQuiz = (completedAttempt: QuizAttempt) => {
    saveAttempt(completedAttempt);
    setAttempts((prev) => [completedAttempt, ...prev]);
    setCurrentAttempt(completedAttempt);
    setCurrentView('result');

    // Transmit completed quiz telemetry to centralized backend
    if (user?.email) {
      recordVisitorQuizCompleted({
        email: user.email,
        subjectName: completedAttempt.subjectName,
        score: completedAttempt.score,
        totalQuestions: completedAttempt.totalQuestions,
        percentage: completedAttempt.percentage
      });
    }
  };

  // Retake test on the same subject (selects 30 fresh questions from the 40-question pool)
  const handleRetakeSubjectQuiz = (subjectId: SubjectId) => {
    const drawn30Questions = getRandom30Questions(subjectId);
    setActiveSubjectId(subjectId);
    setActiveQuizQuestions(drawn30Questions);
    setCurrentView('quiz');
  };

  // Handle reviewing past exam from Study Analysis
  const handleSelectAttemptForReview = (attempt: QuizAttempt) => {
    setCurrentAttempt(attempt);
    setCurrentView('detailed_analysis');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* VIEW 1: LOGIN PAGE */}
      {currentView === 'login' && (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess} 
          onOpenDeveloperPortal={() => setCurrentView('developer_portal')}
        />
      )}

      {/* VIEW 2: DASHBOARD (TWO CORE OPTIONS: QUIZ & STUDY ANALYSIS) */}
      {currentView === 'dashboard' && user && (
        <Dashboard
          user={user}
          attempts={attempts}
          isAdmin={isAdmin}
          onSelectQuiz={() => setIsSubjectModalOpen(true)}
          onSelectStudyAnalysis={() => setCurrentView('study_analysis')}
          onLogout={handleLogout}
          onOpenDeveloperPortal={() => setCurrentView('developer_portal')}
        />
      )}

      {/* VIEW 3: ACTIVE 30-MINUTE QUIZ VIEW */}
      {currentView === 'quiz' && user && activeQuizQuestions.length === 30 && (
        <QuizView
          user={user}
          subject={getSubjectById(activeSubjectId)}
          questions={activeQuizQuestions}
          onCompleteQuiz={handleCompleteQuiz}
          onExitQuiz={() => setCurrentView('dashboard')}
        />
      )}

      {/* VIEW 4: EXAMINATION RESULT SCORECARD */}
      {currentView === 'result' && currentAttempt && (
        <ResultView
          attempt={currentAttempt}
          user={user || undefined}
          onOpenDetailedAnalysis={() => setCurrentView('detailed_analysis')}
          onRetakeSubjectQuiz={() => handleRetakeSubjectQuiz(currentAttempt.subject)}
          onOpenStudyAnalysis={() => setCurrentView('study_analysis')}
          onBackToDashboard={() => setCurrentView('dashboard')}
        />
      )}

      {/* VIEW 5: DETAILED ANALYSIS (WRONG QUESTIONS WITH FULL EXPLANATIONS) */}
      {currentView === 'detailed_analysis' && currentAttempt && (
        <DetailedAnalysisView
          attempt={currentAttempt}
          onBackToResult={() => setCurrentView('result')}
          onBackToDashboard={() => setCurrentView('dashboard')}
          onRetake={() => handleRetakeSubjectQuiz(currentAttempt.subject)}
        />
      )}

      {/* VIEW 6: STUDY ANALYSIS & PERFORMANCE DIAGNOSTICS */}
      {currentView === 'study_analysis' && (
        <StudyAnalysisView
          attempts={attempts}
          user={user || undefined}
          onBackToDashboard={() => setCurrentView('dashboard')}
          onSelectAttemptForReview={handleSelectAttemptForReview}
          onStartNewQuiz={() => setIsSubjectModalOpen(true)}
        />
      )}

      {/* VIEW 7: DEVELOPER & ADMIN TELEMETRY PORTAL (STRICTLY ADMIN ONLY) */}
      {currentView === 'developer_portal' && (
        isAdmin ? (
          <DeveloperPortal
            onBack={() => setCurrentView(user ? 'dashboard' : 'login')}
            developerEmail={user?.email || 'divyanshisaxena245@gmail.com'}
          />
        ) : (
          <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center mb-4 border border-rose-500/20 text-2xl">
                🔒
              </div>
              <h2 className="text-xl font-bold mb-2">Restricted Admin Access</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Developer Portal sirf system administrator (<span className="text-blue-400 font-medium">divyanshisaxena245@gmail.com</span>) ke liye accessible hai.
              </p>
              <button
                type="button"
                onClick={() => setCurrentView(user ? 'dashboard' : 'login')}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                Return to {user ? 'Dashboard' : 'Sign In'}
              </button>
            </div>
          </div>
        )
      )}

      {/* SUBJECT SELECTION & TERMS/INSTRUCTIONS/30-MINUTE TIMING MODAL */}
      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        onStartQuiz={handleStartQuiz}
      />
    </div>
  );
}
