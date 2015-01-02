var states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
var ages = ["Age 13-24", "Age 25-34", "Age 35-44", "Age 45-54", "Age 55+"]

angular.module('HIVControllers', [])
    .controller('mainController', function($scope, State) {
        $scope.state = '';
        $scope.countyName = '';
        $scope.gender = '';
        $scope.age = '';

        $scope.states = states;
        $scope.ages = ages;
        $scope.setCountyName = function(name){
            $scope.countyName = name;
            console.log("being called!")

        }
        $scope.getStateData = function(state){
            console.log(state);
            State.get(state).
                success(function(data){
                    $scope.stateData = data;
                }).
                error(function(data, status){
                })
        }
    })
