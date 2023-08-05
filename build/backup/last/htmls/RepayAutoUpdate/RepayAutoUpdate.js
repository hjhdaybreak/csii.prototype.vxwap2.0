/**
 *自动还款修改更新
 */
ibsapp.register.controller("RepayAutoUpdateCtrl", ['$q', "$state", "$stateParams", "$cookieService", '$rootScope', '$scope', '$remote', '$nativeCall', '$targets',
function($q, $state, $stateParams, $cookieService, $rootScope, $scope, $remote, $nativeCall, $targets) {
	var deferred = $q.defer();
	var promise = deferred.promise;
	$scope.init = function() {//初始化
		//做非强制实名认证
		$scope.unForceRealNameAuthenticateFn();
	};
	//做非强制实名认证
	$scope.unForceRealNameAuthenticateFn = function() {
		$remote.post("QryRealNameAuthResult.do", {}, function(data) {
			if (data.UploadIdentity == "T") {//审核中
				$scope.authText = "实名认证正在审核中，是否立即查看？";
				$scope.yesBtn = "确定";
				//$scope.hideNoBtn=true;
				$scope.needAuth = true;
				return;
			} else if (data.UploadIdentity != "T" && data.UploadIdentity != "N") {//需要审核
				$scope.authText = "您暂未进行实名认证，是否立即认证？";
				$scope.yesBtn = "立即认证";
				$scope.needAuth = true;
			} else {
				//通过认证
				deferred.resolve();
			}
		});

	};
	//是否去认证
	$scope.doAuth = function(type) {
		//F取消继续做交易
		if (type == "F") {
			deferred.resolve();
			$scope.needAuth = false;
		} else {
			//去认证或去查看
			deferred.reject();
			$scope.needAuth = false;
		}
	};
	promise.then(function() {
		//取消或认证通过
		$scope.transactionInitFn();
	}, function() {
		//去做认证或去做查看
		$scope.goto("appOther.NameAuth");
	});
	//交易初始化
	$scope.transactionInitFn = function() {
		//从自动还款维护传来的值
		//日期标志
		$scope.TimerRule4 = false;
		$scope.TimerRule3 = false;
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
			//$("#TimerRule4").show();
			$scope.TimerRule4 = true;
			$scope.Time2 = $scope.TimerRule4List[collTime - 1];
			$scope.Time1 = $scope.TimerRule3List[0];
		} else if (collPeriod == '2') {
			$scope.TimerRule3 = true;
			$scope.Time2 = $scope.TimerRule4List[0];
			if (collTime == "32") {
				$scope.Time1 = $scope.TimerRule3List[collTime - 4];
			} else {
				$scope.Time1 = $scope.TimerRule3List[collTime - 1];
			}
		} else {
			$scope.Time1 = $scope.TimerRule3List[0];
			$scope.Time2 = $scope.TimerRule4List[0];
		}

		$remote.post("CardAgrToDepositUpdateConfirm.do", {}, function(data1) {
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
	//查询余额
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
		if (!$scope.TrsAmount) {
			$scope.AlertErr("请输入有效金额");
			return;
		}
		if (isNaN($scope.TrsAmount) || $scope.TrsAmount <= 0) {
			$scope.AlertErr("请输入有效金额");
			return;
		}
		if (!$scope._pTokenName) {
			$scope.AlertErr("请输入短信验证码");
			return;
		}
		//调密码控件
		$scope.callPassWdFn();
	};
	//调密码控件
	$scope.callPassWdFn = function() {
		//弹出密码输入框
		$scope.trsPassword = "";
		$("#trsPwd").val("");
		$("#trsPwd").attr("sf_uuid", "");
		$scope.pwdbox = true;
	};
	//取消密码输入框
	$scope.closeBox = function() {
		$scope.pwdbox = false;
	};
	//提交
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
		//关闭短信验证码
		$scope.pwdbox = false;
		var innerFlag = $scope.InnerFlag;
		$remote.post("GenToken.do", {}, function(data) {
			$scope._tokenName = data;
			var formData = {
				"CardNo" : $scope.AutoList.cardNo,
				"AcNo" : $scope.AcNo,
				"InnerFlag" : innerFlag,
				"Type" : $scope.Type,
				"Amount" : $scope.TrsAmount,
				"TimerFreq" : $scope.TimerFreq.Value,
				"TimerRule3" : $scope.Time1.Value,
				"TimerRule4" : $scope.Time2.Value,
				"_pTokenName" : $scope._pTokenName,
				"_tokenName" : $scope._tokenName,
				'_ChannelId' : "WAP",
				"EacctTrsPassword" : $scope.uuid = $("#trsPwd").attr("sf_uuid")
			};
			$remote.post("CardAgrToDepositUpdate.do", formData, function(data2) {
				$scope._pTokenName = "";
				$targets("content", "#2");
			});
		});
	};
	//日期切换
	$scope.TimerFreqChange = function() {
		var TimerFreq = $scope.TimerFreq.Value;
		if (TimerFreq == '1') {
			$scope.Time2 = $scope.TimerRule4List[0];
			$scope.TimerRule4 = true;
			$scope.TimerRule3 = false;
		} else if (TimerFreq == '2') {
			$scope.Time1 = $scope.TimerRule3List[0];
			$scope.TimerRule4 = false;
			$scope.TimerRule3 = true;
		} else {
			$scope.TimerRule4 = false;
			$scope.TimerRule3 = false;
		}
	};
}]);
