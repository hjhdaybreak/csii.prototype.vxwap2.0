/**
 *侧拉抽屉中的定期转入(删除)
 */
ibsapp.register.controller("RegularShiftTo_DeleteCtrl", ['$scope', '$remote', '$http', '$rootScope', '$stateParams',
function($scope, $remote, $http, $rootScope, $stateParams) {
	$scope.init = function() {//初始化
		//默认隐藏密码框
		$scope.submitPassInput = false;
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
		//RegularShiftTo交易带过来的
		$scope.getValueFromList = $scope.deleRow;
		$scope.cardName = $scope.getValueFromList.bankname;
		$scope.cardNo = $scope.getValueFromList.cardNo;
		$scope.amount = $scope.getValueFromList.amount;
		var collPeriod = $scope.getValueFromList.collPeriod;
		var collTime = $scope.getValueFromList.collTime;
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
	};

	$scope.doNext = function() {//弹出密码输入
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
		$("#pwdCommon").val("");
		$("#pwdCommon").attr("sf_uuid", "");
		$scope.pwdbox = true;
	};
	//取消密码输入框
	$scope.closeBox = function() {
		$scope.pwdbox = false;
	};
	$scope.submit = function() {//提交，跳到结果页
		//为了防止提交，先发交易获取一个标识码
		$remote.post("GenToken.do", {}, function(data) {
			//提交
			var params = {
				"CardNo" : $scope.cardNo,
				"AcNo" : $scope.getValueFromList.acNo,
				"InnerFlag" : $scope.getValueFromList.innerFlag,
				"Type" : $scope.getValueFromList.Type,
				"Amount" : $scope.amount,
				"TimerFreq" : $scope.getValueFromList.collPeriod,
				"TimerRule3" : $scope.getValueFromList.collTime,
				"TimerRule4" : $scope.getValueFromList.collTime,
				"_pTokenName" : $scope._pTokenName,
				"EacctTrsPassword" : $scope.trsPassword,
				"_tokenName" : data
			};
			$remote.post("CardAgrToDepositCancel.do", params, function(data) {
				$scope._pTokenName = "";
				$scope.goto("#2");
			});
		});
	};

	$scope.goRegularHome = function() {//返回定期转入首页
		$scope.goto("appOther.RegularShiftTo");
	};
	//确认输入密码
	$scope.okPassIn = function() {
		$scope.pwdCode = $scope.passwdIn;
		$scope.passwdIn = "";
		$scope.submitPassInput = false;
		$scope.submit();
		return;
	};
	//发送短信验证码
	$scope.sendMsgCode = function() {
		$scope._pTokenName = "";
		$scope.getTokenJNRCB(false, "sms.CardAgrToDeposit.P");
	};
}]);

