
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

const staticAssets =[
    './',
    './assets/css/bootstrap4.1.1.min.css',
    './img/avatar.png'
];


if (workbox) {
  console.log('Yay! Workbox is loaded 🎉');

  workbox.precaching.precache(staticAssets);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('fetch', function(event) {

  console.log(event.request.url);
  
  event.respondWith(
  
  caches.match(event.request).then(function(response) {
  
  return response || fetch(event.request);
  
  })
  
  );
  
  });

workbox.routing.registerRoute('https://fonts.googleapis.com/(.*)', 
                                    workbox.strategies.networkFirst());


workbox.routing.registerRoute(/\.(?:png|gif|jpg)$/,
workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
    maxEntries: 50, maxAgeSeconds: 12*60*60
    }})
);