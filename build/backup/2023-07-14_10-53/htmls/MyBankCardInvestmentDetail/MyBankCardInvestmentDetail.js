/**
 *绑定卡/支付卡详情
 */
ibsapp.register.controller("MyBankCardInvestmentDetailCtrl", ['$scope', '$remote', '$timeout', '$dateUtil', '$scrollPage', '$stateParams',
function($scope, $remote, $timeout, DateUtil, $scrollPage, $stateParams) {
	$scope.init = function() {
		$scope.trsStateMap = {
			"5" : "全部",
			"3" : "转入",
			"4" : "转出"
		};
		$scope.activeDayFlagList = {
			"1W" : "近一周",
			"1M" : "近一月",
			"3M" : "近三月"
		};
		$scope.dateStr = "近三月";
		$scope.noticeIconF = true;
		//提示信息icon显示标志
		$scope.liFlag = "field";
		//默认选中查询区间
		$scope.params = {// 上送参数
			"OperateCode" : '5', // 全部类型                             3是转入    4是转出
			"DateType" : '5', // 初始化 - 查找最近三月的记录
			"pageSize" : 10,
			"currentIndex" : 0
		};
		$scope.params.BoundCardNo = $scope.BoundCardNo;
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
		$scope.MyBankCardInvestmentDetailFn();
		$scope.activeDayFlag = "3M";
	};

	//更改筛选框导航栏样式
	$scope.changeType = function(e,type) {
		if (e && e.stopPropagation) { // 因此它支持W3C的stopPropagation()方法　
            e.stopPropagation();
        } else { //否则，我们需要使用IE的方式来取消事件冒泡   　　
            window.event.cancelBubble = true;
        }
		$scope.liFlag = type;
	};
	//更改时间区间样式，根据所选区间修改开始日期
	$scope.changeDate = function(e,days) {
		if (e && e.stopPropagation) { // 因此它支持W3C的stopPropagation()方法　
            e.stopPropagation();
        } else { //否则，我们需要使用IE的方式来取消事件冒泡   　　
             window.event.cancelBubble = true;
        }
		$scope.EndDate = DateUtil.changeDate().replace(/-/g, '/');
		$scope.BeginDate = DateUtil.changeDate(days).replace(/-/g, '/');
		$scope.activeDayFlag = days;
		$scope.dateStr = $scope.activeDayFlagList[$scope.activeDayFlag];
	};
	//交易类型选择
	$scope.changeCode=function(e,code){
        if (e && e.stopPropagation) { // 因此它支持W3C的stopPropagation()方法　
            e.stopPropagation();
        } else { //否则，我们需要使用IE的方式来取消事件冒泡   　　
             window.event.cancelBubble = true;
        }
        $scope.params.OperateCode=code;
	}
	//我的银行卡缴费明细
	$scope.MyBankCardInvestmentDetailFn = function() {
		//当scroller存在时，销毁它，防止产生多个侧滑条
		if ($scope.scroller) {
			$scope.scroller.destroy();
		}
		//上拉初始化次数
		$scope.Loadingcount = 0;
		$scope.list = [];
		$scope.recordNumber = 0;
		$scope.params.BeginDate = $scope.BeginDate.replace(/\//g, '-');
		$scope.params.EndDate = $scope.EndDate.replace(/\//g, '-');
		$remote.post("BoundCardTrsQry.do", $scope.params, function(data) {
			$scope.list = data.List;
			$scope.recordNumber = data.recordNumber;
		});
		$scope.scroller = $scrollPage.create("transList-all", function(noMoreFn) {//上拉加载函数
			if ($scope.recordNumber > $scope.params.pageSize && $scope.recordNumber > $scope.Loadingcount * $scope.params.pageSize) {
				$scope.Loadingcount = $scope.Loadingcount + 1;
				$scope.params.currentIndex = $scope.Loadingcount * $scope.params.pageSize;
				$remote.post("BoundCardTrsQry.do", $scope.params, function(data) {
					$scope.list = $scope.list.concat(data.List);
					$timeout(function() {
						$scope.$apply($scope.list);
						$scope.scroller.refresh();
						$scope.endFlag = $scope.list.length != $scope.recordNumber ? false : true;
						noMoreFn($scope.endFlag);
					}, 100);
				});
			} else {
				noMoreFn(true);
			};
		}, function() {//下拉刷新函数
			$scope.params.currentIndex = 0;
			$scope.Loadingcount = 0;
			$remote.post("BoundCardTrsQry.do", $scope.params, function(data) {
				$timeout(function() {
					$scope.list = data.List;
					$scope.$apply($scope.list);
					$scope.scroller.refresh();
				}, 100);
			});
		});
	};
	//打开筛选框
	$scope.showSelect = function() {//查询条件显示
		$("#doNotClickMask").show();
		$scope.noticeIconF = false;
		$("#MyBankCardInvestmentDetail").slideDown(500);
		$scope.params.DateType = "5";
		//打开筛选框时，设置dateType为5，查询时根据起始日期查询
	};
	//筛选框查询
	$scope.doQuery = function(index) {
		//重新置为0
		$scope.params.currentIndex = 0;
		$scope.Loadingcount = 0;
		$("#MyBankCardInvestmentDetail").slideUp(100);
		$scope.noticeIconF = true;
		$("#doNotClickMask").hide();
		//我的银行卡缴费明细
		$scope.MyBankCardInvestmentDetailFn();

	};
}]);
