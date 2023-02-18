let cacheData = "appV1";

this.addEventListener("install", (event) => {
  console.log("appV1 Installing...");
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/InternEYXFrontend/",
        // "/InternEYXFrontend/static/js/main.634a02ad.js",
        // "/InternEYXFrontend/static/css/main.aede704e.css",
        // "/InternEYXFrontend/favicon.ico",
        // "/InternEYXFrontend/manifest.json",
        // "/InternEYXFrontend/logo192.png",
        // "/ws",
        // "/manifest.json",
        // "/favicon.ico",
        // "/logo192.png",
        // "/static/js/bundle.js",
        // "/preferences",
        // "/mainpage",
        // "/personalPage",
      ]);
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
      case "/InternEYXFrontend/static/js/main.634a02ad.js":
        event.respondWith(
          caches.match("/InternEYXFrontend/static/js/main.634a02ad.js")
        );
        break;
      case "/InternEYXFrontend/manifest.json":
        event.respondWith(caches.match("/manifest.json"));
        break;
      case "/InternEYXFrontend/favicon.ico":
        event.respondWith(caches.match("/favicon.ico"));
        break;
      case "/InternEYXFrontend/logo192.png":
        event.respondWith(caches.match("/logo192.png"));
        break;
      case "/InternEYXFrontend/static/css/main.aede704e.css":
        event.respondWith(
          caches.match("/InternEYXFrontend/static/css/main.aede704e.css")
        );
        break;
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
