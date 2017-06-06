'use strict';

/**
 * @description driverRides state configurations
 */

angular
    .module('mobileDirect')
    .config(function($stateProvider) {

        $stateProvider
            .state('app.driverRides', {
                url: '/driverRides',
                views: {
                    'driverRides': {
                        templateUrl: 'views/driverRides/index.html',
                        controller: 'DriverRidesIndexCtrl'
                    }
                },
                data: {
                    authenticated: true
                }
            })
            .state('app.driverRide', {
                url: '/driverRide/:id',
                views: {
                    'driverRides': {
                        templateUrl: 'views/driverRides/show.html',
                        controller: 'DriverRidesShowCtrl'
                    }
                }

            });
    });
