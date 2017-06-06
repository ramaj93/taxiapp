'use strict';

angular
    .module('mobileDirect')
    .controller('DriverRidesIndexCtrl', function($scope, $ionicFilterBar, Ride) {
        //TODO load rides from server
        //TODO show loading mask
        //TODO implement pull to refresh
        //TODO implement infinity scroll
        $scope.find = function() {
            Ride.find().then(function(rides) {
                $scope.rides = rides;
            }).catch(function(error) {
                console.log(error);
                $scope.rides = [];
            });
        };


        /**
         * @description show rides search bar
         */
        $scope.showFilterBar = function() {

            $ionicFilterBar.show({
                cancelText: '<i class=\'ion-ios-close-outline\'></i>',
                items: $scope.rides,
                update: function(filteredItems /*, filterText*/ ) {
                    $scope.rides = filteredItems;
                }
            });

        };

        $scope.status = function(ride) {

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

        $scope.find();
    });
