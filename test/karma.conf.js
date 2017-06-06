// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-08-05 using
// generator-karma 1.0.0

module.exports = function(config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            'mocha', 'chai'
        ],

        // reporters configuration 
        reporters: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'app/bower_components/angular/angular.js',
            'app/bower_components/ngCordova/dist/ng-cordova.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-loading-bar/build/loading-bar.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/ionic/release/js/ionic.bundle.js',
            'app/bower_components/ionic-filter-bar/dist/ionic.filter.bar.js',
            'app/bower_components/ng-material-floating-button/src/mfb-directive.js',
            'app/bower_components/lodash/lodash.js',
            'app/bower_components/moment/moment.js',
            'app/bower_components/angular-timeago/dist/angular-timeago.js',
            'app/bower_components/localforage/dist/localforage.js',
            'app/bower_components/angular-localforage/dist/angular-localForage.js',
            'app/bower_components/angular-uuid/uuid.js',
            'app/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
            'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
            'app/bower_components/ngstorage/ngStorage.js',
            'app/bower_components/angular-jwt/dist/angular-jwt.js',
            'app/bower_components/ng-aa/dist/ng-aa.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            // endbower
            'app/scripts/**/*.js',
            'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],

        // Which plugins to enable
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
