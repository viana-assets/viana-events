/* ── VIANA PUSH NOTIFICATIONS ─────────────────────────────────────────────── */
const VAPID_PUBLIC_KEY = 'BGCxB0-hC4h2qQcMreWJ3x4YkOuQ77YxVcg6b1WQv1h_mTokVkIP2pI83LiOSk9jIB5h2p6-SKHqj7XX7sq2-iU';
const PUSH_FB_BASE = 'https://firestore.googleapis.com/v1/projects/viana-events/databases/(default)/documents';
const PUSH_FB_KEY = 'AIzaSyDx-s-6yYdvRxP4Gy9GaWdOKBEfo8GpTXQ';

function _urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const arr = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) arr[i] = rawData.charCodeAt(i);
  return arr;
}

async function _saveSubscription(sub) {
  const subJson = sub.toJSON();
  const docId = btoa(subJson.endpoint).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
  await fetch(`${PUSH_FB_BASE}/push_subscriptions/${docId}?key=${PUSH_FB_KEY}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: {
      endpoint: { stringValue: subJson.endpoint },
      p256dh: { stringValue: subJson.keys?.p256dh || '' },
      auth: { stringValue: subJson.keys?.auth || '' },
      created: { timestampValue: new Date().toISOString() }
    }})
  }).catch(() => {});
}

async function _deleteSubscription(sub) {
  const subJson = sub.toJSON();
  const docId = btoa(subJson.endpoint).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
  await fetch(`${PUSH_FB_BASE}/push_subscriptions/${docId}?key=${PUSH_FB_KEY}`, { method: 'DELETE' }).catch(() => {});
}

async function getPushStatus() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'denied') return 'denied';
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  return sub ? 'subscribed' : 'unsubscribed';
}

async function subscribePush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: _urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
    await _saveSubscription(sub);
    return true;
  } catch(e) { console.error('Push subscribe error:', e); return false; }
}

async function unsubscribePush() {
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;
  await _deleteSubscription(sub);
  await sub.unsubscribe();
}

window.vianaPush = { subscribePush, unsubscribePush, getPushStatus };
