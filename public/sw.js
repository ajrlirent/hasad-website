// HASAD service worker — runtime cache for images & static assets
// Cache-first for images, stale-while-revalidate for other GET requests.
const CACHE = "hasad-v1";
const IMG_CACHE = "hasad-img-v1";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE && k !== IMG_CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Never cache API calls or the APK download
  if (url.pathname.startsWith("/api/") || url.pathname.endsWith(".apk")) return;
  if (url.hostname !== self.location.hostname) return;

  const isImage = /\.(png|jpe?g|svg|webp|gif|ico)$/i.test(url.pathname);

  if (isImage) {
    e.respondWith(
      caches.open(IMG_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          const fetchPromise = fetch(req).then((res) => {
            if (res && res.status === 200) cache.put(req, res.clone());
            return res;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Stale-while-revalidate for other same-origin GETs
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        const fetchPromise = fetch(req).then((res) => {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});
