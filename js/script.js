var sampleApp = angular.module("MyApp", ['ngRoute']);

sampleApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/AddMobile', {
            templateUrl: 'add.html',
        }).
        when('/ListMobiles', {
            templateUrl: 'list.html',
        }).
        otherwise({
            redirectTo: '/ListMobiles'
        });
    }]);