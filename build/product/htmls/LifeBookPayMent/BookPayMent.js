/**
 *生活缴费菜单页面
 */
ibsapp.register.controller("BookPayMentCtrl", ["$state", "$stateParams", "$cookieService", "$filter", "$rootScope", "$targets", '$scope', '$remote', '$nativeCall',
function($state, $stateParams, $cookieService, $filter, $rootScope, $targets, $scope, $remote, $nativeCall) {
	$scope.init = function() {
		//获取生活缴费主页面传来的缴费信息
		if (sessionStorage.getItem("busitypeString")) {
			$scope.BusiType = vx.fromJson(sessionStorage.getItem("busitypeString"));
		}
		//强制实名认证
		var promise = $rootScope.forceRealNameAuthenticateFn();
		promise.then(function(promiseData) {
			//通过认证
			//查询某缴费类型下具体的可缴费项目
			$scope.qryPayProjList();
		}, function(promiseData) {
			//未通过认证两种情况
			if (promiseData == "T") {
				//审核中
				$rootScope.ForceAuthText = "实名认证正在审核中，暂时无法进行缴费！";
				$rootScope.ForceYesBtn = "立即查看";
				$("div#forceNeedAuto_id").show();
			}
			if (promiseData != "T" && promiseData != "N") {
				//需要认证
				$rootScope.ForceAuthText = "您未进行实名认证，暂时无法进行缴费！";
				$rootScope.ForceYesBtn = "立即认证";
				$("div#forceNeedAuto_id").show();
			}
		});
	};
	//查询某缴费类型下具体的可缴费项目
	$scope.qryPayProjList = function() {
		$("#payproj").removeClass("selected");
		//把上一次的样式事件删除
		$('.jf_select').unbind("click");

		var formdata = {
			"AREA_CODE" : $scope.BusiType.AREA_CODE,
			"BUSI_TYPE" : $scope.BusiType.BUSI_TYPE
		};
		//查询某缴费类型下可缴费项目
		$remote.post("PayProjListQry.do", formdata, function(data) {
			if (data.List == null || data.List.length == 0) {
				//该地区暂无缴费项目
				$("#payField").hide();
				$(".l_norecord").show();
				$("input[value='下一步']").attr("disabled", "disabled");
				return;
			}
			//缴费项目列表
			$scope.PayProjList = data.List;
			//若缴费项目确定（从缴费名册和缴费历史过来时），默认显示该缴费项目
			if ($scope.BusiType.PAYPROJ_CODE != undefined && $scope.BusiType.PAYPROJ_CODE != '') {
				for (var i = 0; i < data.List.length; i++) {
					if ($scope.BusiType.PAYPROJ_CODE == data.List[i].PAYPROJ_CODE) {
						$scope.PayProjObj = data.List[i];
						//缴费项目
						break;
					}
				}
			} else {
				//缴费项目不确定（从首页选择缴费类型、改变城市后），默认显示缴费项目列表第一个
				$scope.PayProjObj = data.List[0];
				//正常缴费的话才可以选择缴费项目，立即缴费那种固定缴费项目
				if (data.List.length > 1) {
					//如果有多个缴费项目，以下拉框展示
					$("#payproj").addClass("selected");
					$('.jf_select').click(function() {
						$("#payprojList").show();
						$('.jf_out').show();
					});
					$('.jf_out,#payprojList li').click(function() {
						$('#payprojList').hide();
						$('.jf_out').hide();
					});
				}
			}
			//缴费项目
			$("#payproj").text($scope.PayProjObj.ITERM_NAME);
			//查询缴费项目参数
			$scope.qryPayField($scope.PayProjObj.CITY_CODE, $scope.PayProjObj.PAYPROJ_CODE);
		});
	};
	//查询缴费项目参数
	$scope.qryPayField = function(city_code, payproj_code) {
		var formdata = {
			"CITY_CODE" : city_code,
			"PAYPROJ_CODE" : payproj_code
		};
		//缴费项目参数查询
		$remote.post("PayFieldQry.do", formdata, function(data) {
			$scope.PayField = data.PayFieldBean;

			$scope.PayFieldList = data.PayFieldBean.payFieldQryList;
			//输入域
			//动态初始化输入域  先清除已存在的动态框
			$("input[type=hidden]").remove();
			//清除隐藏域
			$("p.input_field").remove();
			//清除上一缴费项目的输入域
			for (var i = 0; i < $scope.PayFieldList.length; i++) {
				/* 				<ul class="jf_paydo_xm_ul">
				 <li>缴费号码</li>
				 <li><input placeholder="查看纸质账单" type="text"></li>
				 </ul> */
				if ("0" == $scope.PayFieldList[i].in_LABEL_TYPE) {
					//类型为输入框
					$("#payField p:last").after('<p class="input_field"><span>' + $scope.PayFieldList[i].in_LABEL + '</span><span><input type="text" key-allow="word" style="width: 82%;" id="inputText' + i + '" placeholder="' + $scope.PayFieldList[i].in_LABEL_REMARK + '" maxlength="' + $scope.PayFieldList[i].in_LABEL_MAX + '" pattern="\\w{' + $scope.PayFieldList[i].in_LABEL_MIN + ',' + $scope.PayFieldList[i].in_LABEL_MAX + '}" required/></span></p>');

					if ($scope.PayFieldList[i].in_LABEL_REMARK == undefined || $scope.PayFieldList[i].in_LABEL_REMARK == "") {
						$("#inputText" + i).attr("placeholder", "查看纸质账单");
					}
					if (0 == i) {
						$("#inputText" + i).attr({
							"id" : "billkey",
							"name" : "BILLKEY",
							"v-model" : "BILLKEY"
						});
						//$compile($("#billkey"))($scope);//重新编译新增加的DOM

						//在缴费号码后面加上选择缴费对象
						/* 						$("#billkey").after('<span id="choosePayObject" style="color: red;">选择</span>');
						 $("#choosePayObject").click(function(){
						 $scope.showPaymentList();
						 }); */
					}
					if (i > 0) {
						$("#inputText" + i).attr({
							"id" : "filed" + i,
							"name" : "FILED" + i,
							"v-model" : "FILED" + i
						});
					}
				} else if ("1" == $scope.PayFieldList[i].in_LABEL_TYPE) {
					//类型为密码框
					$("#payField p:last").after('<p class="input_field"><span>' + $scope.PayFieldList[i].in_LABEL + '</span><span><input style="font-size: 12px;"type="password" id="password' + i + '" placeholder="' + $scope.PayFieldList[i].in_LABEL_REMARK + '" maxlength="' + $scope.PayFieldList[i].in_LABEL_MAX + '" pattern="\\w{' + $scope.PayFieldList[i].in_LABEL_MIN + ',' + $scope.PayFieldList[i].in_LABEL_MAX + '}" required/></span></p>');

					if ($scope.PayFieldList[i].in_LABEL_REMARK == undefined || $scope.PayFieldList[i].in_LABEL_REMARK == "") {
						$("#password" + i).attr("placeholder", "请输入" + $scope.PayFieldList[i].in_LABEL);
					}
					if (i > 0) {
						$("#password" + i).attr({
							"id" : "filed" + i,
							"name" : "FILED" + i,
							"v-model" : "FILED" + i
						});
					}
				} else if ("2" == $scope.PayFieldList[i].in_LABEL_TYPE) {
					/*//类型为下拉框，标准下拉框展示
					$("#payField ul:last").after('<ul class="jf_paydo_xm_ul jf_paydo_xm_ulA input_field"><li>'
					+$scope.PayFieldList[i].in_LABEL
					+'</li><li><select id="inputSelect'+i+'"></select></li></ul>');
					var selectArray = ($scope.PayFieldList[i].in_LABEL_LIST_VALUE).split(",");
					for(var j = 0; j < selectArray.length; j++){
					$("#inputSelect"+i).append('<option value="'+selectArray[j]+'">'+selectArray[j]+'</option>');
					}
					if(i > 0){
					$("#inputSelect"+i).attr({"id": "filed"+i, "name": "FILED"+i, "v-model": "FILED"+i});
					}*/

					//其他形式表示下拉框
					$("#payField p:last").after('<p class="input_field"><span>' + $scope.PayFieldList[i].in_LABEL + '</span><span style="width:69%;padding-right:3%;" id="liSelect' + i + '"></span></p>');
					//隐藏域即为下拉框的值
					$("form[name='form1']").prepend('<input type="hidden" id="filed' + i + '" />');

					//下拉框的值初始化
					var selectArray = ($scope.PayFieldList[i].in_LABEL_LIST_VALUE).split(",");
					if (selectArray.length > 0) {
						$("#liSelect" + i).text(selectArray[0]).addClass("selected");
						$("#filed" + i).val(selectArray[0]);
						//默认取第一个

						//动态初始化下拉框
						$("#payprojList").after('<ul class="outList" id="ulSelect' + i + '"></ul>');
						for (var j = 0; j < selectArray.length; j++) {
							$("#ulSelect" + i).append('<li>' + selectArray[j] + '</li>');
						}

						var lii = "#liSelect" + i;
						$(lii).click(function() {
							var filedi = '#' + $(this).attr('id').replace(/liSelect/, 'filed');
							var ulSelecti = '#' + $(this).attr('id').replace(/li/, 'ul');
							$(ulSelecti).css("display", "block");
							$('.jf_out').css("display", "block");

							$('.jf_out,' + ulSelecti + ' li').click(function() {
								$(ulSelecti).hide();
								$('.jf_out').hide();
							});

							var lithis = this;
							$(ulSelecti + ' li').click(function() {
								$(lithis).text($(this).text());
								$(filedi).val($(this).text());
							});
						});
					}
				}
				//				$compile($("#filed"+i))($scope);//重新编译新增加的DOM
			}
			//从缴费名册或缴费详情立即缴费时，需传BILLKEY
			if ($scope.BusiType.BILLKEY != undefined && $scope.BusiType.BILLKEY != '') {
				$("#billkey").val($scope.BusiType.BILLKEY);
				//$scope.BILLKEY = $scope.BusiType.BILLKEY;
			}
		});
	};
	//下一步
	$scope.doNext = function() {
		$scope.PAYPROJ_NAME = $("#payproj").text();
		//取得缴费项目名称
		var formdata = {
			"PAYAREA_CODE" : $scope.BusiType.AREA_CODE,
			"CITY_CODE" : $scope.PayProjObj.CITY_CODE,
			"PAYPROJ_CODE" : $scope.PayProjObj.PAYPROJ_CODE,
			"START_TIME" : $scope.PayField.start_TIME,
			"END_TIME" : $scope.PayField.end_TIME,
			"PAYPROJ_NAME" : $scope.PAYPROJ_NAME
		};

		//校验输入域
		var inputRegExp = new RegExp("^[A-Za-z0-9]+$");
		//默认
		for (var i = 0; i < $scope.PayFieldList.length; i++) {
			if ($scope.PayFieldList[i].in_LABEL_MIN != "" && $scope.PayFieldList[i].in_LABEL_MAX != "") {
				inputRegExp = new RegExp("^[A-Za-z0-9]{" + $scope.PayFieldList[i].in_LABEL_MIN + "," + $scope.PayFieldList[i].in_LABEL_MAX + "}$");
			}
			if (0 == i) {
				//校验BILLKEY
				if ($("#billkey").val() != null && $("#billkey").val() != '') {
					if (!inputRegExp.test($("#billkey").val())) {
						$scope.AlertErr($scope.PayFieldList[i].in_LABEL + "格式不正确");
						return;
					}
					formdata.BILLKEY = $("#billkey").val();
					$scope.BILLKEY = $("#billkey").val();
				} else {
					$scope.AlertErr("请输入" + $scope.PayFieldList[i].in_LABEL);
					return;
				}
			} else {
				//交易备选字段
				if ($("#filed" + i).val() != null && $("#filed" + i).val() != '') {
					if ("2" != $scope.PayFieldList[i].in_LABEL_TYPE && !inputRegExp.test($("#filed" + i).val())) {
						$scope.AlertErr($scope.PayFieldList[i].in_LABEL + "格式不正确");
						return;
					}
					formdata['FILED' + i] = $("#filed" + i).val();
					$scope['filed' + i] = $("#filed" + i).val();
				} else {
					$scope.AlertErr("请输入" + $scope.PayFieldList[i].in_LABEL);
					return;
				}
			}
		}
		//缴费单信息查询
		$remote.post("PayItemByCity.do", formdata, function(data) {
			$scope.PayItem = data.PayBean;

			$scope.PayItemList = data.PayBean.payItemQryList[0];
			//缴费单账户信息

			$scope.CUSTOMERNAME = $scope.PayItemList.customername;
			$scope.CUSTNAME = $scope.CUSTOMERNAME;

			//1.111117E7
			$scope.BALANCE = $filter('changeFloat')($scope.PayItemList.balance);
			//账户余额
			$scope.PAYAMT = $scope.PayItemList.payamount;
			//应缴金额

			$remote.post("GenToken.do", {}, function(data) {
				$scope._tokenName = data;
				$targets("content", "#2");
			});
		});
	};
	//form2初始化
	$scope.form2init = function() {
		//查询电子账户余额
		/* 		$remote.post("EAcctBalQry.do",{}, function(data1) {
		$scope.AvailBal=data1.AvailBal;
		$("#doItSubmit").attr("disabled", false);
		}); */
		//$scope.AvailBal = 8888.88;

		//是否展示应缴金额（账户余额和应缴金额按情况显示）
		//$scope.PAYAMT = 0;
		var regPay = new RegExp("^[0]{1}(\.)?0?0?$");
		if ($scope.PAYAMT != undefined && $scope.PAYAMT != '' && !regPay.test($scope.PAYAMT)) {
			//应缴金额不为0，显示
			$("#amountType").text("应缴金额");
			$("#payamt").show();
			//大字显示应缴金额
			$("#paybal").show();
			//缴费金额前显示账户余额
		} else {
			$("#amountType").text("账户余额");
			$("#balance").show();
			//大字显示账户余额
		}

		//判断有无指定金额
		$scope.useFixedAmt = false;
		//$scope.PayField.fixed_AMT_VALUE = "10,50,100";
		if ($scope.PayField.fixed_AMT_VALUE != undefined && $scope.PayField.fixed_AMT_VALUE != '') {
			var payAmountArray = $scope.PayField.fixed_AMT_VALUE.split(",");
			$scope.PayAmountArray = payAmountArray;
			//指定金额数组
			$scope.PayAmounts = payAmountArray[0];
			$("select[name='PayAmounts']").show();

			$scope.useFixedAmt = true;
		} else {
			$("input[name='PAYAMOUNT']").show();
		}
	};
	$scope.getPayAmounts = function() {
	};

	//立即缴费
	$scope.doIt = function() {
		//无欠费是否可以缴费
		if ($scope.PayField.is_ALLOW_PAY == 1 && $scope.PAYAMT == 0) {
			$scope.AlertErr("无欠费不需要缴费");
			return;
		}

		if ($scope.useFixedAmt) {
			//用指定缴费金额
			$scope.PAYAMOUNT = $scope.PayAmounts;
		} else {
			if ($scope.PAYAMOUNT == undefined || $scope.PAYAMOUNT == '' || $scope.PAYAMOUNT <= 0) {
				$scope.AlertErr("请输入缴费金额");
				return;
			}
		}
		var payamt = new Number($scope.PAYAMOUNT);
		/* 		var availBal = $scope.AvailBal;//可用余额
		 if(payamt > availBal){
		 $scope.AlertErr("电子账户可用余额不足");
		 return;
		 } */

		if ($scope.PayField.pay_MIN != undefined && $scope.PayField.pay_MIN != '') {
			if ($scope.PAYAMOUNT < new Number($scope.PayField.pay_MIN)) {
				$scope.AlertErr("缴费金额不能小于缴费金额下限" + $scope.PayField.pay_MIN + "元");
				return;
			}
		}
		if ($scope.PayField.pay_MAX != undefined && $scope.PayField.pay_MAX != '') {
			if ($scope.PAYAMOUNT > new Number($scope.PayField.pay_MAX)) {
				$scope.AlertErr("缴费金额不能大于缴费金额上限" + $scope.PayField.pay_MAX + "元");
				return;
			}
		}
		// //跳到页面确认
		// $targets("content", "#3");
		$scope.doIt2();
	};
	//确认页面-- 查询是否需要人脸识别
	$scope.doIt2 = function() {
		var formData = {
			"ChargeFlag" : "Charge",
			"TrsAmount" : $scope.PAYAMOUNT
		};
		$remote.post("FaceAuthResultQry.do", formData, function(data) {
			var idCheckStartTime = data.IdCheckStartTime;
			var idCheckEndTime = data.IdCheckEndTime;

			$scope.canFaceAuth = false;
			//提示信息
			var popup_text = "";
			$scope.Status = data.Status;
			if ($scope.Status == 222) {
				//未认证&日累计限额不足&不在联网核查期间
				popup_text = "您未进行视频认证，缴费额度为" + data.PerDayLimitN + "元，现已超过限额，暂时无法进行缴费，请登录直销银行移动客户端进行认证，认证后的缴费额度为" + data.PerDayLimitY + "元！";
				$scope.AlertErr(popup_text);
				return;
			} else if ($scope.Status == 221) {
				//未认证&日累计限额不足&在联网核查期间
				popup_text = "您未进行视频认证，缴费额度为" + data.PerDayLimitN + "元，现已超过限额，暂时无法进行缴费，请登录直销银行移动客户端进行认证，认证后的缴费额度为" + data.PerDayLimitY + "元！";
				$scope.AlertErr(popup_text);
				return;
			} else if ($scope.Status == 922) {
				//待审核&限额不足&不能认证
				//popup_text = "<p>您的视频认证申请已提交，我行工作人员将在1-2个工作日内进行审核，审核结果将以短信通知您，请耐心等待！</p>";
				popup_text = "未进行视频认证日累计缴费限额为" + data.PerDayLimitN + "元，您已超限！您的认证信息已提交，请等待系统审核，审核结果将以短信形式通知给您!";
				$scope.AlertErr(popup_text);
				return;
			} else if ($scope.Status == 122) {
				//认证成功&日累计超限
				popup_text = "日累计缴费限额为" + data.PerDayLimitY + "元，您已超过限额！";
				$scope.AlertErr(popup_text);
				return;
			} else {
				//已通过 或 未通过但限额充足
				$scope.doIt3();
				//直接调密码控件
			}
		});
	};
	//调密码控件
	$scope.doIt3 = function() {
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
	$scope.doIt4 = function() {
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
		//关闭密码框
		$scope.pwdbox = false;
		var formData = {
			"BUSI_TYPE" : $scope.BusiType.BUSI_TYPE,
			"PAYAREA_CODE" : $scope.BusiType.AREA_CODE,
			"PAYPROJ_NAME" : $scope.PAYPROJ_NAME,
			"CITY_CODE" : $scope.PayProjObj.CITY_CODE,
			"PAYPROJ_CODE" : $scope.PayProjObj.PAYPROJ_CODE,
			"BILLKEY" : $scope.BILLKEY,
			"CUSTOMERNAME" : $scope.CUSTOMERNAME,
			"CUSTNAME" : $scope.CUSTNAME,
			"PAYAMOUNT" : $scope.PAYAMOUNT,
			"CONTRACTNO" : $scope.PayItemList.contractno,
			"ITEM1" : $scope.PayItem.item1,
			"ITEM2" : $scope.PayItem.item2,
			"ITEM3" : $scope.PayItem.item3,
			"ITEM4" : $scope.PayItem.item4,
			"ITEM5" : $scope.PayItem.item5,
			"ITEM6" : $scope.PayItem.item6,
			"ITEM7" : $scope.PayItem.item7,
			"FILED5" : $scope.PayItemList.filed1,
			"FILED6" : $scope.PayItemList.filed2,
			"FILED7" : $scope.PayItemList.filed3,
			"FILED8" : $scope.PayItemList.filed4,
			"FILED9" : $scope.PayItemList.filed5,
			"_tokenName" : $scope._tokenName,
			'_ChannelId' : "WAP",
			"TrsPassword" : $scope.uuid = $("#trsPwd").attr("sf_uuid")
		};
		for (var i = 1; i < $scope.PayFieldList.length; i++) {
			formData['FILED' + i] = $scope['filed' + i];
		}

		$remote.post("CloudCharge.do", formData, function(data) {
			$scope.StateActivity = data.StateActivity;
			$scope.WithinActivity = data.WithinActivity;

			var resultData = {
				"PAYPROJ_NAME" : $scope.PAYPROJ_NAME, //缴费单位
				"CUSTOMERNAME" : $scope.CUSTOMERNAME, //缴费户名
				"BILLKEY" : $scope.BILLKEY, //缴费号码
				"PAYAMOUNT" : $scope.PAYAMOUNT,
				"PAYDATE" : data.PAYDATE,
				"TrsJnlNo" : data.TrsJnlNo
			};
			//设置分享信息
			$scope.$root.shareData = resultData;
			$targets("content", "#3");
		}, function(data) {
			$remote.post("GenToken.do", {}, function(data) {
				$scope._tokenName = data;
			});
		});
	};
	//进入城市选择页面
	$scope.selectionCityFn = function() {
		$scope.goto("appOther.SelectCity");
	};
	//进入常见问题页面
	$scope.goLifePaymentComQuestionFn = function() {
		$scope.goto("appOther.LifePaymentComQuestion");
	};
	//结果页面预约缴费
	$scope.orderPay = function() {
		$scope.goto('appOther.LifeReservationPayment');
	};
	$scope.vPageBackoneFn = function() {
		$scope.goto("#1");
	};
	$scope.vPageBacktwoFn = function() {
		$scope.goto("#2");
	};
	//查看协议
	$scope.ChaKanXieYiFn = function() {
		$scope.goto("#4");
	};

}]);
