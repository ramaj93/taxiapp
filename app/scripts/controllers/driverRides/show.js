'use strict';

angular
    .module('mobileDirect')
    .controller('DriverRidesShowCtrl', function($scope, $state, $stateParams, Ride) {

        //initialize ride quantity ordered
        $scope.order = {
            quantity: 1
        };

        //TODO load ride from server
        $scope.get = function() {
            Ride.get({ id: $stateParams.id }).then(function(ride) {
                $scope.ride = ride;
            }).catch(function(error) {
                console.log(error);
                $scope.ride = {};
            });
        };

        $scope.cancel = function() {
            Ride.cancel($scope.ride).then(function() {
                $state.go('app.rides');
            }).catch(function(error) {
                console.log(error);
            });
        };


        $scope.status = function() {

            var ride = $scope.ride;

            if (ride.canceledAt) {
                return 'Cancelled';
            }

            if (ride.requestedAt &&
                !ride.deiverConfirmedAt &&
                !ride.passengerConfirmedAt &&
                !ride.canceledAt &&
                !ride.arrivedAt) {
                return 'Waiting Driver';
            }

            if (ride.requestedAt &&
                ride.deiverConfirmedAt &&
                !ride.passengerConfirmedAt &&
                !ride.canceledAt &&
                !ride.arrivedAt) {
                return 'Waiting Your Confirmation';
            }

            if (ride.requestedAt &&
                ride.deiverConfirmedAt &&
                ride.passengerConfirmedAt &&
                !ride.canceledAt &&
                !ride.arrivedAt) {
                return 'Waiting a Ride';
            }

            if (ride.requestedAt &&
                ride.deiverConfirmedAt &&
                ride.passengerConfirmedAt &&
                !ride.canceledAt &&
                ride.arrivedAt) {
                return 'Done';
            }
        };

        $scope.get();
    });
