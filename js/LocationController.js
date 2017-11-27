/**
 * Created by elham on 10/01/2016.
 */


    nasaApp.controller('LocationController',function(GeocodeService,DataSharingService,$scope) {

        $scope.address = {
                postcode:'sm4 4su',
                lat:0,
                lon:0
            };

        $scope.errorMessage = '';

        $scope.getLatLong = function () {
            GeocodeService.async($scope.address.postcode)
                .then( function() {
                   $scope.address.lat = GeocodeService.coordinates().lat;
                   $scope.address.lon = GeocodeService.coordinates().lon;
                   DataSharingService.lat =$scope.address.lat;
                    DataSharingService.lon = $scope.address.lon;
               });
        };
    });




