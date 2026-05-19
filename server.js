// ============================================================
//  server.js – Backend Instrumen Seleksi Tenaga Ahli
//  Stack: Express + better-sqlite3 + Nodemailer
// ============================================================
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');
const nodemailer = require('nodemailer');
const Database   = require('better-sqlite3');
const crypto     = require('crypto');

const app  = express();
const PORT = process.env.PORT || 4000;

// ─── KONFIGURASI ADMIN ────────────────────────────────────────
// Ubah username & password sesuai kebutuhan, atau gunakan env variable
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@2025';

// Simple in-memory token store (berlaku selama server hidup)
const activeSessions = new Map(); // token -> { username, createdAt }
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 jam

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function isValidToken(token) {
  if (!token || !activeSessions.has(token)) return false;
  const session = activeSessions.get(token);
  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

// ─── MIDDLEWARE AUTH ──────────────────────────────────────────
function requireAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (!isValidToken(token)) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Silakan login terlebih dahulu.' });
  }
  next();
}

// ─── MIDDLEWARE ───────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname)));   // serve static frontend

// ─── DATABASE SETUP ───────────────────────────────────────────
const db = new Database(path.join(__dirname, 'penilaian.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS penilaian (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nama            TEXT,
    nik             TEXT,
    bidang          TEXT,
    jabatan         TEXT,
    pendidikan      TEXT,
    tahun_kerja     INTEGER,
    institusi       TEXT,
    email           TEXT,
    skor_total      INTEGER,
    skor_sertifikat INTEGER,
    skor_portofolio INTEGER,
    skor_kompetensi INTEGER,
    status_kelayakan TEXT,
    sertifikat_json TEXT,
    portofolio_json TEXT,
    kompetensi_json TEXT,
    rekomendasi_json TEXT,
    tanggal_penilaian TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ─── EMAIL TRANSPORTER ────────────────────────────────────────
let transporter = null;

async function getTransporter() {
  if (transporter) return transporter;
  // Gunakan SMTP dari env variable jika tersedia, fallback ke Ethereal test
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('📧 SMTP produksi siap:', process.env.SMTP_HOST);
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host:   'smtp.ethereal.email',
      port:   587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('📧 Ethereal test email siap:', testAccount.user);
  }
  return transporter;
}

// ─── HELPER: Build HTML Email ─────────────────────────────────
function buildEmailHTML(data) {
  const verdictColor = data.skor_total >= 70 ? '#16a34a' : data.skor_total >= 50 ? '#d97706' : '#dc2626';
  const verdictBg    = data.skor_total >= 70 ? '#f0fdf4' : data.skor_total >= 50 ? '#fffbeb' : '#fef2f2';
  const verdictIcon  = data.skor_total >= 70 ? '✅' : data.skor_total >= 50 ? '⚠️' : '❌';

  const sertList = (() => {
    try {
      const arr = JSON.parse(data.sertifikat_json || '[]');
      if (!arr.length) return '<li>Tidak ada data sertifikat</li>';
      return arr.map(s => `<li><strong>${s.nama}</strong> — ${s.penerbit} (${s.tingkat}, ${s.tahun})</li>`).join('');
    } catch { return '<li>-</li>'; }
  })();

  const portoList = (() => {
    try {
      const arr = JSON.parse(data.portofolio_json || '[]');
      if (!arr.length) return '<li>Tidak ada data portofolio</li>';
      return arr.map(p => `<li><strong>${p.nama}</strong> — ${p.peran} | ${p.jenis} | ${p.nilai} | ${p.periode} | ${p.lokasi}</li>`).join('');
    } catch { return '<li>-</li>'; }
  })();

  const kompList = (() => {
    try {
      const obj = JSON.parse(data.kompetensi_json || '{}');
      const sipil = (obj.sipil || []).map(k => `<li>${k}</li>`).join('');
      const arsi  = (obj.arsitektur || []).map(k => `<li>${k}</li>`).join('');
      return { sipil: sipil || '<li>-</li>', arsi: arsi || '<li>-</li>' };
    } catch { return { sipil:'<li>-</li>', arsi:'<li>-</li>' }; }
  })();

  const recList = (() => {
    try {
      const arr = JSON.parse(data.rekomendasi_json || '[]');
      return arr.map(r => `<li>${r}</li>`).join('') || '<li>-</li>';
    } catch { return '<li>-</li>'; }
  })();

  return `
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Hasil Penilaian Tenaga Ahli</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:30px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10);">

  <!-- HEADER -->
  <tr><td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:32px 36px;">
    <table width="100%"><tr>
      <td><h1 style="color:#fff;margin:0;font-size:20px;font-weight:800;">🏗️ Instrumen Seleksi Tenaga Ahli Konstruksi</h1>
          <p style="color:#bfdbfe;margin:6px 0 0;font-size:13px;">Sistem Penilaian Kelayakan — Sesuai Standar LPJK / BNSP</p></td>
    </tr></table>
  </td></tr>

  <!-- VERDICT -->
  <tr><td style="padding:28px 36px 0;">
    <div style="background:${verdictBg};border:2px solid ${verdictColor};border-radius:12px;padding:20px 24px;text-align:center;">
      <div style="font-size:36px;margin-bottom:8px;">${verdictIcon}</div>
      <h2 style="color:${verdictColor};margin:0 0 6px;font-size:22px;font-weight:900;">${data.status_kelayakan}</h2>
      <p style="color:#475569;margin:0;font-size:14px;">Skor Total: <strong style="font-size:20px;color:${verdictColor};">${data.skor_total}</strong> / 100</p>
    </div>
  </td></tr>

  <!-- DATA DIRI -->
  <tr><td style="padding:24px 36px 0;">
    <h3 style="color:#1e3a8a;font-size:15px;margin:0 0 12px;border-bottom:2px solid #dbeafe;padding-bottom:8px;">📋 Data Diri Tenaga Ahli</h3>
    <table width="100%" cellpadding="6" cellspacing="0" style="font-size:13px;border-collapse:collapse;">
      <tr style="background:#f8fafc;"><td style="color:#64748b;width:40%;padding:8px 10px;border-radius:6px;">Nama Lengkap</td><td style="font-weight:700;padding:8px 10px;">${data.nama}</td></tr>
      <tr><td style="color:#64748b;padding:8px 10px;">NIK</td><td style="padding:8px 10px;">${data.nik}</td></tr>
      <tr style="background:#f8fafc;"><td style="color:#64748b;padding:8px 10px;">Bidang Keahlian</td><td style="font-weight:600;padding:8px 10px;">${data.bidang}</td></tr>
      <tr><td style="color:#64748b;padding:8px 10px;">Jabatan</td><td style="padding:8px 10px;">${data.jabatan || '-'}</td></tr>
      <tr style="background:#f8fafc;"><td style="color:#64748b;padding:8px 10px;">Pendidikan</td><td style="padding:8px 10px;">${data.pendidikan || '-'}</td></tr>
      <tr><td style="color:#64748b;padding:8px 10px;">Pengalaman Kerja</td><td style="padding:8px 10px;">${data.tahun_kerja} tahun</td></tr>
      <tr style="background:#f8fafc;"><td style="color:#64748b;padding:8px 10px;">Institusi</td><td style="padding:8px 10px;">${data.institusi || '-'}</td></tr>
      <tr><td style="color:#64748b;padding:8px 10px;">Tanggal Penilaian</td><td style="padding:8px 10px;">${data.tanggal_penilaian}</td></tr>
    </table>
  </td></tr>

  <!-- SKOR BREAKDOWN -->
  <tr><td style="padding:24px 36px 0;">
    <h3 style="color:#1e3a8a;font-size:15px;margin:0 0 12px;border-bottom:2px solid #dbeafe;padding-bottom:8px;">📊 Rincian Skor Penilaian</h3>
    <table width="100%" cellpadding="0" cellspacing="8" style="font-size:13px;">
      <tr>
        <td style="background:#fff7ed;border-radius:10px;padding:14px 16px;text-align:center;width:30%;">
          <div style="font-size:24px;font-weight:900;color:#ea580c;">${data.skor_sertifikat}</div>
          <div style="color:#9a3412;font-size:11px;margin-top:4px;">Sertifikasi / 30</div>
        </td>
        <td width="4%"></td>
        <td style="background:#f0fdf4;border-radius:10px;padding:14px 16px;text-align:center;width:30%;">
          <div style="font-size:24px;font-weight:900;color:#16a34a;">${data.skor_portofolio}</div>
          <div style="color:#166534;font-size:11px;margin-top:4px;">Portofolio / 35</div>
        </td>
        <td width="4%"></td>
        <td style="background:#faf5ff;border-radius:10px;padding:14px 16px;text-align:center;width:30%;">
          <div style="font-size:24px;font-weight:900;color:#7c3aed;">${data.skor_kompetensi}</div>
          <div style="color:#5b21b6;font-size:11px;margin-top:4px;">Kompetensi / 35</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- SERTIFIKAT -->
  <tr><td style="padding:20px 36px 0;">
    <h3 style="color:#1e3a8a;font-size:15px;margin:0 0 10px;border-bottom:2px solid #dbeafe;padding-bottom:8px;">🎓 Sertifikasi & SKK</h3>
    <ul style="margin:0;padding-left:18px;font-size:13px;color:#374151;line-height:1.8;">${sertList}</ul>
  </td></tr>

  <!-- PORTOFOLIO -->
  <tr><td style="padding:20px 36px 0;">
    <h3 style="color:#1e3a8a;font-size:15px;margin:0 0 10px;border-bottom:2px solid #dbeafe;padding-bottom:8px;">🏢 Portofolio Proyek</h3>
    <ul style="margin:0;padding-left:18px;font-size:13px;color:#374151;line-height:1.8;">${portoList}</ul>
  </td></tr>

  <!-- KOMPETENSI -->
  <tr><td style="padding:20px 36px 0;">
    <h3 style="color:#1e3a8a;font-size:15px;margin:0 0 10px;border-bottom:2px solid #dbeafe;padding-bottom:8px;">⚙️ Kompetensi Teknis</h3>
    ${kompList.sipil !== '<li>-</li>' ? `<p style="font-size:12px;font-weight:700;color:#1d4ed8;margin:0 0 4px;">Teknik Sipil:</p><ul style="margin:0 0 10px;padding-left:18px;font-size:13px;color:#374151;line-height:1.8;">${kompList.sipil}</ul>` : ''}
    ${kompList.arsi  !== '<li>-</li>' ? `<p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">Arsitektur:</p><ul style="margin:0;padding-left:18px;font-size:13px;color:#374151;line-height:1.8;">${kompList.arsi}</ul>` : ''}
  </td></tr>

  <!-- REKOMENDASI -->
  <tr><td style="padding:20px 36px 0;">
    <h3 style="color:#1e3a8a;font-size:15px;margin:0 0 10px;border-bottom:2px solid #dbeafe;padding-bottom:8px;">💡 Rekomendasi</h3>
    <ul style="margin:0;padding-left:18px;font-size:13px;color:#374151;line-height:1.8;">${recList}</ul>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:28px 36px;">
    <div style="background:#f8fafc;border-radius:10px;padding:16px 20px;text-align:center;border:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#64748b;">Dokumen ini digenerate otomatis oleh <strong>Instrumen Seleksi Tenaga Ahli Konstruksi</strong></p>
      <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Sesuai Standar LPJK / BNSP / Permen PUPR &nbsp;|&nbsp; ID Penilaian: #${data.id || 'N/A'}</p>
    </div>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

// ─── API: LOGIN ───────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username dan password wajib diisi.' });
  }
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken();
    activeSessions.set(token, { username, createdAt: Date.now() });
    console.log(`🔐 Login berhasil: ${username} | Token: ${token.substring(0,8)}...`);
    return res.json({ success: true, token, username });
  }
  console.log(`⚠️  Login gagal: username="${username}"`);
  return res.status(401).json({ success: false, message: 'Username atau password salah.' });
});

