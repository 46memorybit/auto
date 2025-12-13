const CACHE_NAME = 'auto-link-v1';
const FILES = [
'/auto_link/index.html',
'/auto_link/app.js',
'/auto_link/db.js',
'/auto_link/manifest.webmanifest'
];


self.addEventListener('install', e => {
e.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
);
});


self.addEventListener('fetch', e => {
e.respondWith(
caches.match(e.request).then(res => res || fetch(e.request))
);
});
