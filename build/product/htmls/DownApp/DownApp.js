/**
 *下载app
 */
ibsapp.register.controller("DownAppCtrl", ['$scope', '$remote','$timeout','$location',
    function($scope, $remote,$timeout,$location) {
        (function() {//轮播
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 2.5,
                paginationClickable: true,
                spaceBetween: 10
            });
        })()
        $scope.init = function() {
            //alert($location.);
            $scope.downInfo = "直销银行下载直销银行下载直销银行下载直销银行下载直销银行下载直销银行下载直销银行下载";
            if ($scope.isWeCat()) {//微信展示下载引导
            	$(".downGuide").show();
            }
            $scope.oprateText="展开";
            $remote.post("DownloadApp.do",{},function(data){
               $scope.downData=data;
            });
        };
        $scope.closeDownGuide = function() {//关闭引导下载页
             $(".downGuide").hide();
        }
        $scope.showAllText=function(){
        	if($scope.downInfoF){
        		$scope.downInfoF=false;
        		$scope.oprateText="展开";
        	}else{
        		$scope.downInfoF=true;
        		$scope.oprateText="收起";
        	}
        }
        $scope.downApp=function(){//下载app
        	$scope.openApp('jcxcbank://m.jcxcMobilebank.com',$scope.downData.andriodaddress,'JinChengDirectBank://',$scope.downData.iosaddress,function(){
        		
                $("#weixin_open_down").show();
        	});
        }
                //下载 app 有则直接打开，没有则去下载
        $scope.openApp = function(androidUrlScheme, androidUrl, iosUrlScheme, iosUrl, callFn) {
            
            //androidUrlScheme   打开android app 的协议
            //androidUrl               下载android app 的路径
            // iosUrlScheme           打开ios app 的协议
            // iosUrl                        下载ios app 的路径
            //取消事件冒泡
            // if (e && e.stopPropagation) { // 因此它支持W3C的stopPropagation()方法
            //     　　
            //     e.stopPropagation();
            // } else { //否则，我们需要使用IE的方式来取消事件冒泡   　　
            //     window.event.cancelBubble = true;
            // }
            //微信浏览器
            
            if ($scope.isWeCat()) {
                //微信浏览器弹出遮罩引导层
                callFn();
                return;
            }
            var t1 = Date.now(), hasApp = true, t = 500;
            var ifr = document.createElement("iframe");
            if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                 window.location.href = iosUrl;//ios 只做下载
                // $timeout(function() {
                //     if (!hasApp) {
                //         //未安装了app
                //         window.location.href = iosUrl;
                //     }
                // }, 2000);
                // window.location = iosUrlScheme;
                // $timeout(function() {
                //     var t2 = Date.now();
                //     if (!t1 || t2 - t1 < t + 100) {
                //         hasApp = false;
                //     }
                // }, t);
            } else if (navigator.userAgent.match(/android/i)) {
                $timeout(function() {
                    if (!hasApp) {
                        //未安装了app
                        window.location.href = androidUrl;
                    }
                    document.body.removeChild(ifr);
                }, 1000);
                ifr.setAttribute('src', androidUrlScheme);
                ifr.setAttribute('style', 'display:none');
                document.body.appendChild(ifr);
                $timeout(function() {
                    var t2 = Date.now();
                    if (!t1 || t2 - t1 < t + 100) {
                        hasApp = false;
                    }
                }, t);
            }
        };
        $scope.closeWeixinDilog=function(){
            $("#weixin_open_down").hide();
        }
    }
]);
