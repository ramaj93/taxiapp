'use strict';

angular
    .module('mobileDirect')
    .controller('ProfileIndexCtrl', function($rootScope, $scope, $ionicModal, User, Profile, user, spinner) {

        $scope.user = new User($rootScope.profile);

        $ionicModal.fromTemplateUrl('views/settings/profilemodal.html', {
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

        $scope.save = function() {
            spinner.spin();
            delete $scope.user.password;
            $scope.user.$update().then(function(user) {
                $scope.user = user;
                return Profile.save(user.toJSON());
            }).then(function(profile) {

                $scope.profile = profile || {};
                $scope.closeModal();
                spinner.unspin();
            }).catch(function(error) {
                console.log(error);
                spinner.unspin();
            });

        };


    });
