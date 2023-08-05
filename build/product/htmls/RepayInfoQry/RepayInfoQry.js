/**
 *还款历史
 */

ibsapp.register.controller("RepayInfoQryCtrl", ["$state", "$stateParams", "$cookieService", '$scope', '$remote',
function($state, $stateParams, $cookieService, $scope, $remote) {
	$scope.init = function() {
		//贷款未结清状态初始化
		$scope.liFlag = "NotJieQing";
		//贷款List查询
		$remote.post("RepayInfoQry.do", {}, function(data) {
			$scope.RePayList = data.RePayList;
			$scope.FinishList = data.FinishList;
		});
	};
	//未结清与已结清切换
	$scope.repayChangeTypeFn = function(type) {
		$scope.liFlag = type;
	};
	//进入还款历史
	$scope.HisQry = function(item) {
		$scope.HisData = item;
		//为了跳转后续页面时记住选项
		$scope.$context.setNextScope({
			HisData : $scope.HisData
		}, "RepayHisQry");
		$scope.goto('appOther.RepayHisQry');
	};
	//跳到贷款详情页面
	$scope.turnToDetail = function(item) {
		$scope.RepayData = item;
		//$scope.RepayData为贷款模块公用数据，需保存到sessionStorage中
		sessionStorage.setItem("RepayDataString", vx.toJson($scope.RepayData));
		$scope.goto('appOther.LoanDetail');
	};
}]);
