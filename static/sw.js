// Retires the service worker that the old Next.js site (next-pwa) registered at /sw.js.
// Browsers re-check /sw.js on navigation; this version clears the old caches, unregisters
// itself and reloads open tabs so returning visitors stop getting stale cached pages.
// Keep it deployed for a few months after the migration, then delete it.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: "window" });
      for (const client of windows) client.navigate(client.url);
    })()
  );
});
