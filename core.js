var HIVApp = angular.module('HIVApp', ['ngRoute', 'HIVControllers', 'HIVServices']);

HIVApp.config(function($routeProvider){
        $routeProvider
                .when('/', {
                        templateUrl: 'pages/main.html',
                        controller: 'mainController'
                })
});
