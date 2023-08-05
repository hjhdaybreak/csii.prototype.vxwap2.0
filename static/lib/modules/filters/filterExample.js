(function (window, vx) {
    'use strict'
    var libraries = vx.module('ui.libraries');
    libraries.filter('someFilter', [function () {
        return function (input, separator) {
            if (input !== undefined) {
                console.log("someFilter");
                separator = separator || " ";
                input = input.replace(/(.{4})/g, "$1" + separator);
            }
            return input;
        }
    }]);

    libraries.filter('otherFilter', [function () {
        return function (input) {
            if (input !== undefined) {
                console.log(typeof input)
                console.log("otherFilter");
                input = "*" + input;
            }
            return input;
        };
    }]);
})(window, window.vx)