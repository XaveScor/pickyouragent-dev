// Service Worker with Workbox
// Caches navigation requests for 30 seconds using CacheFirst strategy

import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Register route for navigation requests with CacheFirst strategy
// Cache is checked first, network is only used if cache is invalid/expired
registerRoute(
  new NavigationRoute(
    new CacheFirst({
      cacheName: 'navigation-cache',
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 30, // Cache expires after 30 seconds
          purgeOnQuotaError: true, // Automatically purge if quota is exceeded
        }),
      ],
    })
  )
);

// Handle skip waiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // @ts-ignore - skipWaiting is available on ServiceWorkerGlobalScope
    self.skipWaiting();
  }
});

