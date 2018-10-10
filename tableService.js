var ingredients = [
	'https://sallymstar.github.io/dining-diva/',
	'https://sallymstar.github.io/dining-diva/index.html',
	'https://sallymstar.github.io/dining-diva/restaurant.html',
	'https://sallymstar.github.io/dining-diva/css/styleSmall.css',
	'https://sallymstar.github.io/dining-diva/css/styleMid.css',
	'https://sallymstar.github.io/dining-diva/css/styleUpperMid.css',
	'https://sallymstar.github.io/dining-diva/css/styleLarge.css',
	'https://sallymstar.github.io/dining-diva/js/dbhelper.js',
	'https://sallymstar.github.io/dining-diva/js/main.js',
	'https://sallymstar.github.io/dining-diva/js/restaurant_info.js',
	'https://sallymstar.github.io/dining-diva/data/restaurants.json',
	'https://sallymstar.github.io/dining-diva/img/1.jpg',
	'https://sallymstar.github.io/dining-diva/img/2.jpg',
	'https://sallymstar.github.io/dining-diva/img/3.jpg',
	'https://sallymstar.github.io/dining-diva/img/4.jpg',
	'https://sallymstar.github.io/dining-diva/img/5.jpg',
	'https://sallymstar.github.io/dining-diva/img/6.jpg',
	'https://sallymstar.github.io/dining-diva/img/7.jpg',
	'https://sallymstar.github.io/dining-diva/img/8.jpg',
	'https://sallymstar.github.io/dining-diva/img/9.jpg',
	'https://sallymstar.github.io/dining-diva/img/10.jpg'
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