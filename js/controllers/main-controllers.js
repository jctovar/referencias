angular.module('main.controllers', ['main.models'])

.controller('mainCtrl', function ($scope, $route, $routeParams, $location, references) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });

    $scope.reload = function () {
        inito();
    }
     
    var inito = function () {
        $scope.bar = false;
        query = references.get()
        .$promise.then(function (result) {
            $scope.items = result.references;
            $scope.bar = !$scope.bar;
        });
    }
})
.controller('editCtrl', function ($scope, $route, $routeParams, $location, references) {
    console.log($routeParams.referenceId);
    
    var query = references.get({ id: $routeParams.referenceId }, function () {
      $scope.item = query.references[0]; 
    });
    
    $scope.save = function () {
        $location.path('/')
    } 
});