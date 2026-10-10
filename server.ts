import express from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to data files for durable visitor and email persistence
const DATA_DIR = path.join(process.cwd(), 'data');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');
const EMAILS_FILE = path.join(DATA_DIR, 'sent_emails.json');

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

interface LoginHistoryEntry {
  id: string;
  userId?: string;
  userName: string;
  email: string;
  provider: 'google' | 'linkedin';
  loginAt: string;
  deviceInfo?: string;
  emailSent: boolean;
}

interface EmailNotificationLog {
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
  loginHistory?: LoginHistoryEntry[];
  emailLogs?: EmailNotificationLog[];
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
    ],
    loginHistory: [
      {
        id: 'lh_1',
        userName: 'Aarav Sharma',
        email: 'aarav.sharma@gmail.com',
        provider: 'google',
        loginAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        deviceInfo: 'Chrome on MacOS',
        emailSent: true
      }
    ],
    emailLogs: [
      {
        id: 'eml_seed_1',
        recipientEmail: 'aarav.sharma@gmail.com',
        recipientName: 'Aarav Sharma',
        subject: 'Security Alert: New Sign-In to QuizMaster Engine',
        sentAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'delivered',
        provider: 'google',
        deviceInfo: 'Chrome on MacOS',
        messagePreview: 'Hello Aarav, your Google account successfully signed in to QuizMaster Engine.'
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
    ],
    loginHistory: [
      {
        id: 'lh_2',
        userName: 'Pooja Verma',
        email: 'pooja.verma.eng@linkedin.com',
        provider: 'linkedin',
        loginAt: new Date(Date.now() - 1800000).toISOString(),
        deviceInfo: 'Edge on Windows',
        emailSent: true
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

function loadEmailLogs(): EmailNotificationLog[] {
  try {
    if (fs.existsSync(EMAILS_FILE)) {
      const content = fs.readFileSync(EMAILS_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (Array.isArray(data)) {
        return data;
      }
    }
    const seedLogs: EmailNotificationLog[] = [
      {
        id: 'eml_init_1',
        recipientEmail: 'aarav.sharma@gmail.com',
        recipientName: 'Aarav Sharma',
        subject: 'Security Alert: New Sign-In to QuizMaster Engine',
        sentAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'delivered',
        provider: 'google',
        deviceInfo: 'Chrome on MacOS',
        messagePreview: 'Google Sign-In verified. Welcome back to QuizMaster Engine.'
      }
    ];
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(seedLogs, null, 2));
    return seedLogs;
  } catch (err) {
    console.error('Error reading emails file:', err);
    return [];
  }
}

function saveEmailLogs(emails: EmailNotificationLog[]): void {
  try {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
  } catch (err) {
    console.error('Error saving emails file:', err);
  }
}

// -------------------------------------------------------------
// Email Notification Service using Nodemailer
// -------------------------------------------------------------
async function sendLoginAlertEmail(params: {
  toEmail: string;
  userName: string;
  provider: string;
  deviceInfo: string;
  loginTime: string;
  loginCount: number;
  totalQuizzes: number;
  avgScore?: number;
}): Promise<EmailNotificationLog> {
  const { toEmail, userName, provider, deviceInfo, loginTime, loginCount, totalQuizzes, avgScore } = params;
  const emailId = `eml_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const formattedTime = new Date(loginTime).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium'
  });

  const subject = `Security Alert: New Sign-In from your ${provider === 'google' ? 'Google' : 'LinkedIn'} account`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
        .card { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 24px; text-align: center; color: white; }
        .logo { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .content { padding: 32px 24px; }
        .badge { display: inline-block; padding: 4px 12px; background: #ecfdf5; color: #059669; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px; }
        .info-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; }
        .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; font-size: 14px; }
        .info-row:last-child { border-bottom: none; }
        .info-label { color: #64748b; font-weight: 500; }
        .info-value { color: #0f172a; font-weight: 600; text-align: right; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 20px 0; text-align: center; }
        .stat-card { background: #f1f5f9; padding: 12px 8px; border-radius: 8px; }
        .stat-num { font-size: 18px; font-weight: 800; color: #2563eb; }
        .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="logo">⚡ QuizMaster Engine</div>
          <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">CS Engineering Examination Portal</p>
        </div>
        <div class="content">
          <span class="badge">Security Notification</span>
          <h2 style="margin: 0 0 12px; font-size: 20px; font-weight: 700; color: #0f172a;">Hello, ${userName}!</h2>
          <p style="margin: 0 0 16px; color: #475569; font-size: 15px; line-height: 1.5;">
            We noticed a successful sign-in to your QuizMaster account using <strong>${provider === 'google' ? 'Google Authentication' : 'LinkedIn Authentication'}</strong>.
          </p>

          <div class="info-box">
            <div class="info-row">
              <span class="info-label">Account Email</span>
              <span class="info-value">${toEmail}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Time & Date</span>
              <span class="info-value">${formattedTime}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Sign-In Method</span>
              <span class="info-value">${provider === 'google' ? 'Google OAuth 2.0' : 'LinkedIn'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Device / Browser</span>
              <span class="info-value">${deviceInfo}</span>
            </div>
          </div>

          <h3 style="font-size: 14px; text-transform: uppercase; color: #64748b; margin: 24px 0 8px; letter-spacing: 0.5px;">Your Portal History & Stats</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-num">${loginCount}</div>
              <div class="stat-label">Total Logins</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">${totalQuizzes}</div>
              <div class="stat-label">Quizzes Completed</div>
            </div>
            <div class="stat-card">
              <div class="stat-num">${avgScore !== undefined && avgScore > 0 ? avgScore + '%' : 'N/A'}</div>
              <div class="stat-label">Avg. Score</div>
            </div>
          </div>

          <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin-top: 20px;">
            If this was you, no action is needed! You can continue testing your skills across DBMS, DAA, Web Tech, Maths-IV, and Python.
          </p>
        </div>
        <div class="footer">
          QuizMaster Engine Security Team • This is an automated notification sent whenever your account accesses the test portal.
        </div>
      </div>
    </body>
    </html>
  `;

  let deliveryStatus: 'delivered' | 'simulated' | 'failed' = 'simulated';

  // Check if real SMTP credentials are provided in env vars
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"QuizMaster Security" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: toEmail,
        subject,
        html: htmlBody
      });
      deliveryStatus = 'delivered';
      console.log(`[Email Dispatcher] Real email delivered to ${toEmail}`);
    } catch (err) {
      console.error('[Email Dispatcher] Failed to deliver real SMTP email:', err);
      deliveryStatus = 'simulated';
    }
  } else {
    // Development / Sandbox mode: create an ephemeral Ethereal test account or local dispatch log
    try {
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });

      const info = await transporter.sendMail({
        from: '"QuizMaster Security" <security@quizmaster-engine.internal>',
        to: toEmail,
        subject,
        html: htmlBody
      });
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[Email Dispatcher] Dispatched login alert to ${toEmail}. Ethereal Preview: ${previewUrl}`);
      deliveryStatus = 'delivered';
    } catch (testErr) {
      console.log(`[Email Dispatcher] Logged dispatch for ${toEmail} (simulated sandbox delivery)`);
      deliveryStatus = 'simulated';
    }
  }

  const logEntry: EmailNotificationLog = {
    id: emailId,
    recipientEmail: toEmail,
    recipientName: userName,
    subject,
    sentAt: loginTime,
    status: deliveryStatus,
    provider,
    deviceInfo,
    messagePreview: `Login security confirmation dispatched to ${toEmail}. Stats: ${loginCount} logins, ${totalQuizzes} quizzes.`
  };

  // Save to persistent file
  const allLogs = loadEmailLogs();
  allLogs.unshift(logEntry);
  if (allLogs.length > 50) allLogs.splice(50);
  saveEmailLogs(allLogs);

  return logEntry;
}

// -------------------------------------------------------------
// API Endpoints for Visitor & Login Tracking
// -------------------------------------------------------------

// Record a new login or activity and send confirmation mail
app.post('/api/visitors/record', async (req, res) => {
  try {
    const { name, email, avatarUrl, provider, deviceInfo, userId } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const visitors = loadVisitors();
    const normalizedEmail = email.trim().toLowerCase();
    const now = new Date().toISOString();

    let record = visitors.find(v => v.email.toLowerCase() === normalizedEmail);
    const resolvedName = name?.trim() || email.split('@')[0];
    const resolvedProvider = provider === 'linkedin' ? 'linkedin' : 'google';
    const resolvedDevice = deviceInfo || 'Web Browser';

    let isNewLogin = true;

    if (record) {
      // Update existing record
      record.lastActiveAt = now;
      record.loginCount = (record.loginCount || 1) + 1;
      if (name && (!record.name || record.name.startsWith('Student') || record.name.startsWith('Guest'))) {
        record.name = resolvedName;
      }
      if (avatarUrl) record.avatarUrl = avatarUrl;
      if (provider) record.provider = resolvedProvider;
      if (deviceInfo) record.deviceInfo = resolvedDevice;
      if (!record.loginHistory) record.loginHistory = [];
      if (!record.emailLogs) record.emailLogs = [];
    } else {
      // Create new visitor entry
      const newVisitor: VisitorRecord = {
        id: userId || `vis_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: resolvedName,
        email: email.trim(),
        avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(resolvedName)}`,
        provider: resolvedProvider,
        firstLoginAt: now,
        lastActiveAt: now,
        loginCount: 1,
        quizzesAttempted: 0,
        deviceInfo: resolvedDevice,
        recentQuizzes: [],
        loginHistory: [],
        emailLogs: []
      };
      visitors.unshift(newVisitor);
      record = newVisitor;
    }

    // 1. Record Login Event in history
    const historyEntry: LoginHistoryEntry = {
      id: `lh_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: record.id,
      userName: record.name,
      email: record.email,
      provider: record.provider,
      loginAt: now,
      deviceInfo: resolvedDevice,
      emailSent: true
    };
    if (!record.loginHistory) record.loginHistory = [];
    record.loginHistory.unshift(historyEntry);
    if (record.loginHistory.length > 20) record.loginHistory.splice(20);

    // 2. Dispatch Email alert to user
    let emailLog: EmailNotificationLog | null = null;
    try {
      emailLog = await sendLoginAlertEmail({
        toEmail: record.email,
        userName: record.name,
        provider: record.provider,
        deviceInfo: resolvedDevice,
        loginTime: now,
        loginCount: record.loginCount,
        totalQuizzes: record.quizzesAttempted || 0,
        avgScore: record.averageScore
      });

      if (!record.emailLogs) record.emailLogs = [];
      record.emailLogs.unshift(emailLog);
      if (record.emailLogs.length > 20) record.emailLogs.splice(20);
    } catch (emailErr) {
      console.error('Email dispatch error:', emailErr);
    }

    saveVisitors(visitors);
    return res.json({ success: true, visitor: record, emailLog });
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

