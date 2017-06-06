'use strict';

angular
    .module('mobileDirect')
    .controller('ProfileDriverIndexCtrl', function($scope, $ionicModal, DriverDetail) {

        $scope.find = function() {
            DriverDetail.find().then(function(drivers) {
                $scope.drivers = drivers;
                // console.log($scope.drivers);
            }).catch(function(error) {
                console.log(error);
                $scope.drivers = [];
            });
        };

        $scope.find();

        $ionicModal.fromTemplateUrl('views/settingsDriver/profilemodal.html', {
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
        $scope.error = '';

        // TODO add app rating plugin
        // $scope.review = function() {
        //     $cordovaAppRate.navigateToAppStore().then(function(response) {
        //         $scope.error = response;
        //     }).catch(function(error) {
        //         $scope.error = error;
        //     });
        // };

        // //TODO add app details in ngconstants
        // $scope.share = function() {
        //     $cordovaSocialSharing
        //         .share(SHARE.message, SHARE.subject, null, SHARE.link)
        //         .then(function(response) {
        //             //TODO handle share response
        //             $scope.error = response;
        //         })
        //         .catch(function(error) {
        //             //TODO handle share error
        //             $scope.error = error;
        //         });
        // };

        // //TODO launch email composer
        // $scope.feedback = function() {
        //     $cordovaEmailComposer.open(MAIL).then(function(response) {
        //         //TODO handle email send
        //         $scope.error = response;
        //     }).catch(function(error) {
        //         // TODO handle user cancel composer
        //         $scope.error = error;
        //     });
        // };

    });
