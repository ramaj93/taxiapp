'use strict';

angular
    .module('mobileDirect')
    .controller('OnlinedriversIndexCtrl', function($scope, Driver, $ionicPopup, $ionicModal) {
        var list = function() {
            $scope.driverList = Driver.query();
            console.log($scope.driverList);
        };

        list();

        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'BEN',
                // templateUrl: src = "images/adam.jpg"
                template: 'It might taste good'
            });

            alertPopup.then(function( /*res*/ ) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };


        $ionicModal.fromTemplateUrl('views/search/modals/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

    });
