(function() {
    var cssFiles = [
        "css/vxbase.css",
        "css/reset.css",
        "css/commencss.css",
        "css/ui-sliderbar.css",
        "css/scrollPage.css",
        "css/fullcalendar.css", //收益明细日历
        "css/swiper.min.css",
        "css/safekeyboard.css",
        "css/mobiscroll.custom-2.5.2.min.css",
        "css/scrollAcmount.css",
        "css/dialog.css", //弹出日期
        "css/mobile-select-date.css", //弹出日期
        "css/animate.css",
        "css/calender.css", //收益明细日历
        "css/extra.css", //,
        "css/extra_nj.css", //开发用本地的，
        "css/extra-dph.css", //开发用本地的，
        "css/extra_lif.css",
        "css/downloadapp.css", //app下载样式
        "css/httpBackend-backdrop.css"
    ];
    var jsFiles = [
        /*vx2扩展*/
        "lib/min/vx2-ui.router.min.js", //ui-router
        "lib/min/vx2-storage.min.js",
        "lib/min/vx2-vpage.min.js",
        "lib/min/vx2-lazyload.min.js",
        "lib/min/vx2-animate.min.js", //动画
        //"lib/min/vx2-sanitize.min.js", //净化html 运用在v-bind-html 需加挂ngSanitize模块

        /*vx2需要预加载的插件*/
        "lib/plugins/prettify.min.js", //插件引用vx2.config中prettyPrint
        "lib/plugins/marked.js",// vx2-config-router marked方法
        "lib/plugins/nprogress/nprogress.js",// ui-slidetoggle
        //"lib/plugins/jsBridge/WVJSBridge.js",//与客户端交互插件

         /*vx2配置*/
        "lib/vx2-config.js",
        "lib/config.lazyload.js",
        "lib/vx2-config-router.js", //路由及rootscope
        "lib/vx2-locale_zh_cn.js", //国际化及翻译
        
        // bootstrap指令 --start
        //必须加载
        "lib/modules/bootstrap/modal.js",
        "lib/modules/bootstrap/transition.js",
        //根据需要选择加载
        //"lib/modules/bootstrap/accordion.js",
        //"lib/modules/bootstrap/alert.js",
        //"lib/modules/bootstrap/bindHtml.js",
        //"lib/modules/bootstrap/buttons.js",
        //"lib/modules/bootstrap/carousel.js",
        //"lib/modules/bootstrap/collapse.js",
        //"lib/modules/bootstrap/dateparser.js",
        //"lib/modules/bootstrap/datepicker.js",
        //"lib/modules/bootstrap/dropdown.js",
        //"lib/modules/bootstrap/pagination.js",
        //"lib/modules/bootstrap/popover.js",
        //"lib/modules/bootstrap/position.js",
        //"lib/modules/bootstrap/progressbar.js",
        //"lib/modules/bootstrap/rating.js",
        //"lib/modules/bootstrap/tabs.js",
        //"lib/modules/bootstrap/timepicker.js",
        //"lib/modules/bootstrap/tooltip.js",
        //"lib/modules/bootstrap/typeahead.js",
        //bootstrap --end

        /*vx2指令*/
        "lib/modules/directives/ui-jq.js",
        "lib/modules/directives/ui-timebtn.js",
        "lib/modules/directives/placeholder.js",
        // "lib/modules/directives/ui-sms.js",
        // "lib/modules/directives/ui-markdown.js",
        // "lib/modules/directives/ui-amount.js",
        // "lib/modules/directives/ui-bgimgscroller.js",
        // "lib/modules/directives/ui-calendar2.js",
        // "lib/modules/directives/ui-include.js",
        // "lib/modules/directives/ui-menu.js",
        // "lib/modules/directives/ui-button.js",
        // "lib/modules/directives/ui-menu2.js",
        // "lib/modules/directives/ui-Menupull.js",
        // "lib/modules/directives/ui-pager.js",
        // "lib/modules/directives/ui-pager2.js",
        // "lib/modules/directives/ui-progress.js",
        // "lib/modules/directives/ui-slidebox.js",
        // "lib/modules/directives/ui-tooltip.js",
        // "lib/modules/directives/ui-scroll.js",
        // "lib/modules/directives/ui-slidedown.js",
        // "lib/modules/directives/ui-slidetoggle.js",
        // "lib/modules/directives/ui-validate.js",
        // "lib/modules/directives/ui-validate3.js",
        // "lib/modules/directives/ui-validatell.js",
        // "lib/modules/directives/ui-mask.js", //表单输入提示@wangjian
        // "lib/modules/directives/ui-number.js", //@wangjian
        // "lib/modules/directives/vx-file-upload.js",
        // "lib/modules/directives/ui-imgpreview.js",
        // "lib/modules/directives/vx-file-download.js",
        //"lib/modules/directives/input.js",
        // "lib/modules/directives/ui-radio.js",
        // "lib/modules/directives/ui-keyallow.js",
        // "lib/modules/directives/ui-sliderbar.js",
        // "lib/modules/directives/ui-sliderbar2.js",
        // "lib/modules/directives/ui-keypadInput.js",
        // "lib/modules/directives/ui-keypadInput2.js",
        // "lib/modules/directives/ui-color.js",
        // "lib/modules/directives/ui-checkboxtree.js",
        // "lib/modules/directives/ui-timepicker.js",
        // "lib/modules/directives/ui-step.js",
        // "lib/modules/directives/ui-choice-tree.js",
        /*监听v-repeat是否完成的函数*/
        //"lib/modules/directives/onRepeatFinish.js",

        /*vx2过滤器*/
        "lib/modules/filters/accountNoFilter.js",
        "lib/modules/filters/amountFilter.js",
        "lib/modules/filters/dateConvertFilter.js",
        "lib/modules/filters/dimAcNoFilter.js",
        "lib/modules/filters/isNullFtr.js",
        "lib/modules/filters/dimPhoneNumFilter.js",
        "lib/modules/filters/percentFilter.js",
        "lib/modules/filters/showDayFilter.js",
        "lib/modules/filters/risklevel.js",
        //"lib/modules/filters/filterPinyin.js",
        //"lib/modules/filters/formatDateFilter.js",
        //"lib/modules/filters/skipFilter.js",

        /*vx2服务*/
        "lib/modules/services/$os.js",
        "lib/modules/services/calculateService.js",
        "lib/modules/services/$dateUtil.js", //判断合法日期区间@wangjian
        "lib/modules/services/cookieService.js"//,
        //"lib/modules/services/$domainServer.js",
        //"lib/modules/services/$modalServer.js",
        //"lib/modules/services/$nativeCall.js",
        //"lib/modules/services/popupService.js",
        //"lib/modules/services/artDialogService.js", //可交易弹出层服务@wangjian
        //"lib/modules/services/printService.js",
    ];

    if (typeof(exports) != "undefined") {
        exports.jsFiles = jsFiles;
        exports.cssFiles = cssFiles;
    } else {
        for (var i = 0; i < cssFiles.length; i++) {
            loadCss(cssFiles[i]);
        }
        for (var i = 0; i < jsFiles.length; i++) {
            loadJs(jsFiles[i]);
        }
    }

    function loadJs(path) {
        var scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = path;
        document.write(outerHTML(scriptTag));
    }

    function outerHTML(node) {
        // if IE, Chrome take the internal method otherwise build one
        return node.outerHTML || (function(n) {
            var div = document.createElement('div'),
                h;
            div.appendChild(n);
            h = div.innerHTML;
            div = null;
            return h;
        })(node);
    }

    function loadCss(path) {
        var cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        cssLink.href = path;
        document.getElementsByTagName("head")[0].appendChild(cssLink);
    }
})();
