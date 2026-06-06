const FB_BASE = 'https://firestore.googleapis.com/v1/projects/viana-events/databases/(default)/documents';
const FB_KEY  = 'AIzaSyDx-s-6yYdvRxP4Gy9GaWdOKBEfo8GpTXQ';
const VAPID_PUBLIC_KEY = 'BGCxB0-hC4h2qQcMreWJ3x4YkOuQ77YxVcg6b1WQv1h_mTokVkIP2pI83LiOSk9jIB5h2p6-SKHqj7XX7sq2-iU';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Auth
  const secret = process.env.PUSH_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Diagnose: Env-Vars prüfen
  if (!process.env.VAPID_PRIVATE_KEY) {
    return res.status(500).json({ error: 'VAPID_PRIVATE_KEY fehlt in Vercel Environment Variables' });
  }

  // web-push laden (lazy, mit klarer Fehlermeldung)
  let webpush;
  try {
    webpush = require('web-push');
  } catch(e) {
    return res.status(500).json({
      error: 'web-push Paket nicht gefunden',
      detail: e.message,
      hint: 'package.json liegt in viana-app/ — prüfe ob Vercel npm install ausgeführt hat'
    });
  }

  // VAPID konfigurieren
  try {
    webpush.setVapidDetails(
      'mailto:info@viana-assets.com',
      VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
  } catch(e) {
    return res.status(500).json({ error: 'VAPID Konfigurationsfehler', detail: e.message });
  }

  const { title = 'Viana Events', body = '', url = '/events.html', tag = 'viana' } = req.body || {};

  // Subscriptions aus Firestore laden
  let subs = [];
  try {
    const r = await fetch(`${FB_BASE}/push_subscriptions?key=${FB_KEY}&pageSize=500`);
    const data = await r.json();
    subs = (data.documents || []).map(doc => ({
      endpoint: doc.fields?.endpoint?.stringValue,
      keys: {
        p256dh: doc.fields?.p256dh?.stringValue,
        auth:   doc.fields?.auth?.stringValue
      },
      docName: doc.name
    })).filter(s => s.endpoint);
  } catch(e) {
    return res.status(500).json({ error: 'Firestore Lesefehler', detail: e.message });
  }

  if (!subs.length) return res.status(200).json({ sent: 0, message: 'Keine Abonnenten vorhanden' });

  // Push senden
  const payload = JSON.stringify({ title, body, url, tag });
  const results = await Promise.allSettled(
    subs.map(sub => webpush.sendNotification(sub, payload).catch(async err => {
      if (err.statusCode === 410 && sub.docName) {
        await fetch(`${sub.docName}?key=${FB_KEY}`, { method: 'DELETE' }).catch(() => {});
      }
      throw err;
    }))
  );

  const sent   = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.length - sent;
  return res.status(200).json({ sent, failed, total: results.length });
};
