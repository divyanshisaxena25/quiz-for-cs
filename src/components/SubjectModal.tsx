import React, { useState } from 'react';
import { SubjectId, SubjectInfo } from '../types';
import { SUBJECTS } from '../data/questionBank';
import { 
  X, 
  Clock, 
  FileQuestion, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Database, 
  Binary, 
  Globe, 
  Sigma, 
  Code2, 
  ArrowRight
} from 'lucide-react';

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: (subject: SubjectId) => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({
  isOpen,
  onClose,
  onStartQuiz
}) => {
  // Step 1: Select subject
  // Step 2: Terms & Conditions and 30-minute timing agreement popup
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfo | null>(null);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedSubject(null);
    setHasAgreedToTerms(false);
    onClose();
  };

  const handleSelectSubject = (subject: SubjectInfo) => {
    setSelectedSubject(subject);
    setHasAgreedToTerms(false);
  };

  const handleConfirmStart = () => {
    if (!selectedSubject || !hasAgreedToTerms) return;
    const subjId = selectedSubject.id;
    handleClose();
    onStartQuiz(subjId);
  };

  const renderSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-6 h-6" />;
      case 'Binary':
        return <Binary className="w-6 h-6" />;
      case 'Globe':
        return <Globe className="w-6 h-6" />;
      case 'Sigma':
        return <Sigma className="w-6 h-6" />;
      case 'Code2':
        return <Code2 className="w-6 h-6" />;
      default:
        return <FileQuestion className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      {/* STEP 1: SUBJECT SELECTION */}
      {!selectedSubject ? (
        <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Subject Selection
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Select a Subject for Quiz
              </h3>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subjects Grid */}
          <div className="p-6 overflow-y-auto space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Choose one of the core academic curriculum subjects below. Each quiz generates 30 distinct questions randomly from a 40-question bank:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUBJECTS.map((subject) => (
                <div
                  key={subject.id}
                  id={`subject-card-${subject.id}`}
                  onClick={() => handleSelectSubject(subject)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-slate-850 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 cursor-pointer transition shadow-xs hover:shadow-md group flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2.5 rounded-xl ${subject.bgColor} ${subject.color} shrink-0`}>
                      {renderSubjectIcon(subject.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {subject.name}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {subject.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {subject.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>40 Questions Bank • 30 in Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 text-right">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: TERMS AND CONDITIONS, INSTRUCTIONS & 30-MINUTE TIMING POP-UP */
        <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${selectedSubject.bgColor} ${selectedSubject.color}`}>
                {renderSubjectIcon(selectedSubject.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Pre-Exam Instructions
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedSubject.name} Examination
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSubject(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Change Subject"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Terms, Timing & Instructions */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Timing & Question Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center space-x-3">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">Exam Duration</p>
                  <p className="text-base font-extrabold text-amber-900 dark:text-amber-100">30 Minutes</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center space-x-3">
                <FileQuestion className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-300">Questions Count</p>
                  <p className="text-base font-extrabold text-blue-900 dark:text-blue-100">30 MCQs</p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions & Instructions Card */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Terms, Conditions & Examination Rules</span>
              </h4>

              <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed">
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-slate-900 dark:text-white">1.</span>
                  <span><strong>30-Minute Timing:</strong> The timer begins immediately when you click &ldquo;I Agree &amp; Start Quiz&rdquo;. The quiz will automatically submit when the 30 minutes expire.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-slate-900 dark:text-white">2.</span>
                  <span><strong>Question Pool:</strong> 30 questions are randomly chosen from our 40-question curriculum question bank. No question will repeat in this attempt.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-slate-900 dark:text-white">3.</span>
                  <span><strong>Marking Scheme:</strong> Each correct answer awards +1 mark. There is no negative marking for incorrect or unattempted answers.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-slate-900 dark:text-white">4.</span>
                  <span><strong>Navigation &amp; Review:</strong> You may freely navigate back and forth using the question palette and flag questions with &ldquo;Mark for Review&rdquo;.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-slate-900 dark:text-white">5.</span>
                  <span><strong>Post-Exam Analysis:</strong> Upon submission, you will receive an immediate scorecard and a link to <em>Detailed Analysis</em> with full explanations for all wrong answers.</span>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <label 
              id="checkbox-label-terms"
              className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition"
            >
              <input
                id="checkbox-agree-terms"
                type="checkbox"
                checked={hasAgreedToTerms}
                onChange={(e) => setHasAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 shrink-0"
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                I have read, understood, and agree to the 30-minute timing, instructions, and examination terms for {selectedSubject.name}.
              </span>
            </label>
          </div>

          {/* Modal Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSelectedSubject(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-lg transition"
            >
              ← Back to Subjects
            </button>
            <button
              id="btn-agree-start-quiz"
              type="button"
              disabled={!hasAgreedToTerms}
              onClick={handleConfirmStart}
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center space-x-2"
            >
              <span>I Agree &amp; Start Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
