// SprinkFlow Tools PWA service worker — offline-first for the static tools.
const CACHE = "sprinkflow-tools-v87";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/logo.png",
  "./tools/feet-inch.html",
  "./tools/spacing.html",
  "./tools/water-supply.html",
  "./tools/nfpa13.html",
  "./tools/nfpa1142.html",
  "./tools/nfpa-quiz.html",
  "./tools/nfpa-quiz-questions.js",
  "./tools/nfpa-study.html",
  "./tools/nfpa-study-questions.js",
  "./tools/nfpa-study-2016.js",
  "./tools/sprinkflow-auth.js",
  "./tools/sprinkword.html",
  "./tools/sprinkword-words.js",
  "./tools/sprinkword-dictionary.js",
  "./tools/blaze.html",
  "./tools/siege.html",
  "./tools/hanger-detail.html",
  "./storage-hazard.html",
  "./storage-hazard.css?v=3",
  "./storage-hazard.js?v=6",
  "./data/storage_hazard_criteria.json",
  "./data/nfpa13_common_references.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  // Cache-first for same-origin; stale-while-revalidate for fonts/CDN.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((resp) => {
          if (resp && resp.status === 200 && (resp.type === "basic" || resp.type === "cors")) {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
          }
          return resp;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
