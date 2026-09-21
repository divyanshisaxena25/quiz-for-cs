import { VisitorMetrics, VisitorRecord } from '../types';

export const recordVisitorLogin = async (data: {
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google' | 'linkedin';
}): Promise<void> => {
  try {
    const userAgent = navigator.userAgent;
    let deviceInfo = 'Desktop Browser';
    if (/android/i.test(userAgent)) deviceInfo = 'Android Mobile';
    else if (/iphone|ipad|ipod/i.test(userAgent)) deviceInfo = 'iOS Mobile';
    else if (/macintosh/i.test(userAgent)) deviceInfo = 'MacOS';
    else if (/windows/i.test(userAgent)) deviceInfo = 'Windows PC';
    else if (/linux/i.test(userAgent)) deviceInfo = 'Linux';

    await fetch('/api/visitors/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, deviceInfo })
    });
  } catch (err) {
    console.warn('Could not record visitor login to server:', err);
  }
};

export const recordVisitorQuizCompleted = async (data: {
  email: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}): Promise<void> => {
  try {
    await fetch('/api/visitors/quiz-completed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.warn('Could not record visitor quiz score to server:', err);
  }
};

export const fetchVisitorsData = async (): Promise<{
  metrics: VisitorMetrics;
  visitors: VisitorRecord[];
}> => {
  try {
    const res = await fetch('/api/visitors');
    if (!res.ok) throw new Error('Failed to fetch from /api/visitors');
    return await res.json();
  } catch (err) {
    console.warn('Falling back to local fallback data:', err);
    return {
      metrics: {
        totalVisitors: 0,
        totalLogins: 0,
        googleCount: 0,
        linkedinCount: 0,
        totalQuizzesTaken: 0,
        averageScore: 0,
        activeToday: 0
      },
      visitors: []
    };
  }
};

export const deleteVisitorRecord = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`/api/visitors/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    console.error('Error deleting visitor:', err);
    return false;
  }
};
