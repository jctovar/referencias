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
.controller('editCtrl', function ($scope, $route, $routeParams, $location, references, events) {
   
    var list = events.get(function () {
      $scope.list = list.events; 
    });
    
    var query = references.get({ id: $routeParams.referenceId }, function () {
      $scope.item = query.references[0]; 
    });
    
    $scope.save = function () {
        var data = {};
        data.reference_id = $scope.item.reference_id;
        data.event_id = $scope.item.event_id;
        data.account_id = $scope.item.account_id;
        data.accounts_has_references_on = $scope.item.accounts_has_references_on;
        
        var result = references.update(data, function() {
            console.log(result.references);
            if (result.references.affectedRows == 1) {
                $location.path('/')
            };
        });
    } 
});