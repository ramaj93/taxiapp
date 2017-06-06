'use strict';

angular
    .module('com.byteskode.ionize.spinner', [])
    .factory('spinner', function($ionicLoading) {
        var spinner = {};

        spinner.isSpinning = false;

        spinner.spin = function() {
            if (!spinner.isSpinning) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="spiral"></ion-spinner>'
                });
                spinner.isSpinning = true;
            }
        };

        spinner.unspin = function() {
            $ionicLoading.hide();
            spinner.isSpinning = false;
        };

        return spinner;
    });