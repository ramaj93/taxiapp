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
    .factory('Ride', function(Utils, $resource) {
        //create party resource
        var Ride = $resource(Utils.asLink(['rides', ':id']), {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            },
        });

        return Ride;
    });
