VERSION = "v0.2.0";

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open("razieldev")
      .then(cache =>
        cache.addAll([
          "inc/rzl/css/core.css",
          "inc/rzl/js/core.js",
          "inc/rzl/js/router.js",
          "inc/rzl/js/ui.js",
          "index.html",
          "index.css",
          "index.js",
          "layouts/about.json",
          "layouts/contact.json",
          "layouts/home.json",
          "layouts/portfolio.json",
          "layouts/rzl.json",
          "layouts/404.json"
        ])
      )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      else return fetch(event.request);
    })
  );
});
