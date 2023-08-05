(function (window, vx) {
    myModule = vx.module("ui.libraries");
    myModule.directive("uiMydirective", [function () {
        return {
            replace: true, template: '<div>我是一个指令!<div>', restrict: 'A'
        };
    }])
})(window, window.vx)