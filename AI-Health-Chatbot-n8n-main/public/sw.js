const CACHE_NAME = 'sevasetu-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-192.png',
  '/logo-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests (like API calls to different domains)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip API calls to own domain if any
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    }).catch(() => {
      // Fallback for failed network requests
      return caches.match('/');
    })
  );
});
