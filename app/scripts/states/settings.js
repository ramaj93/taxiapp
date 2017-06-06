'use strict';

/**
 * @description settings state configurations
 */

angular
    .module('mobileDirect')
    .config(function($stateProvider) {

        $stateProvider
            .state('app.settings', {
                url: '/settings',
                views: {
                    'settings': {
                        templateUrl: 'views/settings/index.html',
                        controller: 'SettingsIndexCtrl'
                    }
                },
                data: {
                    authenticated: true
                }
            })
            .state('app.profile', {
                url: '/profile',
                views: {
                    'settings': {
                        templateUrl: 'views/settings/profile.html',
                        controller: 'ProfileIndexCtrl'
                    }
                }

            })
            .state('app.aboutus', {
                url: '/aboutus',
                views: {
                    'settings': {
                        templateUrl: 'views/settings/aboutus.html',
                        controller: 'AboutusIndexCtrl'
                    }
                }

            });

    });