// ─── API: LOGOUT ──────────────────────────────────────────────
app.post('/api/logout', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token && activeSessions.has(token)) {
    activeSessions.delete(token);
    console.log(`🔓 Logout: token ${token.substring(0,8)}...`);
  }
  res.json({ success: true, message: 'Logout berhasil.' });
});

// ─── API: CEK TOKEN (untuk validasi session) ──────────────────
app.get('/api/auth-check', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (isValidToken(token)) {
    const session = activeSessions.get(token);
    return res.json({ success: true, username: session.username });
  }
  res.status(401).json({ success: false, message: 'Session tidak valid atau sudah expired.' });
});

// ─── API: SIMPAN PENILAIAN (publik — tidak perlu auth) ────────
app.post('/api/simpan', async (req, res) => {
  try {
    const d = req.body;
    const stmt = db.prepare(`
      INSERT INTO penilaian
        (nama, nik, bidang, jabatan, pendidikan, tahun_kerja, institusi, email,
         skor_total, skor_sertifikat, skor_portofolio, skor_kompetensi,
         status_kelayakan, sertifikat_json, portofolio_json, kompetensi_json,
         rekomendasi_json, tanggal_penilaian)
      VALUES
        (@nama, @nik, @bidang, @jabatan, @pendidikan, @tahun_kerja, @institusi, @email,
         @skor_total, @skor_sertifikat, @skor_portofolio, @skor_kompetensi,
         @status_kelayakan, @sertifikat_json, @portofolio_json, @kompetensi_json,
         @rekomendasi_json, @tanggal_penilaian)
    `);
    const info = stmt.run({
      nama:             d.nama            || '',
      nik:              d.nik             || '',
      bidang:           d.bidang          || '',
      jabatan:          d.jabatan         || '',
      pendidikan:       d.pendidikan      || '',
      tahun_kerja:      parseInt(d.tahun_kerja) || 0,
      institusi:        d.institusi       || '',
      email:            d.email           || '',
      skor_total:       parseInt(d.skor_total)      || 0,
      skor_sertifikat:  parseInt(d.skor_sertifikat) || 0,
      skor_portofolio:  parseInt(d.skor_portofolio) || 0,
      skor_kompetensi:  parseInt(d.skor_kompetensi) || 0,
      status_kelayakan: d.status_kelayakan || '',
      sertifikat_json:  JSON.stringify(d.sertifikat  || []),
      portofolio_json:  JSON.stringify(d.portofolio  || []),
      kompetensi_json:  JSON.stringify(d.kompetensi  || {}),
      rekomendasi_json: JSON.stringify(d.rekomendasi || []),
      tanggal_penilaian: d.tanggal_penilaian || new Date().toLocaleDateString('id-ID'),
    });

    const savedData = { ...d, id: info.lastInsertRowid };

    // ── Kirim Email jika ada alamat email ──────────────────
    let emailInfo = null;
    if (d.email && d.email.includes('@')) {
      try {
        const tp   = await getTransporter();
        const html = buildEmailHTML(savedData);
        const mail = await tp.sendMail({
          from:    '"Instrumen Seleksi Konstruksi" <noreply@seleksi-konstruksi.id>',
          to:      d.email,
          subject: `📋 Hasil Penilaian Tenaga Ahli – ${d.nama} | ${d.status_kelayakan}`,
          html,
        });
        emailInfo = {
          messageId: mail.messageId,
          previewUrl: nodemailer.getTestMessageUrl(mail),
        };
        console.log('✅ Email terkirim:', emailInfo.previewUrl);
      } catch (emailErr) {
        console.error('⚠️ Email gagal:', emailErr.message);
      }
    }

    res.json({ success: true, id: info.lastInsertRowid, emailInfo });
  } catch (err) {
    console.error('Error simpan:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── API: AMBIL SEMUA DATA (🔒 perlu auth) ───────────────────
app.get('/api/data', requireAuth, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT id, nama, nik, bidang, jabatan, pendidikan, tahun_kerja, institusi, email,
             skor_total, skor_sertifikat, skor_portofolio, skor_kompetensi,
             status_kelayakan, tanggal_penilaian, created_at
      FROM penilaian ORDER BY id DESC
    `).all();
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── API: DETAIL DATA (🔒 perlu auth) ────────────────────────
app.get('/api/data/:id', requireAuth, (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM penilaian WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ success: false, error: 'Data tidak ditemukan' });
    res.json({ success: true, data: row });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── API: DELETE DATA (🔒 perlu auth) ────────────────────────
app.delete('/api/data/:id', requireAuth, (req, res) => {
  try {
    db.prepare('DELETE FROM penilaian WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── API: KIRIM ULANG EMAIL (🔒 perlu auth) ──────────────────
app.post('/api/kirim-email/:id', requireAuth, async (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM penilaian WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ success: false, error: 'Data tidak ditemukan' });
    if (!row.email || !row.email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Email tidak valid' });
    }
    const tp   = await getTransporter();
    const html = buildEmailHTML(row);
    const mail = await tp.sendMail({
      from:    '"Instrumen Seleksi Konstruksi" <noreply@seleksi-konstruksi.id>',
      to:      row.email,
      subject: `📋 Hasil Penilaian Tenaga Ahli – ${row.nama} | ${row.status_kelayakan}`,
      html,
    });
    res.json({
      success: true,
      messageId:  mail.messageId,
      previewUrl: nodemailer.getTestMessageUrl(mail),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── START SERVER ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📁 Database: ${path.join(__dirname, 'penilaian.db')}`);
  console.log(`🔐 Admin: ${ADMIN_USERNAME} / ${ADMIN_PASSWORD}`);
  console.log(`🔑 Login: http://localhost:${PORT}/login.html`);
});
