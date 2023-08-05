/**
 *财富
 */
ibsapp.register.controller("WealthCtrl", ["$q", "$state", "$stateParams", "$cookieService", '$scope', '$remote',
function($q, $state, $stateParams, $cookieService, $scope, $remote) {
	//创建排序时的总List，把其他List结构拼接成微财富的List结构数据
	$scope.WealthTotalList = [];
	//初始化函数
	$scope.init = function() {

		sessionStorage.removeItem('zszyInfoData');
		sessionStorage.removeItem('BankProductObjString');

		$scope.changeSHash();
		$scope.defaultFlag = true;
		$scope.order = '-';
		//默认不排序----------分别展示各自的List开始
		// 微袋宝
		$scope.WdbProductQryFn();
		//微财富
		//$scope.FundProdListQryFn();
		//微智存  微理财
		//$scope.ProfolioLoginFn();
	};
	// 微袋宝
	$scope.WdbProductQryFn = function() {
		$remote.post("WdbProductQry.do", {}, function(data) {
			$scope.DCList = data.DCList;
			//把微袋宝List装进WealthTotalList中
			if ($scope.DCList && $scope.DCList.length > 0) {
				vx.forEach($scope.DCList, function(Obj, Obj_index) {
					Obj.PMinAmt = Number(Obj.PminInAmt);
					Obj.HoldDay = Number(Obj.HoliDay);
					Obj.AnnualReturnBy7 = Number(Obj.AnnualReturnBy7);
					Obj.FundName = Obj.ProdSubName;
					Obj.AnnualName = "七日年化收益率";
					Obj.ProductRiskLevel = '0';
					Obj.ProductRiskLevelName = "零风险";
					//财富类型 微袋宝
					Obj.WealthType = "TLB";
					$scope.WealthTotalList.push(Obj);
				});
			}
			//微财富
			$scope.FundProdListQryFn();
		}, function(data) {
			//微财富
			$scope.FundProdListQryFn();
		});

	};
	//微财富
	// 招商招益  FundStatus一个字段两种情况
	// FundStatus=2是最新净值  不等于2同类业绩参考
	// FundStatus 0 即将发售  1 可以买 2卖完了
	$scope.FundProdListQryFn = function() {
		$scope.ZhaoShangShouWanList = [];
		$scope.ZhaoShangNotShouWanList = [];
		$remote.post("FundProdListQry.do", {}, function(data) {
			//默认显示用
			$scope.ProdList = data.ProdList;
			//排序显示用
			$scope.WealthProdList = data.ProdList;
			$scope.StartBuyAmt = data.StartBuyAmt;
			//把微袋宝List装进WealthTotalList中
			if ($scope.WealthProdList && $scope.WealthProdList.length > 0) {
				vx.forEach($scope.WealthProdList, function(Obj, Obj_index) {
					if (Obj.FundType == "A") {//月月赢
						Obj.PMinAmt = Number($scope.StartBuyAmt);
						//财富类型月月赢
						Obj.WealthType = "YYY";
						Obj.HoldDay = Number(Obj.HoldDay);
						Obj.AnnualReturnBy7 = Number(Obj.AnnualReturnBy7);
						Obj.FundName = Obj.FundName;
						Obj.AnnualName = "七日年化收益率";
						Obj.ProductRiskLevel = "5";
						Obj.ProductRiskLevelName = "高风险";
						$scope.WealthTotalList.push(Obj);
					} else if (Obj.FundType == "B") {//招商
						Obj.PMinAmt = Number(Obj.PMinAmt);
						Obj.WealthType = "ZS";
						if (Obj.ProdSubId == "002001") {//ProdSubId == "002001"为招商招益
							if (Obj.FundStatus == "2") {//FundStatus==2售罄
								$scope.ZhaoShangShouWanList.push(Obj);
							} else if (Obj.FundStatus == "0") {
								Obj.AnnualReturnBy7 = Number(Obj.Benchmark);
								Obj.FundName = Obj.FundName;
								Obj.AnnualName = "同类业绩参考";
								Obj.ProductRiskLevel = "5";
								Obj.ProductRiskLevelName = "高风险";
								$scope.ZhaoShangNotShouWanList.push(Obj);
							} else {
								Obj.AnnualReturnBy7 = Number(Obj.Benchmark);
								Obj.FundName = Obj.FundName;
								Obj.AnnualName = "同类业绩参考";
								Obj.ProductRiskLevel = "5";
								Obj.ProductRiskLevelName = "高风险";
								$scope.WealthTotalList.push(Obj);
							}
						} else {
							Obj.AnnualReturnBy7 = Number(Obj.AnnualReturnBy7);
							Obj.FundName = Obj.FundName;
							Obj.AnnualName = "七日年化收益率";
							Obj.ProductRiskLevel = "5";
							Obj.ProductRiskLevelName = "高风险";
							$scope.WealthTotalList.push(Obj);
						}
					}
				});
			}
			//微智存  微理财
			$scope.ProfolioLoginFn();
		}, function(data) {
			//微智存  微理财
			$scope.ProfolioLoginFn();
		});
	};
	//微智存  微理财
	$scope.ProfolioLoginFn = function() {
		//微理财售罄List
		$scope.WeiLiCaiShouWanList = [];
		//微理财预售List
		$scope.WeiLiCaiYuShouList = [];
		$remote.post("ProfolioLogin.do", {}, function(data) {
			//微智存
			$scope.PEMap = data.PEMap;
			//创建微智存List,以便后面合并方便
			$scope.PEMapList = [];
			if ($scope.PEMap) {
				$scope.PEMapList.push($scope.PEMap);
			}
			//把微智存List装进WealthTotalList中
			if ($scope.PEMapList && $scope.PEMapList.length > 0) {
				vx.forEach($scope.PEMapList, function(Obj, Obj_index) {
					Obj.PMinAmt = Number(Obj.startMoney);
					Obj.HoldDay = Number(Obj.HoliDay);
					Obj.AnnualReturnBy7 = Number(Obj.yearRate);
					Obj.FundName = "智能存款";
					Obj.AnnualName = "最高年利率";
					Obj.ProductRiskLevel = "0";
					Obj.ProductRiskLevelName = "零风险";
					//财富类型微智存
					Obj.WealthType = "WZC";
					$scope.WealthTotalList.push(Obj);
				});
			}
			//微理财   State:1预售2购买3售罄
			$scope.LCList = data.LCList;
			//把微理财List装进WealthTotalList中
			if ($scope.LCList && $scope.LCList.length > 0) {
				vx.forEach($scope.LCList, function(Obj, Obj_index) {
					//财富类型 微理财
					Obj.WealthType = "HNLC";
					Obj.ProductRiskLevel = Number(Obj.ProductRiskLevel);
					if (Obj.ProductRiskLevel == "1") {
						Obj.ProductRiskLevelName = "极低风险";
					} else if (Obj.ProductRiskLevel == "2") {
						Obj.ProductRiskLevelName = "低风险";
					} else if (Obj.ProductRiskLevel == "3") {
						Obj.ProductRiskLevelName = "较低风险";
					} else if (Obj.ProductRiskLevel == "4") {
						Obj.ProductRiskLevelName = "中风险";
					} else if (Obj.ProductRiskLevel == "5") {
						Obj.ProductRiskLevelName = "高风险";
					}
					if (Obj.State == '3') {
						$scope.WeiLiCaiShouWanList.push(Obj);
					} else if (Obj.State == '1') {
						$scope.WeiLiCaiYuShouList.push(obj);
					} else if (Obj.State == '2') {
						Obj.PMinAmt = Number(Obj.PerFirstApplyPrice);
						Obj.HoldDay = Number(Obj.ProductDay);
						Obj.AnnualReturnBy7 = Number(Obj.YieldBig);
						Obj.FundName = Obj.ProductName;
						Obj.AnnualName = "预期年化收益率";
						$scope.WealthTotalList.push(Obj);
					}

				});
			}
		});
		$scope.WealthTotalList_temp = $scope.WealthTotalList;
	};
	//选择排序函数
	$scope.SelectTypeFn = function(type) {
		$("li#qixian").removeClass("wealthselectdown wealthselectup");
		$("li#shouyi").removeClass("wealthselectyielddown");
		$("li#qishijine").removeClass("wealthselectamountup");
		$scope.type = type;
		$scope.defaultFlag = false;
		if ($scope.type == "HoldDay") {
			$scope.orderType = $scope.type;
			if ($scope.order == "+") {
				//产品期限从高到低
				$scope.order = "-";
				$("li#qixian").addClass("wealthselectdown");
				var a = $scope.WealthTotalList_temp;
				var n = $scope.WealthTotalList_temp.length;
				for (var k, j = 1; j < n; j++) {
					for (var i = 0; i < n - j; i++) {
						//产品期限从高到低
						if (a[i].HoldDay < a[i + 1].HoldDay) {
							k = a[i];
							a[i] = a[i + 1];
							a[i + 1] = k;
						}
						if (a[i].HoldDay == a[i + 1].HoldDay) {
							//产品期限相同，收益从高到底
							if (a[i].AnnualReturnBy7 < a[i + 1].AnnualReturnBy7) {
								k = a[i];
								a[i] = a[i + 1];
								a[i + 1] = k;
							}
						}
						if (a[i].HoldDay == a[i + 1].HoldDay) {
							if (a[i].AnnualReturnBy7 == a[i + 1].AnnualReturnBy7) {
								//产品期限相同，收益相同，价格从低到高
								if (a[i].PMinAmt > a[i + 1].PMinAmt) {
									k = a[i];
									a[i] = a[i + 1];
									a[i + 1] = k;
								}
							}
						}

					}
				}
				$scope.WealthTotalList_last = a;
			} else {
				//产品期限从低到高排序
				$scope.order = "+";
				$("li#qixian").addClass("wealthselectup");
				var a = $scope.WealthTotalList_temp;
				var n = $scope.WealthTotalList_temp.length;
				for (var k, j = 1; j < n; j++) {
					for (var i = 0; i < n - j; i++) {
						//产品期限从低到高
						if (a[i].HoldDay > a[i + 1].HoldDay) {
							k = a[i];
							a[i] = a[i + 1];
							a[i + 1] = k;
						}
						if (a[i].HoldDay == a[i + 1].HoldDay) {
							//产品期限相同，收益从高到底
							if (a[i].AnnualReturnBy7 < a[i + 1].AnnualReturnBy7) {
								k = a[i];
								a[i] = a[i + 1];
								a[i + 1] = k;
							}
						}
						if (a[i].HoldDay == a[i + 1].HoldDay) {
							if (a[i].AnnualReturnBy7 == a[i + 1].AnnualReturnBy7) {
								//产品期限相同，收益相同，价格从低到高
								if (a[i].PMinAmt > a[i + 1].PMinAmt) {
									k = a[i];
									a[i] = a[i + 1];
									a[i + 1] = k;
								}
							}
						}

					}
				}
				$scope.WealthTotalList_last = a;
			}
		} else if ($scope.type == "AnnualReturnBy7") {
			$scope.order = '-';
			$("li#shouyi").addClass("wealthselectyielddown");
			var a = $scope.WealthTotalList_temp;
			var n = $scope.WealthTotalList_temp.length;
			for (var k, j = 1; j < n; j++) {
				for (var i = 0; i < n - j; i++) {
					//收益率从高到低
					if (a[i].AnnualReturnBy7 < a[i + 1].AnnualReturnBy7) {
						k = a[i];
						a[i] = a[i + 1];
						a[i + 1] = k;
					}
					if (a[i].AnnualReturnBy7 == a[i + 1].AnnualReturnBy7) {
						//收益率相同，产品期限从低到高
						if (a[i].HoldDay > a[i + 1].HoldDay) {
							k = a[i];
							a[i] = a[i + 1];
							a[i + 1] = k;
						}
					}
					if (a[i].AnnualReturnBy7 == a[i + 1].AnnualReturnBy7) {
						if (a[i].HoldDay == a[i + 1].HoldDay) {
							//收益率相同，产品期限相同，价格从低到高
							if (a[i].PMinAmt > a[i + 1].PMinAmt) {
								k = a[i];
								a[i] = a[i + 1];
								a[i + 1] = k;
							}
						}
					}

				}
			}
			$scope.WealthTotalList_last = a;
		} else if ($scope.type == "PMinAmt") {
			$scope.order = '-';
			$("li#qishijine").addClass("wealthselectamountup");
			var a = $scope.WealthTotalList_temp;
			var n = $scope.WealthTotalList_temp.length;
			for (var k, j = 1; j < n; j++) {
				for (var i = 0; i < n - j; i++) {
					//起始金额从低到高
					if (a[i].PMinAmt > a[i + 1].PMinAmt) {
						k = a[i];
						a[i] = a[i + 1];
						a[i + 1] = k;
					}
					if (a[i].PMinAmt == a[i + 1].PMinAmt) {
						//起始金额相同，收益从高到底
						if (a[i].AnnualReturnBy7 < a[i + 1].AnnualReturnBy7) {
							k = a[i];
							a[i] = a[i + 1];
							a[i + 1] = k;
						}
					}
					if (a[i].PMinAmt == a[i + 1].PMinAmt) {
						if (a[i].AnnualReturnBy7 == a[i + 1].AnnualReturnBy7) {
							//起始金额相同，收益相同，产品期限从低到高
							if (a[i].HoldDay > a[i + 1].HoldDay) {
								k = a[i];
								a[i] = a[i + 1];
								a[i + 1] = k;
							}
						}
					}

				}
			}
			$scope.WealthTotalList_last = a;
		}
	};
	//跳详情页面
	$scope.gotoDetail = function(row) {
		switch (row.WealthType) {
			case "ZS":
				sessionStorage.setItem("ZSZYdetail", vx.toJson('wealth'));
				if (row.ProdSubId == '002001' && row.FundStatus == 1) {
					//招商招益
					var zszyInfo = {
						"ProdId" : row.ProdId,
						"ProdSubId" : row.ProdSubId,
						"FundCode" : row.FundCode,
						"FundName" : row.FundName
					};
					sessionStorage.setItem("zszyInfoData", vx.toJson(zszyInfo));
					$scope.goto("appOther.ZSZYDetail");
				}
				break;
			case "YYY":
				if (row.ProdSubId != '002001') {
					//sessionStorage.setItem("YYYdetail", vx.toJson('wealth'));
					//$scope.goto("appOther.YYY_Query");
				};
				//月月盈
				break;
			case "TLB":
				//sessionStorage.setItem("preTLB_ProductSearchPageUrl", 'app.Wealth');
				//$scope.goto("appOther.TLB_ProductSearch");
				//添利宝
				break;
			case "WZC":
				//$scope.goto("appOther.SmartDeposit");
				//微智存
				break;
			case "HNLC":
				if (row.State == 2) {
					params = {
						"row" : row
					};
					params.flag = "wealth";
					sessionStorage.setItem("BankProductObjString", vx.toJson(params));
					// $scope.$context.setNextScope(params, "BankProductQueryDetail");
					$scope.goto("appOther.BankProductQueryDetail");
					//行内理财
				}
				break;
			default:
				$scope.goto("app.Wealth");
		}

	};
}]);
