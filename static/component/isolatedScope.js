ibsapp.directive('someDirective', [
    function factory() {
        return {
            priority: 0,
            template: '<div>some directive template</div>',
            // templateUrl: 'lib/modules/directives/isolatedScope.html',
            replace: false,
            transclude: false,
            restrict: 'AECM',
            scope: {
                fn: "&fn",
                list: "=list",
                message: "@message"
            },
            controller: [
                function ($scope, $element, $attrs, $transclude) {

                }],
            required: '?otherDirective',
            // 编译之前的模板元素 tElement, tAttrs
            compile: function compile(tElement, tAttrs, transclude) {
                console.log("someDirective compile")
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        console.log("priority 0 pre-link");
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        console.log("priority 0 post-link");
                        var name = controller.getName();
                        console.log(name);
                    }
                }
            }
        }
    }
]);
ibsapp.directive('otherDirective', [
    function factory() {
        return {
            priority: 100,
            controller: [
                function ($scope, $element, $attrs, $transclude) {
                    this.getName = function () {
                        return "otherDirective";
                    };
                }],
            required: '?otherDirective',
            compile: function compile(tElement, tAttrs, transclude) {
                console.log("otherDirective compile")
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        console.log("priority 100 pre-link");
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        console.log("priority 100 post-link");
                        var name = controller.getName();
                        console.log(name);
                    }
                }
            }
        }
    }
]);