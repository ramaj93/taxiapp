 'use strict';

 /**
  * @ngdoc service
  * @name mobileDirect.Profile
  * @description
  * # Profile
  * Factory in the mobileDirect.
  */
 angular
     .module('mobileDirect')
     .factory('Profile', function($q, $localForage) {

         var profile = {};

         profile.get = function() {

             return $localForage.getItem('profile').then(function(_profile) {
                 _profile = _profile || {};
                 return _profile;
             });

         };

         profile.save = function(user) {

             return profile.get().then(function(_profile) {

                 _profile = _.merge({}, _profile, user);

                 //update existing profile
                 return $localForage.setItem('profile', _profile).then(function() {
                     //return profile
                     return profile.get();
                 });

             });

         };

         return profile;

     });
