import { QuizAttempt, UserProfile } from '../types';

const USER_KEY = 'quizmaster_user';
const ATTEMPTS_KEY = 'quizmaster_attempts';

export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    // Invalidate stale developer account so visiting users always see their own account
    if (user?.email === 'divyanshisaxena245@gmail.com' || user?.name === 'Divyanshi Saxena') {
      localStorage.removeItem(USER_KEY);
      return null;
    }
    return user;
  } catch (err) {
    console.error('Failed to load user from storage', err);
    return null;
  }
}

export function setStoredUser(user: UserProfile | null): void {
  try {
    if (!user) {
      localStorage.removeItem(USER_KEY);
    } else {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Failed to save user to storage', err);
  }
}

export function getStoredAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load attempts from storage', err);
    return [];
  }
}

export function saveAttempt(attempt: QuizAttempt): void {
  try {
    const current = getStoredAttempts();
    const updated = [attempt, ...current];
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save quiz attempt', err);
  }
}
