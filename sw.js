// Static cache name
var staticCacheName = 'restaurant-static-v1';

// Cache static assets on install 
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
        '/',
        `/index.html?timestamp=${timeStamp}`,
        `/restaurant.html?timestamp=${timeStamp}`,
        `/js/dbhelper.js?timestamp=${timeStamp}`,
        `/js/main.js?timestamp=${timeStamp}`,
        `/js/restaurant_info.js?timestamp=${timeStamp}`,
        `/css/styles.css?timestamp=${timeStamp}`,
        `/css/index-custom-styles.css?timestamp=${timeStamp}`,
        `/css/restaurant-custom-styles.css?timestamp=${timeStamp}`,
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
      ]);
    }).catch(err => console.log('failed to cache', err))
  );
});

// get the assets if they cached, if not fetch from network and cache 
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('restaurant-dynamic').then(cache => {
      return caches.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});