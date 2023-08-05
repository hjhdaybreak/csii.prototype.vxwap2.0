/**
 *我的银行卡
 */
ibsapp.register.controller("MyBankCardCtrl", ['$scope', '$remote', '$stateParams',
function($scope, $remote, $stateParams) {
	$scope.init = function() {
		$scope.closeSlideBar();    //关闭侧拉抽屉
		$scope.showOrHide = true;
		$scope.showFlag = false;  //信息提示框，默认隐藏

		//电子账户信息
		$remote.post("EAcctBalQry.do", {}, function(data) {
			$scope.AvailBal = data.AvailBal;   //可用余额
			$scope.EAcct = data.EAcct;			//电子账户号
			$scope.CreateTime = data.CreateTime;  //开户时间
		});

		//绑定卡/支付卡信息
		$remote.post("QueryBoundCard.do", {}, function(data) {
			$scope.BoundCard = data.BoundCard;    //绑定卡信息
			$scope.PayCardList = data.PayCardList;   //支付卡信息
			//如果不存在绑定卡，隐藏绑定卡div；如果存在，则length+1
			if (!data.BoundCard) {
				$scope.isExist = false;
				$scope.length = $scope.PayCardList.length;
			} else {
				$scope.isExist = true;
				$scope.length = $scope.PayCardList.length + 1;
			}

			//查询绑定卡可转出限额
			if(data.BoundCard){
	            $remote.post("QueryLimitAmount.do", {
					"PayeeAccountNo" : $scope.BoundCard.no
				}, function(data) {
					$scope.LimitAmount1 = data.OrignLimitAmount;
				});
			}
            if($scope.PayCardList && $scope.PayCardList.length>0){
               	$scope.LimitAmount=[];
				for (var i = 0; i < $scope.PayCardList.length; i++) {
					$remote.post("QueryLimitAmount.do", {
						"PayeeAccountNo":$scope.PayCardList[i].no
					}, function(data) {
						$scope.LimitAmount.push(data.OrignLimitAmount);
					});
				}
            }
		});
	};
	
	
	//进入绑定卡/支付卡详情页
	$scope.gotoDetail = function(row) {
		if (vx.isEmpty(row)) {    //row为空表示进入的是绑定卡
			$scope.$context.setNextScope({"BoundCardNo" : $scope.BoundCard.no},"MyBankCardInvestmentDetail");
			$scope.goto('appOther.MyBankCardInvestmentDetail');
		} else {	//row不为空表示进入的是支付卡
			$scope.$context.setNextScope({"BoundCardNo" : row.no},"MyBankCardInvestmentDetail");
			$scope.goto('appOther.MyBankCardInvestmentDetail');
		}
	}
	
	//进入资金转入交易
	$scope.gotoMoneyIn = function() {
		$scope.goto('appOther.MoneyIn');
	}

	//进入资金转出交易
	$scope.gotoMoneyOut = function() {
		$scope.goto('appOther.MoneyOut');
	}
	
	//进入常见问题交易
	$scope.gotoComProblem = function() {
		$scope.goto('appOther.ComQuestion');
	}
	
	//弹出/隐藏信息提示框
	$scope.tip = function() {
		$scope.showFlag = !$scope.showFlag;
	}
	
}]);
