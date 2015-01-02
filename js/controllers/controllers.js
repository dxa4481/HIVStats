var states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
var ages = ["Age 13-24", "Age 25-34", "Age 35-44", "Age 45-54", "Age 55+"]
var genders = ["Male", "Female"]
var races = ["Black", "White", "Hispanic", "Other"]
var infectionRates = {
    "Needle": 63/10000, 
    "Receptive anal": 138/10000,
    "Insertive anal": 11/10000,
    "Receptive Vaginal": 8/10000,
    "Insertive Vaginal": 4/10000,
}


angular.module('HIVControllers', [])
    .controller('mainController', function($scope, State) {
        $scope.rate = 1201100 / 316100000
        $scope.infectionRates = infectionRates;
        $scope.state = '';
        $scope.countyName = '';
        $scope.gender = '';
        $scope.age = '';
        $scope.race = '';
        $scope.RA = 1;
        $scope.IV = 1;

        $scope.states = states;
        $scope.ages = ages;
        $scope.genders = genders;
        $scope.races = races;

        $scope.setAge = function(age){
            $scope.age = age;
            $scope.updatePartnerProfile();
        }
        $scope.setRace = function(race){
            $scope.race = race;
            $scope.updatePartnerProfile();
        }
        $scope.setGender = function(gender){
            $scope.gender = gender;
            $scope.updatePartnerProfile();
        }
        $scope.setCountyName = function(county){
            $scope.county = county
            $scope.countyName = county['County Name '];
            $scope.updatePartnerProfile();
        }
        
        $scope.updatePartnerProfile = function(){
            if($scope.state){
                var infected = 0;
                var total = 0
                for (var i = 0; i < $scope.stateData.length; i++) {
                    var countyRate = Number($scope.stateData[1]["County Rate "]);
                    if(countyRate > 0){
                        total += 100000;
                        infected += countyRate;
                    }
                }
                if(total != 0){$scope.rate = infected / total}
            }
            if($scope.countyName){
                var countyRate = Number($scope.county["County Rate "]);
                if(countyRate > 0){
                    $scope.rate = countyRate / 100000;
                }
            }
            if($scope.age){
                var ageRate = Number($scope.county[$scope.age + " Rate"]);
                if(ageRate > 0){
                    $scope.rate = ageRate / 100000;
                }
            }
            var multiplier = 1;
            if($scope.gender && Number($scope.county["County Rate "]) > 0){
                var genderRate = Number($scope.county[$scope.gender + " Rate"]);
                if(genderRate > 0){
                    multiplier *= genderRate / Number($scope.county["County Rate "])
                }
            }
            if($scope.race && $scope.race !== "Other" && Number($scope.county["County Rate "]) > 0){
                var raceRate = Number($scope.county[$scope.race + " Rate"]);
                if(raceRate > 0){
                    multiplier *= raceRate / Number($scope.county["County Rate "])
                }
            }
            $scope.rate *= multiplier

        }

        $scope.getPercentage = function(currentRate, activityRate, times){
            return 100 * currentRate * (1 - Math.pow(1 - activityRate, times))
        }

        $scope.setRA = function(RA){
            $scope.RA = RA;
        }

        $scope.setIV = function(IV){
            $scope.IV = IV;
        }

        $scope.getStateData = function(state){
            State.get(state).
                success(function(data){
                    $scope.stateData = data;
                    $scope.updatePartnerProfile();
                }).
                error(function(data, status){
                })
        }
    })
