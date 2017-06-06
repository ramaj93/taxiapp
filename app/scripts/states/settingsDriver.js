'use strict';

/**
 * @description settings state configurations
 */

angular
    .module('mobileDirect')
    .config(function($stateProvider) {

        $stateProvider
            .state('app.settingsDriver', {
                url: '/settingsDriver',
                views: {
                    'settingsDriver': {
                        templateUrl: 'views/settingsDriver/index.html',
                        controller: 'SettingsDriverIndexCtrl'
                    }
                },
                data: {
                    authenticated: true
                }
            })
            .state('app.profileDriver', {
                url: '/profileDriver',
                views: {
                    'settingsDriver': {
                        templateUrl: 'views/settingsDriver/profileDriver.html',
                        controller: 'ProfileDriverIndexCtrl'
                    }
                }

            });


    });
