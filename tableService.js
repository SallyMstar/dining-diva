var ingredients = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styleSmall.css',
	'/css/styleMid.css',
	'/css/styleUpperMid.css',
	'/css/styleLarge.css',
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

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('cacheTori')
		.then(cache => cache.addAll(ingredients))
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cache) {
			return Promise.all(
				cache.filter(function(cache) {
					return cache != 'cacheTori';
				}).map(function(cache) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});


self.addEventListener('fetch', function(event) {
	let page = new URL(event.request.url);

	if (page.origin === '/') {
		event.respondWith(caches.match('/skeleton'));
		return;
	}
	event.respondWith(
		caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
			if(response) {
				console.log("Found it!");
				return response;
			} else {
				console.log("Nowhere to be found -- whipping it up!");
				return fetch(event.request)
				.then(function(response) {
					const responseClone = response.clone();
					caches.open('cacheTori').then(function(cache) {
							cache.put(event.request, responseClone);
						})
					return response;
				})
				.catch(function(error) {
					console.log(error);
				})
			}
		})
	);
});