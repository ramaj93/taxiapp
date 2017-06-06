'use strict';

/**
 * @description rides state configurations
 */

angular
    .module('mobileDirect')
    .config(function($stateProvider) {

        $stateProvider
            .state('app.rides', {
                url: '/rides',
                views: {
                    'rides': {
                        templateUrl: 'views/rides/index.html',
                        controller: 'RidesIndexCtrl'
                    }
                },
                data: {
                    authenticated: true
                }
            })
            .state('app.ride', {
                url: '/ride/:id',
                views: {
                    'rides': {
                        templateUrl: 'views/rides/show.html',
                        controller: 'RidesShowCtrl'
                    }
                }

            });
    });