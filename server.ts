import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to data file for durable visitor persistence
const DATA_DIR = path.join(process.cwd(), 'data');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface VisitorQuizSummary {
  id: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

interface VisitorRecord {
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
}

// Initial sample seed so the developer has immediate sample data to inspect
const SEED_VISITORS: VisitorRecord[] = [
  {
    id: 'seed_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav%20Sharma',
    provider: 'google',
    firstLoginAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    lastActiveAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    loginCount: 4,
    quizzesAttempted: 3,
    averageScore: 82,
    highestScore: 90,
    lastQuizSubject: 'DBMS (Database Management)',
    lastQuizScore: 27,
    deviceInfo: 'Chrome on MacOS',
    recentQuizzes: [
      {
        id: 'qz_1',
        subjectName: 'DBMS (Database Management)',
        score: 27,
        totalQuestions: 30,
        percentage: 90,
        completedAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'qz_2',
        subjectName: 'DAA (Algorithms)',
        score: 24,
        totalQuestions: 30,
        percentage: 80,
        completedAt: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ]
  },
  {
    id: 'seed_2',
    name: 'Pooja Verma',
    email: 'pooja.verma.eng@linkedin.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja%20Verma',
    provider: 'linkedin',
    firstLoginAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    lastActiveAt: new Date(Date.now() - 1800000).toISOString(),
    loginCount: 2,
    quizzesAttempted: 2,
    averageScore: 88,
    highestScore: 93,
    lastQuizSubject: 'Web Technology',
    lastQuizScore: 28,
    deviceInfo: 'Edge on Windows',
    recentQuizzes: [
      {
        id: 'qz_3',
        subjectName: 'Web Technology',
        score: 28,
        totalQuestions: 30,
        percentage: 93,
        completedAt: new Date(Date.now() - 1800000).toISOString()
      }
    ]
  },
  {
    id: 'seed_3',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@gmail.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan%20Mehta',
    provider: 'google',
    firstLoginAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    lastActiveAt: new Date(Date.now() - 900000).toISOString(),
    loginCount: 1,
    quizzesAttempted: 1,
    averageScore: 76,
    highestScore: 76,
    lastQuizSubject: 'Python Programming',
    lastQuizScore: 23,
    deviceInfo: 'Safari on iPhone',
    recentQuizzes: [
      {
        id: 'qz_4',
        subjectName: 'Python Programming',
        score: 23,
        totalQuestions: 30,
        percentage: 76,
        completedAt: new Date(Date.now() - 900000).toISOString()
      }
    ]
  }
];

function loadVisitors(): VisitorRecord[] {
  try {
    if (fs.existsSync(VISITORS_FILE)) {
      const content = fs.readFileSync(VISITORS_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (Array.isArray(data)) {
        return data;
      }
    }
    // If no file exists, initialize with seed data
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(SEED_VISITORS, null, 2));
    return SEED_VISITORS;
  } catch (err) {
    console.error('Error reading visitors file:', err);
    return SEED_VISITORS;
  }
}

function saveVisitors(visitors: VisitorRecord[]): void {
  try {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(visitors, null, 2));
  } catch (err) {
    console.error('Error saving visitors file:', err);
  }
}

// -------------------------------------------------------------
// API Endpoints for Visitor & Login Tracking
// -------------------------------------------------------------

// Record a new login or activity
app.post('/api/visitors/record', (req, res) => {
  try {
    const { name, email, avatarUrl, provider, deviceInfo } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const visitors = loadVisitors();
    const normalizedEmail = email.trim().toLowerCase();

    let record = visitors.find(v => v.email.toLowerCase() === normalizedEmail);
    const now = new Date().toISOString();

    if (record) {
      // Update existing record
      record.lastActiveAt = now;
      record.loginCount = (record.loginCount || 1) + 1;
      if (name && (!record.name || record.name.startsWith('Student') || record.name.startsWith('Guest'))) {
        record.name = name.trim();
      }
      if (avatarUrl) record.avatarUrl = avatarUrl;
      if (provider) record.provider = provider;
      if (deviceInfo) record.deviceInfo = deviceInfo;
    } else {
      // Create new visitor entry
      const newVisitor: VisitorRecord = {
        id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: name?.trim() || email.split('@')[0],
        email: email.trim(),
        avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || email)}`,
        provider: provider === 'linkedin' ? 'linkedin' : 'google',
        firstLoginAt: now,
        lastActiveAt: now,
        loginCount: 1,
        quizzesAttempted: 0,
        deviceInfo: deviceInfo || 'Web Browser',
        recentQuizzes: []
      };
      visitors.unshift(newVisitor);
      record = newVisitor;
    }

    saveVisitors(visitors);
    return res.json({ success: true, visitor: record });
  } catch (err) {
    console.error('Failed to record login:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Record quiz completion and link to visitor
app.post('/api/visitors/quiz-completed', (req, res) => {
  try {
    const { email, subjectName, score, totalQuestions, percentage } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const visitors = loadVisitors();
    const normalizedEmail = email.trim().toLowerCase();
    const record = visitors.find(v => v.email.toLowerCase() === normalizedEmail);

    if (record) {
      record.quizzesAttempted = (record.quizzesAttempted || 0) + 1;
      record.lastActiveAt = new Date().toISOString();
      record.lastQuizSubject = subjectName;
      record.lastQuizScore = score;

      if (!record.recentQuizzes) {
        record.recentQuizzes = [];
      }

      record.recentQuizzes.unshift({
        id: `qz_${Date.now()}`,
        subjectName,
        score,
        totalQuestions: totalQuestions || 30,
        percentage: Math.round(percentage),
        completedAt: new Date().toISOString()
      });

      // Keep up to 10 recent quizzes
      if (record.recentQuizzes.length > 10) {
        record.recentQuizzes = record.recentQuizzes.slice(0, 10);
      }

      // Recalculate average and highest score
      const validScores = record.recentQuizzes.map(q => q.percentage);
      if (validScores.length > 0) {
        const sum = validScores.reduce((a, b) => a + b, 0);
        record.averageScore = Math.round(sum / validScores.length);
        record.highestScore = Math.max(...validScores);
      }

      saveVisitors(visitors);
      return res.json({ success: true, visitor: record });
    }

    return res.status(404).json({ error: 'Visitor record not found' });
  } catch (err) {
    console.error('Failed to record quiz:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all visitors and metrics (For Developer/Admin Portal)
app.get('/api/visitors', (req, res) => {
  try {
    const visitors = loadVisitors();
    
    // Sort by most recently active
    visitors.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());

    const totalVisitors = visitors.length;
    const totalLogins = visitors.reduce((sum, v) => sum + (v.loginCount || 1), 0);
    const googleCount = visitors.filter(v => v.provider === 'google').length;
    const linkedinCount = visitors.filter(v => v.provider === 'linkedin').length;
    const totalQuizzesTaken = visitors.reduce((sum, v) => sum + (v.quizzesAttempted || 0), 0);

    const scoresList = visitors
      .filter(v => typeof v.averageScore === 'number' && v.averageScore > 0)
      .map(v => v.averageScore as number);
    
    const averageScore = scoresList.length > 0 
      ? Math.round(scoresList.reduce((a, b) => a + b, 0) / scoresList.length) 
      : 0;

    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const activeToday = visitors.filter(v => new Date(v.lastActiveAt).getTime() > oneDayAgo).length;

    return res.json({
      metrics: {
        totalVisitors,
        totalLogins,
        googleCount,
        linkedinCount,
        totalQuizzesTaken,
        averageScore,
        activeToday
      },
      visitors
    });
  } catch (err) {
    console.error('Failed to fetch visitors:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin can delete a visitor entry
app.delete('/api/visitors/:id', (req, res) => {
  try {
    const { id } = req.params;
    let visitors = loadVisitors();
    visitors = visitors.filter(v => v.id !== id);
    saveVisitors(visitors);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete visitor' });
  }
});

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// -------------------------------------------------------------
// Vite Middleware / Static Assets
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: isHmrDisabled ? false : undefined
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // In Express 5, wildcard fallback is '*all'
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QuizMaster Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
