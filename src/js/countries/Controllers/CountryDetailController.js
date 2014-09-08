angular.module('ci.countries.controllers').
controller('CountryDetailController', ['$scope', '$routeParams', 'CountryService', function($scope, $routeParams, CountryService) {
    $scope.country = {};
    $scope.geoData = null;
    $scope.shouldShowTranslations = false;
    
    // Load the country data
    CountryService.find($routeParams.cca3).then(function(country) {
        $scope.country = country;
        $scope.country.osmUrl = getOsmUrl();
        $scope.page.setTitle($scope.country.name);
    });
    
    // Load the country's GeoJSON data
    CountryService.findGeoData($routeParams.cca3).then(function(geoData) {
        $scope.geoData = geoData;
    });
    
    /**
     * Display/hide translations of the country's name.
     */
    $scope.toggleTranslations = function() {
        $scope.shouldShowTranslations = !$scope.shouldShowTranslations;
    };
    
    /**
     * Gets an Openstreetmap URL for the current country.
     * @return {string} URL to the current country's lat/long
     */
    var getOsmUrl = function() {
        var lat = $scope.country.latlng[0],
        lng = $scope.country.latlng[1],
        zoomLevel = 5;
        
        return "http://www.openstreetmap.org/#map=5/"+lat+"/"+lng;
    };
}]);