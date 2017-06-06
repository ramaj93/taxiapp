'use strict';

/**
 * @description drivers state configurations
 */

angular
    .module('mobileDirect')
    .config(function($stateProvider) {

        $stateProvider
            .state('app.drivers', {
                url: '/drivers',
                views: {
                    'drivers': {
                        templateUrl: 'views/drivers/index.html',
                        controller: 'DriversIndexCtrl'
                    }
                },
                data: {
                    authenticated: true
                }
            })
            .state('app.driverdetails', {
                url: '/driverdetails/:id',
                views: {
                    'search': {
                        templateUrl: 'views/drivers/driverdetails.html',
                        controller: 'DriverdetailsIndexCtrl'
                    }
                }
            });
    });
