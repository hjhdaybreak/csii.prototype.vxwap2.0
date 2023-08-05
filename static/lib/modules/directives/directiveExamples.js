ibsapp.directive('someDirective', [
    function factory() {
        return {
            priority: 200,
            // template: '<div>some directive template</div>',
            // templateUrl: 'lib/modules/directives/directive.html',
            templateUrl: 'component/isolatedScope.html',
            // replace: true,
            // transclude: true,
            // restrict: 'AECM',
            scope: {
                fn: "&fn",
                list: "=list",
                message: "@message"
            },
            // require: 'otherDirective',
            controller: [
                function ($scope, $element, $attrs, $transclude) {
                }],
            // 编译之前的模板元素 tElement, tAttrs
            compile: function compile(tElement, tAttrs, transclude) {
                //
                // var temp = "<button v-click='show()'>show in compile </button>";
                // tElement.append(temp);

                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        // var name = controller.getName();
                        // console.log(name)
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
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {

                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                    }
                }
            }
        }
    }
]);