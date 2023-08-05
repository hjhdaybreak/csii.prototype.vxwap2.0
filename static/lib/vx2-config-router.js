/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
(function (window, vx, undefined) {
    'use strict';
    var ibsapp = vx.module("ibsapp");
    /**
     * 路由配置
     * App Module
     */
    ibsapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide", function ($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

        /******路由配置开始******/
        /*****************菜单页********************/
        $stateProvider
            // .state('app', {
            //     abstract: true, url: '/app', templateUrl: 'htmls/AppView.html'
            // })
            .state('app', {
                abstract: true, url: '/app', templateUrl: 'htmls/AppView.html'
            })
            .state('app.BankInnerTransfer', {
                url: '/BankInnerTransfer',
                templateUrl: 'htmls/BankInnerTransfer/BankInnerTransfer.html'
            }).state('app.AppTest', {
            url: '/AppTest',
            templateUrl: 'htmls/app.html'
        });
        /******路由配置结束******/

        //默认装置路由
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go("app.BankInnerTransfer");
        });
        /******路由配置结束******/
        //是否使用全局controller
        $controllerProvider.allowGlobals();
        // H5模式configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);

        // lazy controller, directive and service
        ibsapp.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            constant: $provide.constant,
            value: $provide.value
        };
        ibsapp.controller = $controllerProvider.register;
        ibsapp.directive = $compileProvider.directive;
        ibsapp.filter = $filterProvider.register;
        ibsapp.factory = $provide.factory;
        ibsapp.service = $provide.service;
        ibsapp.constant = $provide.constant;
        ibsapp.value = $provide.value;

        ibsapp.asyncjs = function (js, title, noHistory) {
            fn.$inject = ['$q'];

            function fn($q) {
                if (window.CLIENTMODE) {
                    // 转场调用通知设置标题名称
                    NativeCall.SetTitle(title);
                } else {
                    if (title) {
                        if (noHistory && noHistory == "nohistory") {
                            vx.element("#app_title .leftBt").hide();
                        } else {
                            vx.element("#app_title .leftBt").show();
                        }
                        vx.element("#app_title").show().children(".center").html(title);
                    } else {
                        vx.element("#app_title").hide();
                    }
                }
                if (js) {
                    var delay = $q.defer(), load = function () {
                        $.getScript(js, function () {
                            delay.resolve();
                        });
                    };
                    load();
                    return delay.promise;
                }
            }

            return fn;
        };

    }]);

})(window, vx);
