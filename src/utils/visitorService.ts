import { VisitorMetrics, VisitorRecord, EmailNotificationLog, LoginHistoryEntry } from '../types';
import { 
  db, 
  auth, 
  doc, 
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';

export const recordVisitorLogin = async (data: {
  userId?: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google' | 'linkedin';
}): Promise<{ success: boolean; emailLog?: EmailNotificationLog | null }> => {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser';
  let deviceInfo = 'Desktop Browser';
  if (/android/i.test(userAgent)) deviceInfo = 'Android Mobile';
  else if (/iphone|ipad|ipod/i.test(userAgent)) deviceInfo = 'iOS Mobile';
  else if (/macintosh/i.test(userAgent)) deviceInfo = 'MacOS';
  else if (/windows/i.test(userAgent)) deviceInfo = 'Windows PC';
  else if (/linux/i.test(userAgent)) deviceInfo = 'Linux';

  const currentUid = auth.currentUser?.uid || data.userId || `usr_${Date.now()}`;
  const now = new Date().toISOString();

  // 1. Sync to Firestore (users and login_logs)
  try {
    const userDocRef = doc(db, 'users', currentUid);
    await setDoc(userDocRef, {
      uid: currentUid,
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
      role: data.email.toLowerCase() === 'divyanshisaxena245@gmail.com' ? 'developer' : 'student',
      provider: data.provider,
      lastLoginAt: now,
      deviceInfo,
      createdAt: now
    }, { merge: true });

    // Store in login_logs collection for audit history
    const logId = `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    await setDoc(doc(db, 'login_logs', logId), {
      id: logId,
      userId: currentUid,
      userName: data.name,
      email: data.email,
      provider: data.provider,
      loginAt: now,
      deviceInfo,
      emailDispatched: true
    });
  } catch (err) {
    console.debug('Firestore user/login_logs record notice:', err);
  }

  // 2. Sync to backend API endpoint (triggers automatic email alert to user and stores in visitors.json)
  try {
    const response = await fetch('/api/visitors/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, userId: currentUid, deviceInfo })
    });
    if (response.ok) {
      const resData = await response.json();
      return { success: true, emailLog: resData.emailLog };
    }
  } catch (err) {
    console.warn('Could not record visitor login to local server:', err);
  }

  return { success: true };
};

export const recordVisitorQuizCompleted = async (data: {
  userId?: string;
  email: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds?: number;
}): Promise<void> => {
  // 1. Sync to Firestore quiz_attempts
  try {
    const uid = auth.currentUser?.uid || data.userId || `usr_${Date.now()}`;
    const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const attemptRef = doc(db, 'quiz_attempts', attemptId);
    await setDoc(attemptRef, {
      attemptId,
      userId: uid,
      userName: auth.currentUser?.displayName || data.email.split('@')[0],
      userEmail: data.email,
      category: data.subjectName,
      score: Number(data.score),
      totalQuestions: Number(data.totalQuestions),
      percentage: Number(data.percentage),
      timeSpentSeconds: Number(data.timeSpentSeconds || 0),
      completedAt: new Date().toISOString()
    });
  } catch (err) {
    console.debug('Firestore quiz attempt notice:', err);
  }

  // 2. Sync to server API
  try {
    await fetch('/api/visitors/quiz-completed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.warn('Could not record visitor quiz score to local server:', err);
  }
};

export const fetchVisitorsData = async (): Promise<{
  metrics: VisitorMetrics;
  visitors: VisitorRecord[];
  emailLogs?: EmailNotificationLog[];
}> => {
  // First try fetching from API server
  try {
    const res = await fetch('/api/visitors');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.debug('Falling back to Firestore from /api/visitors:', err);
  }

  // Fallback: Read directly from Firestore
  try {
    const usersSnap = await getDocs(collection(db, 'users'));
    const visitorsList: VisitorRecord[] = [];
    usersSnap.forEach(d => {
      const u = d.data();
      visitorsList.push({
        id: d.id,
        name: u.name || 'User',
        email: u.email || '',
        avatarUrl: u.avatarUrl || '',
        provider: u.provider || 'google',
        firstLoginAt: u.createdAt || new Date().toISOString(),
        lastActiveAt: u.lastLoginAt || new Date().toISOString(),
        loginCount: 1,
        quizzesAttempted: 0,
        deviceInfo: u.deviceInfo || 'Browser'
      });
    });

    return {
      metrics: {
        totalVisitors: visitorsList.length,
        totalLogins: visitorsList.length,
        googleCount: visitorsList.filter(v => v.provider === 'google').length,
        linkedinCount: visitorsList.filter(v => v.provider === 'linkedin').length,
        totalQuizzesTaken: 0,
        averageScore: 0,
        activeToday: visitorsList.length,
        totalEmailsSent: visitorsList.length
      },
      visitors: visitorsList,
      emailLogs: []
    };
  } catch (err) {
    console.debug('Firestore fallback fetch note:', err);
  }

  return {
    metrics: {
      totalVisitors: 0,
      totalLogins: 0,
      googleCount: 0,
      linkedinCount: 0,
      totalQuizzesTaken: 0,
      averageScore: 0,
      activeToday: 0,
      totalEmailsSent: 0
    },
    visitors: [],
    emailLogs: []
  };
};

export const sendAdminTestEmail = async (targetEmail: string, name?: string): Promise<boolean> => {
  try {
    const res = await fetch('/api/admin/send-test-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetEmail, name })
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to send test email:', err);
    return false;
  }
};

export const deleteVisitorRecord = async (id: string): Promise<boolean> => {
  // Delete from Firestore if present
  try {
    await deleteDoc(doc(db, 'visitors', id));
    await deleteDoc(doc(db, 'users', id));
  } catch (err) {
    console.debug('Firestore delete doc notice:', err);
  }

  try {
    const res = await fetch(`/api/visitors/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    console.error('Error deleting visitor from server:', err);
    return false;
  }
};
