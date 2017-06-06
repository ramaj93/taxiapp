'use strict';

angular
    .module('mobileDirect')
    .controller('AppCtrl', function($rootScope, $scope, $state, $log,
        spinner, $auth, Profile) {

        $scope.loadProfile = function() {
            //start spinner
            spinner.spin();

            $auth
                .getProfile()
                .then(function(user) {
                    $log.debug('auth:succes', user);
                    $rootScope.profile = user;
                    return Profile.save(user);
                })
                .then(function(profile) {

                    $scope.profile = profile || {};

                    $rootScope.hasNoProfile =
                        Object.keys($scope.profile).length === 0;

                    if ($scope.profile.role === 'DRIVER') {
                        $rootScope.driver = true;
                    } else {
                        $rootScope.passenger = true;
                    }

                    if ($rootScope.driver) {
                        $state.go('app.rides');
                    } else {
                        $state.go('app.search');
                    }

                    spinner.unspin();
                });

        };

        //show spinner on signin begin
        $rootScope.$on('signinBegin', function() {
            $log.debug('signin:begin');
            spinner.spin();
        });


        //hide spinner on signin success
        $rootScope.$on('signinSuccess', function() {
            $log.debug('signin:success');
            $scope.loadProfile();
        });

        //hide spinner on signin error
        $rootScope.$on('signinError', function() {
            $log.error('signin:error');
            spinner.unspin();
        });

        $scope.loadProfile();

    });
