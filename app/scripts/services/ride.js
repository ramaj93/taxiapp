'use strict';

/**
 * @ngdoc service
 * @name mobileDirect.Ride
 * @description
 * # Ride
 * Factory in the mobileDirect.
 */
angular
    .module('mobileDirect')
    .factory('Ride', function (Utils, $resource, $q, $localForage, uuid4, SMS) {

        var ride = $resource(Utils.asLink(['rides', ':id']), {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            },
        });

        ride.find = function () {
            return $localForage.getItem('ride').then(function (rides) {
                return rides ? rides : [];
            });
        };

        ride.get = function (params) {
            return $localForage.getItem('ride').then(function (rides) {
                rides = rides || [];

                var ride = _.find(rides, {
                    _id: params.id
                });

                return ride ? ride : {};
            });
        };


        ride.create = function (ride) {
            //update ride properties
            ride._id = uuid4.generate();
            ride.requestedAt = new Date();
            ride.state = 'Waiting Driver';

            //TODO clean on production
            ride.driver = 'Said Saleh';
            ride.driverPhoneNumber = '0714281648';
            ride.avatar = 'images/mike.png';
            ride.distance = Math.ceil((Math.random() * 20));
            ride.price = Math.ceil((Math.random() * 40000));

            //TODO persist ride request to server
            //TODO Notify a driver(s) in a server side
            return SMS.send({
                phoneNumber: ride.driverPhoneNumber,
                content: 'New ride request'
            }).then(function (/*smsSendResponse*/) {
                return $localForage.getItem('ride').then(function (rides) {
                    if (!rides) {
                        return $localForage.setItem('ride', [ride]);
                    } else {
                        return $localForage.setItem('ride', rides.concat(ride));
                    }
                });
            });
        };


        ride.cancel = function (ride) {
            //set cancelled date
            ride.canceledAt = new Date();
            ride.state = 'Cancelled';

            return $localForage.getItem('ride').then(function (rides) {

                rides = rides || [];

                rides = _.merge(rides, [ride]);

                return $localForage.setItem('ride', rides);
            });

        };

        ride.arrived = function (ride) {
            //set arrived date
            ride.arridedAt = new Date();
            ride.state = 'Done';

            return $localForage.getItem('ride').then(function (rides) {

                rides = rides || [];

                rides = _.merge(rides, [ride]);

                return $localForage.setItem('ride', rides);
            });

        };

        return ride;
    });
