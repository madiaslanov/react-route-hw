const CACHE_NAME = 'route-hw-v1';
const APP_SHELL_CACHE = 'app-shell-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';

// App shell files to cache on install
const APP_SHELL_FILES = [
  '/',
  '/index.html',
  '/vite.svg',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/manifest.json',
];

// Public API endpoints to cache (dummyjson.com)
const PUBLIC_API_PATTERN = /^https:\/\/dummyjson\.com\/products/;

// Private endpoints that should NOT be cached (Firebase auth, etc.)
const PRIVATE_PATTERNS = [
  /^https:\/\/.*\.firebase/,
  /^https:\/\/.*\.googleapis\.com/,
  /\/auth\//,
  /\/login/,
  /\/signup/,
  /\/profile/,
];

// Check if URL is a private endpoint
function isPrivateEndpoint(url) {
  return PRIVATE_PATTERNS.some(pattern => pattern.test(url));
}

// Install event - cache app shell
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(APP_SHELL_FILES).catch((err) => {
        console.error('[Service Worker] Failed to cache app shell:', err);
      });
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName !== CACHE_NAME &&
              cacheName !== APP_SHELL_CACHE &&
              cacheName !== RUNTIME_CACHE
            );
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip private endpoints
  if (isPrivateEndpoint(request.url)) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).catch(() => {
          return caches.match('/index.html');
        });
      })
    );
    return;
  }

  // Handle public API requests (dummyjson.com/products)
  if (PUBLIC_API_PATTERN.test(request.url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) => {
        // Try network first (network-first strategy)
        return fetch(request)
          .then((response) => {
            // Clone the response before caching
            if (response.ok) {
              const responseToCache = response.clone();
              cache.put(request, responseToCache);
            }
            return response;
          })
          .catch(() => {
            // Network failed, try cache (stale-while-revalidate fallback)
            return caches.match(request).then((cachedResponse) => {
              if (cachedResponse) {
                console.log('[Service Worker] Serving cached API response:', request.url);
                return cachedResponse;
              }
              // No cache available, return offline message response
              // Match the API response structure
              const isSearch = request.url.includes('/search');
              const isSingleItem = /\/products\/\d+$/.test(request.url);
              
              if (isSingleItem) {
                // For single item requests, return null-like response
                return new Response(
                  JSON.stringify({}),
                  {
                    headers: { 'Content-Type': 'application/json' },
                    status: 404,
                  }
                );
              }
              
              // For list/search requests, return empty products array
              return new Response(
                JSON.stringify({
                  products: [],
                  total: 0,
                  skip: 0,
                  limit: 0,
                }),
                {
                  headers: { 'Content-Type': 'application/json' },
                }
              );
            });
          });
      })
    );
    return;
  }

  // Handle static assets (JS, CSS, images, etc.)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          // Don't cache if not ok or not a GET request
          if (!response.ok || request.method !== 'GET') {
            return response;
          }

          // Only cache same-origin assets or public assets
          const url = new URL(request.url);
          const isSameOrigin = url.origin === self.location.origin;
          const isPublicAsset = 
            request.url.includes('.js') ||
            request.url.includes('.css') ||
            request.url.includes('.png') ||
            request.url.includes('.jpg') ||
            request.url.includes('.jpeg') ||
            request.url.includes('.svg') ||
            request.url.includes('.woff') ||
            request.url.includes('.woff2');

          if (isSameOrigin && isPublicAsset) {
            // Cache static assets
            const responseToCache = response.clone();
            caches.open(APP_SHELL_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }

          return response;
        })
        .catch(() => {
          // For assets, return cached version or nothing
          return caches.match(request);
        });
    })
  );
});

// Message event - handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

