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
    .factory('Detail', function($q) {
        //fake available detail list
        var passengers = [{
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
                return $q.resolve(passengers);
            },
            get: function(params) {
                var passenger = _.find(passengers, {
                    id: Number(params.id)
                });
                return $q.resolve(passenger);
            }
        };
    });