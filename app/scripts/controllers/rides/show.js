'use strict';

angular
    .module('mobileDirect')
    .controller('RidesShowCtrl', function($rootScope, $ionicModal, $scope, $state, $stateParams, Ride) {

        //initialize ride quantity ordered
        $scope.order = {
            quantity: 1
        };

        $ionicModal.fromTemplateUrl('views/rides/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });


        //TODO load ride from server
        $scope.get = function() {
            console.log(Ride);
            Ride.get({ id: $stateParams.id }).then(function(ride) {
                // ride.driverConfirmedAt = new Date();
                // ride.passengerConfirmedAt = new Date();
                // ride.state = 'Waiting a Ride';
                $scope.ride = ride;
            }).catch(function(error) {
                console.log(error);
                $scope.ride = {};
            });
        };

        $scope.cancel = function() {
            //TODO notify driver if any respond on the ride rquest
            Ride.cancel($scope.ride).then(function() {
                $rootScope.$broadcast('rides:reload');
                $state.go('app.rides');
            }).catch(function(error) {
                console.log(error);
            });
        };

        $scope.arrived = function() {
            //TODO persist the ride to server side
            Ride.arrived($scope.ride).then(function() {
                $rootScope.$broadcast('ride:reload');
            }).catch(function(error) {
                console.log(error);
            });
        };


        $scope.rate = function() {
            // to obtain current ride use $scope.ride
        };


        $scope.status = function(ride) {

            if (ride) {
                if (ride.canceledAt) {
                    return 'Cancelled';
                }

                if (ride.requestedAt &&
                    !ride.driverConfirmedAt &&
                    !ride.passengerConfirmedAt &&
                    !ride.canceledAt &&
                    !ride.arrivedAt) {
                    return 'Waiting Driver';
                }

                if (ride.requestedAt &&
                    ride.driverConfirmedAt &&
                    !ride.passengerConfirmedAt &&
                    !ride.canceledAt &&
                    !ride.arrivedAt) {
                    return 'Waiting Your Confirmation';
                }

                if (ride.requestedAt &&
                    ride.driverConfirmedAt &&
                    ride.passengerConfirmedAt &&
                    !ride.canceledAt &&
                    !ride.arrivedAt) {
                    return 'Waiting a Ride';
                }

                if (ride.requestedAt &&
                    ride.driverConfirmedAt &&
                    ride.passengerConfirmedAt &&
                    !ride.canceledAt &&
                    ride.arrivedAt) {
                    return 'Done';
                }
            }
        };

        //listen for events
        $rootScope.$on('ride:reload', function() {
            $scope.get();
        });

        $scope.get();
    });
