/* Chặn làm bài trong trình duyệt của Zalo (dùng chung cho các trang BTVN).
   Làm bài ngay trong Zalo thì bài lưu riêng trong Zalo, mở lại bằng trình duyệt khác / máy khác là mất
   → phủ kín trang bằng hướng dẫn mở bằng Chrome (Android) / Safari (iPhone).
   Cô xem thử: thêm ?zalo vào link. Nạp trong <head>: <script src="zalo-guard.js"></script> */
(function(){
  var ua = navigator.userAgent || '';
  var test = /[?&]zalo(=|&|$)/.test(location.search);
  if (!/\bZalo/i.test(ua) && !test) return;
  window.IN_ZALO = true;
  var ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document);
  var br = ios ? 'Safari' : 'Chrome';
  var css = '#zgOv{position:fixed;inset:0;z-index:2147483000;background:rgba(10,14,28,.97);display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:24px 16px;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-text-size-adjust:100%}'
    + '#zgOv *{box-sizing:border-box}'
    + '#zgOv .zgc{background:#fff;color:#1f2937;border-radius:20px;max-width:460px;width:100%;padding:22px 20px;text-align:center;box-shadow:0 14px 40px rgba(0,0,0,.4);border:3px solid #ff5a76;margin:auto 0}'
    + '#zgOv .zgi{font-size:48px;line-height:1}'
    + '#zgOv h2{font-size:22px;margin:8px 0 6px;color:#d6294a;line-height:1.3}'
    + '#zgOv p{margin:6px 0;font-size:16.5px;line-height:1.55}'
    + '#zgOv ol{text-align:left;margin:14px 0;padding-left:24px;font-size:16.5px;line-height:1.6}'
    + '#zgOv li{margin:8px 0}'
    + '#zgOv .zgk{display:inline-block;font-weight:800;border:2px solid #2563eb;color:#2563eb;border-radius:8px;padding:0 8px;line-height:1.4}'
    + '#zgOv .zgm{color:#6b7280;font-size:14px}'
    + '#zgOv button{font:inherit;font-weight:800;font-size:16px;border:none;border-radius:12px;padding:12px 20px;background:#2563eb;color:#fff;cursor:pointer;margin-top:6px}'
    + '#zgOv .zgo{display:block;margin-top:10px;font-weight:700;color:#15803d;word-break:break-all;font-size:15px}'
    + 'html.zg-lock,html.zg-lock body{overflow:hidden!important}';
  var html = '<div class="zgc" role="alertdialog" aria-modal="true">'
    + '<div class="zgi">🚫</div>'
    + '<h2>Không làm bài trong Zalo nhé!</h2>'
    + '<p>Làm bài ngay trong Zalo sẽ <b>không lưu được kết quả</b> (mở lại hoặc đổi máy là mất bài). Em mở link bằng <b>' + br + '</b> để làm nha.</p>'
    + '<ol><li>Nhấn vào nút <span class="zgk">⋯</span> (3 chấm) ở <b>góc trên bên phải</b> màn hình.</li>'
    + '<li>Chọn <b>“Mở bằng trình duyệt”</b> (hoặc “Open in browser”).</li>'
    + '<li>Chọn <b>' + br + '</b>' + (ios ? '' : ' (nếu máy hỏi chọn trình duyệt)') + '. Lần sau luôn mở link bằng <b>' + br + '</b> trên <b>cùng một máy</b> để không mất bài.</li></ol>'
    + '<p class="zgm">Không thấy nút 3 chấm? Bấm <b>Sao chép link</b> rồi dán vào ' + br + '.</p>'
    + '<button type="button" id="zgCopy">📋 Sao chép link</button><span class="zgo" id="zgOk"></span></div>';
  function cleanUrl(){ return location.href.replace(/([?&])zalo(=[^&#]*)?(&|(?=#)|$)/, function(m, a, b, c){ return c === '&' ? a : ''; }).replace(/[?&](#|$)/, '$1'); }
  function show(){
    if (document.getElementById('zgOv')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var ov = document.createElement('div'); ov.id = 'zgOv'; ov.innerHTML = html;
    document.body.appendChild(ov); document.documentElement.classList.add('zg-lock');
    document.title = 'Mở bằng trình duyệt';
    document.getElementById('zgCopy').onclick = function(){
      var url = cleanUrl(), out = document.getElementById('zgOk');
      var done = function(ok){ out.textContent = ok ? '✅ Đã chép! Mở ' + br + ' và dán vào ô địa chỉ.' : url; };
      var fallback = function(){ var t = document.createElement('textarea'); t.value = url; document.body.appendChild(t); t.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} t.remove(); done(ok); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function(){ done(true); }, fallback); else fallback();
    };
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
  // trang tự vẽ lại (SPA) vẫn giữ màn chặn ở trên cùng
  setInterval(function(){ var o = document.getElementById('zgOv'); if (o && o.parentNode && o !== document.body.lastElementChild) document.body.appendChild(o); }, 1500);
})();
