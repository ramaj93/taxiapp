'use strict';

/**
 * @ngdoc service
 * @name com.byteskode.ionize.geolocation
 * @description
 * # Geolocation
 * Factory in the byteskode ionize.
 */
angular
    .module('com.byteskode.ionize.geolocation', [])
    .factory('geolocation', function($rootScope, $log, $cordovaGeolocation) {
        //TODO make it be provider
        //TODO expose get current position options
        //TODO expose watch options

        //reference geolocation
        var geolocation = {};

        //reference current location watcher
        // geolocation.$watch;

        //position default options
        var defaultPositionOptions = {
            timeout: 4000,
            enableHighAccuracy: true
        };

        //watch default options
        var defaultWatchOptions = {
            timeout: 10000,
            enableHighAccuracy: true // may cause errors if true
        };


        /**
         * @name current position
         * @param  {Object} options options to obtain current position
         * @return {Object}         current location coordinates 
         * @see {@link https://github.com/apache/cordova-plugin-geolocation|cordova-plugin-geolocation}      
         */
        geolocation.currentPosition = function(options) {
            //merge default options
            options = angular.merge({}, defaultPositionOptions, options);

            //get current position
            return $cordovaGeolocation.getCurrentPosition(options)
                .then(function(position) {
                    $log.debug('ionize:geolocation:current', position);
                    return position;
                });
        };


        /**
         * @name watch
         * @description watch current position and broadcast it
         * @param  {Object} options options to watch position
         */
        geolocation.watch = function(options) {
            //merge default options
            options = angular.merge({}, defaultWatchOptions, options);

            if (!geolocation.$watch) {
                geolocation.$watch =
                    $cordovaGeolocation.watchPosition(options);
            }

            //receive geolocation updates
            geolocation.$watch.then(null, function(error) {
                $log.error('ionize:geolocation:new', JSON.stringify(error));
            }, function(position) {
                $log.debug('ionize:geolocation:new', position);
                $rootScope.$broadcast('ionize:geolocation:new', position);
            });

        };


        /**
         * @name unwatch
         * @description clear current geolocation watching
         */
        geolocation.unwatch = function() {
            //clear current geolocation watch
            if (geolocation.$watch) {
                geolocation.$watch.clearWatch();
            }
        };

        return geolocation;

    });