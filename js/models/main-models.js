angular.module('main.models', ['ngResource'])
.constant("server_config",{url : "https://galadriel.ired.unam.mx:8001", key : "84656ca7c7ccc6b44523a18b6bdf94140220bfc8"})
.run(function ($http) {
    //console.log('username...' + require('remote').getGlobal('sharedObject').account_username);
    //$http.defaults.headers.common.Authorization = 'Basic amN0b3ZhcjoxMjM0NTY3OA==';
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