angular.module('HIVServices', [])

        // super simple service
        // each function returns a promise object 
        .factory('State', function($http) {
                return {
                        get : function(state) {
                                return $http.get('states/' + state + '.json');
                        }
                }
        })
