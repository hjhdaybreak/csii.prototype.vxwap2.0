ibsapp.register.controller("BankInvestmentDetailCtrl", ['$scope', '$remote', '$timeout', '$dateUtil', '$scrollPage', '$locale',
function($scope, $remote, $timeout, DateUtil, $scrollPage, $locale) {
	$scope.init = function() {
		$scope.DateTypeList = {
			"0" : "近一周",
			"1" : "近一个月",
			"2" : "近三个月",
			"3" : "自选区间"
		};
		$scope.liFlag = "field";
		$scope.params = {
			"DateType" : '2',
			"pageSize" : 10,
			"currentIndex" : 0
		};
		$scope.noticeIconF = true;
		$scope.activeDate = "3M";
		$scope.activeDayFlag = "3M";
		$scope.activeTypeFlag = "all";
		$scope.liFlag = "field";
		$scope.showFlag = true;
		$scope.EndDate = DateUtil.changeDate().replace(/-/g, '/');
		$scope.BeginDate = DateUtil.changeDate('3M').replace(/-/g, '/');
		//var selectDate = new MobileSelectDate();
		//var selectDate1 = new MobileSelectDate();
		// selectDate1.init({
		// 	trigger : '#endDate',
		// 	value : $scope.EndDate,
		// 	max : DateUtil.changeDate().replace(/-/g, '/'),
		// 	position : "bottom",
		// 	callback : function() {
		// 		$scope.EndDate = $("#endDate").val();
		// 	}
		// });
		// selectDate.init({
		// 	trigger : '#beginDate',
		// 	value : $scope.BeginDate,
		// 	max : DateUtil.changeDate().replace(/-/g, '/'),
		// 	position : "bottom",
		// 	callback : function() {
		// 		$scope.BeginDate = $("#beginDate").val();
		// 	}
		// });
		//银行投资明细
		$scope.bankInvestmentFn();
	};
	$scope.changeType = function(type) {
		$scope.activeDayFlag = days;
		$scope.dateStr = $scope.activeDayFlagList[$scope.activeDayFlag];
	};
	$scope.changeDate = function(e,days) {
		if (e && e.stopPropagation) { // 因此它支持W3C的stopPropagation()方法　
            e.stopPropagation();
        } else { //否则，我们需要使用IE的方式来取消事件冒泡   　　
            window.event.cancelBubble = true;
        }
		var activeDayFlagList = {
			"1W" : "0",
			"1M" : "1",
			"3M" : "2"
		};
		$scope.EndDate = DateUtil.changeDate().replace(/-/g, '/');
		$scope.BeginDate = DateUtil.changeDate(days).replace(/-/g, '/');
		$scope.activeDayFlag = days;
		$scope.params.DateType = activeDayFlagList[$scope.activeDate];
		$scope.activeDate=days;
	};
	//查询类型
	$scope.changeSelectType = function(type) {
		$scope.activeTypeFlag = type;
	};
	//显示查询条件
	$scope.showSelect = function() {
		$("#doNotClickMask").show();
		$scope.noticeIconF = false;
		$("#investmentDetailForm").slideDown(500);
	};
	//返回我的理财
	$scope.goMyFinance = function() {
		$("#investmentDetailForm").slideUp(100);
		$scope.noticeIconF = true;
		$("#doNotClickMask").hide();
		$scope.goback();
	};
	//银行投资明细
	$scope.bankInvestmentFn = function() {
		//当scroller存在时，销毁它，防止产生多个侧滑条
		if ($scope.scroller) {
			$scope.scroller.destroy();
		}
		//上拉初始化次数
		$scope.Loadingcount = 0;
		$scope.investmentList = [];
		//数据重置
		$scope.recordNumber = 0;
		//数据重置
		$scope.params.BeginDate = $scope.BeginDate.replace(/\//g, '-');
		$scope.params.EndDate = $scope.EndDate.replace(/\//g, '-');
		$remote.post("ProfolioTransQry.do", $scope.params, function(data) {
			$scope.investmentList = data.List;
			$scope.recordNumber = data.recordNumber;
		});
		$scope.scroller = $scrollPage.create("transList-all", function(noMoreFn) {//上拉加载函数
			if ($scope.recordNumber > $scope.params.pageSize && $scope.recordNumber > $scope.Loadingcount * $scope.params.pageSize) {
				$scope.Loadingcount = $scope.Loadingcount + 1;
				$scope.params.currentIndex = $scope.Loadingcount * $scope.params.pageSize;
				$remote.post("ProfolioTransQry.do", $scope.params, function(data) {
					$scope.investmentList = $scope.investmentList.concat(data.List);
					$timeout(function() {
						$scope.$apply($scope.investmentList);
						$scope.scroller.refresh();
						$scope.endFlag = $scope.investmentList.length != $scope.recordNumber ? false : true;
						noMoreFn($scope.endFlag);
					}, 100);
				});
			} else {
				noMoreFn(true);
			};
		}, function() {//下拉刷新函数
			$scope.params.currentIndex = 0;
			$scope.Loadingcount = 0;
			$remote.post("ProfolioTransQry.do", $scope.params, function(data) {
				$timeout(function() {
					$scope.investmentList = data.List;
					$scope.$apply($scope.investmentList);
					$scope.scroller.refresh();
				}, 100);
			});
		});
	};
	$scope.doQuery = function() {
		//重新置为0
		$scope.params.currentIndex = 0;
		$scope.Loadingcount = 0;
		$("#investmentDetailForm").slideUp(100);
		$scope.noticeIconF = true;
		$("#doNotClickMask").hide();
		//银行投资明细
		$scope.bankInvestmentFn();

	};
}]);
