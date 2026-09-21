import { Question, SubjectId, SubjectInfo } from '../types';
import { DBMS_QUESTIONS } from './questions/dbms';
import { DAA_QUESTIONS } from './questions/daa';
import { WEB_QUESTIONS } from './questions/web';
import { MATHS4_QUESTIONS } from './questions/maths4';
import { PYTHON_QUESTIONS } from './questions/python';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'dbms',
    name: 'DBMS',
    fullName: 'Database Management Systems',
    code: 'CS-401',
    description: 'Relational algebra, SQL, Normalization, ACID transactions, 2PL concurrency, B+ trees & recovery.',
    iconName: 'Database',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    borderColor: 'border-blue-200 dark:border-blue-800',
    totalPoolQuestions: 40
  },
  {
    id: 'daa',
    name: 'DAA',
    fullName: 'Design & Analysis of Algorithms',
    code: 'CS-402',
    description: 'Asymptotics, Divide & Conquer, Dynamic Programming, Greedy, Graph algorithms & NP-completeness.',
    iconName: 'Binary',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
    totalPoolQuestions: 40
  },
  {
    id: 'web',
    name: 'Web Technology',
    fullName: 'Web Technology & Architecture',
    code: 'IT-403',
    description: 'HTML5/CSS3, JavaScript DOM & Event Loop, HTTP/REST protocols, WebSockets, Security & CORS.',
    iconName: 'Globe',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    totalPoolQuestions: 40
  },
  {
    id: 'maths4',
    name: 'Maths 4',
    fullName: 'Engineering Mathematics IV',
    code: 'MA-404',
    description: 'Numerical methods, Runge-Kutta RK4, Probability distributions, Hypothesis testing & Complex analysis.',
    iconName: 'Sigma',
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    borderColor: 'border-rose-200 dark:border-rose-800',
    totalPoolQuestions: 40
  },
  {
    id: 'python',
    name: 'Python',
    fullName: 'Python Programming',
    code: 'CS-405',
    description: 'Mutability, Generators, Closures & Decorators, OOP & MRO, CPython GIL, Memory management & built-ins.',
    iconName: 'Code2',
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-50 dark:bg-violet-950/40',
    borderColor: 'border-violet-200 dark:border-violet-800',
    totalPoolQuestions: 40
  }
];

export const QUESTION_BANKS: Record<SubjectId, Question[]> = {
  dbms: DBMS_QUESTIONS,
  daa: DAA_QUESTIONS,
  web: WEB_QUESTIONS,
  maths4: MATHS4_QUESTIONS,
  python: PYTHON_QUESTIONS
};

/**
 * Randomly selects 30 distinct questions from the 40-question pool of the given subject.
 * Uses Fisher-Yates algorithm to ensure uniform distribution and zero repeats.
 */
export function getRandom30Questions(subject: SubjectId): Question[] {
  const pool = QUESTION_BANKS[subject] || [];
  if (pool.length < 30) {
    throw new Error(`Subject ${subject} requires at least 30 questions in the pool.`);
  }

  // Clone array to avoid mutating source
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Exactly 30 unique questions without repetition
  return shuffled.slice(0, 30);
}

export function getSubjectById(subjectId: SubjectId): SubjectInfo {
  const found = SUBJECTS.find(s => s.id === subjectId);
  return found || SUBJECTS[0];
}
