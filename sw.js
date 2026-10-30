// Generated from _src/sw.js by _src/build.py. Pages: stale-while-revalidate. Everything else: cache-first.
const CACHE = 'cob-ee5b1fe535';
const PAGES = ["/pages/about.html", "/pages/ai_agreement.html", "/pages/become_staff.html", "/pages/blog.html", "/pages/contact.html", "/pages/donate.html", "/pages/hackathon.html", "/", "/pages/lessons.html", "/pages/team.html"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PAGES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function save(req, res) {
  if (res.ok) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    const fresh = fetch(req).then(res => save(req, res));
    e.waitUntil(fresh.catch(() => {}));
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fresh));
  } else {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => save(req, res))));
  }
});
