'use strict';

/**
 * @ngdoc service
 * @name mobileDirect.Driver
 * @description
 * # Driver
 * Factory in the mobileDirect.
 */
angular
    .module('mobileDirect')
    .factory('DriverDetail', function($q) {
        //fake available detail list
        var drivers = [{
            id: 1,
            name: 'Iman Irab',
            avatar: 'images/ben.png',
            bio: 'I am a good detail',
            date: 'may 2015',
            phoneNumber: '0714281648',
            age: 28,
            carModel: 'taxi',
            carColour: 'white',
            aboutMe: 'i like travelling',
            music: 'Gospel',
            homeTown: 'Tanga',
            plateNumber: 'T345ADE'
        }];


        return {
            find: function() {
                return $q.resolve(drivers);
            },
            get: function(params) {
                var driver = _.find(drivers, {
                    id: Number(params.id)
                });
                return $q.resolve(driver);
            }
        };
    });