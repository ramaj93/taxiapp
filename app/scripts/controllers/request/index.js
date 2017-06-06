'use strict';

angular
    .module('mobileDirect')
    .controller('RequestIndexCtrl', function($rootScope, $log, $scope,
        $timeout, $ionicModal, uiGmapGoogleMapApi, geolocation, spinner) {

        //current ride request
        $scope.request = {};

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
            console.log($scope.request);
        };

        /**
         * @description open a modal base on template name
         */
        $scope.open = function(template) {
            //prepare template
            template = ['views/search/modals/', template, '.html'].join('');
            var animation = 'slide-in-up';

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
