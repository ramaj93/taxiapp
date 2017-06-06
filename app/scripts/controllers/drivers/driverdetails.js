'use strict';

angular
    .module('mobileDirect')

.controller('DriverdetailsIndexCtrl', function($scope, $log, $stateParams, $ionicModal, Driver, spinner, Utils) {

    //TODO load driver from server
    //TODO show loading mask
    //TODO implement pull to refresh
    // //TODO implement infinity scroll

    $scope.find = function() {
        spinner.spin();
        Driver.get({ id: $stateParams.id }).$promise.then(function(driver) {
            $scope.driver = driver;
            $scope.driver.imageUrl = Utils.asLink($scope.driver.imageUrl);
            spinner.unspin();



        }).catch(function(error) {
            $log.error('driver:find:error', error);
            $scope.driver = [];
            spinner.unspin();
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
