'use strict';

/**
 * @description request state configurations
 */

angular
    .module('mobileDirect')
    .config(function($stateProvider) {

        $stateProvider
            .state('app.request', {
                url: '/request',
                views: {
                    'request': {
                        templateUrl: 'views/request/index.html',
                        controller: 'RequestIndexCtrl'
                    }
                },
                data: {
                    authenticated: true
                }
            });
    });