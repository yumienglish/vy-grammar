/**
 * Vy's Grammar Path (vy-grammar/) – nhận bài và gửi email cho giáo viên.
 *
 * Đây là một dự án Apps Script RIÊNG, tách hẳn khỏi hệ thống quản lý lớp:
 * không ghi vào Google Sheet, không đồng bộ, không tạo báo cáo.
 * Mỗi lần Vy bấm "Send Unit … to my teacher", script gửi 1 email gồm:
 * điểm từng bài, các câu sai lần đầu, câu Speaking, và file ghi âm của từng bài.
 *
 * Cài đặt: xem vy-grammar/HUONG-DAN.md
 */
const TEACHER_EMAIL = '';            // để trống = gửi về chính tài khoản Google đã triển khai script
const APP_KEY = 'vy-grammar-2026';   // phải trùng APP_KEY trong app.js
const TIMEZONE = 'Asia/Ho_Chi_Minh';
const MAX_MAILS_PER_HOUR = 6;        // chặn gửi dồn dập
const MAX_TOTAL_B64 = 20 * 1024 * 1024;

function teacher_() { return TEACHER_EMAIL || Session.getEffectiveUser().getEmail(); }

/** Chạy hàm này 1 lần trong trình soạn thảo để cấp quyền và nhận 1 email thử. */
function setup() {
  MailApp.sendEmail(teacher_(), "Vy's Grammar Path: cài đặt thành công ✅",
    'Máy chủ nhận bài ngữ pháp của Vy đã sẵn sàng. Khi Vy làm xong một Unit và bấm gửi, bài sẽ về địa chỉ này.');
  Logger.log('Email thử đã gửi tới ' + teacher_() + '. Còn lại mail hôm nay: ' + MailApp.getRemainingDailyQuota());
}

