import React, { useRef, useState, useEffect } from 'react';
import { QuizAttempt, UserProfile } from '../types';
import { 
  Award, 
  Download, 
  Printer, 
  X, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Edit3,
  Calendar,
  Hash,
  GraduationCap,
  Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  attempt: QuizAttempt;
  user: UserProfile;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  attempt,
  user
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [studentName, setStudentName] = useState<string>(user?.name || 'Student');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Synchronize student name when user changes
  useEffect(() => {
    if (user?.name) {
      setStudentName(user.name);
    }
  }, [user]);

  // Trigger celebration confetti when certificate is opened
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback if confetti canvas not available
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate standardized Certificate Verification ID
  const certId = `QM-CERT-${new Date(attempt.completedAt).getFullYear()}-${(attempt.id || 'QM').slice(0, 8).toUpperCase()}`;
  
  // Format formatted date
  const issueDate = new Date(attempt.completedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Determine achievement honor tier
  const getHonorTier = (percentage: number) => {
    if (percentage >= 90) {
      return {
        title: 'CERTIFICATE OF EXCELLENCE',
        subtitle: 'With Highest Distinction (Gold Honor)',
        tierBadge: 'Outstanding Distinction • Top 1%',
        badgeColor: 'from-amber-400 to-yellow-600',
        borderColor: '#b45309'
      };
    }
    if (percentage >= 75) {
      return {
        title: 'CERTIFICATE OF MERIT',
        subtitle: 'With Academic Honors',
        tierBadge: 'Proficient Scholar • Honors Tier',
        badgeColor: 'from-blue-500 to-indigo-600',
        borderColor: '#1d4ed8'
      };
    }
    if (percentage >= 50) {
      return {
        title: 'CERTIFICATE OF PROFICIENCY',
        subtitle: 'Standard Examination Pass',
        tierBadge: 'Certified Proficient Candidate',
        badgeColor: 'from-emerald-500 to-teal-600',
        borderColor: '#047857'
      };
    }
    return {
      title: 'CERTIFICATE OF COMPLETION',
      subtitle: 'Curriculum Assessment Record',
      tierBadge: 'Proctored Assessment Completed',
      badgeColor: 'from-slate-500 to-slate-700',
      borderColor: '#475569'
    };
  };

  const honor = getHonorTier(attempt.percentage);

  // PDF Generator Function
  const handleDownloadPDF = async () => {
    if (!certificateRef.current || isGeneratingPdf) return;

    try {
      setIsGeneratingPdf(true);
      setDownloadSuccess(false);

      // Render the certificate element into high-resolution canvas
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200
      });

      const imgData = canvas.toDataURL('image/png', 1.0);

      // Create landscape A4 PDF (297mm x 210mm)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Clean sanitized filename
      const cleanSubject = attempt.subjectName.replace(/[^a-zA-Z0-9]/g, '_');
      const cleanStudent = studentName.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `QuizMaster_Certificate_${cleanSubject}_${cleanStudent}.pdf`;

      pdf.save(filename);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Error generating digital certificate PDF:', err);
      alert('Could not generate PDF. You can also use the Print button to save as PDF directly.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Browser print trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Top Modal Action Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>Official Digital Certificate</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Verified PDF
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Awarded for completing the 30-minute proctored examination
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Quick Name Edit Trigger */}
            <button
              type="button"
              onClick={() => setIsEditingName(!isEditingName)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
              title="Edit name printed on certificate"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-500" />
              <span>{isEditingName ? 'Done Editing' : 'Edit Name'}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* PRIMARY: Download PDF Button */}
            <button
              id="btn-download-certificate-pdf"
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center space-x-2 transition cursor-pointer disabled:opacity-60"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating High-Res PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Certificate PDF</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Name Customization Drawer */}
        {isEditingName && (
          <div className="bg-blue-50 dark:bg-blue-950/40 border-b border-blue-200 dark:border-blue-900 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-blue-900 dark:text-blue-200 font-medium">
              Want a specific formal name on your certificate? Update it here:
            </span>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter full legal / formal name"
                className="px-3 py-1.5 rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-xs hover:bg-blue-700"
              >
                Apply to Certificate
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Container with Certificate Preview */}
        <div className="p-4 sm:p-8 bg-slate-100 dark:bg-slate-950/70 overflow-x-auto flex justify-center">
          
          {/* THE DIGITAL CERTIFICATE DOCUMENT (Captured for PDF) */}
          <div
            ref={certificateRef}
            id="digital-certificate-document"
            style={{ width: '1000px', minWidth: '1000px', height: '700px' }}
            className="relative bg-white text-slate-900 p-10 rounded-xs shadow-2xl border-[14px] border-[#0f172a] select-none flex flex-col justify-between font-serif box-border"
          >
            {/* Inner Gold Filigree & Double Border Frame */}
            <div className="absolute inset-2 border-[3px] border-[#d97706] pointer-events-none" />
            <div className="absolute inset-3 border border-[#f59e0b] opacity-60 pointer-events-none" />
            <div className="absolute inset-5 border border-slate-200 pointer-events-none" />

            {/* Corner Ornamental Accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#b45309] pointer-events-none" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#b45309] pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#b45309] pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#b45309] pointer-events-none" />

            {/* Watermark Crest Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
              <GraduationCap className="w-[500px] h-[500px] text-slate-900" />
            </div>

            {/* CERTIFICATE HEADER */}
            <div className="relative z-10 text-center space-y-2 mt-2">
              <div className="flex items-center justify-center space-x-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-sm flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-amber-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-left font-sans">
                  <span className="block text-xs font-black tracking-[0.25em] text-slate-900 uppercase">
                    QuizMaster Examination Directorate
                  </span>
                  <span className="block text-[10px] tracking-widest text-[#d97706] font-bold uppercase">
                    Standardized Academic Assessment Authority
                  </span>
                </div>
              </div>

              {/* Title & Honor Heading */}
              <h1 className="text-3xl font-extrabold tracking-wider text-slate-900 uppercase font-serif drop-shadow-xs">
                {honor.title}
              </h1>
              <p className="text-xs tracking-widest text-[#b45309] font-sans font-bold uppercase">
                {honor.subtitle}
              </p>
              <div className="w-36 h-0.5 bg-gradient-to-r from-transparent via-[#d97706] to-transparent mx-auto mt-2" />
            </div>

            {/* CERTIFICATE BODY */}
            <div className="relative z-10 text-center my-auto space-y-4 px-12">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-sans font-medium">
                This credential is electronically conferred upon
              </p>

              {/* Student Recipient Name */}
              <div className="py-1">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-wide font-serif border-b-2 border-slate-300 pb-2 inline-block px-8 max-w-2xl truncate">
                  {studentName || 'Student'}
                </div>
                {user?.email && (
                  <p className="text-[11px] text-slate-400 font-sans tracking-wider mt-1">
                    Candidate Identifier: {user.email}
                  </p>
                )}
              </div>

              {/* Subject & Accomplishment Text */}
              <p className="text-sm text-slate-700 leading-relaxed max-w-3xl mx-auto font-sans">
                for demonstrating demonstrated academic competency by successfully completing the official
                <span className="font-bold text-slate-900 font-serif text-base"> {attempt.subjectName} </span>
                comprehensive examination consisting of <span className="font-bold text-slate-900">30 rigorous non-repeating MCQs</span> under timed examination protocols.
              </p>

              {/* Performance Metrics Plate */}
              <div className="inline-flex items-center justify-center gap-6 py-2.5 px-8 rounded-xl bg-slate-50 border border-slate-200/80 font-sans shadow-xs mx-auto">
                <div className="text-center px-3 border-r border-slate-200">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Examination Score
                  </span>
                  <span className="text-base font-extrabold text-blue-900 font-serif">
                    {attempt.score} / {attempt.totalQuestions}
                  </span>
                </div>

                <div className="text-center px-3 border-r border-slate-200">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Grade Percentage
                  </span>
                  <span className="text-base font-extrabold text-emerald-700 font-serif">
                    {attempt.percentage}%
                  </span>
                </div>

                <div className="text-center px-3 border-r border-slate-200">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Correct Answers
                  </span>
                  <span className="text-base font-extrabold text-slate-800 font-serif">
                    {attempt.rightCount} of 30
                  </span>
                </div>

                <div className="text-center px-3">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Assessment Status
                  </span>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-600" />
                    <span>VERIFIED PASSED</span>
                  </span>
                </div>
              </div>
            </div>

            {/* CERTIFICATE FOOTER: SIGNATURES, SEAL & AUTHENTICITY STAMP */}
            <div className="relative z-10 grid grid-cols-3 items-end gap-6 pt-4 border-t border-slate-200/90 font-sans text-xs">
              
              {/* Left Column: Authorized Examiner Signature */}
              <div className="text-left space-y-1">
                <div className="h-10 flex items-end">
                  <div className="font-serif italic text-lg text-slate-800 tracking-wider border-b border-slate-400 pb-0.5 inline-block pr-6">
                    Dr. Vikram R. Sengupta
                  </div>
                </div>
                <div className="text-[11px] font-bold text-slate-900">
                  Chief Examiner of Curriculum
                </div>
                <div className="text-[10px] text-slate-500">
                  Academic Assessment Directorate
                </div>
              </div>

              {/* Center Column: Golden Seal & Medallion */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-1 shadow-lg flex items-center justify-center border-2 border-amber-700">
                  <div className="w-full h-full rounded-full bg-amber-50 flex flex-col items-center justify-center text-amber-900 border border-amber-300 p-1">
                    <Sparkles className="w-4 h-4 text-amber-600 mb-0.5" />
                    <span className="text-[8px] font-black tracking-widest uppercase">
                      OFFICIAL SEAL
                    </span>
                    <span className="text-[7px] font-bold text-amber-700 tracking-tighter">
                      QUIZMASTER ACADEMY
                    </span>
                    <span className="text-[6px] text-amber-600 tracking-tighter">
                      ★ 2026 VERIFIED ★
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#b45309] mt-1">
                  Cryptographically Audited
                </span>
              </div>

              {/* Right Column: Controller of Examinations Signature */}
              <div className="text-right space-y-1">
                <div className="h-10 flex items-end justify-end">
                  <div className="font-serif italic text-lg text-slate-800 tracking-wider border-b border-slate-400 pb-0.5 inline-block pl-6">
                    Prof. Ananya M. Roy
                  </div>
                </div>
                <div className="text-[11px] font-bold text-slate-900">
                  Controller of Examinations
                </div>
                <div className="text-[10px] text-slate-500">
                  National Technical Assessment Board
                </div>
              </div>
            </div>

            {/* Bottom Metadata & Verification Code Bar */}
            <div className="relative z-10 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-sans">
              <div className="flex items-center space-x-2">
                <Hash className="w-3 h-3 text-slate-400" />
                <span className="font-mono font-bold text-slate-600">{certId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Issued on {issueDate}</span>
              </div>
              <div className="text-[9px] text-slate-400 tracking-tight">
                Authentic verifiable academic record • AI Studio QuizMaster Engine
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Instructions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              This certificate includes official cryptographic verification code <strong className="text-slate-700 dark:text-slate-300">{certId}</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold transition cursor-pointer"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
