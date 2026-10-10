export type SubjectId = 'dbms' | 'daa' | 'web' | 'maths4' | 'python';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  fullName: string;
  code: string;
  description: string;
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  totalPoolQuestions: number;
}

export interface Question {
  id: string;
  subject: SubjectId;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google' | 'linkedin';
  loggedInAt: string;
  isAdmin?: boolean;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  subject: SubjectId;
  subjectName: string;
  completedAt: string;
  durationSeconds: number; // Time taken by user in seconds
  totalQuestions: number; // Exactly 30
  rightCount: number; // Correct answers
  wrongCount: number; // Incorrect answers
  unattemptedCount: number; // Not answered
  score: number; // e.g. 26/30
  percentage: number;
  questions: Question[]; // The 30 questions chosen for this attempt
  userAnswers: Record<string, number>; // questionId -> selectedOptionIndex (0-3)
}

export type AppView = 
  | 'login'
  | 'dashboard'
  | 'quiz'
  | 'result'
  | 'detailed_analysis'
  | 'study_analysis'
  | 'developer_portal';

export interface VisitorQuizSummary {
  id: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

export interface EmailNotificationLog {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  sentAt: string;
  status: 'delivered' | 'simulated' | 'failed';
  provider: string;
  deviceInfo?: string;
  messagePreview?: string;
}

export interface LoginHistoryEntry {
  id: string;
  userId?: string;
  userName: string;
  email: string;
  provider: 'google' | 'linkedin';
  loginAt: string;
  deviceInfo?: string;
  emailSent: boolean;
}

export interface VisitorRecord {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google' | 'linkedin';
  firstLoginAt: string;
  lastActiveAt: string;
  loginCount: number;
  quizzesAttempted: number;
  averageScore?: number;
  highestScore?: number;
  lastQuizSubject?: string;
  lastQuizScore?: number;
  deviceInfo?: string;
  recentQuizzes?: VisitorQuizSummary[];
  loginHistory?: LoginHistoryEntry[];
  emailLogs?: EmailNotificationLog[];
}

export interface VisitorMetrics {
  totalVisitors: number;
  totalLogins: number;
  googleCount: number;
  linkedinCount: number;
  totalQuizzesTaken: number;
  averageScore: number;
  activeToday: number;
  totalEmailsSent?: number;
}

