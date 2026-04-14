/* ═══════════════════════════════════════════════════════
   VIANA EVENTS – Cookie Consent (DSGVO-konform)
   Firebase: technisch notwendig (kein Consent nötig)
   Google Analytics: nur nach Einwilligung (Art. 6 I a DSGVO)
   ═══════════════════════════════════════════════════════ */

(function () {
  const KEY = 'viana_consent_v1';

  // ── GA laden (nur wenn Consent erteilt) ──────────────
  window._vianaLoadGA = function () {
    if (window._gaLoaded) return;
    window._gaLoaded = true;
    const GA_ID = 'G-WTHG0V5354';
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  };

  // ── Beim Laden: gespeicherten Consent prüfen ─────────
  const saved = localStorage.getItem(KEY);
  if (saved) {
    try { const p = JSON.parse(saved); if (p.analytics) window._vianaLoadGA(); } catch(e) {}
    return;
  }

  // ── CSS ──────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #vcb {
      position:fixed;bottom:0;left:0;right:0;z-index:99999;
      background:#16181f;border-top:1px solid rgba(255,255,255,.1);
      box-shadow:0 -12px 40px rgba(0,0,0,.5);
      font-family:'DM Sans',sans-serif;
      animation:vcb-up .4s cubic-bezier(.16,1,.3,1);
    }
    @keyframes vcb-up { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
    #vcb .vcb-inner {
      max-width:900px;margin:0 auto;padding:1.2rem 1.5rem;
      display:flex;align-items:flex-start;gap:1.2rem;flex-wrap:wrap;
    }
    #vcb .vcb-text { flex:1;min-width:220px; }
    #vcb .vcb-title { font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#f0f0f0;margin-bottom:5px; }
    #vcb .vcb-desc { font-size:12px;line-height:1.6;color:rgba(240,240,240,.6); }
    #vcb .vcb-desc a { color:#e8963a;text-decoration:none; }
    #vcb .vcb-desc a:hover { text-decoration:underline; }
    #vcb .vcb-toggles {
      display:flex;flex-direction:column;gap:8px;
      background:rgba(30,32,41,.8);border:1px solid rgba(255,255,255,.07);
      border-radius:12px;padding:10px 14px;min-width:240px;flex-shrink:0;
    }
    #vcb .vcb-toggle-row { display:flex;align-items:center;justify-content:space-between;gap:10px; }
    #vcb .vcb-toggle-label { font-size:12px;color:rgba(240,240,240,.75);line-height:1.4; }
    #vcb .vcb-toggle-label strong { color:#f0f0f0;font-weight:600; }
    #vcb .vcb-toggle-label span { font-size:10px;color:#6b7280;display:block; }
    .vcb-switch { position:relative;width:40px;height:22px;flex-shrink:0; }
    .vcb-switch input { opacity:0;width:0;height:0; }
    .vcb-slider {
      position:absolute;inset:0;border-radius:999px;
      background:#2a2d3a;border:1px solid rgba(255,255,255,.1);
      cursor:pointer;transition:background .2s;
    }
    .vcb-slider:before {
      content:'';position:absolute;width:16px;height:16px;
      border-radius:50%;background:#6b7280;
      bottom:2px;left:2px;transition:all .2s;
    }
    .vcb-switch input:checked + .vcb-slider { background:rgba(232,150,58,.25);border-color:rgba(232,150,58,.5); }
    .vcb-switch input:checked + .vcb-slider:before { background:#e8963a;transform:translateX(18px); }
    .vcb-switch input:disabled + .vcb-slider { opacity:.5;cursor:not-allowed; }
    #vcb .vcb-actions { display:flex;flex-direction:column;gap:7px;flex-shrink:0;justify-content:center;min-width:140px; }
    #vcb-btn-all {
      padding:9px 20px;border:none;border-radius:999px;
      background:#e8963a;color:#0e0f13;
      font-size:13px;font-weight:700;font-family:'DM Sans',sans-serif;
      cursor:pointer;transition:all .18s;white-space:nowrap;
    }
    #vcb-btn-all:hover { background:#f0a84e;transform:translateY(-1px); }
    #vcb-btn-save {
      padding:9px 20px;border:1px solid rgba(255,255,255,.12);
      border-radius:999px;background:transparent;
      color:#6b7280;font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;
      cursor:pointer;transition:all .18s;white-space:nowrap;
    }
    #vcb-btn-save:hover { color:#f0f0f0;border-color:rgba(255,255,255,.25); }
    #vcb-btn-deny {
      padding:7px 20px;border:none;background:none;
      color:#4b5563;font-size:11px;font-family:'DM Sans',sans-serif;
      cursor:pointer;transition:color .18s;text-align:center;
    }
    #vcb-btn-deny:hover { color:#9ca3af; }
    @media(max-width:580px){
      #vcb .vcb-inner{flex-direction:column;}
      #vcb .vcb-actions{flex-direction:row;flex-wrap:wrap;min-width:unset;}
    }
  `;
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────────────
  const banner = document.createElement('div');
  banner.id = 'vcb';
  banner.innerHTML = `
    <div class="vcb-inner">
      <div class="vcb-text">
        <div class="vcb-title">🍪 Cookies &amp; Datenschutz</div>
        <div class="vcb-desc">
          Wir nutzen Cookies und ähnliche Technologien. Einige sind technisch notwendig,
          andere helfen uns, das Angebot zu verbessern (Google Analytics).<br>
          <a href="datenschutz.html">Datenschutzerklärung</a> &nbsp;·&nbsp;
          <a href="impressum.html">Impressum</a>
        </div>
      </div>
      <div class="vcb-toggles">
        <div class="vcb-toggle-row">
          <div class="vcb-toggle-label">
            <strong>Technisch notwendig</strong>
            <span>Firebase Zähler, LocalStorage, Hosting</span>
          </div>
          <label class="vcb-switch">
            <input type="checkbox" checked disabled id="vcb-t-necessary">
            <span class="vcb-slider"></span>
          </label>
        </div>
        <div class="vcb-toggle-row">
          <div class="vcb-toggle-label">
            <strong>Google Analytics</strong>
            <span>Anonyme Nutzungsstatistiken (GA4)</span>
          </div>
          <label class="vcb-switch">
            <input type="checkbox" id="vcb-t-analytics">
            <span class="vcb-slider"></span>
          </label>
        </div>
      </div>
      <div class="vcb-actions">
        <button id="vcb-btn-all">Alle akzeptieren</button>
        <button id="vcb-btn-save">Auswahl speichern</button>
        <button id="vcb-btn-deny">Nur notwendige</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  function dismiss(analytics) {
    localStorage.setItem(KEY, JSON.stringify({ necessary:true, analytics, ts:Date.now() }));
    if (analytics) window._vianaLoadGA();
    banner.style.transition = 'transform .35s ease, opacity .35s ease';
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 380);
  }

  document.getElementById('vcb-btn-all').addEventListener('click', () => {
    document.getElementById('vcb-t-analytics').checked = true;
    dismiss(true);
  });
  document.getElementById('vcb-btn-save').addEventListener('click', () => {
    dismiss(document.getElementById('vcb-t-analytics').checked);
  });
  document.getElementById('vcb-btn-deny').addEventListener('click', () => {
    document.getElementById('vcb-t-analytics').checked = false;
    dismiss(false);
  });

})();
