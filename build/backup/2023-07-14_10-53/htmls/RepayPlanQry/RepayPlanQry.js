/**
 *还款计划表
 */
ibsapp.register.controller("RepayPlanQryCtrl", ["$state", "$stateParams", "$cookieService", '$scope', '$remote',
function($state, $stateParams, $cookieService, $scope, $remote) {
	$scope.init = function() {
		//获取前一页面路由
		$scope.url = $stateParams.url;
		//我的页面选择具体条目 保存的值     自动还款设置页面进入还款计划表页面传来的值
		if (sessionStorage.getItem("RepayDataString")) {
			$scope.RepayData = vx.fromJson(sessionStorage.getItem("RepayDataString"));
		}
		var params = {
			"BdSerialNo" : $scope.RepayData.SerialNo,
		};
		$remote.post("RepayPlanQry.do", params, function(data) {
			$scope.PlanList = data.List;
		});
	};
	//还款计划表返回前一页面函数
	$scope.gobackPrePageFn = function() {
		var type = $scope.RepayType;
		if (type == 'RepayUpdate') {
			$scope.gotoUrl("htmls/RepayAutoUpdate/RepayAutoUpdate.html");
		} else if (type == 'RepayDel') {
			$scope.gotoUrl("htmls/RepayAutoDel/RepayAutoDel.html");
		} else {
			$scope.goto("appOther.RepayAutoAdd");
		}
	};
	//页面左上角返回前一页面
	$scope.repayPlanBackPrePageFn = function() {
		$scope.goto($scope.url);
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
	//关闭
	$(document).click(function() {
		$(".yy").hide();
	});
}]);
