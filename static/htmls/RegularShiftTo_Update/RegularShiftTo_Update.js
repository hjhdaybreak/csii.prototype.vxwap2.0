/**
 *侧拉抽屉中的定期转入(修改)
 */
ibsapp.register.controller("RegularShiftTo_UpdateCtrl", ['$q', '$scope', '$remote', '$rootScope', '$http', '$stateParams',
function($q, $scope, $remote, $rootScope, $http, $stateParams) {
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
		//日期标志
		$scope.TimerRule4 = false;
		$scope.TimerRule3 = false;
		//日期初始化
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
		//复选框默认加载不选中图标
		$scope.checkpic = "images/checked01.png";
		$scope.submitPassInput = false;
		//获取从列表页面带过来的数据
		$scope.getValueFromList = $scope.updRow;
		//RegularShiftTo交易带过来的;
		$scope.bankCardName = $scope.getValueFromList.bankname;
		$scope.CardNo = $scope.getValueFromList.cardNo;
		$scope.amount = $scope.getValueFromList.amount;
		$scope.innerFlag = $scope.getValueFromList.innerFlag;
		$scope.Type = $scope.getValueFromList.Type;
		$scope.AcNo = $scope.getValueFromList.acNo;
		$scope.Bdstate = $scope.getValueFromList.bdstate;
		$scope.searchAvailBal($scope.innerFlag, $scope.CardNo);
		//设置卡片信息和限制额度
		var collPeriod = $scope.getValueFromList.collPeriod;
		var collTime = $scope.getValueFromList.collTime;
		$scope.TimerFreq = $scope.TimerFreqList[collPeriod];
		if (collPeriod == '1') {
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
	};
	//根据查回的卡里的信息查询限制额度
	$scope.searchAvailBal = function(flag, targetCardNo) {
		$scope.selFlag = flag;
		switch(flag) {
			case "0": {
				$remote.post("UnionPayLimitQuery.do", {
					"CardNo" : targetCardNo
				}, function(data) {
					$scope.availBalMoney = data.limitPerTrs;
				});
				break;
			}
			case "1": {
				$remote.post("TransferAcNoBalQry.do", {
					"EAcct" : targetCardNo
				}, function(data) {
					$scope.availBalMoney = data.AvailBal;
				});
				break;
			}
			default:
				console.error("侧拉抽屉中的定期转入(修改)查询限制额度前感觉银行卡判断查询方式时，前一个交易没有返回正确的标志！！！");
		}
	};
	//转入日期切换
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
	//下一步
	$scope.doNext = function() {
		if (isNaN($scope.amount) || $scope.amount <= 0) {
			$scope.AlertErr("请输入有效金额");
			return;
		}
		if (!$scope._pTokenName) {
			$scope.AlertErr("请输入验证码!");
			return;
		}
		//提交前的一些校检
		// if ("images/checked01.png" == $scope.checkpic) {//看是否同意了协议
		// $scope.AlertErr("请先同意《定期转入服务协议》");
		// return;
		// }
		// if ($scope.availBalMoney < $scope.amount) {
		// if ("0" == $scope.selFlag) {
		// $scope.AlertErr("超过限制额度");
		// } else {
		// $scope.AlertErr("可用余额不足");
		// }
		// return;
		// }
		//调密码控件
		$scope.callPassWdFn();
	};
	//调密码控件
	$scope.callPassWdFn = function() {
		//弹出密码输入框
		$scope.trsPassword = "";
		$("#pwdCommon").val("");
		$("#pwdCommon").attr("sf_uuid", "");
		$scope.pwdbox = true;
	};
	//取消密码输入框
	$scope.closeBox = function() {
		$scope.pwdbox = false;
	};
	$scope.submit = function() {//提交，跳到结果页
		//取消密码输入框
		$scope.closeBox();
		//为了防止重复提交，先发交易获取一个标识码
		$remote.post("GenToken.do", {}, function(data) {
			//获取表示后提交
			var params = {
				"CardNo" : $scope.CardNo,
				"AcNo" : $scope.AcNo,
				"InnerFlag" : $scope.innerFlag,
				"Type" : $scope.Type,
				"Amount" : $scope.amount,
				"TimerFreq" : $scope.TimerFreq.Value,
				"TimerRule3" : $scope.Time1.Value,
				"TimerRule4" : $scope.Time2.Value,
				"_pTokenName" : $scope._pTokenName,
				"EacctTrsPassword" : $scope.trsPassword,
				"_tokenName" : data
			};
			$remote.post("CardAgrToDepositUpdate.do", params, function(data) {
				$scope._pTokenName = "";
				$scope.goto("#2");
			});
		});
	};
	$scope.goRegularHome = function() {//返回定期转入首页
		$scope.goto("appOther.RegularShiftTo");
	};
	//短信验证码
	$scope.sendMsgCode = function() {
		$scope._pTokenName = "";
		var tokenIndexP = 1;
		var params = {
			"TokenMessage" : 'sms.CardAgrToDeposit.P',
			"TokenIndex" : tokenIndexP,
			"AcNo" : $scope.CardNo,
			"ChannelFlag" : "1"
		};
		$remote.post("AutoGenPhoneToken.do", params, function(data) {
			tokenIndexP++;
		}, function(data) {
			tokenIndexP++;
		});
	};
	//复选框状态切换
	$scope.doCheck = function() {
		if ($scope.checkpic == "images/checked01.png") {
			$scope.checkpic = "images/checked02.png";
			return;
		}
		$scope.checkpic = "images/checked01.png";
	};
}]);
