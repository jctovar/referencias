angular.module('main.models', ['ngResource'])
.constant("server_config",{url : "https://galadriel.ired.unam.mx:8001", key : "84656ca7c7ccc6b44523a18b6bdf94140220bfc8"})

.factory('users', function($resource, server_config) {
	return $resource(server_config.url + '/users/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('events', function($resource, server_config) {
	return $resource(server_config.url + '/events/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('references', function($resource, server_config) {
	return $resource(server_config.url + '/references/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
});