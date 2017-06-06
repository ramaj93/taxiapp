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
    .controller('SignupCtrl', function($rootScope, $scope, $log,
        $state, $stateParams, spinner, User) {

        $scope.party = new User();

        $log.debug('register:type', $stateParams.type);

        /**
         * @description register new party
         */
        $scope.register = function() {

            //TODO obtain device informations
            //TODO ensure all required fields provided
            spinner.spin();

            $log.debug('user:register:before', $scope.party);

            //set user type
            $scope.party.role = $stateParams.type;

            $scope.party.$save().then(function(response) {

                $log.debug('user:register', response);
                spinner.unspin();
                $rootScope.$broadcast('user:register:success');
                $state.go('signin');

            }).catch(function(error) {

                //TODO toast error message
                $log.error('user:register', error);
                spinner.unspin();
                $state.go('signup');

            });
        };
    });