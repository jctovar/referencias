angular.module('main.models', ['ngResource'])
.constant("server_config",{url : "https://galadriel.ired.unam.mx:8001", key : "84656ca7c7ccc6b44523a18b6bdf94140220bfc8"})

.factory('references', function($resource, server_config) {
	return $resource(server_config.url + '/references/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
});