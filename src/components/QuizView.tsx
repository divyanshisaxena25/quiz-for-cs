import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Question, QuizAttempt, SubjectInfo, UserProfile } from '../types';
import { 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  AlertCircle, 
  HelpCircle,
  X
} from 'lucide-react';

interface QuizViewProps {
  user: UserProfile;
  subject: SubjectInfo;
  questions: Question[]; // Exactly 30 questions
  onCompleteQuiz: (attempt: QuizAttempt) => void;
  onExitQuiz: () => void;
}

const TOTAL_QUIZ_SECONDS = 30 * 60; // 30 minutes = 1800 seconds

export const QuizView: React.FC<QuizViewProps> = ({
  user,
  subject,
  questions,
  onCompleteQuiz,
  onExitQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_QUIZ_SECONDS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<number | null>(null);

  const currentQuestion = questions[currentIndex] || questions[0];

  // Helper to compile the attempt result
  const finishQuiz = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    const elapsedSeconds = Math.min(
      TOTAL_QUIZ_SECONDS,
      Math.floor((Date.now() - startTimeRef.current) / 1000)
    );

    let rightCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === undefined || ans === null) {
        unattemptedCount++;
      } else if (ans === q.correctIndex) {
        rightCount++;
      } else {
        wrongCount++;
      }
    });

    const score = rightCount;
    const percentage = Math.round((rightCount / questions.length) * 100);

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      userId: user.id,
      subject: subject.id,
      subjectName: subject.name,
      completedAt: new Date().toISOString(),
      durationSeconds: elapsedSeconds,
      totalQuestions: questions.length, // 30
      rightCount,
      wrongCount,
      unattemptedCount,
      score,
      percentage,
      questions,
      userAnswers
    };

    onCompleteQuiz(attempt);
  }, [questions, userAnswers, user.id, subject.id, subject.name, onCompleteQuiz]);

  // Countdown timer for 30 minutes
  useEffect(() => {
    timerIntervalRef.current = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [finishQuiz]);

  const formatTime = (totalSec: number) => {
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion.id];
      return updated;
    });
  };

  const handleToggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  // Stats for palette & submit modal
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;

  const isWarningTime = secondsRemaining <= 300; // < 5 mins
  const isCriticalTime = secondsRemaining <= 60; // < 1 min

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Quiz Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 py-3.5 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsExitConfirmOpen(true)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
              title="Quit Exam"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  {subject.name}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                  30 MCQs
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Question {currentIndex + 1} of {questions.length} • {currentQuestion.topic}
              </p>
            </div>
          </div>

          {/* 30-Minute Timer Badge */}
          <div className="flex items-center space-x-3">
            <div
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border transition ${
                isCriticalTime
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-600 animate-pulse'
                  : isWarningTime
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-600'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              id="btn-open-submit-modal"
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center space-x-1.5"
            >
              <span>Submit Quiz</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Quiz Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Question & Choices (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Question Top Details */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Q {currentIndex + 1} / 30
                </span>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {currentQuestion.topic}
                </span>
              </div>

              {/* Mark for Review */}
              <button
                id="btn-mark-for-review"
                type="button"
                onClick={handleToggleMarkForReview}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  markedForReview[currentQuestion.id]
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>
                  {markedForReview[currentQuestion.id] ? 'Marked for Review' : 'Mark for Review'}
                </span>
              </button>
            </div>

            {/* Question Statement */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                {currentQuestion.question}
              </h2>
            </div>

            {/* MCQ Options (A, B, C, D) */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <div
                    key={optIdx}
                    id={`option-${currentQuestion.id}-${optIdx}`}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-start space-x-3.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-normal flex-1">
                      {optionText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Clear Selection Option */}
            {userAnswers[currentQuestion.id] !== undefined && (
              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={handleClearAnswer}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-400 hover:text-rose-500 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Answer</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-750 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-400 font-medium">
              {currentIndex + 1} of {questions.length}
            </span>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-2"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-2"
              >
                <span>Review & Submit</span>
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question Palette & Status Summary (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Question Palette (30 Questions)
            </h3>

            {/* 30-Question Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];

                let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (isMarked && isAnswered) {
                  bgClass = 'bg-purple-600 text-white';
                } else if (isMarked) {
                  bgClass = 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-400';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-600 text-white';
                }

                return (
                  <button
                    key={q.id}
                    id={`palette-btn-${idx + 1}`}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg font-bold text-xs transition relative flex items-center justify-center ${bgClass} ${
                      isCurrent
                        ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 scale-105'
                        : 'hover:opacity-85'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isMarked && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-600 shrink-0" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700 shrink-0" />
                <span>Unanswered ({unansweredCount})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-sm bg-purple-600 shrink-0" />
                <span>Marked ({reviewCount})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-sm border-2 border-blue-500 shrink-0" />
                <span>Current Question</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold">
                <span>Completion Progress</span>
                <span>{Math.round((answeredCount / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SUBMISSION CONFIRMATION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Submit Examination</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Are you sure you wish to submit your answers? Review your question status summary below:
              </p>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">Answered</p>
                  <p className="text-xl font-extrabold text-emerald-800 dark:text-emerald-200">{answeredCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Unanswered</p>
                  <p className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{unansweredCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <p className="text-[11px] font-semibold text-purple-700 dark:text-purple-300">Marked</p>
                  <p className="text-xl font-extrabold text-purple-800 dark:text-purple-200">{reviewCount}</p>
                </div>
              </div>

              {unansweredCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start space-x-2 text-xs text-amber-800 dark:text-amber-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    You have <strong>{unansweredCount}</strong> unattempted questions. They will receive 0 marks.
                  </span>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-lg transition"
              >
                Return to Quiz
              </button>
              <button
                id="btn-confirm-final-submit"
                type="button"
                onClick={finishQuiz}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUIT CONFIRMATION MODAL */}
      {isExitConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Leave Quiz?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Leaving the exam early will discard your current 30-minute attempt and answers.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsExitConfirmOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 rounded-lg"
              >
                Continue Quiz
              </button>
              <button
                type="button"
                onClick={onExitQuiz}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
              >
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
