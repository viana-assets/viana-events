/* Viana Push API - kein npm, nur Node.js built-ins */
const crypto = require('crypto');
const https  = require('https');

const VAPID_PUB  = 'BGCxB0-hC4h2qQcMreWJ3x4YkOuQ77YxVcg6b1WQv1h_mTokVkIP2pI83LiOSk9jIB5h2p6-SKHqj7XX7sq2-iU';
const VAPID_SUB  = 'mailto:info@viana-assets.com';
const FB_BASE    = 'https://firestore.googleapis.com/v1/projects/viana-events/databases/(default)/documents';
const FB_KEY     = 'AIzaSyDx-s-6yYdvRxP4Gy9GaWdOKBEfo8GpTXQ';

function b64u(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
}

function createJWT(audience, privB64u) {
  const pub = Buffer.from(VAPID_PUB, 'base64url');
  const pk  = crypto.createPrivateKey({ format:'jwk', key:{
    kty:'EC', crv:'P-256', d:privB64u,
    x: pub.slice(1,33).toString('base64url'),
    y: pub.slice(33,65).toString('base64url')
  }});
  const hdr = b64u(Buffer.from(JSON.stringify({typ:'JWT',alg:'ES256'})));
  const pld = b64u(Buffer.from(JSON.stringify({aud:audience,exp:Math.floor(Date.now()/1000)+43200,sub:VAPID_SUB})));
  const txt = hdr+'.'+pld;
  const sig = crypto.sign('SHA256', Buffer.from(txt), {key:pk, dsaEncoding:'ieee-p1363'});
  return txt+'.'+b64u(sig);
}

function push(endpoint, jwt) {
  return new Promise((ok,fail) => {
    const u = new URL(endpoint);
    const r = https.request({
      hostname:u.hostname, path:u.pathname+u.search, method:'POST',
      headers:{'Authorization':'vapid t='+jwt+',k='+VAPID_PUB,'TTL':'86400','Content-Length':'0'}
    }, res => {
      res.resume();
      if([200,201,202].includes(res.statusCode)) return ok();
      if([404,410].includes(res.statusCode)) return fail({gone:true});
      fail(new Error('HTTP '+res.statusCode));
    });
    r.on('error', fail);
    r.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});

  const secret = process.env.PUSH_SECRET;
  if(secret && req.headers.authorization!==('Bearer '+secret))
    return res.status(401).json({error:'Unauthorized'});
  if(!process.env.VAPID_PRIVATE_KEY)
    return res.status(500).json({error:'VAPID_PRIVATE_KEY fehlt in Vercel'});

  const {title='Viana Events', body='', url='/events.html'} = req.body||{};

  // Inhalt in Firestore speichern (sw.js liest ihn beim Push-Event)
  await fetch(FB_BASE+'/notifications/latest?key='+FB_KEY, {
    method:'PATCH', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({fields:{
      title:{stringValue:title}, body:{stringValue:body},
      url:{stringValue:url}, sent:{timestampValue:new Date().toISOString()}
    }})
  }).catch(()=>{});

  // Subscriptions laden
  let subs=[];
  try {
    const r = await fetch(FB_BASE+'/push_subscriptions?key='+FB_KEY+'&pageSize=500');
    if(!r.ok) return res.status(500).json({error:'Firestore HTTP '+r.status});
    const d = await r.json();
    subs=(d.documents||[]).map(doc=>({
      endpoint:doc.fields&&doc.fields.endpoint&&doc.fields.endpoint.stringValue,
      docName:doc.name
    })).filter(s=>s.endpoint);
  } catch(e) {
    return res.status(500).json({error:'Firestore Fehler',detail:e.message});
  }

  if(!subs.length) return res.status(200).json({sent:0,message:'Keine Abonnenten'});

  const priv = process.env.VAPID_PRIVATE_KEY;
  let sent=0, failed=0;
  await Promise.allSettled(subs.map(async sub => {
    try {
      const jwt = createJWT(new URL(sub.endpoint).origin, priv);
      await push(sub.endpoint, jwt);
      sent++;
    } catch(e) {
      if(e&&e.gone&&sub.docName)
        await fetch(sub.docName+'?key='+FB_KEY,{method:'DELETE'}).catch(()=>{});
      failed++;
    }
  }));

  return res.status(200).json({sent,failed,total:subs.length});
};
