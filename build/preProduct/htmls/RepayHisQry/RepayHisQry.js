/**
 *还款历史   
 */

ibsapp.register.controller("RepayHisQryCtrl", ["$state", "$stateParams", "$cookieService", '$scope', '$remote',
function($state, $stateParams, $cookieService, $scope, $remote) {
	$scope.init = function() {
		//我的页面--贷款传过来的具体条目进入还款历史
		$remote.post("RepayHisQry.do", {
			"BdSerialNo" : $scope.HisData.SerialNo
		}, function(data) {
			$scope.HisList = data.List;
		});
	};
	//还款历史弹框显示具体本金利息
	$scope.showHis = function(item, obj) {
		if ($("#p" + item).css("display") == 'none') {
			$(".yy").hide();
			$("#p" + item).toggle();
		} else {
			$("#p" + item).hide();
		}
		obj.stopPropagation();

	};
	//关闭弹框
	$(document).click(function() {
		$(".yy").hide();

	});
}]);
