/**
 *生活缴费菜单页面
 */
ibsapp.register.controller("LifeMainCtrl", ["$state", "$stateParams", "$cookieService", "$timeout", "$location", "$filter", "$rootScope", "$targets", '$scope', '$remote',
function($state, $stateParams, $cookieService, $timeout, $location, $filter, $rootScope, $targets, $scope, $remote) {
	//获取前一面页面传过来的路由
	$scope.prePageUrl = $rootScope.getRouteParams("prePageUrl");
	//返回前一页面
	$scope.backPrePageFn = function() {
		if ($scope.prePageUrl) {
			$scope.goto($scope.prePageUrl);
		} else {
			$scope.goto('app.Main');
		};
	};
	//创建生活缴费类型图标滑动块对象
	$($timeout(function() {
		var swiper = new Swiper('.swiper-container', {
			pagination : '.swiper-pagination',
			paginationClickable : true,
			nextButton : '.swiper-button-next',
			prevButton : '.swiper-button-prev',
			loop : false
		});
	}, 500));
	//初始化
	$scope.init = function() {
		//其他页面传过来的城市信息
		if (sessionStorage.getItem("PayCityString")) {
			$rootScope.PayCity = vx.fromJson(sessionStorage.getItem("PayCityString"));
		} else {
			//定位城市，没有定位到则默认太原市
			$rootScope.PayCity = {
				"AREA_CODE" : "351",
				"AREA_NAME" : "太原"
			};
			//保存默认城市
			sessionStorage.setItem("PayCityString", vx.toJson($rootScope.PayCity));
		}
		//创建缴费类型图标滑动List
		$scope.typeInfo = [];
		$scope.ListNumber = 10;
		$('.no_has_pay').hide();
		$('.has_pay').hide();
		//判断登录状态
		if (sessionStorage.getItem("loginedF") == 'true') {
			//查询用户缴费名册
			$scope.qryPaymentList();
		} else {
			$scope.NotloginFlag = sessionStorage.getItem("loginedF");
			$scope.qryChargeBusiType();
			$('.no_has_pay').show();
			$('.has_pay').hide();
		}
	};
	//查询用户缴费名册
	$scope.qryPaymentList = function() {
		$remote.post("PaymentListQry.do", {}, function(data) {
			$scope.PaymentList = data.PaymentList;
			$scope.qryChargeBusiType();
			if ($scope.PaymentList == undefined || $scope.PaymentList.length == undefined || $scope.PaymentList.length == 0) {
				//无缴费名册，显示缴费业务种类
				$('.no_has_pay').show();
			} else {
				//显示缴费名册、footer
				$('.no_has_pay').hide();
				$('.has_pay').show();
			}
		});
	};
	//查询缴费类型
	$scope.qryChargeBusiType = function() {
		var formdata = {
			"AREA_CODE" : $rootScope.PayCity.AREA_CODE,
			"AREA_NAME" : $rootScope.PayCity.AREA_NAME
		};
		$remote.post("ChargeBusiTypeQry.do", formdata, function(data) {
			//生活缴费类型List
			$scope.BusiTypeList = data.BusiTypeList;
			if ($scope.BusiTypeList) {
				//确定滑块数量
				$scope.slideCount = Math.ceil($scope.BusiTypeList.length / 4);
				var childList;
				for (var i = 0; i < $scope.slideCount; i++) {
					$scope[childList + i] = [];
					for (var j = 4 * i; j < 4 * (i + 1); j++) {
						$scope[childList + i].push($scope.BusiTypeList[j]);
					}
					$scope.typeInfo.push({
						slidePos : i,
						List : $scope[childList + i]
					});
				}
			} else {
				$scope.BusiTypeList = [];
			}
		});
	};
	//从缴费图标点击缴费
	$scope.busyTypePayFn = function(item) {
		if (sessionStorage.getItem("loginedF") == 'true') {
			$scope.BusiType = {
				"actionId" : "PayDo",
				"AREA_CODE" : $rootScope.PayCity.AREA_CODE,
				"AREA_NAME" : $rootScope.PayCity.AREA_NAME,
				"BUSI_TYPE" : item.BUSI_TYPE,
				"BUSI_NAME" : item.BUSI_NAME
			};
			//为了跳转后续页面时记住选项
			sessionStorage.setItem("busitypeString", vx.toJson($scope.BusiType));
			$scope.goto("appOther.PaidedLife");

		} else {
			$scope.BusiType = {
				"actionId" : "PayDo",
				"AREA_CODE" : $rootScope.PayCity.AREA_CODE,
				"AREA_NAME" : $rootScope.PayCity.AREA_NAME,
				"BUSI_TYPE" : item.BUSI_TYPE,
				"BUSI_NAME" : item.BUSI_NAME
			};
			//为了跳转后续页面时记住选项
			sessionStorage.setItem("busitypeString", vx.toJson($scope.BusiType));
			//打开侧滑栏登录
			$rootScope.beforeLoginRoute = "appOther.PaidedLife";
			$scope.showLogin();
		}
	};
	//删除缴费对象
	$scope.delPaymentObject = function(data1, index) {
		var formData = {
			"BILLKEY" : data1.BILLKEY,
			"Act" : "del"
		};
		$remote.post("DelPaymentObject.do", formData, function(data) {
			if (data.flag > 0) {
				$('.list-style-jiaofei').find('ul').eq(index).slideUp();
			} else {
				$scope.AlertErr("删除失败");
			}
		});
	};
	//编辑缴费对象
	$scope.toEditPaymentObject = function(data, index) {
		$scope.PaymentObjcet = data;
		$scope.CUSTNAME = $('#beizhu' + index).text();
		$scope.IdIndex = index;
		//编辑的时候需要
		coverScreen();
		$('.cover-dlg').fadeIn('fast');
	};
	//修改缴费对象别名
	$scope.updatePaymentObject = function() {
		if ($scope.CUSTNAME == undefined || $scope.CUSTNAME == '') {
			$scope.AlertErr("请输入备注");
			return;
		}
		var formData = {
			"BILLKEY" : $scope.PaymentObjcet.BILLKEY,
			"CUSTNAME" : $scope.CUSTNAME
		};
		$remote.post("PaymentCustNameAlter.do", formData, function(data) {
			$('#beizhu' + $scope.IdIndex).text($scope.CUSTNAME);
		});
	};
	//进入预约缴费页面
	$scope.LifeReservationPaymentFn = function() {
		if (sessionStorage.getItem("loginedF") == 'true') {
			$scope.goto("appOther.LifeReservationPayment");

		} else {
			$rootScope.beforeLoginRoute = "appOther.LifeReservationPayment";
			//打开侧滑栏登录
			$scope.showLogin();
		}
	};

	//进入名册缴费页面
	$scope.bookPayMentFn = function(data) {
		$scope.Bookbusitype = data;
		$scope.Bookbusitype.actionId = "PayDo";
		$scope.Bookbusitype.BUSI_NAME = $filter("PayBusiType")(data.BUSI_TYPE);
		//为了跳转后续页面时记住选项
		sessionStorage.setItem("busitypeString", vx.toJson($scope.Bookbusitype));
		$scope.goto("appOther.BookPayMent");
	};
	//进入城市选择页面
	$scope.selectionCityFn = function() {
		$scope.goto("appOther.SelectCity");
	};
	//进入缴费提醒页面
	$scope.goLifePaymentReminderFn = function() {
		if (sessionStorage.getItem("loginedF") == 'true') {
			$scope.goto("appOther.LifePaymentReminder");
		} else {
			//去登陆时关闭遮罩及底部菜单同时打开侧滑栏登录
			closeCoverFn();
			$rootScope.beforeLoginRoute = "appOther.LifePaymentReminder";
			//打开侧滑栏登录
			$scope.showLogin();
		}

	};
	//进入缴费历史页面
	$scope.goLifePaymentHistQryFn = function() {
		if (sessionStorage.getItem("loginedF") == 'true') {
			$scope.goto("appOther.LifePaymentHistQry");
		} else {
			//去登陆时关闭遮罩及底部菜单同时打开侧滑栏登录
			closeCoverFn();
			//打开侧滑栏登录
			$rootScope.beforeLoginRoute = "appOther.LifePaymentHistQry";
			$scope.showLogin();
		}
	};
	//进入常见问题页面
	$scope.goLifePaymentComQuestionFn = function() {
		//如果登录页面打开，则关掉登录页面
		$scope.closeSlideBar();
		$scope.goto("appOther.LifePaymentComQuestion");
	};
	//关闭遮罩及底部菜单
	function closeCoverFn() {
		coverScreen();
		$('.cover-more_list').slideToggle();
	};
	//遮罩屏幕函数
	function coverScreen() {
		if ($('.cover-screen').css('display') == 'none') {
			$('.cover-screen').fadeIn('fast');
		} else {
			$('.cover-screen').fadeOut('fast');
		}
	}

	//编辑弹框 取消和确认
	$('li.bottomcancel').click(function() {
		//如果登录页面打开，则关掉登录页面
		$scope.closeSlideBar();
		coverScreen();
	});

}]);