function doGet() {
  return ContentService.createTextOutput("Vy's Grammar Path: server is running ✅");
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
    const d = JSON.parse(e.postData.contents);
    validate_(d);
    throttle_();
    sendMail_(d);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function str_(v, max) { return String(v == null ? '' : v).slice(0, max); }
function num_(v, lo, hi) { return Math.max(lo, Math.min(hi, Number(v) || 0)); }

function validate_(d) {
  if (!d || d.app !== 'vygrammar' || d.key !== APP_KEY) throw new Error('Invalid data');
  if (!Array.isArray(d.lessons) || !d.lessons.length || d.lessons.length > 8) throw new Error('Invalid lesson list');
  d.name = str_(d.name, 60).trim() || 'Vy';
  d.unit = num_(d.unit, 1, 20);
  d.unitTitle = str_(d.unitTitle, 80);
  let total = 0;
  d.lessons = d.lessons.map(l => {
    const r = l && l.rec;
    if (!r || typeof r.b64 !== 'string' || !r.b64) throw new Error('Missing recording');
    total += r.b64.length;
    let mime = str_(r.mime || 'audio/webm', 40).split(';')[0];
    if (!/^audio\/[\w.+-]+$/.test(mime)) mime = 'audio/webm';
    return {
      id: str_(l.id, 20).replace(/[^a-z0-9]/gi, ''),
      name: str_(l.name, 30), title: str_(l.title, 120), at: str_(l.at, 40),
      stars: num_(l.stars, 0, 3), total: num_(l.total, 0, 12),
      understand: num_(l.understand, 0, 5), use: num_(l.use, 0, 5), challenge: num_(l.challenge, 0, 2),
      speak: str_(l.speak, 600), own: str_(l.own, 1000),
      wrong: (Array.isArray(l.wrong) ? l.wrong.slice(0, 12) : []).map(w => ({
        level: str_(w && w.level, 20), q: str_(w && w.q, 500), first: str_(w && w.first, 300), correct: str_(w && w.correct, 400),
      })),
      rec: { mime: mime, ext: str_(r.ext || 'webm', 5).replace(/[^a-z0-9]/gi, '') || 'webm', dur: num_(r.dur, 0, 600), b64: r.b64 },
    };
  });
  if (total > MAX_TOTAL_B64) throw new Error('Recordings too large');
}

function throttle_() {
  const c = CacheService.getScriptCache();
  const n = Number(c.get('sent_hour') || 0);
  if (n >= MAX_MAILS_PER_HOUR) throw new Error('Too many emails – please try again later');
  c.put('sent_hour', String(n + 1), 3600);
}

function esc_(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function fmtTime_(iso) {
  try { return iso ? Utilities.formatDate(new Date(iso), TIMEZONE, 'HH:mm dd/MM/yyyy') : '—'; } catch (_) { return '—'; }
}
function fmtClock_(sec) { sec = Math.round(sec || 0); return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); }
function stars_(n) { return '<span style="color:#f5b301">' + '★'.repeat(n) + '</span><span style="color:#ddd">' + '★'.repeat(3 - n) + '</span>'; }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function sendMail_(d) {
  const safe = s => String(s).replace(/[\\/:*?"<>|’']+/g, '').replace(/\s+/g, ' ').trim();
  const right = d.lessons.reduce((a, l) => a + l.total, 0), all = d.lessons.length * 12;
  const starSum = d.lessons.reduce((a, l) => a + l.stars, 0);
  const subject = '[Grammar] ' + d.name + ' – Unit ' + d.unit + (d.unitTitle ? ': ' + d.unitTitle : '') +
    ' – ' + right + '/' + all + ' đúng lần đầu – ★' + starSum + '/' + d.lessons.length * 3;

  const td = 'style="border:1px solid #e6e0f5;padding:6px 8px;vertical-align:top"';
  let html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2b2452;max-width:760px">' +
    '<h2 style="margin:0 0 4px;color:#5b3fd8">📘 ' + esc_(d.name) + ' – Unit ' + d.unit + (d.unitTitle ? ': ' + esc_(d.unitTitle) : '') + '</h2>' +
    '<p style="margin:0 0 12px;color:#7b7499">Gửi lúc ' + fmtTime_(d.sentAt) + ' · Điểm = số câu đúng ngay lần đầu · File ghi âm đính kèm bên dưới.</p>' +
    '<table style="border-collapse:collapse;width:100%;font-size:13.5px;margin-bottom:6px">' +
    '<tr style="background:#f1ecff"><th ' + td + '>Bài</th><th ' + td + '>Sao</th><th ' + td + '>Đúng</th><th ' + td + '>Understand</th><th ' + td + '>Use</th><th ' + td + '>Challenge</th><th ' + td + '>Ghi âm</th></tr>';
  d.lessons.forEach(l => {
    html += '<tr><td ' + td + '><b>' + esc_(l.name) + '</b>: ' + esc_(l.title) + '<br><span style="color:#999;font-size:12px">' + fmtTime_(l.at) + '</span></td>' +
      '<td ' + td + '>' + stars_(l.stars) + '</td><td ' + td + '><b>' + l.total + '/12</b></td>' +
      '<td ' + td + '>' + l.understand + '/5</td><td ' + td + '>' + l.use + '/5</td><td ' + td + '>' + l.challenge + '/2</td><td ' + td + '>' + fmtClock_(l.rec.dur) + '</td></tr>';
  });
  html += '</table>';

  d.lessons.forEach(l => {
    html += '<h3 style="margin:18px 0 6px;color:#5b3fd8;border-top:2px solid #f1ecff;padding-top:10px">' + esc_(l.name) + ': ' + esc_(l.title) + '</h3>' +
      '<p style="margin:4px 0">🎙 <b>Speaking:</b> ' + esc_(l.speak) + '</p>' +
      (l.own ? '<p style="margin:4px 0">✏️ <b>Câu tự viết:</b> ' + esc_(l.own) + '</p>' : '');
    if (l.wrong.length) {
      html += '<p style="margin:8px 0 4px"><b>Sai lần đầu (' + l.wrong.length + '):</b></p><ul style="margin:0;padding-left:18px">';
      l.wrong.forEach(w => {
        html += '<li style="margin:0 0 6px"><span style="color:#8466ff;font-size:12px">' + esc_(w.level) + '</span> ' + esc_(w.q) +
          '<br><span style="color:#e4603f">Vy chọn/viết: ' + esc_(w.first || '(trống)') + '</span>' +
          '<br><span style="color:#21945a">Đúng: ' + esc_(w.correct) + '</span></li>';
      });
      html += '</ul>';
    } else {
      html += '<p style="margin:6px 0;color:#21945a">✓ Không sai câu nào ở lần đầu.</p>';
    }
  });
  html += '</div>';

  const attachments = d.lessons.map((l, i) => Utilities.newBlob(Utilities.base64Decode(l.rec.b64), l.rec.mime,
    'U' + d.unit + '-' + (i + 1) + ' ' + safe(l.title) + ' - ' + safe(d.name) + '.' + l.rec.ext));
  MailApp.sendEmail({ to: teacher_(), subject: subject, htmlBody: html, name: "Vy's Grammar Path", attachments: attachments });
}
