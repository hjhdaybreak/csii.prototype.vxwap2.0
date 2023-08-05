vx.module('ui.libraries', []);//自定义组件模块（指令、服务、过滤器）
vx.module("ui.bootstrap", [
    "ui.bootstrap.modal"
    // "ui.bootstrap.transition",
    // "ui.bootstrap.collapse",
    // "ui.bootstrap.accordion",
    // "ui.bootstrap.alert",
    // "ui.bootstrap.bindHtml",
    // "ui.bootstrap.buttons",
    // "ui.bootstrap.carousel",
    // "ui.bootstrap.dateparser",
    // "ui.bootstrap.position",
    // "ui.bootstrap.datepicker",
    // "ui.bootstrap.dropdown",
    //"ui.bootstrap.pagination",
    //"ui.bootstrap.tooltip",
    //"ui.bootstrap.popover",
    //"ui.bootstrap.progressbar",
    //"ui.bootstrap.rating",
    //"ui.bootstrap.tabs",
    //"ui.bootstrap.timepicker",
    //"ui.bootstrap.typeahead"
]);//bootstrap组件模块

var ibsapp = vx.module('ibsapp', [

    'ui.router',
    //'ngAnimate',
    'vStorage',
    'vviewport.vpage',
    'vx.lazyLoad',
    //'ngSanitize',
    'ui.libraries',
    'ui.bootstrap'

]);
(function (window, vx, $) {
    'use strict';
    var mod = vx.module('ibsapp');

    //固定写法 someProvider + Provider
    configSomeProvider.$inject = ['someProviderProvider']

    function configSomeProvider(someProviderProvider) {
        someProviderProvider.setName("csii")
    }

    configLog.$inject = ['$logProvider'];

    function configLog($logProvider) {
        $logProvider.debugEnabled(false);
    }


    configBrowser.$inject = ['$browserProvider'];

    function configBrowser($browserProvider) {
    }

    configRemote.$inject = ['$remoteProvider'];

    function configRemote($remoteProvider) {
        $remoteProvider.setErrorTag(function (data) {
            //console.debug('filter data with setErrorTag');
            if (data.jsonError) {
                return true;
            } else if (data._RejCode && !/^0+$/.test(data._RejCode)) {
                return true;
            }
        });
        $remoteProvider.setTrsContext("/local/");
        $remoteProvider.setSendBeforeFn(function () {
            $('#load_back_drop.httpBackend-backdrop').show();
        });
        $remoteProvider.setSendAfterFn(function () {
            $('#load_back_drop.httpBackend-backdrop').hide();
        });
        $remoteProvider.config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000,
            toKeyValue: false
        };
        $remoteProvider.setErrorCallback(function (data, status, headers, config) {
            var $S = config.$scope,
                httpRequest = config.url;
            var currentScope = vx.element("div[v-view]>*").scope() || vx.element("body").scope();
            if (data && data.jsonError) {
                currentScope.jsonError = data.jsonError;
            } else {
                currentScope.jsonError = [{
                    "_exceptionMessage": "网络异常:" + status
                }];
            }
            if (status == -1) {
                console.error('请求超时!');
            } else {
                if (data._RejCode != "000000") {
                    if (data._RejCode == "777777") {
                        currentScope.goto('loginapp.UserLogin');
                    } else {
                        console.error(data);
                        //currentScope.$AlertValidate({
                        //    title: "服务器异常",
                        //    content: data._exceptionMessage
                        //});
                    }
                }
            }
        });
    }

    configHttp.$inject = ['$httpProvider'];

    function configHttp($httpProvider) {
        fnReq.$inject = ['$q'];

        function fnReq($q) {
            var interceptor = {
                'request': function (config) {
                    return config;
                },
                'response': function (resp) {
                    return resp;
                },
                'requestError': function (rejection) {
                    return $q.reject(rejection);
                },
                'responseError': function (rejection) {
                    return rejection;
                }
            };
            return interceptor;
        }

        $httpProvider.interceptors.push(fnReq);
    }

    configHttpBackend.$inject = ['$httpBackendProvider'];

    function configHttpBackend($httpBackendProvider) {
    }

    configSubmit.$inject = ['$submitConfigProvider'];

    function configSubmit($submitConfigProvider) {
        $submitConfigProvider.setSubmitCompileProcess(function (scope) {
            delete scope.jsonError;
        });
        $submitConfigProvider.setSubmitBeforeProcess(function (scope) {
            delete scope.jsonError;
        });
        $submitConfigProvider.setSubmitErrProcess(function (ctrlComment, errMessage, scope, ctrl) {
            $(ctrl).stop().animate({
                left: "-10px"
            }, 100).animate({
                left: "10px"
            }, 100).animate({
                left: "-10px"
            }, 100).animate({
                left: "10px"
            }, 100).animate({
                left: "0px"
            }, 100);
            scope.jsonError = [{
                "_exceptionMessage": ctrlComment + errMessage
            }];
            scope.$apply();
        });
    }

    configContext.$inject = ['$contextConfigProvider'];

    function configContext($contextConfigProvider) {
        $contextConfigProvider.setSessionStorageEnable(true);
    }

    mod.config(configSomeProvider);
    mod.config(configLog);
    mod.config(configBrowser);
    mod.config(configRemote);
    mod.config(configHttp);
    mod.config(configHttpBackend);
    mod.config(configSubmit);
    mod.config(configContext);
    runRootScope.$inject = ['$rootScope', '$window', '$timeout', '$locale', '$state', '$stateParams', '$location', '$context', '$filter', '$remote', '$targets', '$modal', '$q'];

    function runRootScope($rootScope, $window, $timeout, $locale, $state, $stateParams, $location, $context, $filter, $remote, $targets, $modal, $q) {
        $rootScope.$TrsContext = $window.TRSCONTEXT;
        $rootScope.$ClientMode = $window.CLIENTMODE;
        $rootScope.$state = $state;
        $rootScope.showTopAdver = true;
        $rootScope.getRouteParams = function (param) {
            return $stateParams[param];
        };
        $rootScope.goto = function (url, params, viewportName) {
            if (!url) {
                return;
            }
            if (/[\.]/.test(url)) {
                if ($state.current.name != url) {
                    $state.go(url, params);
                } else {
                    $state.reload();
                }
            } else if (/^[\/]/.test(url)) {
                window.location.hash = url;
            } else if (/^[#]/.test(url)) {
                $targets(viewportName || "content", url);
            } else if (/\.html/.test(url)) {
                window.location = url;
            }
        };
        $rootScope.$AlertValidate = function (modalMsg) {
            if (!$rootScope.$AlertValidate.isOpen) {
                $rootScope.$AlertValidate.isOpen = true;
                var modalInstance = $modal.open({
                    templateUrl: 'htmls/Common/Validate.html',
                    controller: ['$scope', '$modalInstance',
                        function ($scope, $modalInstance) {
                            $scope.modalMsg = modalMsg;
                            $scope.ok = function () {
                                $modalInstance.close();
                                $rootScope.$AlertValidate.isOpen = false;
                            };
                        }
                    ]
                });
            }
        };
        $rootScope.gotoLocation = function (url) {
            window.location = url;
        };
        $rootScope.goback = function (param) {
            window.history.back(param || -1);
        };
        $rootScope.$field = function (name) {
            return $locale.FIELDS[name] || name;
        };
        $rootScope.$msg = function (name) {
            return $locale.MESSAGES[name] || name;
        };
        $rootScope.showError = function (errorMessage, currentScope) {
            if (currentScope) {
                currentScope.$apply(function () {
                    currentScope.jsonError = [{
                        "_exceptionMessage": errorMessage
                    }];
                });
            } else {
                var currentScope = vx.element("div[ui-view]>*").scope() || vx.element("body").scope();
                currentScope.jsonError = [{
                    "_exceptionMessage": errorMessage
                }];
            }
        };
        $rootScope.showOk = function (successMessage, currentScope) {
            if (currentScope) {
                currentScope.$apply(function () {
                    currentScope.jsonError = [{
                        "type": "success",
                        "_exceptionMessage": successMessage
                    }];
                });
            } else {
                var currentScope = vx.element("div[ui-view]>*").scope() || vx.element("body").scope();
                currentScope.jsonError = [{
                    "type": "success",
                    "_exceptionMessage": successMessage
                }];
            }
        };
        $rootScope.FmtError = function (errorMessage) {
            return [{
                "_exceptionMessage": errorMessage
            }];
        };
        $rootScope.cleanError = function (currentScope) {
            if (currentScope) {
                delete currentScope.jsonError;
            } else {
                var currentScope = vx.element("div[ui-view]>*").scope() || vx.element("body").scope();
                delete currentScope.jsonError;
            }
        };
        $rootScope.setValidation = function (el, value) {
            vx.element(el).attr("validate", value);
        };

        /**demo 公共方法 begin**/
        //302强制作实名认证函数方法
        $rootScope.forceRealNameAuthenticateFn = function () {
            var ForceDeferred = $q.defer();
            //判断强制实名认证  T审核中   N是通过认证完成
            $remote.post("QryRealNameAuthResult.do", {}, function (data) {
                if (data.UploadIdentity == "N") {
                    ForceDeferred.resolve();
                } else {
                    ForceDeferred.reject(data.UploadIdentity);
                }
            });
            return ForceDeferred.promise;
        };
        //强制实名认证弹框
        $rootScope.forceDoAuth = function () {//是否去认证
            //去认证与查看
            $("div#forceNeedAuto_id").hide();
            $rootScope.goto("appOther.NameAuth");
        };
        //强制实名认证取消
        $rootScope.forceAuthCancelFn = function () {
            $("div#forceNeedAuto_id").hide();
            $rootScope.goback();
        };
        //影藏顶部下载广告展示
        $rootScope.hideTopAdver = function () {
            $rootScope.showTopAdver = false;
        };
        //关闭错误信息
        $rootScope.HideErrorDiv = function () {
            $("#EEE").hide();
        };
        // //登录信息
        $rootScope.getLoginF = function () {

            if (sessionStorage.getItem("loginedF") && (sessionStorage.getItem("loginedF") == true || sessionStorage.getItem("loginedF") == "true")) {
                $rootScope.loginedF = true;
            } else {
                $rootScope.loginedF = false;
            }
            return $rootScope.loginedF;
        };
        $rootScope.sessionOutDo = function () {
            $("#sessionOut").hide();
            $rootScope.showLogin();
        };
        $rootScope.sessionOutDo2 = function () {
            $("#sessionOut2").hide();
            $rootScope.showLogin();
        };
        //公共错误弹框
        $rootScope.AlertErr = function (errMsg, btnText) {
            btnText || (btnText = "朕知道了");
            if ($rootScope.$$phase) {
                $rootScope.ErrMsg = errMsg;
                $rootScope.BtnText = btnText;
                $("#EEE").show();
            } else {
                $rootScope.$apply(function () {
                    $rootScope.ErrMsg = errMsg;
                    $rootScope.BtnText = btnText;
                    $("#EEE").show();
                });
            }
            return;
        };
        //菜单样式修改
        $rootScope.changeSHash = function () {

            $rootScope.sHash = $location.$$path.substring($location.$$path.indexOf('/') + 1);
        };
        /**
         **打开侧滑栏
         */
        $rootScope.showLogin = function (transName) {

            $rootScope.slideFlag = true;
            $("#noPicmask").show();
            var clientWidth = document.body.clientWidth * 0.8 + "px";
            $("#mainContentBox").animate({
                marginLeft: clientWidth
            }, 600);
            $(".top02").animate({
                left: clientWidth
            }, 600);
            if ($("#indexAdverFixTop")) {
                $("#indexAdverFixTop").animate({
                    left: clientWidth
                }, 600);
            }
            //$("#indexAdverFixTop").animate({ left: clientWidth }, 600);
            // $("#box").animate({ marginLeft: clientWidth }, 600);
            if ($rootScope.loginedF) {
                $("#logiined_box").animate({
                    left: 0
                }, 600);
            } else {
                $("#logiin_box").animate({
                    left: 0
                }, 600);
            }
            $("#mainContentBox").addClass('fixdFlag');
        };
        /**
         **关闭侧滑栏
         */
        $rootScope.closeSlideBar = function () {
            $("#noPicmask").fadeOut();
            //if ($rootScope.loginedF) {
            $("#logiined_box").animate({
                left: "-100%"
            }, 500);
            //} else {
            $("#logiin_box").animate({
                left: "-100%"
            }, 500);
            //}
            $("#mainContentBox").animate({
                marginLeft: "0"
            }, 500);
            $(".top02").animate({
                left: 0
            }, 500);
            if ($("#indexAdverFixTop")) {
                $("#indexAdverFixTop").animate({
                    left: 0
                }, 500);
            }
            $rootScope.slideFlag = false;
            //$(".slideL").animate({ left: "0" }, 500);
            //$("#indexAdverFixTop").animate({ left: "0" }, 500);
            // $("#box").animate({ marginLeft: "0" }, 500);
            if ($("#mainContentBox")) {
                $("#mainContentBox").removeClass('fixdFlag');
            }
            $("#loginPwd").val("");
            $("#loginPwd").attr("sf_uuid", "");

        };
        //关闭选择条件
        $rootScope.closeSelectBox = function (e, eleId, maskId) {
            //取消事件冒泡
            if (e && e.stopPropagation) {// 因此它支持W3C的stopPropagation()方法　
                e.stopPropagation();
            } else {//否则，我们需要使用IE的方式来取消事件冒泡   　　
                window.event.cancelBubble = true;
            }
            var ele_id = "#" + eleId;
            //表单id
            var mask_id = "#" + (maskId ? maskId : "doNotClickMask");
            //遮罩id
            $(ele_id).slideUp(300);
            $(mask_id).hide();
        };
        //判断是否在微信浏览器
        $rootScope.isWeCat = function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            }
            return false;
        };

        //短信验证码  登陆后的（需要上送手机号或者不需要）
        $rootScope.getTokenJNRCB = function (hasMobile, tokenMessage, mobile, flag) {
            //hasMobile是否需要上送手机号
            var tokenIndexP = 1;
            var params = {
                "TokenMessage": tokenMessage,
                "TokenIndex": tokenIndexP
            };
            if (hasMobile) {//需要上送手机号
                if (!mobile) {
                    $rootScope.AlertErr("手机号不能为空");
                    return;
                }
                params.MobilePhone = mobile;
                params.CheckExistFlag = flag;
            }
            $remote.post("AutoGenPhoneToken.do", params, function (data) {
                tokenIndexP++;
            }, function (data) {
                tokenIndexP++;
                // if (data.jsonError) {
                // $rootScope.AlertErr(jsonError[0]._exceptionMessage);
                // return;
                // }
            });
        };

        //短信验证码 上送手机号，未登录
        $rootScope.getTokenJNRCBV2 = function (tokenMessage, mobile, flag) {
            var tokenIndexP = 1;
            if (!mobile) {
                $rootScope.AlertErr("手机号不能为空");
            }
            ;
            var params = {
                "TokenMessage": tokenMessage,
                "TokenIndex": tokenIndexP,
                "MobilePhone": mobile,
                "CheckExistFlag": flag
            };
            $remote.post("GenPhoneTokenForPublicForNJ.do", params, function (data) {
                tokenIndexP++;
            }, function (data) {
                tokenIndexP++;
                // if (data.jsonError) {
                // $rootScope.AlertErr(jsonError[0]._exceptionMessage);
                // return;
                // }
            });
        };
        $rootScope.showShiMing = function (param) {
            //打开实名认证
            var shiMingInfo = JSON.parse(sessionStorage.getItem("shiMingInfo"));
            $rootScope.authText = shiMingInfo.authText;
            $rootScope.yesBtn = shiMingInfo.yesBtn;
            $("#showShiMingFlag").show();
        };
        $rootScope.closeShiMing = function (param) {
            //关闭实名认证
            $("#showShiMingFlag").hide();
            sessionStorage.setItem("showShiMingFlag", false);
            $rootScope.shiMingTanKuang = true;
        };
        $rootScope.gotoShiMing = function (param) {
            //去实名认证
            $("#showShiMingFlag").hide();
            $rootScope.goto("appOther.NameAuth");
        };
        $rootScope.getShiMing = function () {
            //
            if (sessionStorage.getItem("loginedF")) {
                $remote.post("QryRealNameAuthResult.do", {}, function (data) {
                    if (data.UploadIdentity == "T") {//审核中
                        sessionStorage.setItem("shiMingInfo", vx.toJson({
                            authText: "实名认证正在审核中，是否立即查看？",
                            yesBtn: "立即查看",
                        }));
                        $rootScope.shiMingTanKuang = false;
                        sessionStorage.setItem("showShiMingFlag", true);
                    } else if (data.UploadIdentity == "N") {//已审核
                        sessionStorage.setItem("showShiMingFlag", false);
                        $rootScope.shiMingTanKuang = true;
                    } else {//认证中
                        sessionStorage.setItem("shiMingInfo", vx.toJson({
                            authText: "您暂未进行实名认证，是否立即认证？",
                            yesBtn: "立即认证",
                        }));
                        $rootScope.shiMingTanKuang = false;
                        sessionStorage.setItem("showShiMingFlag", true);
                    }
                });
            }
        }
        /**demo 公共方法 end**/

        $rootScope.$on('$stateChangeSuccess', function (event, to, pargs, from) {
            if (from.url === "^") { //刷新
                console.log(from.url + '--->' + to.url);
                if (/welcome/.test(to.url)) {
                    $rootScope.changeBook(1, true);
                } else if (/css_/.test(to.url)) {
                    $rootScope.changeBook(2, true);
                } else if (/core_/.test(to.url)) {
                    $rootScope.changeBook(3, true);
                } else if (/component_/.test(to.url)) {
                    $rootScope.changeBook(4, true);
                } else if (/plugins_/.test(to.url)) {
                    $rootScope.changeBook(5, true);
                } else if (/animation_/.test(to.url)) {
                    $rootScope.changeBook(6, true);
                }
            }

            setTimeout(function () {
                window.prettyPrint();
            }, 100);
        });
    }

    ibsapp.run(runRootScope);
})(window, window.vx, window.jQuery);
