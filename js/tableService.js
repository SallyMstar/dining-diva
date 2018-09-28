const cacheFiles = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/style1.css',
	'/css/style2.css',
	'/css/style3.css',
	'/css/style4.css',
	'/css/style5.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
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
];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('table1').then(function(cache) {
			return cache.addAll(cacheFiles);
		})
	);
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			if(response) {
				console.log("Yay! I found ", e.request, " in cache!");
				return response;
			} else {
				console.log("Couldn't find ", e.request, " in cache -- fetching now");
				return fetch(e.request)
				.then(function(response) {
					caches.open('table1').then(function(cache) {
						cache.put(e.request, response);
					})
					return response;
				})
				.catch(function(error) {
					console.log(error);
				});
			};
		})
	);
});