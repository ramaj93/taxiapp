'use strict';

/**
 * @ngdoc function
 * @name kopesha.controller:SignupCtrl
 * @description
 * # BorrowerMainCtrl
 * Borrower main controller of kopesha
 */

angular
    .module('mobileDirect')
    .controller('DriverSignupCtrl', function($scope, $state, Party) {

        $scope.party = {};

        /**
         * @description register new party
         */
        $scope.register = function() {

            //TODO obtai1n device informations
            Party.register($scope.party)
                .then(function( /*response*/ ) {
                    $state.go('signin');
                }).catch(function( /*error*/ ) {
                    //TODO toast error message

                    $state.go('DriverSignup');
                });
        };
    });
