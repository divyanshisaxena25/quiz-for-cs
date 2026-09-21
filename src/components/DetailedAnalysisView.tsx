import React, { useState } from 'react';
import { QuizAttempt } from '../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BookOpen, 
  Filter, 
  RotateCcw, 
  LayoutDashboard,
  Lightbulb
} from 'lucide-react';

interface DetailedAnalysisViewProps {
  attempt: QuizAttempt;
  onBackToResult: () => void;
  onBackToDashboard: () => void;
  onRetake: () => void;
}

type FilterMode = 'wrong' | 'all' | 'right' | 'unattempted';

export const DetailedAnalysisView: React.FC<DetailedAnalysisViewProps> = ({
  attempt,
  onBackToResult,
  onBackToDashboard,
  onRetake
}) => {
  // If user has wrong answers, default to 'wrong' filter to immediately satisfy:
  // "in the click of detailed analyis the answer of wrong questions with full explanation will show"
  const [filterMode, setFilterMode] = useState<FilterMode>(
    attempt.wrongCount > 0 ? 'wrong' : 'all'
  );

  const filteredQuestions = attempt.questions.filter((q) => {
    const userAnswer = attempt.userAnswers[q.id];
    const isUnattempted = userAnswer === undefined || userAnswer === null;
    const isRight = !isUnattempted && userAnswer === q.correctIndex;
    const isWrong = !isUnattempted && userAnswer !== q.correctIndex;

    if (filterMode === 'wrong') return isWrong;
    if (filterMode === 'right') return isRight;
    if (filterMode === 'unattempted') return isUnattempted;
    return true; // 'all'
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              id="btn-back-scorecard"
              type="button"
              onClick={onBackToResult}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition"
              title="Return to Scorecard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Detailed Analysis &amp; Explanations
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                  {attempt.subjectName}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Score: {attempt.score} / {attempt.totalQuestions} ({attempt.percentage}%) • Showing {filteredQuestions.length} Questions
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onRetake}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-bold transition hidden sm:flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
              <span>Retake</span>
            </button>
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Analysis Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 space-y-6">
        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
            <Filter className="w-4 h-4" />
            <span>Filter Questions:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Wrong Questions Filter (Requested directly by user) */}
            <button
              id="filter-btn-wrong"
              type="button"
              onClick={() => setFilterMode('wrong')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                filterMode === 'wrong'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Wrong Questions ({attempt.wrongCount})</span>
            </button>

            {/* All Questions Filter */}
            <button
              id="filter-btn-all"
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                filterMode === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>All Questions ({attempt.totalQuestions})</span>
            </button>

            {/* Right Questions Filter */}
            <button
              id="filter-btn-right"
              type="button"
              onClick={() => setFilterMode('right')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                filterMode === 'right'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Right Answers ({attempt.rightCount})</span>
            </button>

            {/* Unattempted Questions Filter */}
            <button
              id="filter-btn-unattempted"
              type="button"
              onClick={() => setFilterMode('unattempted')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                filterMode === 'unattempted'
                  ? 'bg-slate-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Unattempted ({attempt.unattemptedCount})</span>
            </button>
          </div>
        </div>

        {/* Empty State for Filter */}
        {filteredQuestions.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {filterMode === 'wrong'
                ? 'No Incorrect Answers!'
                : 'No Questions Found for this Category'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {filterMode === 'wrong'
                ? 'Incredible performance! You answered every attempted question correctly. Switch to "All Questions" to read explanations.'
                : 'Select another filter to view question solutions.'}
            </p>
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
            >
              View All Questions &amp; Explanations
            </button>
          </div>
        )}

        {/* Questions Detailed List with Answers & Full Explanations */}
        <div className="space-y-6">
          {filteredQuestions.map((q, qIndex) => {
            const userAnswer = attempt.userAnswers[q.id];
            const isUnattempted = userAnswer === undefined || userAnswer === null;
            const isRight = !isUnattempted && userAnswer === q.correctIndex;
            const isWrong = !isUnattempted && userAnswer !== q.correctIndex;

            // Find original question index in attempt
            const originalIndex = attempt.questions.findIndex((item) => item.id === q.id);

            return (
              <div
                key={q.id}
                id={`analysis-card-${q.id}`}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border-2 shadow-sm transition space-y-6 ${
                  isWrong
                    ? 'border-rose-300 dark:border-rose-900/80 bg-rose-50/20'
                    : isRight
                    ? 'border-emerald-200 dark:border-emerald-900/50'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Question Header & Status Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      Question {originalIndex + 1} of {attempt.totalQuestions}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {q.topic}
                    </span>
                  </div>

                  {/* Status Tag */}
                  <div>
                    {isRight && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Correct (+1)</span>
                      </span>
                    )}
                    {isWrong && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Incorrect Answer</span>
                      </span>
                    )}
                    {isUnattempted && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Unattempted (0)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Statement */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                  {q.question}
                </h3>

                {/* 4 Options with Visual Indicators */}
                <div className="space-y-2.5">
                  {q.options.map((optText, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrectAnswer = q.correctIndex === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);

                    let cardClass =
                      'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300';
                    let badgeNode = null;

                    if (isCorrectAnswer) {
                      cardClass =
                        'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-semibold';
                      badgeNode = (
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md shrink-0">
                          ✓ Correct Answer
                        </span>
                      );
                    } else if (isSelected && !isCorrectAnswer) {
                      cardClass =
                        'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 font-semibold';
                      badgeNode = (
                        <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded-md shrink-0">
                          ❌ Your Answer (Wrong)
                        </span>
                      );
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3.5 rounded-xl border-2 transition flex items-center justify-between gap-3 text-xs sm:text-sm ${cardClass}`}
                      >
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isCorrectAnswer
                                ? 'bg-emerald-600 text-white'
                                : isSelected && !isCorrectAnswer
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {letter}
                          </span>
                          <span className="leading-snug pt-0.5">{optText}</span>
                        </div>
                        {badgeNode}
                      </div>
                    );
                  })}
                </div>

                {/* USER REQUIREMENT: FULL EXPLANATION BOX */}
                <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/80 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-xs font-extrabold uppercase tracking-wide">
                      Full Solution Explanation
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Back Button */}
        <div className="pt-4 flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={onBackToResult}
            className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-xs font-bold transition flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Scorecard</span>
          </button>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </main>
    </div>
  );
};
