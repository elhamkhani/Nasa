/**
 * Created by Elham.Khani on 12/01/2016.
 */

var nasaApp = angular.module('nasaApp', ['ui.bootstrap']);


/*///////////////////////////////////////////////
////Data sharing service
///////////////////////////////////////////////*/
nasaApp.factory('DataSharingService', function(){
    return {
        lat:'',
        lon:''
    }
});

/*//////////////////////////////////////////////////
///// Geocode Service
/////////////////////////////////////////////////*/
nasaApp.factory('GeocodeService',  function($http,$q){

    var coordinates={
        lat:0,
        lon:0
    };

    var deferred = $q.defer();
    var GeocodeService = {};

    GeocodeService.async = function(postcode) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + postcode + '&key=' + config.googleKey)
            .success(function (response) {
                coordinates.lat = response.results[0].geometry.location.lat;
                coordinates.lon = response.results[0].geometry.location.lng;
                deferred.resolve();
            });
        return deferred.promise;
    };

    GeocodeService.coordinates = function(postcode){return coordinates;}


    return GeocodeService;

});


/*//////////////////////////////////////////////////////////
///// Nasa Date Service
///////////////////////////////////////////////////////*/
nasaApp.factory('NasaDatesService',  function($http,$q){

    var dates=[];

    var deferred = $q.defer();
    var NasaDatesService = {};

    NasaDatesService.async = function(lat,lon) {
        $http.get('https://api.nasa.gov/planetary/earth/assets?api_key='+config.nasaKey+'&lat='+lat+'&lon='+lon)
            .success(function (response) {
                dates = response.results;
                deferred.resolve();
            });
        return deferred.promise;
    };

    NasaDatesService.dates = function(){
        return Array.from(dates, (v,k)=> v.date);
    }

    return NasaDatesService;

});



/*//////////////////////////////////////////////////////////
 ///// Nasa Image Service
 ///////////////////////////////////////////////////////*/
nasaApp.factory('NasaImagesService',  function($http,$q){

    var imageUrl ='';

    var deferred = $q.defer();
    var NasaImagesService = {};

    NasaImagesService.async = function(lat,lon,date) {
        $http.get('https://api.nasa.gov/planetary/earth/imagery?lat='+lat+'&lon='+lon+'&date='+date+'&cloud_score=True&api_key='+config.nasaKey)
            .success(function (response) {
                imageUrl = response.url;
                deferred.resolve();
            });
        return deferred.promise;
    };

    NasaImagesService.imageUrl = function(){return imageUrl;}

    return NasaImagesService;

});
