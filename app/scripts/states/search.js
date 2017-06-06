'use strict';

/**
 * @description search state configurations
 */

angular
    .module('mobileDirect')
    .config(function($stateProvider) {

        $stateProvider
            .state('app.search', {
                url: '/search',
                views: {
                    'search': {
                        templateUrl: 'views/search/index.html',
                        controller: 'SearchIndexCtrl'
                    }
                },
                data: {
                    authenticated: true
                }
            })
            .state('app.confirmation', {
                url: '/confirmation',
                views: {
                    'search': {
                        templateUrl: 'views/search/confirmation.html',
                        controller: 'ConfirmationIndexCtrl'
                    }
                }
            })
            .state('app.onlinedrivers', {
                url: '/onlinedrivers',
                views: {
                    'search': {
                        templateUrl: 'views/search/onlinedrivers.html',
                        controller: 'OnlinedriversIndexCtrl'
                    }
                }

            });
    });
