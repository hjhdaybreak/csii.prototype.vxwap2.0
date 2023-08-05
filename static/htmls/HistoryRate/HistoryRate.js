/**
 *历史收益率
 */
ibsapp.register.controller("HistoryRateCtrl", ['$scope', '$remote', '$timeout', 'DateUtil', '$scrollPage',
function($scope, $remote, $timeout, DateUtil, $scrollPage) {
	$scope.init = function() {//初始化
		//$scope.data为前一页面传来的数据
		//提示信息icon显示标志
		//0 昨天 1最近一周 2 一个月 3 传时间  4 3个月 5 半年
		if ($scope.data.ProdStyle == "YYY") {
			$scope.params = {
				"PrdId" : $scope.data.ProdId,
				"ProdSubId" : $scope.data.ProdSubId,
				"FundCode" : $scope.data.FundCode,
				"DateType" : "1",
				"pageSize" : 10,
				"currentIndex" : 0
			};
			$scope.url = "FundHistRateQry.do";
		} else if ($scope.data.ProdStyle == "TLB") {
			$scope.params = {
				"DateType" : "2",
				"pageSize" : 10,
				"currentIndex" : 0
			};
			$scope.url = "JuliBaoPastProfitQry.do";
		}
		//List查询
		$scope.listInit();
	};
	//List查询
	$scope.listInit = function() {
		//当scroller存在时，销毁它，防止产生多个侧滑条
		if ($scope.scroller) {
			$scope.scroller.destroy();
		}
		$scope.Loadingcount = 0;
		$remote.post($scope.url, $scope.params, function(data) {
			$scope.List = data.List;
			$scope.recordNumber = data.recordNumber;
		});
		$scope.scroller = $scrollPage.create("transList-all", function(noMoreFn) {//上拉加载函数
			if ($scope.recordNumber > $scope.params.pageSize && $scope.recordNumber > $scope.Loadingcount * $scope.params.pageSize) {
				$scope.Loadingcount = $scope.Loadingcount + 1;
				$scope.params.currentIndex = $scope.Loadingcount * $scope.params.pageSize;
				$remote.post($scope.url, $scope.params, function(data) {
					$scope.List = $scope.List.concat(data.List);
					$timeout(function() {
						$scope.$apply($scope.List);
						$scope.scroller.refresh();
						$scope.endFlag = $scope.List.length != data.recordNumber ? false : true;
						noMoreFn($scope.endFlag);
					}, 100);
				});
			} else {
				noMoreFn(true);
			};
		}, function() {//下拉刷新函数
			$scope.params.currentIndex = 0;
			$scope.Loadingcount = 0;
			$remote.post($scope.url, $scope.params, function(data) {
				$timeout(function() {
					$scope.List = data.List;
					$scope.$apply($scope.List);
					$scope.scroller.refresh();
				}, 100);
			});
		});
	};
}]);