// Get all visitors, metrics, and email logs (For Developer/Admin Portal)
app.get('/api/visitors', (req, res) => {
  try {
    const visitors = loadVisitors();
    const emailLogs = loadEmailLogs();
    
    // Sort by most recently active
    visitors.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());

    const totalVisitors = visitors.length;
    const totalLogins = visitors.reduce((sum, v) => sum + (v.loginCount || 1), 0);
    const googleCount = visitors.filter(v => v.provider === 'google').length;
    const linkedinCount = visitors.filter(v => v.provider === 'linkedin').length;
    const totalQuizzesTaken = visitors.reduce((sum, v) => sum + (v.quizzesAttempted || 0), 0);
    const totalEmailsSent = emailLogs.length;

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
        activeToday,
        totalEmailsSent
      },
      visitors,
      emailLogs
    });
  } catch (err) {
    console.error('Failed to fetch visitors:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin can trigger a manual test email dispatch
app.post('/api/admin/send-test-email', async (req, res) => {
  try {
    const { targetEmail, name } = req.body;
    if (!targetEmail) return res.status(400).json({ error: 'targetEmail required' });

    const logEntry = await sendLoginAlertEmail({
      toEmail: targetEmail,
      userName: name || targetEmail.split('@')[0],
      provider: 'google',
      deviceInfo: 'Admin Test Console',
      loginTime: new Date().toISOString(),
      loginCount: 1,
      totalQuizzes: 0
    });

    return res.json({ success: true, logEntry });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send test email' });
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
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QuizMaster Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
