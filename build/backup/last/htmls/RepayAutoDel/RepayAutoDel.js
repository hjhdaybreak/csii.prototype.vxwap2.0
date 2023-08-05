/**
 *自动还款维护
 */
ibsapp.register.controller("RepayAutoDelCtrl", ["$state", "$stateParams", "$cookieService", '$rootScope', '$scope', '$remote', '$nativeCall', '$targets',
function($state, $stateParams, $cookieService, $rootScope, $scope, $remote, $nativeCall, $targets) {
	$scope.init = function() {
		//从自动还款维护传来的值
		//日期List
		$scope.TimerFreqList = [{
			"Name" : "每日",
			"Value" : "0"
		}, {
			"Name" : "每周",
			"Value" : "1"
		}, {
			"Name" : "每月",
			"Value" : "2"
		}];

		$scope.TimerRule4List = [{
			"Name" : "周一",
			"Value" : "1"
		}, {
			"Name" : "周二",
			"Value" : "2"
		}, {
			"Name" : "周三",
			"Value" : "3"
		}, {
			"Name" : "周四",
			"Value" : "4"
		}, {
			"Name" : "周五",
			"Value" : "5"
		}, {
			"Name" : "周六",
			"Value" : "6"
		}, {
			"Name" : "周日",
			"Value" : "7"
		}];
		$scope.TimerRule3List = [{
			"Name" : "1日",
			"Value" : "01"
		}, {
			"Name" : "2日",
			"Value" : "02"
		}, {
			"Name" : "3日",
			"Value" : "03"
		}, {
			"Name" : "4日",
			"Value" : "04"
		}, {
			"Name" : "5日",
			"Value" : "05"
		}, {
			"Name" : "6日",
			"Value" : "06"
		}, {
			"Name" : "7日",
			"Value" : "07"
		}, {
			"Name" : "8日",
			"Value" : "08"
		}, {
			"Name" : "9日",
			"Value" : "09"
		}, {
			"Name" : "10日",
			"Value" : "10"
		}, {
			"Name" : "11日",
			"Value" : "11"
		}, {
			"Name" : "12日",
			"Value" : "12"
		}, {
			"Name" : "13日",
			"Value" : "13"
		}, {
			"Name" : "14日",
			"Value" : "14"
		}, {
			"Name" : "15日",
			"Value" : "15"
		}, {
			"Name" : "16日",
			"Value" : "16"
		}, {
			"Name" : "17日",
			"Value" : "17"
		}, {
			"Name" : "18日",
			"Value" : "18"
		}, {
			"Name" : "19日",
			"Value" : "19"
		}, {
			"Name" : "20日",
			"Value" : "20"
		}, {
			"Name" : "21日",
			"Value" : "21"
		}, {
			"Name" : "22日",
			"Value" : "22"
		}, {
			"Name" : "23日",
			"Value" : "23"
		}, {
			"Name" : "24日",
			"Value" : "24"
		}, {
			"Name" : "25日",
			"Value" : "25"
		}, {
			"Name" : "26日",
			"Value" : "26"
		}, {
			"Name" : "27日",
			"Value" : "27"
		}, {
			"Name" : "28日",
			"Value" : "28"
		}, {
			"Name" : "最后一天",
			"Value" : "32"
		}];
		$scope.TrsAmount = $scope.AutoList.amount;
		var collPeriod = $scope.AutoList.collPeriod;
		var collTime = $scope.AutoList.collTime;
		$scope.TimerFreq = $scope.TimerFreqList[collPeriod];
		if (collPeriod == '1') {
			$scope.Time2 = $scope.TimerRule4List[collTime - 1];
		} else if (collPeriod == '2') {
			if (collTime == "32") {
				$scope.Time1 = $scope.TimerRule3List[collTime - 4];
			} else {
				$scope.Time1 = $scope.TimerRule3List[collTime - 1];
			}
		}

		$remote.post("CardAgrToDepositCancelConfirm.do", {}, function(data1) {
			$scope.myData = data1;
			$scope.AcNo = $scope.myData.AcNo;
			$scope.Type = $scope.myData.Type;
			$scope.AcNoSeq = $scope.myData.AcNoSeq;
			$scope.AcPhone = $scope.myData.AcPhone;

		});
		$scope.Bdstate = $scope.AutoList.bdstate;
		$scope.InnerFlag = $scope.AutoList.innerFlag;

		//查余额和限额
		$scope.payerAcctQry();
	};

	//查余额和限额
	$scope.payerAcctQry = function() {
		if ($scope.InnerFlag == '1') {
			$scope.acNoBalQry();
		} else if ($scope.InnerFlag == '0') {
			$scope.unionPayLimitQuery();
		}
	};
	//限额
	$scope.acNoBalQry = function() {
		$('#limit').hide();

		var formData = {
			"EAcct" : $scope.AutoList.cardNo
		};
		$remote.post("TransferAcNoBalQry.do", formData, function(data) {
			$scope.AvailBal = data.AvailBal;
			$('#availbal').show();
		});
	};

	$scope.unionPayLimitQuery = function() {
		$('#availbal').hide();
		var formData = {
			"CardNo" : $scope.AutoList.cardNo
		};
		$remote.post("UnionPayLimitQuery.do", formData, function(data) {
			if ('Y' == data.LimitFlag) {
				$scope.UnionPayLimit = data.limitPerTrs;
				$scope.UnionPayDayLimit = data.limitPerDay;
				$('#limit').show();
			}
		});
	};

	//获取验证码
	$scope.sendMsgCode = function() {
		//不上传手机号-----false
		$scope._pTokenName = "";
		$rootScope.getTokenJNRCB(false, "sms.RepayAuto.P");
	};
	//确认页面
	$scope.next = function() {
		if (!$scope._pTokenName) {
			$scope.AlertErr("请输入短信验证码");
			return;
		}
		//调密码控件
		$scope.callPassWdFn();
	};
	//调密码控件
	$scope.callPassWdFn = function() {
		$scope.trsPassword = "";
		$("#trsPwd").val("");
		$("#trsPwd").attr("sf_uuid", "");
		$scope.pwdbox = true;
	};
	//取消密码输入框
	$scope.closeBox = function() {
		$scope.pwdbox = false;
	};

	$scope.doIt1 = function(data1) {
		if (!$("#trsPwd").attr("sf_uuid")) {
			$rootScope.AlertErr("密码不能为空");
			return;
		}
		if ($("#trsPwd").val().length != 6) {
			$scope.pwdbox = false;
			$("#trsPwd").val("");
			$("#trsPwd").attr("sf_uuid", "");
			$rootScope.AlertErr("交易密码格式错误");
			return;
		}
		//关闭密码框
		$scope.pwdbox = false;
		$remote.post("GenToken.do", {}, function(data) {
			$scope._tokenName = data;
			var formData = {
				"CardNo" : $scope.AutoList.cardNo,
				"AcNo" : $scope.AcNo,
				"InnerFlag" : $scope.InnerFlag,
				"Type" : $scope.Type,
				"Amount" : $scope.TrsAmount,
				"TimerFreq" : $scope.AutoList.collPeriod,
				"TimerRule3" : $scope.AutoList.collTime,
				"TimerRule4" : $scope.AutoList.collTime,
				"_pTokenName" : $scope._pTokenName,
				"_tokenName" : $scope._tokenName,
				'_ChannelId' : "WAP",
				"EacctTrsPassword" : $scope.uuid = $("#trsPwd").attr("sf_uuid")
			};
			$remote.post("CardAgrToDepositCancel.do", formData, function(data2) {
				$scope._pTokenName = "";
				$targets("content", "#2");
			});
		});
	};
}]);
