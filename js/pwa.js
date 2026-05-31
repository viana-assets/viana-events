/* ═══════════════════════════════════════════════════════
   VIANA – PWA-Helfer
   1) Service Worker registrieren
   2) Dezenter "App installieren"-Button (beforeinstallprompt)
   Reines JS, kein Build-Schritt.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── 1) Service Worker registrieren ──
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function (err) {
        console.warn('[PWA] Service-Worker-Registrierung fehlgeschlagen:', err);
      });
    });
  }

  // ── 2) Install-Button ──
  var DISMISS_KEY = 'viana_pwa_dismissed';
  var DISMISS_DAYS = 30;
  var deferredPrompt = null;

  // Schon als App installiert? Dann nichts anzeigen.
  function isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  }

  // Kürzlich weggeklickt?
  function recentlyDismissed() {
    try {
      var ts = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10);
      if (!ts) return false;
      return (Date.now() - ts) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
    } catch (e) {
      return false;
    }
  }

  function injectStyles() {
    if (document.getElementById('pwa-install-style')) return;
    var css =
      '#pwa-install-bar{position:fixed;left:16px;bottom:16px;z-index:8800;' +
      'display:flex;align-items:center;gap:8px;padding:8px 10px 8px 14px;' +
      'background:rgba(22,24,31,.92);backdrop-filter:blur(12px);' +
      '-webkit-backdrop-filter:blur(12px);border:1px solid rgba(232,150,58,.35);' +
      'border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.45);' +
      'font-family:"DM Sans",sans-serif;transform:translateY(20px);opacity:0;' +
      'transition:transform .3s ease,opacity .3s ease;pointer-events:none}' +
      '#pwa-install-bar.show{transform:translateY(0);opacity:1;pointer-events:auto}' +
      '#pwa-install-go{background:none;border:none;color:#f1f2f4;font-size:13px;' +
      'font-weight:600;cursor:pointer;font-family:inherit;display:flex;' +
      'align-items:center;gap:7px;padding:2px 2px}' +
      '#pwa-install-go .pwa-ico{font-size:15px}' +
      '#pwa-install-go b{color:#e8963a;font-weight:700}' +
      '#pwa-install-x{background:none;border:none;color:#6b7280;font-size:17px;' +
      'line-height:1;cursor:pointer;padding:4px 7px;border-radius:50%;transition:color .15s}' +
      '#pwa-install-x:hover{color:#f1f2f4}' +
      // auf Mobil über die Sticky-Werbe-Bottom-Bar heben
      '@media (max-width:600px){#pwa-install-bar{bottom:92px;left:12px}}';
    var style = document.createElement('style');
    style.id = 'pwa-install-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildBar() {
    if (document.getElementById('pwa-install-bar')) {
      return document.getElementById('pwa-install-bar');
    }
    injectStyles();
    var bar = document.createElement('div');
    bar.id = 'pwa-install-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'App installieren');

    var go = document.createElement('button');
    go.id = 'pwa-install-go';
    go.type = 'button';
    go.innerHTML = '<span class="pwa-ico">📲</span><span><b>Vi</b>ana installieren</span>';

    var x = document.createElement('button');
    x.id = 'pwa-install-x';
    x.type = 'button';
    x.setAttribute('aria-label', 'Schließen');
    x.textContent = '×';

    bar.appendChild(go);
    bar.appendChild(x);
    document.body.appendChild(bar);

    go.addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choice) {
        if (choice && choice.outcome === 'dismissed') remember();
        deferredPrompt = null;
        hideBar();
      });
    });

    x.addEventListener('click', function () {
      remember();
      hideBar();
    });

    return bar;
  }

  function showBar() {
    var bar = buildBar();
    requestAnimationFrame(function () { bar.classList.add('show'); });
  }

  function hideBar() {
    var bar = document.getElementById('pwa-install-bar');
    if (bar) bar.classList.remove('show');
  }

  function remember() {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) {}
  }

  // Browser bietet Installation an
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (isStandalone() || recentlyDismissed()) return;
    showBar();
  });

  // Erfolgreich installiert
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    hideBar();
    remember();
  });

  // ── Manuelle Installation (z. B. Button im Burger-Menü) ──
  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  // Auf iOS kann nur Safari zum Home-Bildschirm hinzufügen.
  // Chrome/Firefox/Edge auf iOS (CriOS/FxiOS/EdgiOS/OPiOS) können es NICHT.
  function isIOSnonSafari() {
    return isIOS() && /CriOS|FxiOS|EdgiOS|OPiOS|GSA/i.test(navigator.userAgent);
  }

  function showInfo(html) {
    if (document.getElementById('pwa-info-ov')) return;
    var ov = document.createElement('div');
    ov.id = 'pwa-info-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.6);' +
      'display:flex;align-items:center;justify-content:center;padding:20px;' +
      '-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)';
    var box = document.createElement('div');
    box.style.cssText = 'max-width:340px;width:100%;background:#16181f;' +
      'border:1px solid rgba(232,150,58,.35);border-radius:18px;padding:22px;' +
      'font-family:"DM Sans",sans-serif;color:#f1f2f4;font-size:14px;line-height:1.55;' +
      'box-shadow:0 20px 50px rgba(0,0,0,.5)';
    box.innerHTML =
      '<div style="font-family:\'Syne\',sans-serif;font-weight:800;font-size:1.1rem;margin-bottom:10px">' +
      '<span style="color:#fff">Vi</span><span style="color:#e8963a">ana</span> installieren</div>' +
      '<div>' + html + '</div>' +
      '<button id="pwa-info-ok" style="margin-top:18px;width:100%;padding:11px;border:none;' +
      'border-radius:999px;background:#e8963a;color:#0a0a0a;font-weight:700;font-family:inherit;' +
      'font-size:14px;cursor:pointer">Alles klar</button>';
    ov.appendChild(box);
    document.body.appendChild(ov);
    function close() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    var ok = document.getElementById('pwa-info-ok');
    if (ok) ok.addEventListener('click', close);
  }

  function triggerInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choice) {
        if (choice && choice.outcome === 'dismissed') remember();
        deferredPrompt = null;
        hideBar();
      });
      return;
    }
    if (isStandalone()) {
      showInfo('Viana ist auf diesem Gerät bereits installiert. 🎉');
      return;
    }
    if (isIOSnonSafari()) {
      showInfo('Auf dem iPhone klappt das Installieren leider nur über <b>Safari</b> ' +
        '(Chrome &amp; Co. können das auf iOS technisch nicht).<br><br>' +
        '1. Öffne <b>viana-events.vercel.app</b> in <b>Safari</b><br>' +
        '2. Tippe unten auf <b>Teilen</b> (Quadrat mit Pfeil ⬆️)<br>' +
        '3. Wähle <b>„Zum Home-Bildschirm"</b>.');
      return;
    }
    if (isIOS()) {
      showInfo('So fügst du Viana auf dem iPhone hinzu:<br><br>' +
        '1. Tippe in Safari unten auf <b>Teilen</b> (das Quadrat mit dem Pfeil ⬆️)<br>' +
        '2. Wähle <b>„Zum Home-Bildschirm"</b>.');
    } else {
      showInfo('So installierst du Viana:<br><br>' +
        'Öffne das Browser-Menü (<b>⋮</b> oben rechts) und wähle ' +
        '<b>„App installieren"</b> bzw. <b>„Zum Startbildschirm hinzufügen"</b>.');
    }
  }

  // Alle Buttons mit data-pwa-install verdrahten (z. B. im Burger-Menü)
  function wireInstallButtons() {
    var els = document.querySelectorAll('[data-pwa-install]');
    for (var i = 0; i < els.length; i++) {
      (function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          triggerInstall();
        });
        // Schon installiert? Dann Eintrag ausblenden.
        if (isStandalone()) el.style.display = 'none';
      })(els[i]);
    }
  }
  wireInstallButtons();

  // ── 3) Offline-Banner ──
  // Zeigt einen dezenten Hinweis, wenn keine Internetverbindung besteht –
  // dann sind die angezeigten Events evtl. nicht der aktuelle Stand.
  function injectOfflineStyles() {
    if (document.getElementById('pwa-offline-style')) return;
    var css =
      '#pwa-offline-bar{position:fixed;top:0;left:0;right:0;z-index:8700;' +
      'display:flex;align-items:center;justify-content:center;gap:8px;' +
      'padding:9px 48px;background:linear-gradient(90deg,#3a2a12,#2a1f10);' +
      'color:#ffce8a;border-bottom:1px solid rgba(232,150,58,.45);' +
      'font-family:"DM Sans",sans-serif;font-size:12.5px;font-weight:600;' +
      'text-align:center;line-height:1.35;' +
      'box-shadow:0 4px 16px rgba(0,0,0,.35);' +
      'transform:translateY(-100%);transition:transform .3s ease}' +
      '#pwa-offline-bar.show{transform:translateY(0)}' +
      '#pwa-offline-bar .pwa-off-ico{font-size:14px}';
    var style = document.createElement('style');
    style.id = 'pwa-offline-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildOfflineBar() {
    var existing = document.getElementById('pwa-offline-bar');
    if (existing) return existing;
    injectOfflineStyles();
    var bar = document.createElement('div');
    bar.id = 'pwa-offline-bar';
    bar.setAttribute('role', 'status');
    bar.setAttribute('aria-live', 'polite');
    bar.innerHTML =
      '<span class="pwa-off-ico">📡</span>' +
      '<span>Du bist offline – angezeigte Events sind evtl. nicht aktuell.</span>';
    document.body.appendChild(bar);
    return bar;
  }

  function updateOnlineStatus() {
    var bar = buildOfflineBar();
    if (navigator.onLine) {
      bar.classList.remove('show');
    } else {
      requestAnimationFrame(function () { bar.classList.add('show'); });
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  // Initialer Status (nur reagieren, wenn tatsächlich offline)
  if (!navigator.onLine) updateOnlineStatus();
})();
