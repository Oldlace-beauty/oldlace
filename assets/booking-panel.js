(function () {
  'use strict';

  /* ── 注入 CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --bp-dark:    #1A1916;
      --bp-mid:     #2A2720;
      --bp-accent:  #8A7E72;
      --bp-white:   #FEFEFE;
      --bp-border:  #E2E0DA;
    }

    .booking-trigger {
      position: fixed;
      right: 0; top: 50%;
      transform: translateY(-50%);
      z-index: 300;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      background: var(--bp-accent);
      color: var(--bp-white);
      font-family: 'Noto Serif TC', serif;
      font-size: 0.7rem;
      letter-spacing: 0.22em;
      padding: 1.4rem 0.8rem;
      cursor: pointer;
      border: none;
      border-radius: 6px 0 0 6px;
      transition: background 0.2s;
      user-select: none;
    }
    .booking-trigger:hover { background: var(--bp-mid); }

    .booking-overlay {
      position: fixed; inset: 0;
      background: rgba(26,25,22,0.5);
      z-index: 400;
      opacity: 0; pointer-events: none;
      transition: opacity 0.35s;
    }
    .booking-overlay.open { opacity: 1; pointer-events: all; }

    .booking-panel {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: min(420px, 100vw);
      background: var(--bp-dark);
      z-index: 500;
      transform: translateX(100%);
      transition: transform 0.45s cubic-bezier(0.77,0,0.175,1);
      display: flex; flex-direction: column;
      overflow-y: auto;
    }
    .booking-panel.open { transform: translateX(0); }

    .panel-header {
      padding: 2.5rem 2.5rem 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      display: flex; justify-content: space-between; align-items: flex-start;
    }
    .panel-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.5rem; font-weight: 300;
      letter-spacing: 0.12em; color: var(--bp-white);
    }
    .panel-subtitle {
      font-size: 0.72rem; color: rgba(255,255,255,0.4);
      letter-spacing: 0.1em; margin-top: 0.4rem;
    }
    .panel-close {
      background: none; border: none;
      color: rgba(255,255,255,0.45);
      font-size: 1.4rem; cursor: pointer;
      line-height: 1; padding: 0.2rem;
      transition: color 0.2s; font-weight: 300;
    }
    .panel-close:hover { color: var(--bp-white); }

    .panel-body { padding: 2rem 2.5rem; flex: 1; }

    .form-group { margin-bottom: 1.8rem; }
    .form-label {
      display: block; font-size: 0.68rem;
      letter-spacing: 0.2em; color: rgba(255,255,255,0.45);
      text-transform: uppercase; margin-bottom: 0.7rem;
    }
    .form-input, .form-select {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      color: var(--bp-white);
      font-family: 'Noto Serif TC', Georgia, serif;
      font-size: 0.88rem; font-weight: 300;
      padding: 0.85rem 1rem; border-radius: 0; outline: none;
      transition: border-color 0.2s;
      appearance: none; -webkit-appearance: none;
    }
    .form-input:focus, .form-select:focus { border-color: rgba(255,255,255,0.35); }
    .form-input::placeholder { color: rgba(255,255,255,0.25); }

    .select-wrap { position: relative; }
    .select-wrap::after {
      content: '↓'; position: absolute;
      right: 1rem; top: 50%; transform: translateY(-50%);
      color: rgba(255,255,255,0.35); font-size: 0.75rem;
      pointer-events: none;
    }
    .form-select option { background: #2A2720; }

    .radio-group { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
    .radio-label {
      display: flex; align-items: center; gap: 0.6rem;
      font-size: 0.83rem; color: rgba(255,255,255,0.65);
      cursor: pointer; padding: 0.75rem 1rem;
      border: 1px solid rgba(255,255,255,0.1);
      transition: border-color 0.2s, color 0.2s;
    }
    .radio-label:hover { border-color: rgba(255,255,255,0.3); }
    .radio-label input[type="radio"] { display: none; }
    .radio-label.selected { border-color: rgba(255,255,255,0.5); color: var(--bp-white); }
    .radio-dot {
      width: 8px; height: 8px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.35);
      flex-shrink: 0; transition: background 0.2s;
    }
    .radio-label.selected .radio-dot { background: var(--bp-white); border-color: var(--bp-white); }

    .panel-footer {
      padding: 1.5rem 2.5rem 2.5rem;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .btn-submit {
      width: 100%; padding: 1rem;
      background: var(--bp-accent); color: var(--bp-white);
      border: none;
      font-family: 'Noto Serif TC', Georgia, serif;
      font-size: 0.82rem; font-weight: 300;
      letter-spacing: 0.18em; cursor: pointer;
      transition: background 0.2s;
    }
    .btn-submit:hover { background: #6e6258; }
    .submit-note {
      font-size: 0.68rem; color: rgba(255,255,255,0.3);
      text-align: center; margin-top: 0.8rem;
      letter-spacing: 0.06em; line-height: 1.6;
    }

    .bp-toast {
      position: fixed; bottom: 2rem; left: 50%;
      transform: translateX(-50%) translateY(3rem);
      background: var(--bp-mid); color: var(--bp-white);
      font-size: 0.8rem; letter-spacing: 0.08em;
      padding: 0.85rem 1.8rem; border-radius: 2px;
      z-index: 600; opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
      white-space: nowrap;
    }
    .bp-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  `;
  document.head.appendChild(style);

  /* ── 注入面板 HTML ── */
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button class="booking-trigger" id="bp-trigger" aria-label="線上預約">線 上 預 約</button>
    <div class="booking-overlay" id="bp-overlay"></div>
    <aside class="booking-panel" id="bp-panel" role="dialog" aria-label="預約表單">
      <div class="panel-header">
        <div>
          <div class="panel-title">線上預約</div>
          <div class="panel-subtitle">填妥後系統將整理資訊傳至 LINE</div>
        </div>
        <button class="panel-close" id="bp-close" aria-label="關閉">✕</button>
      </div>
      <div class="panel-body">
        <form id="bp-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="bp-date">預約日期</label>
            <input type="date" id="bp-date" name="date" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="bp-time">預約時段</label>
            <div class="select-wrap">
              <select id="bp-time" name="time" class="form-select" required>
                <option value="" disabled selected>請選擇時段</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="bp-count">人數</label>
            <div class="select-wrap">
              <select id="bp-count" name="count" class="form-select" required>
                <option value="1" selected>1 位</option>
                <option value="2">2 位</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">是否曾做過眉毛？</label>
            <div class="radio-group">
              <label class="radio-label" data-value="no">
                <input type="radio" name="bp-prev" value="no">
                <span class="radio-dot"></span>尚未做過
              </label>
              <label class="radio-label" data-value="yes">
                <input type="radio" name="bp-prev" value="yes">
                <span class="radio-dot"></span>曾經做過
              </label>
            </div>
          </div>
        </form>
      </div>
      <div class="panel-footer">
        <button class="btn-submit" id="bp-submit">確認預約 → 傳至 LINE</button>
        <p class="submit-note">系統將複製預約資訊，<br>請在 LINE 對話框貼上並傳送。</p>
      </div>
    </aside>
    <div class="bp-toast" id="bp-toast"></div>
  `;
  document.body.appendChild(wrap);

  /* ── 面板開關 ── */
  const panel   = document.getElementById('bp-panel');
  const overlay = document.getElementById('bp-overlay');

  function openPanel(e) {
    if (e) e.preventDefault();
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('bp-trigger').addEventListener('click', openPanel);
  overlay.addEventListener('click', closePanel);
  document.getElementById('bp-close').addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  /* ── 綁定所有預約按鈕（DOMContentLoaded 後） ── */
  function bindBookingLinks() {
    document.querySelectorAll('.nav-book, [data-open-panel], .open-panel').forEach(el => {
      el.addEventListener('click', openPanel);
    });
    // 日期最小值設今天
    const d = document.getElementById('bp-date');
    if (d) d.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindBookingLinks);
  } else {
    bindBookingLinks();
  }

  /* ── Radio 選取樣式 ── */
  document.addEventListener('click', function (e) {
    const label = e.target.closest('#bp-panel .radio-label');
    if (!label) return;
    document.querySelectorAll('#bp-panel .radio-label').forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');
    label.querySelector('input').checked = true;
  });

  /* ── 表單送出 ── */
  document.getElementById('bp-submit').addEventListener('click', () => {
    const date  = document.getElementById('bp-date').value;
    const time  = document.getElementById('bp-time').value;
    const count = document.getElementById('bp-count').value;
    const prev  = document.querySelector('input[name="bp-prev"]:checked');

    if (!date || !time || !prev) {
      showToast('請填寫所有欄位 ✕', true);
      return;
    }

    const prevText = prev.value === 'yes' ? '曾經做過' : '尚未做過';
    const dt = new Date(date);
    const dateStr = `${dt.getFullYear()}/${dt.getMonth()+1}/${dt.getDate()}`;

    const msg =
      `【Oldlace 預約申請】\n` +
      `日期：${dateStr}\n` +
      `時段：${time}\n` +
      `人數：${count} 位\n` +
      `眉毛經驗：${prevText}\n` +
      `\n請確認是否有空檔，謝謝 🙏`;

    navigator.clipboard.writeText(msg)
      .then(() => {
        showToast('訊息已複製，請在 LINE 貼上發送 ✓');
        setTimeout(() => window.open('https://line.me/R/ti/p/@oldlace', '_blank'), 600);
      })
      .catch(() => window.prompt('請複製以下訊息並貼至 LINE：', msg));
  });

  function showToast(msg, isError = false) {
    const t = document.getElementById('bp-toast');
    t.textContent = msg;
    t.style.background = isError ? '#6B3A3A' : '';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3200);
  }

})();
