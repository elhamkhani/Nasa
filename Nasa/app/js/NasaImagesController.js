/**
 * Created by Elham.Khani on 12/01/2016.
 */
nasaApp.controller('NasaImagesController',function(NasaDatesService, NasaImagesService,DataSharingService,$scope,$filter) {

    $scope.dates=[],
    $scope.filteredDates = [],
    $scope.imageUrl='',
    $scope.errorMessage = '',
    $scope.currentPage = 1,
    $scope.numPerPage = 10,
    $scope.maxSize = 5;
    $scope.isBusy = false,
        $scope.isLoadingImage = false,

    $scope.getDates = function () {
        $scope.isBusy = true;
        NasaDatesService.async(DataSharingService.lat, DataSharingService.lon)
            .then( function() {
                $scope.dates = NasaDatesService.dates();
                $scope.filteredDates = $scope.dates.slice(0, $scope.numPerPage);
            }).finally(function () {
            $scope.isBusy = false;
        });
    };

    $scope.displayImage = function (date) {
        $scope.isLoadingImage = true;
    var formattedDate = $filter('date')(date, 'yyyy-MM-dd');
        NasaImagesService.async(DataSharingService.lat, DataSharingService.lon,formattedDate)
            .then( function() {
                $scope.imageUrl = NasaImagesService.imageUrl();
            }).finally(function(){
            $scope.isLoadingImage = false;
        });
    };


    $scope.$watch("currentPage + numPerPage", function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredDates = $scope.dates.slice(begin, end);
    });

});

