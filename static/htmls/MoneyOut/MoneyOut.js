/**
 *资金转出
 */
ibsapp.register.controller("MoneyOutCtrl", ['$scope', '$remote', '$rootScope',
function($scope, $remote, $rootScope) {
	//初始化函数
	$scope.init = function() {
		//强制实名认证
		var promise = $rootScope.forceRealNameAuthenticateFn();
		promise.then(function(promiseData) {
			//通过认证
			//卡列表查询
			$scope.QueryBoundCardFn();
		}, function(promiseData) {
			//未通过认证两种情况
			if (promiseData == "T") {
				//审核中
				$rootScope.ForceAuthText = "实名认证正在审核中，暂时无法进行资金转出！";
				$rootScope.ForceYesBtn = "立即查看";
				$("div#forceNeedAuto_id").show();
			}
			if (promiseData != "T" && promiseData != "N") {
				//需要认证
				$rootScope.ForceAuthText = "您未进行实名认证，暂时无法进行资金转出！";
				$rootScope.ForceYesBtn = "立即认证";
				$("div#forceNeedAuto_id").show();
			}
		});
	};
	//卡列表查询
	$scope.QueryBoundCardFn = function() {
		$remote.post("QueryBoundCard.do", {}, function(data1) {
			if (data1.BoundCardList[0]) {
				$remote.post("TransferOutPre.do", {}, function(data) {
					$scope.EAcct = data.WX_EAcct;
					$scope.CardMobilePhone = data.CardMobilePhone;
					if (data.BoundCardList.length > 2) {
						$scope.PayeeAccount = data.BoundCardList;
						$scope.selectAccount = data.BoundCardList[0];
						$scope.queryLimitAmount($scope.selectAccount.no);
					} else {
						$scope.PayeeAccount = data.BoundCardList;
						$scope.select($scope.PayeeAccount[0].no, 0);
					};
				});
			} else {
				$scope.bangding = true;
				return;
			}
		});
	};
	//选择银行卡
	$scope.select = function(mesg, index) {
		var str = "#a" + mesg;
		setTimeout(function() {
			$(".fkcard").removeClass('card_cur');
			$(str).toggleClass('card_cur');
		}, 200);
		$scope.index = index;
		$scope.selectAccount = $scope.PayeeAccount[index];
		$scope.queryLimitAmount(mesg);
	};
	$scope.select1 = function(mesg) {
		var str = "#a" + mesg;
		setTimeout(function() {
			$(".fkcard").removeClass('card_cur');
			$(str).toggleClass('card_cur');
		}, 200);
		$scope.queryLimitAmount(mesg);
	};
	$scope.select2 = function(mesg, index) {
		$scope.goto("#1");
		var str = "#b" + mesg;
		setTimeout(function() {
			$(".fkcard").removeClass('card_cur');
			$(str).toggleClass('card_cur');
		}, 200);
		$scope.index = index;
		$scope.selectAccount = $scope.PayeeAccount[index]
		$scope.queryLimitAmount(mesg);
	};

	/***提示信息***/
	$scope.tipShow = function() {
		$scope.tips = !$scope.tips;
	}
	//验证码
	$scope.sendMsg = function() {
		var tokenIndexP = 1;
		var tokenMessage = "sms.TransferOut.P";
		$rootScope.getTokenJNRCB(false, tokenMessage);
	}
	$scope.buyAll = function() {
		$scope.amount = $scope.LimitAmount;
		$scope.bottonflag = 1;
	};
	$scope.buycancel = function() {
		$scope.amount = '';
		$scope.bottonflag = 2;
	};
	//查询卡的限额
	$scope.queryLimitAmount = function(acNo) {
		var formData = {
			"PayeeAccountNo" : acNo
		};
		$remote.post("QueryLimitAmount.do", formData, function(data) {
			if (data.AvailBal > data.LimitAmount) {
				$scope.LimitAmount = data.LimitAmount;
			} else {
				$scope.LimitAmount = data.AvailBal;
			}
		});
	};
	/***反欺诈***/
	$scope.antiFraud = function() {
		if (!$scope.selectAccount) {
			$scope.AlertErr("请选择卡号");
			return;
		};
		if ($scope.amount == 0) {
			$scope.AlertErr("[转出金额]转出金额需大于0");
			return;
		}
		var Data = {
			"AcctNo" : $scope.EAcct.Id,
			"CardNo" : $scope.selectAccount.no,
			"CardName" : $scope.selectAccount.name,
			"OpenBankId" : $scope.selectAccount.openBankId,
			"TrsAmount" : $scope.amount,
			"TrsType" : 'Out',
			"AcctName" : $scope.EAcct.Name
		};
		$scope.antiFraudPage = 1;
		//反欺诈页面
		$remote.post("TransferInList.do", Data, function(data) {
			var PayerStatus = data.PayerStatus;
			var PayeeStatus = data.PayeeStatus;
			$scope.PayerStatus = data.PayerStatus;
			$scope.PayeeStatus = data.PayeeStatus;
			//
			$scope.PayerAcNo = data.PayerAcNo;
			//尾号
			$scope.PayeeAcNo = data.PayeeAcNo;
			//尾号
			
			if (PayerStatus == 'D') {
				//$("#tranfInPreAlert").show();
				$scope.tranfInPreAlertSF = true;
			} else if (PayeeStatus == "D") {
				//$("#tranfInPreAlert2").show();
				$scope.tranfInPreAlert2SF = true;
			} else {
				$scope.doNext();
			}
		});
	}
	/**反欺诈提示2***/
	$scope.tranfInPreAlert2Show = function() {
		$scope.tranfInPreAlertSF = false;
		if ($scope.PayeeStatus == "D") {
			$scope.tranfInPreAlert2SF = true;
		} else {

		}
	}
	/***关闭反欺诈提示页面***/
	$scope.closeBox = function(type) {
		if (type == "box1") {
			$scope.tranfInPreAlertSF = false;
		} else if (type == "box2") {
			$scope.tranfInPreAlert2SF = false;
		} else {
			$scope.tranfInPreAlertSF = false;
			$scope.tranfInPreAlert2SF = false;
		}
	}
	/*下一步*/
	$scope.doNext = function() {
		var formData = {
			"PayeeAccountNo" : $scope.selectAccount.no,
			"InnerFlag" : $scope.selectAccount.innerFlag,
			"PayeeBankId" : $scope.selectAccount.openBankId,
			"PayeeBankName" : $scope.selectAccount.openBankName,
			"TrsAmount" : $scope.amount,
			"LimitAmount" : $scope.LimitAmount
		};

		$scope.formData = formData;
		$remote.post("TransferOutConfirm.do", formData, function(data) {
			$scope._pTokenName = "";
			$remote.post("GenToken.do", {}, function(data) {
				$scope._tokenName = data;
			});
			$scope.closeBox();
			$scope.goto("#2");
		});
	}
	//防重码
	var tokenIndexP = 1;
	var tokenMessage = "sms.TransferOut.P";
	$scope.sendPhoneToken = function(id) {
		setTimeout(function() {
			$scope.getTokenJNRCB(id, tokenMessage, $scope.MobilePhone, tokenIndexP);
		}, 100);
	};
	//确认交易
	$scope.confirm = function() {
		$scope.alertPwdDiv();

	}
	/*密码框*/
	$scope.doIt = function(data1) {
		var formData = $scope.formData;
		formData._pTokenName = $scope._pTokenName;
		formData.EacctTrsPassword = $scope.getPwd();
		formData._tokenName = $scope._tokenName;
		$remote.post("GenToken.do", {}, function(data) {
			formData._tokenName = data;
			$remote.post("TransferOut.do", formData, function(data2) {
				$scope.rstDate = data2;
				$scope._pTokenName = "";
				$scope.goto("#3")
			});
		});
		// $remote.post("TransferOut.do", formData, function(data2) {
		//     $scope.goto("#3");
		//     // NativeCall.isReload = true;
		//     // $scope._pTokenName = "";
		//     // if ($rootScope.timer != null) {
		//     //     window.clearTimeout($rootScope.timer);
		//     //     $rootScope.timerFlag = false;
		//     //     $("#content").find("#smsSend").removeAttr("disabled").css("cursor", "pointer");
		//     //     $("#content").find("#smsSend").val("获取验证码");
		//     // }
		// });

	}
	//返回我的资产
	$scope.goMyWDZC = function() {
		$scope.goto('app.My')
	}
	//在做一笔交易
	$scope.doMoreOne = function() {
		$scope.goto('#1')
		window.location.reload();
	}
	$scope.cancel = function() {
		$scope.goback();
	}
}]);
