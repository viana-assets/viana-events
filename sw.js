/* ═══════════════════════════════════════════════════════
   VIANA – Service Worker (PWA)
   Reines JS, kein Build-Schritt.
   Cache-Version bei jedem Release hochzählen → alter Cache
   wird beim activate automatisch gelöscht.
   ═══════════════════════════════════════════════════════ */

const VERSION       = 'viana-v2-20260531';
const STATIC_CACHE  = VERSION + '-static';
const RUNTIME_CACHE = VERSION + '-runtime';

// App-Shell: wird bei der Installation vorgeladen (offline-fähig)
const PRECACHE = [
  '/',
  '/index.html',
  '/events.html',
  '/places.html',
  '/vorschlagen.html',
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

  // Seitenaufrufe (Navigation): network-first, damit Events immer aktuell sind.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req, { ignoreSearch: true })
            .then((cached) => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  // Statische Assets (CSS/JS/Icons/SVG): stale-while-revalidate.
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
