const CACHE_NAME = 'cv-website-cache';

// List of URLs to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/router.js',
  '/sitemap.js',
  '/main.js',
  '/template_article.html',
  /^\/images\//
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});