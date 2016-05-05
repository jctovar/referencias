angular.module('main.controllers', ['main.models', 'base64'])

.controller('mainCtrl', function ($scope, $route, $routeParams, $location, references) { 
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
        $scope.searchQuery = require('remote').getGlobal('sharedObject').searchQuery;
    });

    $scope.change = function () {
        require('remote').getGlobal('sharedObject').searchQuery = $scope.searchQuery;
    }

    $scope.reload = function () {
        inito();
    }
    
    $scope.clear = function () {
        $scope.searchQuery = '';
        require('remote').getGlobal('sharedObject').searchQuery = '';
    }
     
    var inito = function () {
        $scope.bar = false;
        references.get()
        .$promise.then(function (result) {
            $scope.items = result.references;
            $scope.bar = !$scope.bar;
        });
    }
})
.controller('editCtrl', function ($scope, $route, $routeParams, $location, $mdToast, references, events) {
    $scope.counter = 0;
    
    var list = events.get(function () {
      $scope.list = list.events; 
    });
    
    var query = references.get({ id: $routeParams.referenceId }, function () {
      $scope.item = query.references[0]; 
    });
    
    $scope.change = function() {
        $scope.counter++;
      };
    
    $scope.save = function () {
        var data = {};
        data.reference_id = $scope.item.reference_id;
        data.event_id = $scope.item.event_id;
        data.account_id = $scope.item.account_id;
        data.accounts_has_references_on = $scope.item.accounts_has_references_on;
        
        if ($scope.counter != 0) {
            var result = references.update(data, function() {
                if (result.references.affectedRows == 1) {
                    $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                    $location.path('/main')
                };
            });            
        } else {
            $location.path('/main')
        } 
    } 
})
.controller('loginCtrl', function ($http, $scope, $location, $mdToast, $base64, users) {
   
    $scope.login = function () {
        $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($scope.account_username + ':' + $scope.account_password);
        
        users.get({ id: $scope.account_username })
        .$promise.then(function (result) {
            $location.path('/main')
        })
        .catch(function(error) {
            console.log("rejected " + JSON.stringify(error.data.message));
            $mdToast.show($mdToast.simple().textContent('Ocurrio un error, verifique sus credenciales!'));
        });
    }
});