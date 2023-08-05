/**
 *侧拉抽屉中的定期转入
 */
ibsapp.register.controller("RegularShiftToCtrl", ['$scope', '$remote',
function($scope, $remote) {
	$scope.init = function() {//初始化
		//通过initFlag来标记是否已经存在定期转入，默认不存在
		$scope.initFlag = false;
		//查询已经添加的定期转入列表，会通过结果来修改显示页面
		$scope.searchRegular();
	};

	//请求查询定期转入数据
	$scope.searchRegular = function() {
		//CardAgrToDepositList.do返回用户添加的定期转入记录列表
		$remote.post("CardAgrToDepositList.do", {}, function(data) {
			$scope.resultData = data.List;
			if ($scope.resultData && $scope.resultData.length > 0) {//返回数据列表不为空
				//进入这个if就标明列表不为空，修改标记为true
				$scope.initFlag = true;
			} else {//列表为空
				$scope.initFlag = false;
			}
		});
	};

	/*
	 *控制删除和修改按钮的显示
	 *param {Number} index 标记触发这个方法的是列表中的第index个，从0开始
	 */
	$scope.showButton = function(index) {
		var idName = "buttonFlag_" + index;
		$("#" + idName).toggle();
	}
	/*
	 *删除定期转入
	 *param {Number} index 标记触发这个方法的是列表中的第index个，从0开始
	 */
	$scope.deleteRegular = function(index) {
		//deleRow携带选择删除的定期转入列表的该项目全部数据，删除页面需要使用这些数据
		$scope.$context.setNextScope({
			"deleRow" : $scope.resultData[index]
		}, "RegularShiftTo_Delete");
		$scope.goto("appOther.RegularShiftTo_Delete");
	};

	/*
	 *修改定期转入
	 *param {Number} index 标记触发这个方法的是列表中的第index个，从0开始
	 */
	$scope.updateRegular = function(index) {
		//updRow携带选择修改的定期转入列表的该项目全部数据，修改页面需要使用这些数据
		$scope.$context.setNextScope({
			"updRow" : $scope.resultData[index]
		}, "RegularShiftTo_Update");
		$scope.goto("appOther.RegularShiftTo_Update");
	};

	/*
	 *添加定期转入
	 */
	$scope.addRegular = function() {
		//定期转入添加存在一个选择银行卡，value是为了标记是从选择银行卡进入的还是第一次进入添加页面的
		$scope.$context.setNextScope({
			"value" : false
		});
		$scope.goto("appOther.RegularShiftTo_Add");
	};
}]);
