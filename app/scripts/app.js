'use strict';

angular
    .module('mobileDirect', [
        'ionic',
        'ngResource',
        'ngCordova',
        'jett.ionic.filter.bar',
        'ngAA',
        'ng-mfb',
        'com.byteskode.ionize.geolocation',
        'com.byteskode.ionize.spinner',
        'com.byteskode.ionize.sms',
        'uiGmapgoogle-maps',
        'yaru22.angular-timeago',
        'LocalForageModule',
        'uuid'
    ])
    .run(function($ionicPlatform, geolocation) {

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.cordova) {
                geolocation.watch();
            }


        });

    })
    .config(function($stateProvider, $urlRouterProvider,
        $ionicConfigProvider, $ionicFilterBarConfigProvider,
        uiGmapGoogleMapApiProvider, $localForageProvider) {

        //configure localForage
        $localForageProvider.config({
            driver: localforage.INDEXEDDB,
            name: 'taxi', // name of the database and prefix for your data, it is "lf" by default
            version: 1.0, // version of the database, you shouldn't have to use this
            storeName: 'taxi', // name of the table
            description: 'Easy Taxi'
        });

        //configure google map
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyC7OZ02xxN24uYk4mUymP6zfMxvbd6NIeE',
            libraries: 'weather,geometry,visualization',
            // v: '3.17'
        });

        //center view title always
        $ionicConfigProvider.navBar.alignTitle('center');

        //disable previous title to be used in back button
        $ionicConfigProvider.backButton.previousTitleText(false);

        //remove back button text
        $ionicConfigProvider.backButton.text('');

        //position tabs on the top
        $ionicConfigProvider.tabs.position('bottom');

        //use standard tabs style
        $ionicConfigProvider.tabs.style('standard');

        //enable js scrolling
        $ionicConfigProvider.scrolling.jsScrolling(true);

        $ionicFilterBarConfigProvider.placeholder('Search');

        //provide fallback state
        // $urlRouterProvider.otherwise('/search');

        //base application state
        $stateProvider.state('app', {
            abstract: true,
            templateUrl: 'views/layouts/tabs.html',
            resolve: {
                user: function(Profile) {
                    return Profile.get();
                }
            }
        });

    });
