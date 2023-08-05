/**
 *自动还款维护
 */
ibsapp.register.controller("RepayAutoMaintainCtrl", ["$state", "$stateParams", "$cookieService", '$rootScope', '$scope', '$remote', '$nativeCall', '$targets',
function($state, $stateParams, $cookieService, $rootScope, $scope, $remote, $nativeCall, $targets) {
	$scope.init = function() {
		$remote.post("CardAgrToDepositList.do", {}, function(data) {
			if (data.deposit != null && data.deposit != "") {
				$scope.List = data.deposit;
			} else {
				//进入自动还款设置
				$scope.goto('appOther.RepayAutoAdd');
			}
		});

	};
	//跳到自动还款修改页面
	$scope.repayUpDateFn = function(item) {
		$scope.AutoList = item;
		//为了跳转后续页面时记住选项
		//把数据带到自动还款修改页面
		$scope.$context.setNextScope({
			AutoList : $scope.AutoList
		}, "RepayAutoUpdate");
		$scope.goto('appOther.RepayAutoUpdate');
	};
	//跳到自动还款删除页面
	$scope.repayDeleteFn = function(item) {
		$scope.AutoList = item;
		//为了跳转后续页面时记住选项
		$scope.$context.setNextScope({
			AutoList : $scope.AutoList
		}, "RepayAutoDel");
		$scope.goto('appOther.RepayAutoDel');
	};
}]);
