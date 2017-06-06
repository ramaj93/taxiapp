'use strict';

angular
    .module('mobileDirect')

.controller('DriversIndexCtrl', function($scope, $log, $ionicModal, $ionicFilterBar, Driver, spinner) {

    //TODO load drivers from server
    //TODO show loading mask
    //TODO implement pull to refresh
    //TODO implement infinity scroll
    $scope.find = function() {
        spinner.spin();
        Driver.query().$promise.then(function(drivers) {
            $scope.drivers = drivers;
            spinner.unspin();



        }).catch(function(error) {
            $log.error('driver:find:error', error);
            $scope.drivers = [];
            spinner.unspin();
        });
    };


    /**
     * @description show drivers search bar
     */
    $scope.showFilterBar = function() {

        $ionicFilterBar.show({
            cancelText: '<i class=\'ion-ios-close-outline\'></i>',
            items: $scope.drivers,
            update: function(filteredItems /*, filterText*/ ) {
                $scope.drivers = filteredItems;
            }
        });
    };


    $ionicModal.fromTemplateUrl('views/drivers/modal.html', {

        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function(driver) {
        $scope.selectedDriver = driver;
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();

    };

    $scope.find();
});
