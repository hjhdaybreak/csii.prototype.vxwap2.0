/**
 *手机充值记录查询
 */
ibsapp.register.controller("PhoneChargeRecordCtrl", ['$scope', '$remote', '$timeout', '$dateUtil', '$scrollPage', '$stateParams',
function($scope, $remote, $timeout, DateUtil, $stateParams) {
	$scope.init = function() {
		//flag_show控制筛选框的显隐
		$scope.flag_show = false;
		$scope.errorInfo = "没有符合查询条件的信息";
		//初始化无记录提示
		$scope.params = {};
		$scope.EndDate = DateUtil.changeDate().replace(/-/g, '/');
		$scope.BeginDate = DateUtil.changeDate('3M').replace(/-/g, '/');
		$timeout(function() {
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
		}, 500);
		$scope.activeDayFlag = "3M";
		//初始化时间
		$remote.post("ChargeHisQueryPre.do", {}, function(data) {
			//后台返回查询起止日期
			$scope.BeginDate1 = data.BeginDate;
			$scope.EndDate1 = data.EndDate;
			//默认检索
			var formdata = {
				"BeginDate" : $scope.BeginDate1,
				"EndDate" : $scope.EndDate1,
				"ChargeFlag" : "P"
			};
			$remote.post("ChargeHisQuery.do", formdata, function(data) {
				$scope.List = data.List;
			});
		}, function(error) {
			$scope.List = [];
			$scope.errorInfo = "没有符合查询条件的信息";
			$scope.AlertErr("通讯异常！");
		});
	};
	$scope.changeDate = function(days) {
		var activeDayFlagList = {
			"1W" : "1",
			"1M" : "2",
			"3M" : "3"
		};
		$scope.EndDate = DateUtil.changeDate().replace(/-/g, '/');
		$scope.BeginDate = DateUtil.changeDate(days).replace(/-/g, '/');
		$scope.activeDayFlag = days;
		$scope.params.DateType = activeDayFlagList[$scope.activeDayFlag];
	};

	//查询记录列表
	$scope.doQueryList = function() {
		//按条件检索
		var formdata = {
			"BeginDate" : $scope.BeginDate.replace(/\//g, '-'),
			"EndDate" : $scope.EndDate.replace(/\//g, '-'),
			"ChargeFlag" : "P"
		};
		$remote.post("ChargeHisQuery.do", formdata, function(data) {
			$scope.List = data.List;
		}, function(error) {
			$scope.List = [];
			$scope.errorInfo = "没有符合查询条件的信息或查询区间不合法";
			$scope.errorArr = error.jsonError;
		});
		$scope.flag_show = !$scope.flag_show;
		$("#ChargeHisQryForPhoneForm").slideUp(100);
		$("#doNotClickMask").hide();
	};
	//查询条件显示和隐藏
	$scope.showSelect = function() {
		if ($scope.flag_show) {
			$("#ChargeHisQryForPhoneForm").slideUp(100);
			$("#doNotClickMask").hide();
		} else {
			$("#doNotClickMask").show();
			$("#ChargeHisQryForPhoneForm").slideDown(500);
		}
		$scope.flag_show = !$scope.flag_show;
	};
	//按月份折叠/展示
	/*$scope.toggleMon = function(month){
	var monthId = month+'m';
	var monthTag = month+'a';
	if($('#'+monthTag).attr("class").toString()=='recordsShow'){
	$('#'+monthTag).attr("class",'recordsHide');
	}else{
	$('#'+monthTag).attr("class",'recordsShow');
	}
	$('#'+monthId).toggle();
	};*/
	//按月份折叠/展示(方案二)
	/*
	 通过month加字符串拼成id去定位每个月的列表
	 */
	$scope.toggleMon = function(month) {
		var monthId = month + 'm';
		var monthTag = month + 'a';
		if ($('#' + monthTag).attr("class").toString().match('glyphicon-menu-down')) {
			$('#' + monthTag).attr("class", 'glyphicon glyphicon-menu-up');
		} else {
			$('#' + monthTag).attr("class", 'glyphicon glyphicon-menu-down');
		}
		$('#' + monthId).slideToggle("fast");
	};
	//显示缴费历史详情
	$scope.toDetail = function(item) {
		$scope.payHisItemDetail = item;
		setTimeout(function() {
			$scope.goto("#2");
		}, 300);
	};
	//记录去缴费
	$scope.PhoneRecordToChargeFn = function(payHisItemDetail) {
		$scope.payHisItemDetail = payHisItemDetail;
		//为了跳转后续页面时记住选项
		$scope.$context.setNextScope({
			'PhoneRecordData' : $scope.payHisItemDetail
		}, "PhoneRecharge");
		$scope.goto("appOther.PhoneRecharge");
	};
}]);
