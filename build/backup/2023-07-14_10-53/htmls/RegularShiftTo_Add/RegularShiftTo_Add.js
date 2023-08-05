/**
 *侧拉抽屉中的定期转入(添加)
 */
ibsapp.register.controller("RegularShiftTo_AddCtrl", ['$q', '$scope', '$remote', '$http', '$rootScope', '$stateParams',
function($q, $scope, $remote, $http, $rootScope, $stateParams) {
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
		$scope.pwdbox = false;
		//日期选择器
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

		$scope.TimerFreq = $scope.TimerFreqList[0];
		$scope.Time1 = $scope.TimerRule3List[0];
		$scope.Time2 = $scope.TimerRule4List[0];

		//复选框默认加载不选中图标
		$scope.checkpic = "images/checked01.png";
		//密码弹出默认不显示
		$scope.submitPassInput = false;
		$scope.BoundCardshowFlag = false;
		//有无绑定卡信息提示框，默认隐藏
		$remote.post("QueryBoundCard.do", {}, function(data) {
			$scope.BoundCard = data.BoundCard;
			$scope.PayCardList = data.PayCardList;
			$scope.BoundCardList = data.BoundCardList;
			if ($scope.BoundCardList.length > 0) {
				//设置卡片信息和限制额度，查询是否需要显示协议
				$scope.searchBankCard();
				$("#RegularShiftTo_Add_id").attr("disabled", false);
				$("#RegularShiftTo_Add_Submmit_id").attr("disabled", false);
			} else {
				$scope.BoundCardshowFlag = true;
				$("#RegularShiftTo_Add_id").attr("disabled", true);
				$("#RegularShiftTo_Add_Submmit_id").attr("disabled", true);
			}
		});
	};
	//有无绑定卡信息提示框
	$scope.BoundCardshowtoggleFn = function() {
		$scope.BoundCardshowFlag = !$scope.BoundCardshowFlag;
	};
	$scope.searchBankCard = function() {
		//不存在，去查它的绑定银行卡
		$remote.post("CardAgrToDepositConfirm.do", {}, function(data) {
			$scope.AcNo = data.AcNo;
			$scope.bankCardName = data.WX_EAcct.BandAcList[0].openBankName;
			$scope.AcPhone = data.AcPhone;
			$scope.AcNoSeq = data.AcNoSeq;
			$scope.Bdstate = data.WX_EAcct.BandAcList[0].bdState;
			$scope.Phone = data.WX_EAcct.BandAcList[0].cardMobilePhone;
			$scope.CardNo = data.WX_EAcct.BandAcList[0].no;
			$scope.InnerFlag = data.WX_EAcct.BandAcList[0].innerFlag;
			$scope.Type = data.Type;
			$scope._AuthenticateType = data._AuthenticateType;
			//调用查询限制额度的方法
			$scope.searchAvailBal(data.WX_EAcct.BandAcList[0].innerFlag, data.WX_EAcct.BandAcList[0].no);
		});
	};
	/*
	 *根据查回的卡里的信息查询限制额度
	 *@param {String,String} [flag,targetCardNo]
	 *flag:为0表示外卡，为1表示内卡，外卡需要限制额度，内卡查看可用余额，为了方便，统一记录在availBalMoney中
	 *targetCardNo:卡日
	 */
	$scope.searchAvailBal = function(flag, targetCardNo) {
		//selFlag保存起来不是这里使用，是为了在其它需要知道是什么卡时使用，比如校验金额是否合法时
		$scope.selFlag = flag;
		switch(flag) {
			case "0": {//外卡
				$remote.post("UnionPayLimitQuery.do", {
					"CardNo" : targetCardNo
				}, function(data) {
					$scope.availBalMoney = data.limitPerTrs;
				});
				break;
			}
			case "1": {//内卡
				$remote.post("TransferAcNoBalQry.do", {
					"EAcct" : targetCardNo
				}, function(data) {
					$scope.availBalMoney = data.AvailBal;
				});
				break;
			}
			default:
				//如果不是外卡也不是内卡，是后台返回有误的可能很大，报错提示
				console.error("侧拉抽屉中的定期转入(添加)查询限制额度前感觉银行卡判断查询方式时，前一个交易没有返回正确的标志！！！");
		}
	};
	$scope.doNext = function() {//录入到结果页面，没有确认页面
		if (isNaN($scope.amount) || $scope.amount <= 0) {
			$scope.AlertErr("请输入有效金额");
			return;
		}
		if (!$scope._pTokenName) {
			$scope.AlertErr("请输入验证码!");
			return;
		}
		//提交前的一些校检
		if ("images/checked01.png" == $scope.checkpic) {//看是否同意了协议
			$scope.AlertErr("请先同意《定期转入服务协议》");
			return;
		}
		//检测设置转入金额是否合法
		// if ($scope.availBalMoney < $scope.amount) {
		// if ("0" == $scope.selFlag) {
		// $scope.AlertErr("超过限制额度");
		// return;
		// }
		// }
		//打开输入密码框
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
	//输入密码后，真正的提交
	$scope.submit = function() {
		//取消密码输入框
		$scope.closeBox();
		$remote.post("GenToken.do", {}, function(data) {
			//获取表示后提交
			var params = {
				"AcNo" : $scope.AcNo,
				"AcPhone" : $scope.AcPhone,
				"AcNoSeq" : $scope.AcNoSeq,
				"OpenBankName" : $scope.bankCardName,
				"Bdstate" : $scope.Bdstate,
				"Phone" : $scope.Phone,
				"CardNo" : $scope.CardNo,
				"InnerFlag" : $scope.InnerFlag,
				"Type" : $scope.Type,
				"Amount" : $scope.amount,
				"TimerFreq" : $scope.TimerFreq.Value, // 每日，每周，每月分别对应0,1,2
				"TimerRule3" : $scope.Time1.Value, // 如果TimerFreq为2，传01~28，对应1日到28日。最后一天传32；如果TimerFreq为其他，默认传01
				"TimerRule4" : $scope.Time2.Value, //如果TimerFreq为1，传1~7，对应周一到周日。如果TimerFreq为其他。默认传1
				"_pTokenName" : $scope._pTokenName, //短信验证码
				"EacctTrsPassword" : $scope.trsPassword, //密码
				"BankId" : "9999",
				"LoginType" : "P",
				"_tokenName" : data
			};
			$remote.post("CardAgrToDeposit.do", params, function(data1) {
				$scope._pTokenName = "";
				$scope.goto("#2");
			});
		});
	};
	//转入日期切换
	$scope.TimerFreqChange = function() {
		var TimerFreq = $scope.TimerFreq.Value;
		if (TimerFreq == '1') {
			$scope.Time2 = $scope.TimerRule4List[0];
			$("#TimerRule4").show();
			$("#TimerRule3").hide();
		} else if (TimerFreq == '2') {
			$scope.Time1 = $scope.TimerRule3List[0];
			$("#TimerRule3").show();
			$("#TimerRule4").hide();
		} else {
			$("#TimerRule3").hide();
			$("#TimerRule4").hide();
		}
	};
	//选择卡号
	$scope.select = function() {
		$scope.goto("#4");
	};
	//选中某一卡号返回前一页面
	$scope.returnData = function(row) {
		if (vx.isEmpty(row)) {
			//如果你选择了卡片，选择卡片后执行这里
			$scope.CardNo = $scope.BoundCard.no;
			$scope.InnerFlag = $scope.BoundCard.innerFlag;
			$scope.bankCardName = $scope.BoundCard.openBankName;
			$scope.Bdstate = $scope.BoundCard.bdState;
			$scope.Phone = $scope.BoundCard.cardMobilePhone;
			$scope.bankAcType = $scope.BoundCard.bankAcType;
			//2.请求的数据
			$remote.post("CardAgrToDepositConfirm.do", {}, function(data) {
				$scope.AcNo = data.AcNo;
				$scope.AcPhone = data.AcPhone;
				$scope.Type = data.Type;
				$scope.AcNoSeq = data.AcNoSeq;
				$scope._AuthenticateType = data._AuthenticateType;
				//调用查询限制额度的方法
				$scope.searchAvailBal($scope.InnerFlag, $scope.CardNo);
				$scope.goto("#1");
			});
		} else {
			//如果你选择了卡片，选择卡片后执行这里
			$scope.CardNo = row.no;
			$scope.InnerFlag = row.innerFlag;
			$scope.bankCardName = row.openBankName;
			$scope.Bdstate = row.bdState;
			$scope.Phone = row.cardMobilePhone;
			$scope.bankAcType = row.bankAcType;
			//2.请求的数据
			$remote.post("CardAgrToDepositConfirm.do", {}, function(data) {
				$scope.AcNo = data.AcNo;
				$scope.AcPhone = data.AcPhone;
				$scope.Type = data.Type;
				$scope.AcNoSeq = data.AcNoSeq;
				$scope._AuthenticateType = data._AuthenticateType;
				console.log("限额账户：" + data.WX_EAcct.BandAcList[0].no);
				//调用查询限制额度的方法
				$scope.searchAvailBal($scope.InnerFlag, $scope.CardNo);
				$scope.goto("#1");
			});
		}

	};
	//发送短信验证码
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
	$scope.goRegularHome = function() {//返回定期转入首页
		$scope.goto("appOther.RegularShiftTo");
	};
}]);
