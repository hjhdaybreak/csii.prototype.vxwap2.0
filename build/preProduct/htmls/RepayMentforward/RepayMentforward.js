/**
 *提前还款
 */
ibsapp.register.controller("RepayMentforwardCtrl", ["$targets", "$rootScope", "$state", "$stateParams", "$cookieService", '$scope', '$remote',
function($targets, $rootScope, $state, $stateParams, $cookieService, $scope, $remote) {
	//初始化函数
	$scope.init = function() {
		//强制实名认证
		var promise = $rootScope.forceRealNameAuthenticateFn();
		promise.then(function(promiseData) {
			//通过认证
			//我的页面--贷款传过来的具体条目进入提前还款页面
			if (sessionStorage.getItem("RepayDataString")) {
				$scope.RepayData = vx.fromJson(sessionStorage.getItem("RepayDataString"));
			}
			$scope.BusinessSum = '0';
			$scope.Interest = '0';
			$scope.EAcctBalQryFn();
		}, function(promiseData) {
			//未通过认证两种情况
			if (promiseData == "T") {
				//审核中
				$rootScope.ForceAuthText = "实名认证正在审核中，暂时无法进行提前还款！";
				$rootScope.ForceYesBtn = "立即查看";
				$("div#forceNeedAuto_id").show();
			}
			if (promiseData != "T" && promiseData != "N") {
				//需要认证
				$rootScope.ForceAuthText = "您未进行实名认证，暂时无法进行提前还款！";
				$rootScope.ForceYesBtn = "立即认证";
				$("div#forceNeedAuto_id").show();
			}
		});
	};
	//电子账户交易查询
	$scope.EAcctBalQryFn = function() {
		$remote.post("EAcctBalQry.do", {}, function(data) {
			$scope.EcacctAvailBal = data.AvailBal;
		});
	};
	//全部还款勾选选择
	$scope.selected = function() {
		var img = document.getElementById("selected");
		var path = img.src;
		var name = path.substring(path.lastIndexOf("/") + 1, path.length);
		if (name == "hnlc-selected1.png") {
			img.src = path.substring(0, path.lastIndexOf("/") + 1) + "hnlc-selected2.png";
			var Amount = $scope.RepayData.UnRepay;
			/* 	$scope.TrsAmount =Amount; */
			var formData = {
				"BdSerialNo" : $scope.RepayData.SerialNo,
				"PayType" : '01',
				"BussinessSum" : $scope.RepayData.UnRepay,
			};
			$remote.post("RepayTrialQry.do", formData, function(data) {
				$scope.BusinessSum = data.BusinessSum;
				$scope.Interest = data.Interest;
				$scope.TrsAmount = data.PayMoney;
			});

		} else if (name == "hnlc-selected2.png") {
			img.src = path.substring(0, path.lastIndexOf("/") + 1) + "hnlc-selected1.png";
			$scope.TrsAmount = "";
			$scope.BusinessSum = '0';
			$scope.Interest = '0';
		}
	};
	//贷款试算
	$scope.Trial = function() {
		var formData = {
			"BdSerialNo" : $scope.RepayData.SerialNo,
			"PayType" : '02',
			"BussinessSum" : $scope.TrsAmount,
		};
		$remote.post("RepayTrialQry.do", formData, function(data) {
			$scope.BusinessSum = data.BusinessSum;
			$scope.Interest = data.Interest;
		});
		if (name == "hnlc-selected2.png") {
			img.src = path.substring(0, path.lastIndexOf("/") + 1) + "hnlc-selected1.png";
		}
	};
	//首页下一步
	$scope.next = function() {
		var trsAmount = new Number($scope.TrsAmount);
		var EcacctAvailBal = new Number($scope.EcacctAvailBal);
		if (isNaN(trsAmount) || trsAmount == 0) {
			$scope.AlertErr("请输入有效金额");
			return;
		}
		if (trsAmount < 100) {
			$scope.AlertErr("还款金额必须大于100元");
			return;
		}
		if (trsAmount > EcacctAvailBal) {
			//打开温馨提示
			$scope.WenXinTiShiFlag = true;
			return;
		}
		var formData = {
			"BdSerialNo" : $scope.RepayData.SerialNo,
			"TrsAmount" : $scope.TrsAmount
		};
		$scope.formData = formData;

		$remote.post("RepayMentConfirm.do", formData, function(data2) {
			var Data = {
				"BdSerialNo" : $scope.RepayData.SerialNo,
				"PayType" : '02',
				"BussinessSum" : $scope.TrsAmount,
			};
			$remote.post("RepayTrialQry.do", Data, function(data) {
				$scope.BusinessSumConfirm = data.BusinessSum;
				$scope.InterestConfirm = data.Interest;
				$scope.PayMoney = data.PayMoney;
				var PayMoney = new Number($scope.PayMoney);
				if (trsAmount > PayMoney) {
					$scope.AlertErr("您输入的提前还款金额大于全部结清金额");
					return;
				} else {
					$targets("content", "#2");
				}
			});
		});
	};
	//获取验证码
	var tokenMessage = "sms.RepaymentNew.P";
	$scope.sendPhoneToken = function() {
		$scope._pTokenName = "";
		//不上传手机号-----false
		$rootScope.getTokenJNRCB(false, tokenMessage);
	};
	//确认页面
	$scope.doIt = function() {
		if (!$scope._pTokenName) {
			$scope.AlertErr("请输入验证码");
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
	//密码框确认按钮函数
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
		//取消密码输入框
		$scope.closeBox();
		$remote.post("GenToken.do", {}, function(data) {
			$scope._tokenName = data;
			var formData = $scope.formData;
			formData._tokenName = $scope._tokenName;
			formData._pTokenName = $scope._pTokenName;
			formData.TrsPassword = $scope.uuid = $("#trsPwd").attr("sf_uuid");
			formData._ChannelId = "WAP";
			$remote.post("RepayMent.do", formData, function(data2) {
				$targets("content", "#3");
				$scope._pTokenName = "";
			});
		});

	};
	//温馨提示点击取消按钮
	$scope.closeWenXinTiShiBox = function() {
		$scope.WenXinTiShiFlag = false;
	};
	//温馨提示点击确认按钮
	$scope.clickYes = function() {
		$scope.RepayTransfer = {
			'RepayAmount' : $scope.TrsAmount,
			'RepaymentType' : 'Repayment'//提前还款类型
		};
		$scope.$context.setNextScope({
			RepayTransfer : $scope.RepayTransfer
		}, "RepayTransfer");
		$scope.goto("appOther.RepayTransfer");
	};
	// 我的资产页面
	$scope.gotoAppMyFn = function() {
		$scope.goto('app.My');
	};
	//vpage返回函数
	$scope.vPageBackoneFn = function() {
		$scope.goto("#1");
	};
	$scope.vPageBacktwoFn = function() {
		$scope.goto("#2");
	};

}]);
