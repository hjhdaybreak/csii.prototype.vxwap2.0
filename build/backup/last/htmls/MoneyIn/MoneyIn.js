/**
 *资金转入
 */
ibsapp.register.controller("MoneyInCtrl", ['$scope', '$remote', '$q',
function($scope, $remote, $q) {
	var deferred = $q.defer();
	var promise = deferred.promise;
	$scope.init = function() {
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
		$scope.QueryBoundCard();
	}, function() {
		//去做认证或去做查看
		$scope.goto("appOther.NameAuth");
	});
	//卡列表查询
	$scope.QueryBoundCard = function() {
		$remote.post("QueryBoundCard.do", {}, function(data) {//判断是否有绑定卡
			if (data.BoundCardList && data.BoundCardList.length == 0) {
				$scope.showFlag = true;
				$scope.disBtn = true;
			} else {
				$remote.post("TransferInPre.do", {}, function(data) {//预交易
					$scope.index = -1;
					$scope.EAcct = data.WX_EAcct;
					$scope.MobilePhone = data.WX_MobilePhone;
					$scope.Currency = data.WX_Currency;
					$scope.TransferLimit = data.TransferLimit;
					//查卡列表
					// $remote.post("QueryBoundCard.do", {}, function(data) {
					// 	$scope.BoundCard = data.BoundCard;
					// 	//绑定卡
					// 	$scope.PayCardList = data.PayCardList;
					// 	//支付卡列表
					// 	$scope.payerAcctQry($scope.BoundCard, -1);
					// 	$scope.tips = false;
					// });
				});
				$scope.BoundCard = data.BoundCard;
			    //绑定卡
			    $scope.PayCardList = data.PayCardList;
			    //支付卡列表
			    $scope.payerAcctQry($scope.BoundCard, -1);
			    $scope.tips = false;
			}

		});
	};
	/**关闭下载app弹框***/
	$scope.tip = function() {
		$scope.showFlag = false;
	};
	/***提示信息***/
	$scope.tipShow = function() {
		$scope.tips = !$scope.tips;
	};
	/***行内行外卡不同处理****/
	$scope.payerAcctQry = function(row, index) {//row 要查限额的记录
		$scope.index = index;
		$scope.currentCard = row;
		//当前选中卡
		
		$scope.innerFlag = row.innerFlag;
		//是否行内卡
		if (row.innerFlag == '1') {//行内卡
			$scope.amountPH = "请输入转入金额";
			$scope.acNoBalQry(row);
			//查可用余额
		} else if (row.innerFlag == '0') {//行外卡
			$scope.unionPayLimitQuery(row);
			//查限额
			$scope.CardMobilePhone = row.cardMobilePhone;
			//它行卡预留手机
			$scope.amountPH = "最低转入金额为" + $scope.TransferLimit + "元";
		}
	};
	/**行内卡查可用余额**/
	$scope.acNoBalQry = function(row) {
		
		var formData = {
			"EAcct" : row.no
		};
		$remote.post("TransferAcNoBalQry.do", formData, function(data) {
			$scope.AvailBal = data.AvailBal;
		});
	};
	/**行外卡查限额**/
	$scope.unionPayLimitQuery = function(row) {
		var formData = {
			"CardNo" : row.no
		};
		$remote.post("UnionPayLimitQuery.do", formData, function(data) {
			if (data.LimitFlag == 'N') {
				$scope.hideLimit = true;
			}
			if ('Y' == data.LimitFlag) {
				$scope.UnionPayLimit = data.limitPerTrs;
				$scope.UnionPayDayLimit = data.limitPerDay;
			}
		});
	};
	/***从卡列表选数据***/
	$scope.selectData = function(row) {
		$scope.BoundCard = row;
		$scope.payerAcctQry(row, -1);
		$scope.goto("#1");
	}
	/***反欺诈***/
	$scope.antiFraud = function() {
		if ($scope.amount == 0) {
			$scope.AlertErr('转入金额需大于0');
			return;
		}
		if ($scope.amount == 0) {
			$scope.AlertErr('转入金额需大于0');
			return;
		}
		if ($scope.innerFlag == 0) {//行外卡判断最小金额
			if ($scope.amount < $scope.TransferLimit) {
				$scope.AlertErr('您输入的金额不满足最低转入金额' + $scope.TransferLimit);
				return;
			}
		}
		var Data = {
			"AcctNo" : $scope.EAcct.Id,
			"CardNo" : $scope.currentCard.no,
			"CardName" : $scope.currentCard.name,
			"OpenBankId" : $scope.currentCard.openBankId,
			"TrsAmount" : $scope.amount,
			"TrsType" : 'In',
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
				$scope.realDoConf();
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

	$scope.realDoConf = function() {//录入到确认页
		var formData = {
			"PayerAccountNo" : $scope.currentCard.no,
			"PayerAccountName" : $scope.currentCard.name,
			"PayerAccountBankAcType" : $scope.currentCard.bankAcType,
			"PayerDeptName" : $scope.currentCard.openBankName,
			"PayerCurrencyCode" : $scope.Currency.Id,
			"PayerCurrencyCRFlag" : $scope.Currency.Type,
			"PayeeAccountNo" : $scope.EAcct.Id,
			"PayeeAccountName" : $scope.EAcct.Name,
			"PayeeAccountBankAcType" : $scope.EAcct.BankAcType,
			"TrsAmount" : $scope.amount,
			//"CardMobilePhone": $scope.CardMobilePhone,
			"AvailBal" : $scope.AvailBal,
			"UnionPayLimit" : $scope.UnionPayLimit,
			"UnionPayDayLimit" : $scope.UnionPayDayLimit
		};
		$remote.post("TransferInConfirm.do", formData, function(data) {
			//$scope.closeBox();
			$scope.confData = data;
			$scope.goto("#2");
		});
	}
	$scope.doConf = function() {
		
		$scope.closeBox();
		if ($scope.antiFraudPage == 1) {//录入到确认页
			$scope.realDoConf();
		} else {//确认到结果页
			$scope.doSub();
		}
	}
	//短信验证
	$scope.sendMsg = function(tokenMessage) {
		//hasMobile是否需要上送手机号
		var tokenIndexP = 1;
		var params = {
			"TokenMessage" : 'sms.TransferIn.P',
			"TokenIndex" : tokenIndexP,
			"AcNo" : $scope.confData.PayerAccount.no,
			"ChannelFlag" : "1"
		};
		$remote.post("AutoGenPhoneToken.do", params, function(data) {
			tokenIndexP++;
		}, function(data) {
			tokenIndexP++;
			// if (data.jsonError) {
			// $rootScope.AlertErr(jsonError[0]._exceptionMessage);
			// return;
			// }
		});
	};
	//确认页到结果页
	$scope.doIt = function() {
		//$scope.closePwd();
		//关闭密码输入弹框
		$scope.antiFraudPage = 2;
		//反欺诈页面
		var params = {
			"AcctNo" : $scope.EAcct.Id,
			"CardNo" : $scope.confData.PayerAccount.no,
			"CardName" : $scope.confData.PayerAccount.CardName,
			"OpenBankId" : $scope.confData.PayerAccount.OpenBankId,
			"TrsAmount" : $scope.confData.TrsAmount,
			"TrsType" : 'In',
			"AcctName" : $scope.EAcct.Name
		};
		$remote.post("TransferInList.do", params, function(data) {
			var PayerStatus = data.PayerStatus;
			var PayeeStatus = data.PayeeStatus;
			$scope.PayerStatus = data.PayerStatus;
			$scope.PayeeStatus = data.PayeeStatus;
			if (PayerStatus == 'D') {
				//$("#tranfInPreAlert").show();
				$scope.PayerAcNo = data.PayerAcNo;
				$scope.tranfInPreAlertSF = true;
			} else if (PayeeStatus == "D") {
				//$("#tranfInPreAlert2").show();
				$scope.PayeeAcNo = data.PayerAcNo;
				$scope.tranfInPreAlert2SF = true;
			} else {
				$scope.doSub();
			}
		});
	};
	//
	$scope.doSub = function() {
		
		var formData = {
			"PayerAccountNo" : $scope.confData.PayerAccount.no,
			"PayerAccountName" : $scope.confData.PayerAccount.name,
			"PayerAccountBankAcType" : $scope.confData.PayerAccount.bankAcType,
			"PayerDeptName" : $scope.confData.PayerAccount.openBankName,
			"PayerCurrencyCode" : $scope.Currency.Id,
			"PayerCurrencyCRFlag" : $scope.Currency.Type,
			"PayeeAccountNo" : $scope.EAcct.Id,
			"PayeeAccountName" : $scope.EAcct.Name,
			"PayeeAccountBankAcType" : $scope.EAcct.BankAcType,
			"TrsAmount" : $scope.confData.TrsAmount,
			//"CardMobilePhone": $scope.CardMobilePhone,
			"AvailBal" : $scope.AvailBal,
			"UnionPayLimit" : $scope.UnionPayLimit,
			"UnionPayDayLimit" : $scope.UnionPayDayLimit,
			"_pTokenName" : $scope._pTokenName,
			"TrsPassword" : ""
		};
		$remote.post("GenToken.do", {}, function(data) {
			formData._tokenName = data;
			$remote.post("TransferIn.do", formData, function(data2) {
				$scope.rstDate = data2;
				$scope._pTokenName = "";
				$scope.goto("#3")
			});
		});
	};
	//获取密码
	$scope.getPassword = function() {
		$scope.pwd = $scope.getPwd();
	}
	//返回第一页
	$scope.goFirstPage = function() {
		$scope.goto("#1");
		window.location.reload();
	}
}]);
