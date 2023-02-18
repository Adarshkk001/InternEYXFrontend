let cacheData = "appV1";

this.addEventListener("install", (event) => {
  console.log("appV1 Installing...");
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.add(
        "/InternEYXFrontend/"
        // "/ws",
        // "/manifest.json",
        // "/favicon.ico",
        // "/logo192.png",
        // "/static/js/bundle.js",
        // "/preferences",
        // "/mainpage",
        // "/personalPage",
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("V1 now ready to handle fetches!");
});

this.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (!navigator.onLine && url.origin == location.origin) {
    switch (url.pathname) {
      case "/InternEYXFrontend/":
        event.respondWith(caches.match("/InternEYXFrontend/"));
        break;
      // case "/ws":
      //   event.respondWith(caches.match("/ws"));
      //   break;
      // case "/manifest.json":
      //   event.respondWith(caches.match("/manifest.json"));
      //   break;
      // case "/favicon.ico":
      //   event.respondWith(caches.match("/favicon.ico"));
      //   break;
      // case "/logo192.png":
      //   event.respondWith(caches.match("/logo192.png"));
      //   break;
      // case "/static/js/bundle.js":
      //   event.respondWith(caches.match("/static/js/bundle.js"));
      //   break;
      // case "/preferences":
      //   event.respondWith(caches.match("/preferences"));
      //   break;
      // case "/mainpage":
      //   event.respondWith(caches.match("/mainpage"));
      //   break;
      // case "/personalPage":
      //   event.respondWith(caches.match("/personalPage"));
      //   break;
      default:
        break;
    }
  }
  //   // let requestURL = event.request.clone();
  //   // //   console.log(requestURL);
  //   // return fetch(requestURL);
});
