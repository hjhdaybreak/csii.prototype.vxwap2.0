/**
 *按期还款
 */
ibsapp.register.controller("RepayTransferCtrl", ["$state", "$stateParams", "$cookieService", '$rootScope', '$scope', '$remote', '$nativeCall', '$targets',
function($state, $stateParams, $cookieService, $rootScope, $scope, $remote, $nativeCall, $targets) {
	//初始化方法
	$scope.init = function() {
		//我的页面--贷款传过来的具体条目进入详情页面
		if (sessionStorage.getItem("RepayDataString")) {
			$scope.RepayData = vx.fromJson(sessionStorage.getItem("RepayDataString"));
		}
		//获取公共余额数据
		if (sessionStorage.getItem("EcacctAvailBalString")) {
			$scope.EcacctAvailBal = vx.fromJson(sessionStorage.getItem("EcacctAvailBalString"));
		}
		//获取日期
		if (sessionStorage.getItem("PlanDateString")) {
			$scope.PlanDate = vx.fromJson(sessionStorage.getItem("PlanDateString"));
		}
		//获取   进入按期还款页面的类型
		$scope.Repayment = $scope.RepayTransfer.RepaymentType;
		$scope.RepayAmount = $scope.RepayTransfer.RepayAmount;
		var type = $scope.Repayment;
		if (type == 'Repayment') {
			$scope.RepayAmountflag = true;
			$scope.CurrentRepayflag = false;
		} else {
			$scope.RepayAmountflag = false;
			$scope.CurrentRepayflag = true;
			var CurrentRepay = new Number($scope.RepayData.CurrentRepay);
			var EcacctAvailBal = new Number($scope.EcacctAvailBal);
			var difference = (CurrentRepay - EcacctAvailBal).toFixed(2);
			if (difference > 0) {
				// 同时显示提示
				$scope.difference = difference;
			}
		}
		$remote.post("TransferInPre.do", {}, function(data) {
			$scope.EAcct = data.WX_EAcct;
			$scope.MobilePhone = data.WX_MobilePhone;
			$scope.Currency = data.WX_Currency;
			$scope.TransferLimit = data.TransferLimit;
			$scope.PayerAccountList = data.WX_EAcct.BandAcList;
			$scope.PayerAccount = $scope.PayerAccountList[0];
			$scope.CardMobilePhone = $scope.PayerAccount.cardMobilePhone;
			if ($scope.CardMobilePhone == null) {
				$scope.CardMobilePhone = "";
			}
			$scope.payerAcctQry();
		});
	};
	//账户信息查询
	$scope.payerAcctQry = function() {
		if ($scope.PayerAccount.innerFlag == '1') {
			$scope.acNoBalQry();
		} else if ($scope.PayerAccount.innerFlag == '0') {
			$scope.unionPayLimitQuery();
		}
	};
	//余额查询
	$scope.acNoBalQry = function() {
		$scope.limitflag = false;
		$('#cardMobilePhone').hide();
		$('#TrsAmount').attr("placeholder", "请输入转入金额");
		var formData = {
			"EAcct" : $scope.PayerAccount.no
		};
		$remote.post("TransferAcNoBalQry.do", formData, function(data) {
			$scope.AvailBal = data.AvailBal;
			$scope.availbalflag = true;
		});
	};
	//限额查询
	$scope.unionPayLimitQuery = function() {
		$scope.availbalflag = false;
		$('#TrsAmount').attr("placeholder", "最低转入金额为" + $scope.TransferLimit + "元");
		$('#cardMobilePhone').show();
		var formData = {
			"CardNo" : $scope.PayerAccount.no
		};
		$remote.post("UnionPayLimitQuery.do", formData, function(data) {
			if ('Y' == data.LimitFlag) {
				$scope.UnionPayLimit = data.limitPerTrs;
				$scope.UnionPayDayLimit = data.limitPerDay;
				$scope.limitflag = true;
			}
		});
	};
	//转账限额
	$scope.transferLimit = function() {
		if ($scope.PayerAccount.innerFlag != '1') {
			if ($scope.TransferLimit != undefined) {
				var trsAmount = new Number($scope.TrsAmount);
				if (trsAmount < $scope.TransferLimit) {
					$scope.AlertErr("您输入的金额不满足最低转入金额" + $scope.TransferLimit);
					return false;
				} else {
					return true;
				}
			}
		}
	};
	//选择卡号
	$scope.select = function() {
		$scope.goto("#4");
	};
	// 选择卡
	$scope.changePayerAcct = function(index) {
		$scope.PayerAccount = $scope.PayerAccountList[index];
		$scope.CardMobilePhone = $scope.PayerAccount.cardMobilePhone;
		$scope.goto("#1");
		$scope.TrsAmount = "";
		$scope.payerAcctQry();
	};
	//下一步函数
	$scope.next = function() {
		var trsAmount = new Number($scope.TrsAmount);
		if (isNaN(trsAmount) || trsAmount == 0) {
			$scope.AlertErr("请输入有效金额");
			return;
		}
		var type = $scope.Repayment;
		if (type != 'Repayment') {
			var difference = $scope.difference;
			if (trsAmount < difference) {
				$scope.AlertErr("为确保足额还款，请输入正确金额");
				return;
			}
		}
		var availBal = $scope.AvailBal;
		//可用余额
		if ("1" == $scope.PayerAccount.innerFlag) {

			if (trsAmount > availBal) {
				$scope.AlertErr("可用余额不足");
				return;
			}
		} else {
			if (!$scope.transferLimit()) {
				return;
			}
			var phone = $scope.CardMobilePhone;
			if (phone == null || phone == '') {
				$scope.AlertErr("请输入银行卡的预留手机号");
				return;
			}
			var phoneReg = RegExp(/^[1]{1,1}[0-9]{10,10}$/);
			if (!phoneReg.test(phone)) {
				$scope.AlertErr("手机号码格式不正确");
				return;
			}
		}

		//反欺诈需要的字段
		var Data = {
			"AcctNo" : $scope.EAcct.Id,
			"CardNo" : $scope.PayerAccount.no,
			"CardName" : $scope.PayerAccount.name,
			"OpenBankId" : $scope.PayerAccount.openBankId,
			"TrsAmount" : $scope.TrsAmount,
			"TrsType" : 'In',
			"AcctName" : $scope.EAcct.Name
		};
		$remote.post("TransferInList.do", Data, function(data) {
			var result = vx.fromJson(data);
			var PayerStatus = result.PayerStatus;
			var PayeeStatus = result.PayeeStatus;
			$scope.PayeeStatus = PayeeStatus;
			$scope.PayerAcNo = result.PayerAcNo;
			$scope.PayeeAcNo = result.PayeeAcNo;
			if (PayerStatus == 'D') {
				$scope.cardNo = $scope.PayerAcNo;
				$scope.yes = true;
				$scope.yes1 = false;
				$scope.yes2 = false;
				$scope.yes3 = false;
				$scope.WenXinTiShiFlag = true;
			} else if (PayeeStatus == "D") {
				$scope.cardNo = $scope.PayeeAcNo;
				$scope.yes = false;
				$scope.yes1 = true;
				$scope.yes2 = false;
				$scope.yes3 = false;
				$scope.WenXinTiShiFlag = true;
			} else {
				$scope.goLast();
			}
		});
	};
	//取消温馨提示按钮
	$scope.closeWenXinTiShiBox = function() {
		$scope.WenXinTiShiFlag = true;
	};
	//温馨提示弹框上按钮
	$scope.clickYes = function() {
		var type = $scope.PayeeStatus;
		if (type == 'D') {
			$scope.cardNo = $scope.PayeeAcNo;
			$scope.yes = false;
			$scope.yes1 = true;
			$scope.WenXinTiShiFlag = true;
		} else {
			$scope.goLast();
		}

	};
	//温馨提示弹框上按钮
	$scope.goLast = function() {
		//资金转入需要的字段
		$scope.WenXinTiShiFlag = false;
		var formData = {
			"PayerAccountNo" : $scope.PayerAccount.no,
			"PayerAccountName" : $scope.PayerAccount.name,
			"PayerAccountBankAcType" : $scope.PayerAccount.bankAcType,
			"PayerDeptName" : $scope.PayerAccount.openBankName,
			"PayerCurrencyCode" : $scope.Currency.Id,
			"PayerCurrencyCRFlag" : $scope.Currency.Type,
			"PayeeAccountNo" : $scope.EAcct.Id,
			"PayeeAccountName" : $scope.EAcct.Name,
			"PayeeAccountBankAcType" : $scope.EAcct.BankAcType,
			"TrsAmount" : $scope.TrsAmount,
			"CardMobilePhone" : $scope.CardMobilePhone,
			"AvailBal" : $scope.AvailBal,
			"UnionPayLimit" : $scope.UnionPayLimit,
			"UnionPayDayLimit" : $scope.UnionPayDayLimit
		};
		$scope.formData = formData;
		$remote.post("TransferInConfirm.do", $scope.formData, function(data) {
			$targets("content", "#2");
			$scope._pTokenName = "";
			var type = $scope.Repayment;
			if (type == 'Repayment') {
				$scope.CurrentRepayConfirm = false;
				$scope.RepayAmountConfirm = true;
			} else {
				$scope.CurrentRepayConfirm = true;
				$scope.RepayAmountConfirm = false;
			}
		});
	};
	//获取验证码
	var tokenMessage = "sms.TransferIn.P";
	$scope.sendPhoneToken = function() {
		//不上传手机号-----false
		$scope._pTokenName = "";
		$rootScope.getTokenJNRCB(false, tokenMessage);
	};
	//按期还款确认页按钮
	$scope.doIt = function() {
		if ($scope._pTokenName == undefined || $scope._pTokenName == '') {
			$scope.AlertErr("请输入验证码");
			return;
		}
		//反欺诈需要的字段
		var Data = {
			"AcctNo" : $scope.EAcct.Id,
			"CardNo" : $scope.PayerAccount.no,
			"CardName" : $scope.PayerAccount.name,
			"OpenBankId" : $scope.PayerAccount.openBankId,
			"TrsAmount" : $scope.TrsAmount,
			"TrsType" : 'In',
			"AcctName" : $scope.EAcct.Name
		};
		$remote.post("TransferInList.do", Data, function(data) {
			var result = vx.fromJson(data);
			var PayerStatus = result.PayerStatus;
			var PayeeStatus = result.PayeeStatus;
			$scope.PayeeStatus = PayeeStatus;
			$scope.PayerAcNo = result.PayerAcNo;
			$scope.PayeeAcNo = result.PayeeAcNo;
			if (PayerStatus == 'D') {
				$scope.cardNo = $scope.PayerAcNo;
				$scope.yes = false;
				$scope.yes1 = false;
				$scope.yes2 = true;
				$scope.yes3 = false;
				$scope.WenXinTiShiFlag = true;
			} else if (PayeeStatus == "D") {
				$scope.cardNo = $scope.PayeeAcNo;
				$scope.yes = false;
				$scope.yes1 = false;
				$scope.yes2 = false;
				$scope.yes3 = true;
				$scope.WenXinTiShiFlag = true;
			} else {
				$scope.goLast2();
			}
		});
	};
	//温馨提示弹框上按钮
	$scope.clickYes2 = function() {
		var type = $scope.PayeeStatus;
		if (type == 'D') {
			$scope.cardNo = $scope.PayeeAcNo;
			$scope.yes2 = false;
			$scope.yes3 = true;
			$scope.WenXinTiShiFlag = true;
		} else {
			$scope.goLast2();
		}
	};
	//温馨提示弹框上按钮
	$scope.goLast2 = function() {
		$scope.WenXinTiShiFlag = false;
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
		$scope.pwdbox = false;
		$remote.post("GenToken.do", {}, function(data) {
			$scope._tokenName = data;
			var formData = $scope.formData;
			formData._ChannelId = "WAP";
			formData.TrsPassword = $scope.uuid = $("#trsPwd").attr("sf_uuid");
			formData._tokenName = $scope._tokenName;
			formData._pTokenName = $scope._pTokenName;
			$remote.post("TransferIn.do", formData, function(data2) {
				$targets("content", "#3");
				var type = $scope.Repayment;
				if (type == 'Repayment') {
					$scope.ok = false;
					$scope.next = true;
					$scope.Info = false;
					$scope.CurrentRepayResult = false;
				} else {
					$scope.ok = true;
					$scope.next = false;
					$scope.Info = true;
					$scope.CurrentRepayResult = true;
				}
				//$scope.$root.Repayment = '';
				$remote.post("EAcctBalQry.do", {}, function(data) {
					$scope.NewAvailBal = data.AvailBal;
				});
				//清空短信验证码
				$scope._pTokenName = "";
			});
		});
	};
	//页面左上角返回
	$scope.vPageBackoneFn = function() {
		$scope.goto("#1");
	};
	//返回到贷款详情
	$scope.goloanDetail = function() {
		$scope.goto("appOther.LoanDetail");
	};
	//去提前还款
	$scope.goRepayMentforward = function() {
		$scope.goto("appOther.RepayMentforward");
	};
	//本期应还温馨提示打开
	$scope.OpenBenQiHKWEnXinTiShiFn = function() {
		$("div#RepayTransferBenQiWenXinTiShi_id").toggle();
	};
	//本期应还温馨提示打开
	$scope.CloseBenQiHKWEnXinTiShiFn = function() {
		$("div#RepayTransferBenQiWenXinTiShi_id").toggle();
	};
}]);
