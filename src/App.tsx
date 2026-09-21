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

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => getStoredUser());
  const [currentView, setCurrentView] = useState<AppView>(() => (getStoredUser() ? 'dashboard' : 'login'));
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => getStoredAttempts());

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
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}

      {/* VIEW 2: DASHBOARD (TWO CORE OPTIONS: QUIZ & STUDY ANALYSIS) */}
      {currentView === 'dashboard' && user && (
        <Dashboard
          user={user}
          attempts={attempts}
          onSelectQuiz={() => setIsSubjectModalOpen(true)}
          onSelectStudyAnalysis={() => setCurrentView('study_analysis')}
          onLogout={handleLogout}
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
          onBackToDashboard={() => setCurrentView('dashboard')}
          onSelectAttemptForReview={handleSelectAttemptForReview}
          onStartNewQuiz={() => setIsSubjectModalOpen(true)}
        />
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
