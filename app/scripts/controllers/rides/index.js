'use strict';

angular
    .module('mobileDirect')
    .controller('RidesIndexCtrl', function($rootScope, $scope, $ionicFilterBar, spinner, Ride, user) {
        //TODO load rides from server
        //TODO show loading mask
        //TODO implement pull to refresh
        //TODO implement infinity scroll
        $scope.find = function() {

            spinner.spin();

            Ride.query({ passengerId: user.id }).$promise.then(function(rides) {
                $scope.rides = rides;
                spinner.unspin();
            }).catch(function(error) {
                console.log(error);
                $scope.rides = [];
                spinner.unspin();
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
        };

        //listen for events
        $rootScope.$on('rides:reload', function() {
            $scope.find();
        });

        $scope.find();
    });
