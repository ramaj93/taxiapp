'use strict';

/**
 * @ngdoc service
 * @name mobileDirect.Utils
 * @description
 * # Utils
 * Factory in the mobileDirect.
 */
angular
    .module('mobileDirect')
    .factory('Utils', function(ENV) {

        var utils = {};

        //deduce platform
        var isMobile = ionic.Platform.isWebView() ||
            ionic.Platform.isIPad() ||
            ionic.Platform.isIOS() ||
            ionic.Platform.isAndroid() ||
            ionic.Platform.isWindowsPhone();

        //deduce runtime endpoint
        var apiEndPoint = isMobile ? ENV.apiEndPoint.mobile : ENV.apiEndPoint.web;

        //expose runtime endpoint
        utils.apiEndPoint = apiEndPoint;

        /**
         * @description convert provided path to link
         * @param  {String|Array} path valid url
         * @return {String}
         */
        utils.asLink = function(path) {
            if (!angular.isArray(path)) {
                path = [path];
            }
            var asLink = [apiEndPoint];

            asLink = asLink.concat(path);
            return asLink.join('/');
        };

        
        /**
         * @description signal if application run on mobile device
         * @type {Boolean}
         */
        utils.isMobile = isMobile;

        return utils;

    });
