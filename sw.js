/* ═══════════════════════════════════════════════════════
   VIANA – Service Worker (PWA)
   Reines JS, kein Build-Schritt.
   Cache-Version bei jedem Release hochzählen → alter Cache
   wird beim activate automatisch gelöscht.
   ═══════════════════════════════════════════════════════ */

const VERSION       = 'viana-v4-20260603';
const STATIC_CACHE  = VERSION + '-static';
const RUNTIME_CACHE = VERSION + '-runtime';

// App-Shell: wird bei der Installation vorgeladen (offline-fähig)
const PRECACHE = [
  '/',
  '/index.html',
  '/events.html',
  '/places.html',
  '/impressum.html',
  '/datenschutz.html',
  '/agb.html',
  '/css/base.css',
  '/css/events.css',
  '/css/places.css',
  '/js/events.js',
  '/js/places.js',
  '/js/cookie-banner.js',
  '/js/pwa.js',
  '/manifest.webmanifest',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png'
];

// ── INSTALL ── App-Shell vorladen
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()) // einzelne 404 sollen Install nicht blockieren
  );
});

// ── ACTIVATE ── alte Caches aufräumen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH ──
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Fremde Origins (Firebase, Fonts, Leaflet-CDN, Analytics, YouTube,
  // Kartenkacheln, Nominatim) NICHT abfangen → immer direkt ans Netz.
  if (url.origin !== self.location.origin) return;

  // Große Medien nicht cachen (Hintergrundvideo, Musik)
  if (/\.(mp4|mp3|webm|mov)$/i.test(url.pathname)) return;

  // Seitenaufrufe (Navigation) UND JS/CSS: network-first.
  // → Online immer die aktuelle Version; Cache nur als Offline-Fallback.
  // Verhindert, dass altes JS/CSS aus dem Cache mit frischem HTML kollidiert.
  if (req.mode === 'navigate' || /\.(js|css)$/i.test(url.pathname)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(req, { ignoreSearch: true }).then((cached) =>
            cached || (req.mode === 'navigate' ? caches.match('/index.html') : undefined)
          )
        )
    );
    return;
  }

  // Übrige statische Assets (Icons, Bilder, Fonts, Manifest): stale-while-revalidate.
  // ignoreSearch:true → trifft auch trotz ?v=… Query-Strings.
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// Erlaubt der Seite, ein sofortiges Update auszulösen
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

// ── PUSH NOTIFICATIONS ────────────────────────────────────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return;
  let data = {};
  try { data = event.data.json(); } catch(e) { data = { title: 'Viana Events', body: event.data.text() }; }
  event.waitUntil(
    self.registration.showNotification(data.title || 'Viana Events', {
      body: data.body || '',
      icon: '/assets/icon-192x192.png',
      badge: '/assets/icon-96x96.png',
      tag: data.tag || 'viana',
      data: { url: data.url || '/events.html' },
      requireInteraction: false
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/events.html';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const client of list) {
      if (client.url.includes(self.location.origin) && 'focus' in client) return client.focus();
    }
    return clients.openWindow(url);
  }));
});
