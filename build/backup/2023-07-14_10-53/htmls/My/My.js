/**
 *我的
 我的资产：
 资产总额、昨日收益、累计收益先定义个全局的变量
 资产总额 = Balance + TotalShare + AppointShare + TotalAmt + TotalZaituAmt + MktBalAmount
 昨日收益 = PaidInterest + 活期的LastProfit + 定期的LastProfit
 累计收益 = SumInterest + TotalAllProfits + TotalProfit + ProfitAmount
 可用余额 = AvailBal
 */
ibsapp.register.controller("MyCtrl", ["$state", "$stateParams", "$cookieService", '$scope', '$remote','$filter',
function($state, $stateParams, $cookieService, $scope, $remote,$filter) {
	$scope.init = function() {
		sessionStorage.removeItem('zszyInfoData');
		if(sessionStorage.getItem("paramSB") && sessionStorage.getItem("myPageFlag")){//第三方平台
			$scope.myPageFlag=sessionStorage.getItem("myPageFlag");
		}else{
			$scope.myPageFlag=false;
		}
		$scope.liFlag = "MyZc";
		$scope.settleFlag = "Already";
		$scope.changeSHash();
		$scope.isShowAmount = true;
		$scope.isShowTotalBalance = true;
		// 总资产默认显示
		$scope.fetchAllData();
		//删除贷款部分信息存储
		if (sessionStorage.getItem("RepayDataString")) {
			sessionStorage.removeItem("RepayDataString");
		}
		if (sessionStorage.getItem("EcacctAvailBalString")) {
			sessionStorage.removeItem("EcacctAvailBalString");
		}
		if (sessionStorage.getItem("PlanDateString")) {
			sessionStorage.removeItem("PlanDateString");
		}
		//贷款查询
		$scope.RepayInfoQryFn();
		//总负债查询
		$scope.RepayTotalAmountFn();
		//活期余额
		$scope.huoqiBalanceQry();
	};
	//贷款部分----------开始
	//总负债查询
	$scope.RepayTotalAmountFn = function() {
		$remote.post("RepayTotalAmount.do", {}, function(data) {
			$scope.TotalBalance = data.TotalBalance;
		});
	};
	// 总负债显隐控制
	$scope.showTotalBalance = function() {
		$scope.isShowTotalBalance = !$scope.isShowTotalBalance;
	};
	//活期余额
	$scope.huoqiBalanceQry=function(){
		$remote.post("EacctDetailQueryPre.do", {}, function(data) {
			$scope.huoqiBalance = data.CurrentBal;
		});
	}
	//贷款查询
	$scope.RepayInfoQryFn = function() {
		$remote.post("RepayInfoQry.do", {}, function(data) {
			$scope.RePayList = data.RePayList;
			$scope.FinishList = data.FinishList;
		});
	};
	//跳到贷款详情页面
	$scope.turnToDetail = function(item) {
		$scope.RepayData = item;
		//$scope.RepayData为贷款模块公用数据，需保存到sessionStorage中
		sessionStorage.setItem("RepayDataString", vx.toJson($scope.RepayData));
		$scope.goto('appOther.LoanDetail');
	};
	//进入还款历史
	$scope.HisQry = function(item) {
		$scope.HisData = item;
		//为了跳转后续页面时记住选项
		$scope.$context.setNextScope({
			HisData : $scope.HisData
		}, "RepayHisQry");
		$scope.goto('appOther.RepayHisQry');
	};
	//贷款部分----------结束

	/**
	 * 获取 资产总额、昨日收益、累计收益
	 * 仅当所有接口获取数据后才回显数据，当返回数据显示未签约时，去除相关数据回显要求
	 * 页面显示的 资产总额(Assert)，昨日收益(LastIncome)，累计收益(TotalIncome)
	 * 是多个接口请求完成后结果相加得到的，所需计算字段分别保存在:
	 * `$scope.assert` ,`$scope.lastIncome`, `$scope.totalIncome`
	 *
	 * $scope.sum方法来实现当数组中所有字段都有值时，字段值相加并赋值；
	 *
	 * 多个接口异步请求可能会有的接口请求失败，这时字段值不会回显(*原客户端相关逻辑存在问题*)；
	 */
	$scope.fetchAllData = function() {
		$scope.lastIncome = ['PaidInterest', 'wdbLastProfit', 'wcfLastProfit'];
		$scope.totalIncome = ['SumInterest', 'TotalAllProfits', 'TotalProfit', 'ProfitAmount'];
		$scope.assert = ['Balance', 'TotalShare', 'AppointShare', 'TotalAmt', 'TotalZaituAmt', 'MktBalAmount'];

		// 请求接口数据
		$scope.postFundAppointAmountQry();
		$scope.postProfolioAmountQry();
		$scope.postFundHoldShareQryForJson();
		$scope.postWdbHoldShareQryForMAsset();
		$scope.postPEMToMQry();
		$scope.postEAcctBalQry();

		// 监听数据是否获取，成功后赋值
		$scope.sum('Assert', $scope.assert);
		$scope.sum('LastIncome', $scope.lastIncome);
		$scope.sum('TotalIncome', $scope.totalIncome);
	};

	$scope.postFundAppointAmountQry = function() {
		// 在途资金
		$remote.post('FundAppointAmountQry.do', {}, function(data) {
			$scope.ZaituAmtList = data.ZaituAmtList;
		});
	};
	$scope.postProfolioAmountQry = function() {
		// 银行理财-----IsSign为Y时，显示金额{MktBalAmount}
		$remote.post("ProfolioAmountQry.do", {}, function(data) {
			console.log(data);
			$scope.IsSign = data.IsSign === 'Y';
			if (!$scope.IsSign) {
				$scope.deleteItem($scope.assert, 'MktBalAmount');
				$scope.deleteItem($scope.totalIncome, 'ProfitAmount');
			} else {
				$scope.MktBalAmount = data.MktBalAmount;
				//行内理财持有金额
				$scope.ProfitAmount = data.ProfitAmount;
				//行内理财累计收益
			}
		});
	};
	$scope.postFundHoldShareQryForJson = function() {
		// 定期类产品----WcfIsSign为true时，显示金额{TotalAmt}
		$remote.post("FundHoldShareQryForJson.do", {}, function(data) {//定期
			$scope.WcfIsSign = data.WcfIsSign;
			if (!$scope.WcfIsSign) {
				$scope.deleteItem($scope.assert, ['TotalAmt', 'TotalZaituAmt']);
				$scope.deleteItem($scope.lastIncome, 'wcfLastProfit');
				$scope.deleteItem($scope.totalIncome, 'TotalProfit');
			} else {
				$scope.TotalAmt = data.TotalAmt;
				//微财富总持有金额
				$scope.wcfLastProfit = data.LastProfit;
				//微财富昨日收益
				$scope.TotalProfit = data.TotalProfit;
				//微财富总收益
				$scope.TotalZaituAmt = data.TotalZaituAmt;
			}
		});
	};
	$scope.postWdbHoldShareQryForMAsset = function() {
		// 活期类产品----BaoIsSign为true时，显示金额{TotalShare}
		$remote.post("WdbHoldShareQryForMAsset.do", {}, function(data) {
			$scope.BaoIsSign = data.BaoIsSign;
			if (!$scope.BaoIsSign) {
				$scope.deleteItem($scope.assert, ['TotalShare', 'AppointShare']);
				$scope.deleteItem($scope.lastIncome, 'wdbLastProfit');
				$scope.deleteItem($scope.totalIncome, 'TotalAllProfits');
			} else {
				$scope.TotalShare = data.TotalShare;
				//微袋宝份额
				$scope.wdbLastProfit = data.LastProfit;
				//微袋宝昨日收益
				$scope.TotalAllProfits = data.TotalAllProfits;
				//微袋宝累计收益
				$scope.AppointShare = data.AppointShare;
				//在途资金
			}
		});
	};
	$scope.postPEMToMQry = function() {
		// 银行存款数据
		// SignState : 'Y' / 'N'
		$remote.post("IsPEMToMSign.do", {}, function(data) {
			$scope.DepIsSign = (data.SignState === 'Y');
			if (!$scope.DepIsSign) {
				$scope.deleteItem($scope.totalIncome, 'SumInterest');
				$scope.deleteItem($scope.lastIncome, 'PaidInterest');
			} else {
				$remote.post("PEMToMQry.do", {}, function(data) {
					$scope.SumBalance = data.SumBalance;
					//一存永益账户余额
					$scope.SumInterest = data.SumInterest;
					//已支取项收益
					$scope.PaidInterest = data.PaidInterest;
					//一存永益昨日已付利息
				});
			}
		});
	};
	$scope.postEAcctBalQry = function() {
		//查询可用余额  电子账户余额查询，统计资产、购买宝宝、购买基金时使用
		$remote.post("EAcctBalQry.do", {}, function(data) {
			$scope.Balance = data.Balance;
			//账户余额
			$scope.availBalValue = data.AvailBal;
			//可用余额
		});
	};
	/**
	 * @helper
	 * delete item in array
	 */
	$scope.deleteItem = function(array, item) {
		if ( typeof item === 'string') {
			var index = array.indexOf(item);
			if (index >= 0) {
				array.splice(index, 1);
			}
		} else if ( item instanceof Array) {
			for (var i = 0; i < item.length; i++) {
				$scope.deleteItem(array, item[i]);
			}
		}
	};
	/**
	 * @helper
	 * 获取数组中值的总和（直到数组中的每一项都可转换为数值）
	 * eg:
	 * $scope.a = 12; $scope.b = 13;
	 * $scope.sum('result', ['a', 'b']) // => $scope.result = 25;
	 * */
	$scope.sum = function(solt, array) {
		$scope.$watch(function() {
			for (var i = 0; i < array.length; i++) {
				if (isNaN(parseFloat($scope[array[i]])))
					return false;
			}
			return true;
		}, function(isAllAvail) {
			if (isAllAvail) {
				$scope[solt] = array.reduce(function(sum, val) {
					return sum + parseFloat($scope[val]);
				}, 0);
			}
		});
	};
	// 总资产显隐控制
	$scope.showAmount = function() {
		$scope.isShowAmount = !$scope.isShowAmount;
	};
	$scope.gotoDetail = function() {// 跳转交易明细
		$scope.goto("appOther.InvestmentDetail");
	};
	// 跳转银行存款页面
	$scope.gotoBankProduct = function() {
		if ($scope.DepIsSign) {
			//$scope.goto('appOther.MySmartDeposit');
		} else {
			// 智能存款：未签约进入产品详情页
			//$scope.goto('appOther.SmartDeposit');
		}
	};
	// 跳转活期产品页面
	$scope.gotoDemand = function() {
		if ($scope.BaoIsSign) {
			//持有查询List
			$scope.goto('appOther.TLBHoldShareQry');
		} else {
			// 未签约过进入【活期产品列表】页面
			//$scope.goto('appOther.TLBProductList');
		}
	};
	// 跳转定期产品页面
	$scope.gotoRegular = function() {
		if ($scope.WcfIsSign) {
			$scope.goto('appOther.MyRegular');
		} else {
			$scope.goto('appOther.RegularList');
		}
	};
	// 跳转银行理财产品页面
	$scope.gotoBank = function() {
		if ($scope.IsSign) {
			$scope.goto('appOther.MyBankProduct');
		} else {
			$scope.goto('appOther.BankProductQuery');
		}
	};
	//我的资产和我的负债的切换
	$scope.changeType = function(dphvalue) {
		$scope.liFlag = dphvalue;
	};
	//已结清和未结清的切换
	$scope.changeSettle = function(settle) {
		$scope.settleFlag = settle;
	};
	//在途列表显示影藏
	$scope.togZaitu = function() {
		$scope.togZaituF = !$scope.togZaituF;
	};
	//我的负债问题
	$scope.questionShowFn = function() {
		$scope.tips = !$scope.tips;
	};
}]);
