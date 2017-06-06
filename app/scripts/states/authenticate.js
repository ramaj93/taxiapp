'use strict';

/**
 * @ngdoc function
 * @name mobileDirect.states:Authenticate
 * @description
 * Authentication states configuration of mobile for shule direct
 */
angular
    .module('mobileDirect')
    .config(function($stateProvider, $authProvider, ENV) {

        //configure ngAA
        //see https://github.com/lykmapipo/ngAA
        $authProvider.afterSigninRedirectTo = 'app.search';

        //make use of session storage
        $authProvider.storage = 'localStorage';

        //config ngAA profile key
        $authProvider.profileKey = 'user';

        //config signin url
        $authProvider.signinUrl = [ENV.apiEndPoint.web, 'welcome'].join('/');

        //config signin template url
        $authProvider.signinTemplateUrl = 'views/authentication/signin.html';


        // other authentication states
        $stateProvider
            .state('signup', {
                url: '/signup/:type',
                templateUrl: 'views/authentication/signup.html',
                controller: 'SignupCtrl'
            });

    });
