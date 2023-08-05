/**
 *话费流量充值
 */
ibsapp.register.controller("PhoneRechargeCtrl", ['$scope', '$remote', '$filter', '$rootScope',
function($scope, $remote, $filter, $rootScope) {
	//返回前一页面
	$scope.backPrePageFn = function() {
		$scope.prePageUrl = sessionStorage.getItem("prePhoneRechargePageUrl");
		if ($scope.prePageUrl) {
			$scope.goto($scope.prePageUrl);
		} else {
			$scope.goto('app.Main');
		};
	};
	$scope.init = function() {//初始化
		//话费充值面额选中标志，value为0对应未选中，默认未选中。
		$scope.numFlag = {
			"50" : "0",
			"100" : "0",
			"300" : "0",
			"500" : "0"
		};
		$scope.formatflag = false;
		//默认为话费充值
		$scope.menuflag = "phone";
		//fixedFlag为true,则不可选
		$scope.fixedFlag = false;
		$scope.phoneNum = null;
		$scope.OperatorInfo = {};
		//强制实名认证
		var promise = $rootScope.forceRealNameAuthenticateFn();
		promise.then(function(promiseData) {
			//通过认证
			$scope.qryPayerInfo();
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
	//手机号码格式化
	$scope.phoneFormat = function(phone) {
		return phone.substring(0, 3) + " " + phone.substring(3, 7) + " " + phone.substring(7, 11);
	};
	//查询签约手机号，用户姓名
	$scope.qryPayerInfo = function() {
		$remote.post("queryPayerInfo.do", {}, function(data) {
			if ($scope.PhoneRecordData) {
				var mobilePhone = $scope.PhoneRecordData.BILLKEY;
			} else {
				var mobilePhone = data.MobilePhone;
			}
			$scope.phoneNum = $scope.phoneFormat(mobilePhone);
			$scope.BILLKEY = $scope.phoneNum.replace(/\s/g, "");
			if ($scope.phoneNum != null && $scope.phoneNum.length == 13) {
				$scope.fixedFlag = false;
				$scope.queryOperator();
			}

		});
	};
	$scope.goBack = function() {
		$scope.goto("#1");
		$("#doNotClickMask").hide();
	};
	//话费、流量充值页签切换
	$scope.changeMenu = function(param) {
		$scope.menuflag = param;
		if (param == 'phone') {
			//查询签约手机号，用户身份证
			//重置选中状态
			$scope.numFlag = {
				"50" : "0",
				"100" : "0",
				"300" : "0",
				"500" : "0"
			};
			//toConfFlag，控制 “确认充值”按钮是否可见
			$scope.toConfFlag = false;
			$scope.qryPayerInfo();
		}
		if (param == 'data') {
			$scope.PayItemQryList = null;
			$scope.FILED0 = "";
			$scope.toConfFlag = false;
			$scope.qryPayerInfo();
		}
	};
	//查询运营商
	$scope.queryOperator = function() {
		var formData = {
			"PayerMobilePhone" : $scope.BILLKEY
		};
		$remote.post("PhoneOperatorQry.do", formData, function(data) {
			$scope.OperatorInfo = data.OperatorInfo[0];
			if ($scope.OperatorInfo == undefined) {
				$scope.AlertErr("暂不支持此号码充值");
				$scope.fixedFlag = true;
				$scope.PayItemQryList = null;
				$scope.toConfFlag = false;
				return;
			} else {
				$scope.fixedFlag = false;
				$scope.toConfFlag = false;
				if ($scope.menuflag == 'phone') {//话费
					if ($scope.OperatorInfo.Operator_Code == 'CM') {//中国移动
						// $scope.PAYPROJ_CODE="060304";//生产
						$scope.PAYPROJ_CODE = "060303";
						//测试先这样写
						$scope.PAYPROJ_NAME = "中国移动话费";
					} else if ($scope.OperatorInfo.Operator_Code == 'CU') {//中国联通
						$scope.PAYPROJ_CODE = "060303";
						$scope.PAYPROJ_NAME = "中国联通话费";
					} else if ($scope.OperatorInfo.Operator_Code == 'CT') {//中国电信
						$scope.PAYPROJ_CODE = "060302";
						$scope.PAYPROJ_NAME = "中国电信话费";
					}
					$scope.qryChargeFiled();
				} else if ($scope.menuflag == 'data') {//流量
					if ($scope.OperatorInfo.Operator_Code == 'CM') {//中国移动
						$scope.PAYPROJ_CODE = "060401";
						$scope.PAYPROJ_NAME = "中国移动流量";
					} else if ($scope.OperatorInfo.Operator_Code == 'CU') {//中国联通
						$scope.PAYPROJ_CODE = "060402";
						$scope.PAYPROJ_NAME = "中国联通流量";
					} else if ($scope.OperatorInfo.Operator_Code == 'CT') {//中国电信
						$scope.PAYPROJ_CODE = "060403";
						$scope.PAYPROJ_NAME = "中国电信流量";
					}
					var formdata = {
						"CITY_CODE" : "755",
						"PAYPROJ_CODE" : $scope.PAYPROJ_CODE
					};
					//缴费项目参数查询
					$remote.post("PayFieldQry.do", formdata, function(data) {
						$scope.startTime = data.PayFieldBean.start_TIME;
						//充值开始时间
						$scope.endTime = data.PayFieldBean.end_TIME;
						//充值截止时间
						$scope.queryChargePaper();
					});
				}
			}
		});
	};
	$scope.queryChargePaper = function() {
		//上送字段参考接口文档
		var formData = {
			"CITY_CODE" : '755',
			"PAYAREA_CODE" : "755",
			"PAYPROJ_CODE" : $scope.PAYPROJ_CODE,
			"BILLKEY" : $scope.BILLKEY,
			"FILED1" : $scope.FILED0,
			"PAYPROJ_NAME" : $scope.PAYPROJ_NAME,
			"START_TIME" : $scope.startTime,
			"END_TIME" : $scope.endTime
		};
		//对应PayItemByCity2.json
		$remote.post("PayItemByCity.do", formData, function(data) {
			if (data != null) {
				if ($scope.menuflag == 'phone') {//话费充值
					$scope.PayItemBean = data.PayBean.payItemQryList[0];
					$scope.PayItem = data.PayBean;
					//销账金额
					$scope.payAmount = $scope.PayItemBean.payamount;
					$scope.goto("#2");
				} else {//流量充值
					$scope.PayItemQryList = data.PayBean.payItemQryList;
					//根据充值流量从小到大排列
					$scope.PayItemQryList.sort(function(a, b) {
						return a.filed1 - b.filed1;
					});
					$scope.PayItem = data.PayBean;
				}
			}
		});
	};
	//查询项目允许充值时间段
	$scope.qryChargeFiled = function() {
		var formdata = {
			"CITY_CODE" : "755",
			"PAYPROJ_CODE" : $scope.PAYPROJ_CODE
		};
		//缴费项目参数查询
		$remote.post("PayFieldQry.do", formdata, function(data) {
			$scope.startTime = data.PayFieldBean.start_TIME;
			//充值开始时间
			$scope.endTime = data.PayFieldBean.end_TIME;
			//充值截止时间

		});
	};
	$scope.FILED0 = "";
	$scope.doNext = function() {
		$scope._pTokenName = "";
		//$("#smsSend").val("获取验证码");
		if ($scope.menuflag == "phone") {
			$scope.queryChargePaper();
		}
		if ($scope.menuflag == "data") {
			$scope.goto("#2");
		}
	};
	//弹出密码输入框
	$scope.openBox = function() {
		$scope.trsPassword = null;
		$scope.pwdbox = true;
		$("#trsPwd").val("");
		$("#trsPwd").attr("sf_uuid", "");
	};
	//取消密码输入框
	$scope.closeBox = function() {
		$scope.pwdbox = false;
	};
	//发送验证码
	$scope.sendMsg = function() {
		$scope._pTokenName = "";
		$remote.post("AutoGenPhoneToken.do", {
			"TokenMessage" : "sms.PhoneCharge.P",
			"TokenIndex" : 1
		}, function(data) {

		});
	};
	//选择面额
	$scope.doChoose = function(num) {
		//清楚之前的选择信息
		vx.forEach($scope.numFlag, function(value, key) {
			$scope.numFlag[key] = "0";
		});
		//选中
		$scope.numFlag[num] = "1";
		$scope.FILED0 = num;
		//选中则显示确认充值按钮
		$scope.toConfFlag = true;
	};
	//流量充值面额选择
	$scope.selectAmount = function(item, index) {
		//流量
		var select = "#a" + index;
		$(".lineH25").removeClass("money_num_cur");
		$(select).addClass("money_num_cur");
		$scope.FILED0 = "";
		$scope.payAmount = item.payamount;
		$scope.filed1 = item.filed1;
		$scope.currentIndex = index;
		$scope.PayItemBean = $scope.PayItemQryList[$scope.currentIndex];
		if ($scope.phoneNum != "" && $scope.phoneNum != null) {
			if ($scope.phoneNum.length == 13 && $scope.OperatorInfo) {
				//选中则显示确认充值按钮
				$scope.toConfFlag = true;
			}
		}
	};
	//输入框得到焦点时手机号码去除空格
	$scope.changeStyle = function() {
		if ($scope.phoneNum != null && $scope.phoneNum != "") {
			$scope.phoneNum = $scope.phoneNum.replace(/\s/g, "");
		}

		$scope.currentIndex = null;
		if ($scope.menuflag == 'data') {
			$scope.toConfFlag = false;
		}
	};
	//检测手机号
	$scope.$watch("phoneNum", function(newvalue, oldvalue) {
		//应考虑空值，这里已加上非空校验逻辑
		if (newvalue) {
			if (newvalue.length == 11) {
				//输入手机号的情况
				$scope.phoneNum = $scope.phoneFormat($scope.phoneNum);
				$scope.formatflag = true;
				$scope.BILLKEY = $scope.phoneNum.replace(/\s/g, "");
				$scope.toConfFlag = true;
				$scope.queryOperator();
				//查询运营商
			} else {
				//删除手机号的情况
				$scope.toConfFlag = false;
				//不显示确认充值按钮
				$scope.fixedFlag = true;
				//面额不可选
				$scope.PayItemQryList = null;
				$scope.currentIndex = null;
				if ($scope.formatflag) {
					$scope.formatflag = !$scope.formatflag;
					return;
				}
				if ($scope.phoneNum != null && $scope.phoneNum != "") {
					$scope.phoneNum = $scope.phoneNum.replace(/\s/g, "");
				}
			}
			vx.forEach($scope.numFlag, function(value, key) {
				$scope.numFlag[key] = "0";
			});
		}
	});
	//处理充值
	$scope.toCharge = function() {
		$remote.post("GenToken.do", {}, function(data) {
			$scope._tokenName = data;
			setTimeout(function() {
				if ($scope._pTokenName == undefined || $scope._pTokenName == '') {
					$scope.AlertErr("请输入验证码");
					return;
				}
				$scope.doIt2();
				//查询人脸识别结果，根据返回结果进行后续处理
			}, 500);
		});
	};
	//查询是否需要人脸识别
	$scope.doIt2 = function() {
		var formData = {
			"ChargeFlag" : "Charge",
			"TrsAmount" : $scope.payAmount
		};
		$remote.post("FaceAuthResultQry.do", formData, function(data) {
			var idCheckStartTime = data.IdCheckStartTime;
			var idCheckEndTime = data.IdCheckEndTime;
			$scope.canFaceAuth = false;
			$scope.popup_text = "";
			//提示信息
			$scope.Status = data.Status;
			if ($scope.Status == 222) {
				//未认证&日累计限额不足&不在联网核查期间
				$scope.popup_text = "未进行视频认证日累计缴费限额为" + data.PerDayLimitN + "元，您已超限！视频认证的服务时间为早" + idCheckStartTime + "-晚" + idCheckEndTime + "，请您在服务时间内进行认证！";
				$scope.openConfirm();
			} else if ($scope.Status == 221) {
				//未认证&日累计限额不足&在联网核查期间
				$scope.canFaceAuth = true;
				$scope.popup_text = "未进行视频认证日累计缴费限额为" + data.PerDayLimitN + "元，您已超限！认证后日累计缴费限额为" + data.PerDayLimitY + "元，是否认证？";
				$scope.openConfirm();
			} else if ($scope.Status == 922) {
				//待审核&限额不足&不能认证
				//popup_text = "<p>您的视频认证申请已提交，我行工作人员将在1-2个工作日内进行审核，审核结果将以短信通知您，请耐心等待！</p>";
				$scope.popup_text = "未进行视频认证日累计缴费限额为" + data.PerDayLimitN + "元，您已超限！您的认证信息已提交，请等待系统审核，审核结果将以短信形式通知给您！";
				$scope.openConfirm();
			} else if ($scope.Status == 122) {
				//认证成功&日累计超限
				$scope.popup_text = "日累计缴费限额为" + data.PerDayLimitY + "元，您已超过限额！";
				$scope.openConfirm();
			} else {
				//已通过 或 未通过但限额充足
				$scope.openBox();
				//直接弹出密码弹框
			}
		});
	};
	//弹出提示框
	$scope.openConfirm = function() {
		$scope.popup_text = "日累计缴费限额为55555元，您已超过限额！";
		//测试下弹窗临时写的内容
		$scope.facebox = true;
	};
	//充值缴费
	$scope.doIt4 = function(data) {
		//上送字段参考接口文档
		$scope.pwdbox = false;
		var formData = {
			"BUSI_TYPE" : "3",
			"PAYAREA_CODE" : "000",
			"CITY_CODE" : "755",
			"PAYPROJ_CODE" : $scope.PAYPROJ_CODE,
			"PAYPROJ_NAME" : $scope.PAYPROJ_NAME,
			"BILLKEY" : $scope.BILLKEY,
			"PAYAMOUNT" : $scope.payAmount,
			"CUSTOMERNAME" : $scope.PayItemBean.customername,
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
			"FILED4" : "",
			"FILED5" : $scope.PayItemBean.filed1,
			"FILED6" : $scope.PayItemBean.filed2,
			"FILED7" : $scope.PayItemBean.filed3,
			"FILED8" : $scope.PayItemBean.filed4,
			"FILED9" : $scope.PayItemBean.filed5,
			"TrsPassword" : $scope.uuid = $("#trsPwd").attr("sf_uuid"),
			//"uuidTrsPassword":$scope.uuid=$("#trsPwd").attr("sf_uuid"),
			"_pTokenName" : $scope._pTokenName,
			"_tokenName" : $scope._tokenName
		};
		$remote.post("CloudChargeForPc.do", formData, function(data) {
			$scope.StateActivity = data.StateActivity;
			$scope.goto('#3');
			/* if($rootScope.timer!=null){
			 window.clearTimeout($rootScope.timer);
			 $rootScope.timerFlag=false;
			 $("#content").find("#smsSend").removeAttr("disabled").css("cursor","pointer");
			 $("#content").find("#smsSend").val("获取验证码");
			 }*/
			var resultData = {
				"PAYPROJ_NAME" : $scope.PAYPROJ_NAME, //缴费单位
				"CUSTOMERNAME" : $scope.PayItemBean.customername, //缴费户名
				"BILLKEY" : $scope.BILLKEY, //缴费号码
				"PAYAMOUNT" : $scope.payAmount,
				"PAYDATE" : data.PAYDATE,
				"TrsJnlNo" : data.TrsJnlNo
			};
		}, function(data) {
			$scope._pTokenName = "";
			$remote.post("GenToken.do", {}, function(token) {
				$scope._tokenName = token;
			});
		});
	};
}]);
