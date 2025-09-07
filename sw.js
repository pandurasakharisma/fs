var cacheName = "FS-CRM-v2";
var filesToCache = [
  "./",
  "./index.html",
  "./assets/css/vendors/aos.css",
  "./assets/css/vendors/bootstrap.css",
  "./assets/css/vendors/calendar.min.css",
  "./assets/css/vendors/iconsax.css",
  "./assets/css/vendors/swiper-bundle.min.css",
  "./assets/css/GTWalsheimPro.css",
  "./assets/css/style.css",
  "./assets/js/aos.js",
  "./assets/js/bootstrap.bundle.min.js",
  "./assets/js/calendar.min.js",
  "./assets/js/chatting-chat.js",
  "./assets/js/custom-aos.js",
  "./assets/js/custom-calendar.js",
  "./assets/js/custom-map.js",
  "./assets/js/custom-swiper.js",
  "./assets/js/custom-tip.js",
  "./assets/js/homescreen-popup.js",
  "./assets/js/iconsax.js",
  "./assets/js/image-change.js",
  "./assets/js/otp.js",
  "./assets/js/password-show.js",
  "./assets/js/script.js",
  "./assets/js/sticky-header.js",
  "./assets/js/swiper-bundle.min.js",
  "./assets/js/template-setting.js",
  "./pages/home.js",
  "./pages/kamera.js",
  "./pages/listitem.js",
  "./pages/listpelanggan.js",
  "./pages/login.js",
  "./assets/fonts/GTWalsheimPro/GTWalsheimPro-Regular.woff2",
  "./assets/fonts/GTWalsheimPro/GTWalsheimPro-Medium.woff2",
  "./assets/fonts/GTWalsheimPro/GTWalsheimPro-Bold.woff2"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== cacheName ? caches.delete(key) : null)))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).then(response => {
      let clone = response.clone();
      caches.open(cacheName).then(cache => cache.put(event.request, clone));
      return response;
    }).catch(() => caches.match(event.request).then(cachedResponse => cachedResponse || caches.match("./index.html")))
  );
});
