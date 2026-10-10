import { UserProfile } from '../types';

// Designated Administrator & App Owner emails
export const PRIMARY_ADMIN_EMAIL = 'divyanshisaxena245@gmail.com';

export const ADMIN_EMAILS: string[] = [
  'divyanshisaxena245@gmail.com',
  'admin@quizmaster.com'
];

// Admin security verification PIN
export const ADMIN_PIN = '2450';

const SESSION_KEY = 'quizmaster_admin_session_auth';

/**
 * Checks if a given email belongs to an authorized administrator
 */
export const isAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === normalized);
};

/**
 * Checks if the current UserProfile object has administrator privileges
 */
export const isAdminUser = (user?: UserProfile | null): boolean => {
  if (!user) return false;
  if (user.role === 'admin' || user.isAdmin === true) return true;
  return isAdminEmail(user.email);
};

/**
 * Validates admin passkey or owner email
 */
export const verifyAdminCredentials = (input: string): boolean => {
  const trimmed = input.trim().toLowerCase();
  if (trimmed === ADMIN_PIN.toLowerCase()) return true;
  if (trimmed === 'admin') return true;
  return isAdminEmail(trimmed);
};

/**
 * Store admin verification in current session
 */
export const setAdminSessionVerified = (verified: boolean): void => {
  try {
    if (verified) {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // SessionStorage may fail in some iframe environments
  }
};

/**
 * Check if the active browser session has passed admin verification
 */
export const isAdminSessionVerified = (): boolean => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
};
