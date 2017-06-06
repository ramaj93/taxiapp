'use strict';

angular
    .module('com.byteskode.ionize.sms', [])
    .factory('SMS', function($window, $q, $cordovaSms) {

        var SMS = {};

        SMS.send = function(message) {
            if ($window.sms) {
                return $cordovaSms.send(message.phoneNumber, message.content);
            } else {
                return $q.resolve(message);
            }
        };

        return SMS;
    });