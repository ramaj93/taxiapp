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
    .factory('User', function(Utils, $http, $resource) {

        //create party resource
        var User = $resource(Utils.asLink(['users', ':id']), {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            },
        });

        return User;
    });
