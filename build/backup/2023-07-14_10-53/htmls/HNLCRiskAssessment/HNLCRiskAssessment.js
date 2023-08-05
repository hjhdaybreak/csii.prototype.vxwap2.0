/**
 *行内理财风险评估
 */
ibsapp.register.controller("HNLCRiskAssessmentCtrl", ['$scope', '$remote', '$timeout', 'DateUtil', '$scrollPage', '$stateParams',
	function($scope, $remote, $timeout, DateUtil, $scrollPage, $stateParams) {
		var selectResult = {};
		$scope.questionIndex=1;
		$scope.questionFlag=0;
		$scope.init = function() {
			//$remote.post("RiskEvalutionQry.do",{},function(data){
            //
			//});
		};
		
		$scope.tijiao = function() {
			/**
			 * 确认是否勾选声明
			 */
			
			if(!$("#selected").hasClass('check02')){
				$scope.AlertErr("请阅读并同意《本人声明》的相关内容");
				return;
			}
			var answer = "";
			for(var i=1; i<=11; i++){
				if(i == 1){
					answer = selectResult[i];
				}else{
					answer += ","+selectResult[i];
				}
			}
			var formData = {
				"Answer" : answer
			};
			$remote.post("RiskEvalution.do", formData, function(data) {
				$scope.RiskEvalution = data;
				//$(".back").show();
				//$("#check3").show();
				$scope.pwdbox = true;
				$scope.IfTurnTo = true;
				$("#text-content").html("您当前的风险承受能力评估等级为<span style='color:#D61328;'>"+data.RiskExplain+"</span>");
			});
			
		};
		$scope.nextQuestion= function() {
			$scope.questionIndex+=1;
		};
		$scope.choose = function(questionNum,optionSelected) {
			if($scope.questionFlag<$scope.questionIndex){
				$scope.questionFlag+=1;
			}
			var aaa="#questionNum-"+questionNum+' li';
			var bbb="#questionNum-"+questionNum+"-"+optionSelected;
			$(aaa ).removeClass("slqriskclass1");
			$(bbb ).addClass("slqriskclass1");
			selectResult[questionNum] = optionSelected;
		};
		
		$scope.selected = function() {
			var img = $("#selected");
			var src = img.attr("src");
			if(src.indexOf("1")>-1){
				img.attr("src","images/hnlc-selected2.png");
				$("#button-id").addClass("active");
			}else{
				img.attr("src","images/hnlc-selected1.png");
				$("#button-id").removeClass("active");
			};			
		};

		$scope.remoberUser = function () {
			$('.check01').toggleClass("check02")
		};
		//弹出框
		$scope.openBox = function () {
			$scope.trsPassword = null;
			$scope.pwdbox = true;
		};
		//取消框
		$scope.closeBox = function () {
			$scope.pwdbox = false;
			$scope.goback('-1');
		};
		
	}]);
