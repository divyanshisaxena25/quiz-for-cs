import jsPDF from 'jspdf';
import { QuizAttempt, UserProfile } from '../types';

/**
 * Generates an official, clean, vector-rendered landscape A4 Certificate PDF directly
 * using jsPDF primitives as an instant, zero-delay download method.
 */
export function generateDirectCertificatePDF(attempt: QuizAttempt, user?: UserProfile | null, customStudentName?: string) {
  const studentName = customStudentName || user?.name || 'Student';
  const certId = `QM-CERT-${new Date(attempt.completedAt).getFullYear()}-${(attempt.id || 'QM').slice(0, 8).toUpperCase()}`;
  const issueDate = new Date(attempt.completedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // A4 Landscape: 297mm width x 210mm height
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer Dark Border
  doc.setDrawColor(15, 23, 42); // slate-900
  doc.setLineWidth(4);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Inner Gold Filigree Border
  doc.setDrawColor(217, 119, 6); // amber-600
  doc.setLineWidth(1.2);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Faint secondary inner border
  doc.setDrawColor(245, 158, 11); // amber-500
  doc.setLineWidth(0.4);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // Corner Accents
  doc.setDrawColor(180, 83, 9); // amber-700
  doc.setLineWidth(1.5);
  // Top-left
  doc.line(16, 16, 28, 16);
  doc.line(16, 16, 16, 28);
  // Top-right
  doc.line(pageWidth - 16, 16, pageWidth - 28, 16);
  doc.line(pageWidth - 16, 16, pageWidth - 16, 28);
  // Bottom-left
  doc.line(16, pageHeight - 16, 28, pageHeight - 16);
  doc.line(16, pageHeight - 16, 16, pageHeight - 28);
  // Bottom-right
  doc.line(pageWidth - 16, pageHeight - 16, pageWidth - 28, pageHeight - 16);
  doc.line(pageWidth - 16, pageHeight - 16, pageWidth - 16, pageHeight - 28);

  // Header Institution
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('QUIZMASTER EXAMINATION DIRECTORATE', pageWidth / 2, 28, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(217, 119, 6);
  doc.text('STANDARDIZED ACADEMIC ASSESSMENT AUTHORITY • CURRICULUM BOARD', pageWidth / 2, 34, { align: 'center' });

  // Gold separator line
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.line(pageWidth / 2 - 50, 37, pageWidth / 2 + 50, 37);

  // Main Title
  const isHighScorer = attempt.percentage >= 85;
  const certTitle = isHighScorer ? 'CERTIFICATE OF ACADEMIC EXCELLENCE' : 'CERTIFICATE OF COMPLETION';
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text(certTitle, pageWidth / 2, 49, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(
    isHighScorer ? 'CONFERRED WITH HIGHEST DISTINCTION & HONORS' : 'OFFICIAL RECORD OF PROCTORED EXAMINATION COMPLETION',
    pageWidth / 2,
    55,
    { align: 'center' }
  );

  // Citation lead
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text('This is to officially certify that', pageWidth / 2, 69, { align: 'center' });

  // Recipient Name
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(15, 23, 42);
  doc.text(studentName, pageWidth / 2, 82, { align: 'center' });

  // Underline beneath recipient name
  const nameWidth = doc.getTextWidth(studentName);
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - (nameWidth / 2) - 10, 85, pageWidth / 2 + (nameWidth / 2) + 10, 85);

  if (user?.email) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Candidate Account: ${user.email}`, pageWidth / 2, 90, { align: 'center' });
  }

  // Course & Assessment Description
  doc.setFont('times', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  const examDescription = `has successfully undertaken and completed the comprehensive 30-minute proctored examination in`;
  doc.text(examDescription, pageWidth / 2, 101, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 58, 138); // blue-900
  doc.text(attempt.subjectName, pageWidth / 2, 110, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('comprising 30 rigorous MCQs with zero repeating questions under official evaluation guidelines.', pageWidth / 2, 117, { align: 'center' });

  // Performance Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.roundedRect(pageWidth / 2 - 80, 124, 160, 22, 3, 3, 'FD');

  // Box Metrics
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('SCORE ACHIEVED', pageWidth / 2 - 50, 131, { align: 'center' });
  doc.text('GRADE ACCURACY', pageWidth / 2 - 5, 131, { align: 'center' });
  doc.text('CORRECT ANSWERS', pageWidth / 2 + 45, 131, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 138);
  doc.text(`${attempt.score} / ${attempt.totalQuestions}`, pageWidth / 2 - 50, 140, { align: 'center' });

  doc.setTextColor(4, 120, 87); // emerald-700
  doc.text(`${attempt.percentage}%`, pageWidth / 2 - 5, 140, { align: 'center' });

  doc.setTextColor(15, 23, 42);
  doc.text(`${attempt.rightCount} of 30`, pageWidth / 2 + 45, 140, { align: 'center' });

  // Divider lines inside metrics box
  doc.setDrawColor(226, 232, 240);
  doc.line(pageWidth / 2 - 28, 127, pageWidth / 2 - 28, 143);
  doc.line(pageWidth / 2 + 20, 127, pageWidth / 2 + 20, 143);

  // Signatures & Gold Seal Section
  // Left: Examiner
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Dr. Vikram R. Sengupta', 50, 168, { align: 'center' });
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.4);
  doc.line(25, 171, 75, 171);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Chief Examiner of Curriculum', 50, 176, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Academic Assessment Directorate', 50, 180, { align: 'center' });

  // Center: Seal Medallion Representation
  doc.setDrawColor(217, 119, 6);
  doc.setFillColor(254, 243, 199);
  doc.circle(pageWidth / 2, 172, 13, 'FD');
  doc.circle(pageWidth / 2, 172, 11.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(180, 83, 9);
  doc.text('OFFICIAL SEAL', pageWidth / 2, 170, { align: 'center' });
  doc.text('QUIZMASTER', pageWidth / 2, 173, { align: 'center' });
  doc.setFontSize(5);
  doc.text('VERIFIED 2026', pageWidth / 2, 176, { align: 'center' });

  // Right: Controller of Examinations
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Prof. Ananya M. Roy', pageWidth - 50, 168, { align: 'center' });
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.4);
  doc.line(pageWidth - 75, 171, pageWidth - 25, 171);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Controller of Examinations', pageWidth - 50, 176, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('National Technical Assessment Board', pageWidth - 50, 180, { align: 'center' });

  // Footer metadata
  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`CERTIFICATE ID: ${certId}`, 18, 196);
  doc.text(`ISSUED: ${issueDate}`, pageWidth / 2, 196, { align: 'center' });
  doc.text('CRYPTOGRAPHICALLY VERIFIED CREDENTIAL', pageWidth - 18, 196, { align: 'right' });

  // Trigger Save
  const cleanSubject = attempt.subjectName.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanStudent = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`QuizMaster_Certificate_${cleanSubject}_${cleanStudent}.pdf`);
}
