const CACHE_VERSION = 'akamsi-v3';
const APP_SHELL = [
  './',
  './index.html',
  './driver.html',
  './admin.html',
  './resto.html',
  './offline.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(APP_SHELL);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => key !== CACHE_VERSION ? caches.delete(key) : Promise.resolve()));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(event.request);
      } catch {
        return (await caches.match(event.request)) || caches.match('./offline.html');
      }
    })());
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      try {
        const response = await fetch(event.request);
        const cache = await caches.open(CACHE_VERSION);
        if (response && response.status === 200) cache.put(event.request, response.clone());
        return response;
      } catch {
        return caches.match('./offline.html');
      }
    })());
  }
});
