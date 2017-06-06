'use strict';

/**
 * @ngdoc service
 * @name mobileDirect.User
 * @description
 * # User
 * Factory in the mobileDirect.
 */
angular
    .module('mobileDirect')
    .factory('Driver', function(Utils, $http, $resource) {

        //create party resource
        var Driver = $resource(Utils.asLink(['drivers', ':id']), {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            },
        });

        return Driver;
    });
