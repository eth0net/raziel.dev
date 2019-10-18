// version v0.0.15

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('razieldev').then(cache =>
      cache.addAll([
        '',
        'index.html',
        'inc/rzl/css/core.css',
        'inc/rzl/js/core.js',
        'inc/rzl/js/ui.js',
        'index.css',
        'index.js'
      ])
    )
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response
      else return fetch(event.request)
    })
  )
})
