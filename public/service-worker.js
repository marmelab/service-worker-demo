var CACHE_NAME = 'sw-demo_1';

var urlsToCache = [
    '/index.html',
    '/playlist.html',
    '/css/normalize.css',
    '/css/sw-demo.css',
    '/images/catWorker.jpg',
    '/images/logo.png',
    '/covers/avecpasdcasque.jpg',
    '/covers/ryleywalker.jpg',
    '/covers/xeniaRubinos.jpg',
    '/js/sw-demo.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
        .then(() => self.skipWaiting())
    );
});


self.addEventListener('activate', function activator (event) {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
