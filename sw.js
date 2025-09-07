var cacheName = "FS-CRM-v1";
var filesToCache = [
  "./",
  "./index.html",
  "./assets/css/vendors/aos.css",
  "./assets/css/vendors/bootstrap.css",
  "./assets/css/vendors/bootstrap.rtl.min.css",
  "./assets/css/vendors/calender.min.css",
  "./assets/css/vendors/iconsax.css",
  "./assets/css/vendors/swiper-bundle.min.css",
  "./assets/css/GTWalsheimPro.css",
  "./assets/css/style.css",
  "./assets/js/aos.js",
  "./assets/js/bootstrap.bundle.min.js",
  "./assets/js/calender.min.js",
  "./assets/js/chatting-chat.js",
  "./assets/js/custom-aos.js",
  "./assets/js/custom-calender.js",
  "./assets/js/custom-map.js",
  "./assets/js/custom-swiper.js",
  "./assets/js/custom-tip.js",
  "./assets/js/homescreen-popup.js",
  "./assets/js/iconsax.js",
  "./assets/js/image-change.js",
  "./assets/js/offcanvas-popup.js",
  "./assets/js/onload-modal.js",
  "./assets/js/otp.js",
  "./assets/js/password-show.js",
  "./assets/js/quantity.js",
  "./assets/js/script.js",
  "./assets/js/sticky-header.js",
  "./assets/js/swiper-bundle.min.js",
  "./assets/js/template-setting.js",
  "./assets/js/uikit.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => {
        if (key !== cacheName) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        let clone = response.clone();
        caches.open(cacheName).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
