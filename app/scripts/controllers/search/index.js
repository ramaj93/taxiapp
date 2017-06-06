'use strict';

angular
    .module('mobileDirect')
    .controller('SearchIndexCtrl', function(
        $rootScope, $log, $scope, $state, $q,
        $timeout, $ionicModal, uiGmapGoogleMapApi,
        geolocation, spinner, Ride, Driver, SMS, user) {

        //current ride request
        $scope.request = new Ride({});

        //default map settings
        var defaultMapCenter = {
            center: {
                latitude: -6.816330,
                longitude: 39.276638
            },
            zoom: 16
        };


        /**
         * @description update current user position on the map
         */
        $scope.positionMarker = function() {
            //update marker
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: $scope.position.coords.latitude,
                    longitude: $scope.position.coords.longitude
                },
                options: {
                    draggable: false
                },
                events: {}
            };
        };

        /**
         * @description position map based on user current location
         */
        $scope.positionMap = function(position) {
            //TODO add info box

            //normalize position
            position = position || {};

            //merge default map center
            var mapCenter = defaultMapCenter;
            if (position.coords &&
                position.coords.latitude &&
                position.coords.longitude) {
                mapCenter = angular.merge({}, defaultMapCenter, {
                    center: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            }

            $log.debug('map:initialization:center', mapCenter);

            //upate map center
            $scope.map = mapCenter;

        };


        /**
         * @description initalize map
         */
        $scope.initializeMap = function() {
            //start spinner
            spinner.spin();

            uiGmapGoogleMapApi.then(function(maps) {
                $log.debug('map:initialization:sucess', maps);

                //obtain current gps position
                geolocation.currentPosition()
                    .then(function(position) {
                        $log.debug('map:initialization:position', position);

                        //update current position
                        $scope.position = position;

                        //update mapCenter
                        $scope.positionMap(position);

                        //update position marker
                        $scope.positionMarker();

                        //hide spinner
                        spinner.unspin();
                    })
                    .catch(function(error) {
                        $log.error('map:initialization:position', error);
                        $scope.positionMap();
                        //hide spinner
                        spinner.unspin();
                    });

            }).catch(function(error) {
                //TODO toast error
                $log.error('map:initialization:error', error);
                spinner.unspin();
            });
        };


        /**
         * @description place ride request
         */
        $scope.placeRequest = function() {
            // TODO contact a server and place a request

            spinner.spin();

            //TODO make sure ride table has this structure
            $scope.request.passengerId = user.id;
            $scope.request.requestedAt = new Date();
            $scope.request.longitude = (($scope.position || {}).coords || {}).longitude;
            $scope.request.latitude = (($scope.position || {}).coords || {}).latitude;

            //get neareby drivers
            Driver.query({}).$promise.then(function(drivers) {

                //notify drivers
                var numbers = _.map(drivers, 'phoneNumber');
                console.log(user.name);
                var notifications = _.map(numbers, function(number) {
                    return SMS.send({
                        phoneNumber: number,
                        content: 'New ride request from ' + (user.name)
                    });
                });

                return $q.all(notifications);

            }).then(function(messages) {
                //create ride request
                console.log(messages);
                return $scope.request.$save();
            }).then(function( /*ride*/ ) {
                $scope.close();
                $rootScope.$broadcast('rides:reload');
                $state.go('app.rides');
                spinner.unspin();
            }).catch(function(error) {
                console.log(error);
                spinner.unspin();
            });

        };

        $scope.addRequest = function() {
            // TODO contact a server and place a request

            spinner.spin();

            var position = {
                longitude: (($scope.position || {}).coords || {}).longitude,
                latitude: (($scope.position || {}).coords || {}).latitude
            };

            var ride = {
                requestedAt: new Date(),
                departure: $scope.request.departure,
                destination: $scope.request.destination,
                position: position
            };

            Ride.create(ride).then(function() {
                $scope.close();
                $state.go('app.rides');
                spinner.unspin();
                $rootScope.$broadcast('rides:reload');
            }).catch(function(error) {
                console.log(error);
                spinner.unspin();
            });
        };

        /**
         * @description open a modal base on template name
         */
        $scope.open = function(template) {
            //prepare template
            template = ['views/search/modals/', template, '.html'].join('');
            var animation = 'slide-in-left';

            $ionicModal
                .fromTemplateUrl(template, {
                    scope: $scope,
                    animation: animation,
                }).then(function(modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                }); //TODO handle modal creation error
        };


        /**
         * @description close current modal
         */
        $scope.close = function() {
            if ($scope.modal) {
                $scope.modal.hide();
            }
        };


        /**
         * @description listen for the view destruction
         */
        $scope.$on('$destroy', function() {
            //cleanup modals
            if ($scope.modal) {
                $scope.modal.remove();
            }

            //stop location watching
            geolocation.unwatch();

        });

        //listen for the position change events
        $rootScope.$on('ionize:geolocation:new', function(event, position) {
            //update current position
            $scope.position = position;
            //TODO update map based on current position
            //TODO update marker position
            $scope.positionMarker();

            $log.debug('geolocation:current:position', position);
        });


        //bootstraping
        $scope.initializeMap();

    });
