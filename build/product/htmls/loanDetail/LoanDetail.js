ibsapp.register.controller("LoanDetailCtrl", ["$state", "$stateParams", "$cookieService", '$scope', '$remote', '$timeout', 'DateUtil', '$scrollPage',
function($state, $stateParams, $cookieService, $scope, $remote, $timeout, DateUtil, $scrollPage) {
	$scope.init = function() {
		//默认显示还款计划
		$scope.liFlag = "hkPlan";
		//我的页面--贷款传过来的具体条目进入详情页面
		$scope.RepayData = vx.fromJson(sessionStorage.getItem("RepayDataString"));
		//逾期金额显示
		$scope.OverDueSum = $scope.RepayData.OverDueSum;
		if ($scope.OverDueSum == '0') {
			$("div#OverDueSum").hide();
		} else {
			$("div#OverDueSum").show();
		}
		//余额显示
		$scope.CurrentRepay = $scope.RepayData.CurrentRepay;
		$remote.post("EAcctBalQry.do", {}, function(data) {
			$scope.$root.EcacctAvailBal = data.AvailBal;
			//EcacctAvailBal为贷款模块公用数据，需保存到sessionStorage中
			sessionStorage.setItem("EcacctAvailBalString", vx.toJson($scope.$root.EcacctAvailBal));
			if ($scope.EcacctAvailBal >= $scope.CurrentRepay) {
				$scope.Type = '1';
			} else {
				$scope.Type = '2';
			}
		});
		//还款计划查询
		$remote.post("RepayPlanQry.do", {
			"BdSerialNo" : $scope.RepayData.SerialNo
		}, function(data) {
			$scope.PlanList = data.List;
			if (data.List.length > 0) {
				$scope.$root.PlanDate = data.List[0].PayDate;
				//PlanDate为贷款模块公用数据，需保存到sessionStorage中
				sessionStorage.setItem("PlanDateString", vx.toJson($scope.$root.PlanDate));
			}

		});
		//还款历史查询
		$remote.post("RepayHisQry.do", {
			"BdSerialNo" : $scope.RepayData.SerialNo
		}, function(data) {
			$scope.HisList = data.List;
		});

	};
	//还款计划弹框显示具体本金利息
	$scope.show = function(item, obj) {
		if ($("#p" + item).css("display") == 'none') {
			$(".yy").hide();
			$("#p" + item).show();
		} else {
			$("#p" + item).hide();
		}
		obj.stopPropagation();

	};
	//还款历史弹框显示具体本金利息
	$scope.showHis = function(item, obj) {
		if ($("#p" + item).css("display") == 'none') {
			$(".yy").hide();
			$("#p" + item).show();
		} else {
			$("#p" + item).hide();
		}
		obj.stopPropagation();
	};
	//关闭
	$(document).click(function() {
		$(".yy").hide();
	});
	//自动还款
	$scope.AutoQry = function() {
		$remote.post("CardAgrToDepositList.do", {}, function(data) {
			if (data.deposit != null && data.deposit != "") {
				//自动还款维护
				$scope.goto('appOther.RepayAutoMaintain');
			} else {
				//自动还款添加设置
				$scope.goto('appOther.RepayAutoAdd');
			}
		});
	};
	//提前还款
	$scope.PreRepaymentFn = function() {
		$scope.goto('appOther.RepayMentforward');
	};
	//进入按期还款
	$scope.TransferIn = function() {
		$scope.RepayTransfer = {
			'RepayAmount' : '',
			'RepaymentType' : 'Transfer'
		};
		//把数据带到按期还款页面
		$scope.$context.setNextScope({
			RepayTransfer : $scope.RepayTransfer
		}, "RepayTransfer");
		$scope.goto("appOther.RepayTransfer");
	};
	//还款项目菜单切换
	$scope.changeType = function(value) {
		$scope.liFlag = value;
	};
	//本期应还温馨提示打开
	$scope.OpenBenQiHKWEnXinTiShiFn = function() {
		$("div#BenQiWenXinTiShi_id").toggle();
	};
	//本期应还温馨提示打开
	$scope.CloseBenQiHKWEnXinTiShiFn = function() {
		$("div#BenQiWenXinTiShi_id").toggle();
	};
}]);
