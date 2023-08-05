/**
 *加油卡充值
 */
ibsapp.register.controller("GasCardChargeCtrl", ['$rootScope','$scope', '$remote', '$timeout', '$dateUtil', '$scrollPage', '$stateParams', '$http',
function($rootScope,$scope, $remote, $timeout, DateUtil, $scrollPage, $stateParams, $http) {
	//返回前一页面
	$scope.backPrePageFn = function() {
		$scope.prePageUrl = sessionStorage.getItem("preGasCardChargePageUrl");
		if ($scope.prePageUrl) {
			$scope.goto($scope.prePageUrl);
		} else {
			$scope.goto('app.Main');
		};
	};
	$scope.init = function() {
		//如果缴费记录存在
		if ($scope.GasRecordData) {
			$scope.GasCardNo = $scope.GasRecordData.BILLKEY;
		}
		$scope.tabFlag = 1;
		//用这个来记录中石油还是中石化，默认为1代表中石化
		$scope.currentIndex = -1;
		//使用这个来记录选择的套餐编号，默认为-1，表示没有选择任何套餐
		$scope.clickAble = false;
		//套餐选择按钮，为FALSE时的套餐选项不可选，由于业务修改，此时没有什么意义，忽略
		$scope.submitPassInput = false;
		//开始隐藏密码输入框，确认页提交会弹出密码输入框
		$scope.popup_text = "null";
		//默认提示框不显示
		//强制实名认证
		var promise = $rootScope.forceRealNameAuthenticateFn();
		promise.then(function(promiseData) {
			//通过认证
			$scope.qryChargeFiled();
		}, function(promiseData) {
			//未通过认证两种情况
			if (promiseData == "T") {
				//审核中
				$rootScope.ForceAuthText = "实名认证正在审核中，暂时无法进行充值！";
				$rootScope.ForceYesBtn = "立即查看";
				$("div#forceNeedAuto_id").show();
			}
			if (promiseData != "T" && promiseData != "N") {
				//需要认证
				$rootScope.ForceAuthText = "您未进行实名认证，暂时无法进行充值！";
				$rootScope.ForceYesBtn = "立即认证";
				$("div#forceNeedAuto_id").show();
			}
		});
	};

	//输入卡号后查询套餐
	$scope.qryItemInfo = function() {
		//每次输入卡号后都重新查询对应的套餐，因此先要清除记录
		$scope.currentIndex = -1;
		$scope.PayItemQryList = "";
		if ($scope.checkBankRight($scope.GasCardNo)) {//如果输入的卡号正确
			//查询缴费套餐
			$scope.qryPayItemByCity();
		} else {//如果输入的卡号不正确
			$scope.AlertErr("对不起，您输入的卡号不正确");
			return;
		}
	};
	//判断卡号是否合法
	$scope.checkBankRight = function(cardNum) {
		//先默认正确
		return true;
	};
	//查询缴费套餐(输入卡号后请求)
	$scope.qryPayItemByCity = function() {

		if ($scope.GasCardNo == "" || $scope.GasCardNo == null) {
			return;
		}
		if ($scope.tabFlag == 1) {
			//中石化
			$scope.PAYPROJ_CODE = "008302";
			$scope.PAYPROJ_NAME = "全国中石化加油卡";
			$scope.startTime = $scope.startTime_zsh;
			$scope.endTime = $scope.endTime_zsh;
		} else if ($scope.tabFlag == 2) {
			//中石油
			$scope.PAYPROJ_CODE = "008303";
			$scope.PAYPROJ_NAME = "全国中石油加油卡";
			$scope.startTime = $scope.startTime_zsy;
			$scope.endTime = $scope.endTime_zsy;
		}
		var formData = {
			"CITY_CODE" : '025',
			"PAYAREA_CODE" : "000",
			"PAYPROJ_CODE" : $scope.PAYPROJ_CODE,
			"BILLKEY" : $scope.GasCardNo,
			"PAYPROJ_NAME" : $scope.PAYPROJ_NAME,
			"START_TIME" : $scope.startTime,
			"END_TIME" : $scope.endTime
		};

		$remote.post("PayItemByCity.do", formData, function(data) {
			if (data.PayBean != null) {
				$scope.PayItemQryList = data.PayBean.payItemQryList;

				//根据充值金额从小到大排列
				$scope.PayItemQryList.sort(function(a, b) {
					return a.filed4 - b.filed4;
				});

				$scope.PayItem = data.PayBean;
				$scope.clickAble = true;
				//是否可以点击选择，只有输入号码后才可以点击
			}

		}, function(error) {
			//如果请求失败，提示用户
			$scope.AlertErr("对不起,您输入的卡号不正确或通信错误");
		});

	};

	//查询项目充值允许时间段(保存起来，避免切换时每次都要发请求)
	$scope.qryChargeFiled = function() {
		//查询中石化
		var formdata_zsh = {
			"CITY_CODE" : "025",
			"PAYPROJ_CODE" : "008302"
		};

		$remote.post("PayFieldQry.do", formdata_zsh, function(data) {

			$scope.startTime_zsh = data.PayFieldBean.start_TIME;
			//充值开始时间
			$scope.endTime_zsh = data.PayFieldBean.end_TIME;
			//充值截止时间

		});
		//查询中石油
		var formdata_zsy = {
			"CITY_CODE" : "025",
			"PAYPROJ_CODE" : "008303"
		};

		$remote.post("PayFieldQry.do", formdata_zsy, function(data) {

			$scope.startTime_zsy = data.PayFieldBean.start_TIME;
			//充值开始时间
			$scope.endTime_zsy = data.PayFieldBean.end_TIME;
			//充值截止时间

		});
	};
	//录入到确认（进入前会进行一些判断可不可以过去）
	$scope.next = function() {
		if (-1 == $scope.currentIndex) {
			$scope.AlertErr("对不起，请选择支付金额！！！");
			return;
		}
		$scope.doFace();
	};
	//确认到提交(结果页)[弹出密码输入框，真正的跳页在密码输入的确认按钮上]
	$scope.doIt = function() {
		$scope.submitPassInput = true;
		$("#trsPwd").val("");
		$("#trsPwd").attr("sf_uuid", "");
	};
	//取消输入密码
	$scope.cancelPassIn = function() {
		$scope.submitPassInput = false;
		$scope.passwdIn = "";
		return;
	};
	//确认输入密码
	$scope.okPassIn = function() {
		$scope.pwdCode = $scope.passwdIn;
		//密码在这里的目的就是为了方便后面使用密码控件加密和让密码输入框提交后清空
		$scope.submitPassInput = false;
		$scope.doSubmit();
		return;
	};
	//真正的会跳页到结果页的地方
	$scope.doSubmit = function() {
		//为了防止提交，先发交易获取一个标识码
		$remote.post("GenToken.do", {}, function(data) {
			$scope._tokenName = data;
			var formData = {
				"BUSI_TYPE" : "3",
				"PAYAREA_CODE" : "000",
				"CITY_CODE" : "025",
				"PAYPROJ_CODE" : $scope.PAYPROJ_CODE,
				"PAYPROJ_NAME" : $scope.PAYPROJ_NAME,
				"BILLKEY" : $scope.GasCardNo,
				"PAYAMOUNT" : $scope.PayItemQryList[$scope.currentIndex].payamount,
				"CUSTOMERNAME" : "",
				"CONTRACTNO" : $scope.PayItemBean.contractno,
				"ITEM1" : $scope.PayItem.item1,
				"ITEM2" : $scope.PayItem.item2,
				"ITEM3" : $scope.PayItem.item3,
				"ITEM4" : $scope.PayItem.item4,
				"ITEM5" : $scope.PayItem.item5,
				"ITEM6" : $scope.PayItem.item6,
				"ITEM7" : $scope.PayItem.item7,
				"FILED1" : "",
				"FILED2" : "",
				"FILED3" : "",
				"FILED4" : $scope.PayItemQryList[$scope.currentIndex].payamount,
				"FILED5" : $scope.PayItemBean.filed1,
				"FILED6" : $scope.PayItemBean.filed2,
				"FILED7" : $scope.PayItemBean.filed3,
				"FILED8" : $scope.PayItemBean.filed4,
				"FILED9" : $scope.PayItemBean.filed5,
				"TrsPassword" : $scope.uuid = $("#trsPwd").attr("sf_uuid"),
				"_pTokenName" : $scope._pTokenName,
				"_tokenName" : $scope._tokenName
			};

			$remote.post("CloudChargeForPc.do", formData, function(data) {
				$scope.StateActivity = data.StateActivity;
				$scope.goto("#3");
			}, function(data) {
				$scope._pTokenName = "";
				$remote.post("GenToken.do", {}, function(token) {
					$scope._tokenName = token;
				});
			});
		});
	};
	//查询是否需要人脸识别和缴费限额
	$scope.doFace = function() {
		var formData = {
			"ChargeFlag" : "Charge",
			"TrsAmount" : $scope.PayItemQryList[$scope.currentIndex].payamount
		};
		$remote.post("FaceAuthResultQry.do", formData, function(data) {
			var idCheckStartTime = data.IdCheckStartTime;
			var idCheckEndTime = data.IdCheckEndTime;
			var popup_text = "";
			//提示信息

			$scope.Status = data.Status;
			if ($scope.Status == 222) {
				//未认证&日累计限额不足&不在联网核查期间
				popup_text = "未进行视频认证日累计缴费限额为" + data.PerDayLimitN + "元，您已超限！视频认证的服务时间为早" + idCheckStartTime + "-晚" + idCheckEndTime + "，认证需要下载下载小草APP，请您在服务时间内进行认证！";
				$scope.alertAppDownLinkWin(popup_text);

			} else if ($scope.Status == 221) {
				//未认证&日累计限额不足&在联网核查期间(可以去认证)
				popup_text = "未进行视频认证日累计缴费限额为" + data.PerDayLimitN + "元，您已超限！认证后日累计缴费限额为" + data.PerDayLimitY + "元，是否下载下载小草APP完成认证？";
				$scope.alertAppDownLinkWin(popup_text);

			} else if ($scope.Status == 922) {
				//待审核&限额不足&不能认证
				popup_text = "未进行视频认证日累计缴费限额为" + data.PerDayLimitN + "元，您已超限！您的认证信息已提交，请等待系统审核，审核结果将以短信形式通知给您！";
				$scope.AlertErr(popup_text);

			} else if ($scope.Status == 122) {
				//认证成功&日累计超限
				popup_text = "日累计缴费限额为" + data.PerDayLimitY + "元，您已超过限额！";
				$scope.AlertErr(popup_text);

			} else {
				//已通过 或 未通过但限额充足
				$scope.goto("#2");

			}
		});
	};
	//没有认证，弹出提示框，引导下载App进行认证
	$scope.alertAppDownLinkWin = function(info) {
		$scope.popup_text = info;
	};
	//提示框的取消
	$scope.popupCancel = function() {
		$scope.popup_text = "null";
	};
	//提示框的确定
	$scope.popupConfirm = function() {
		$scope.popup_text = "null";
		//跳到下载App页面

	};
	//切换选择二种卡
	$scope.toCharge = function(flag) {
		$scope.tabFlag = flag;
		$scope.GasCardNo = "";
		$scope.PayItemQryList = "";
		$scope.submitPassInput = false;
	};
	//点击选择
	$scope.selectAmount = function(item, index) {
		if ($scope.clickAble) {
			$scope.PayItemBean = $scope.PayItemQryList[index];
			$scope.currentIndex = index;
		} else {
			$scope.currentIndex = -1;
		}
	};
	$scope.goBack = function() {
		$("#doNotClickMask").hide();
		$scope.init();
		$scope.goto("#1");
	};
	//获取短信验证码
	$scope.sendMsg = function() {
		$scope._pTokenName = "";
		$remote.post("AutoGenPhoneToken.do", {
			"TokenMessage" : "sms.CNPCCharge.P",
			"TokenIndex" : 1
		},function(data, status, headers, config) {

		});
	};

}]);
