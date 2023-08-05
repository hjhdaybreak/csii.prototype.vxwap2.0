/**
 * 个人信息查询
 */
ibsapp.register.controller("MyInformationCtrl", ['$scope', '$remote', '$timeout', '$filter',
function($scope, $remote, $timeout, $filter) {
	$scope.init = function() {
		$scope.closeSlideBar();
		$scope.userInfo = {};
		$remote.post("InfoModifyPre.do", {}, function(data) {
			data.MobilePhone = $filter('dimPhoneNumFilter')(data.MobilePhone);
			vx.extend($scope.userInfo, data);
		});
		// 请求头像和昵称 IdImgBase(base64) 和 NickName TODO jt 接口暂时未返回数据
		$remote.post("QueryHeadImg.do", {}, function(data) {
			vx.extend($scope.userInfo, data);
		});
		//查询短信提醒状态
		$remote.post("MessageNotifyPre.do", {}, function(data) {
			//短信提醒相关信息
			$scope.msgInfo = data.json;
		});
	};

	$scope.downloadApp = function() {
		$scope.goto('appOther.DownApp');
	};

	//弹出密码输入框
	$scope.changeState = function() {
		$("#trsPwd").val("");
		$("#trsPwd").attr("sf_uuid", "");
		$scope.pwdbox = true;
	};
	//取消密码输入框
	$scope.closeBox = function() {
		$scope.pwdbox = false;
	};
	//短信提醒状态变更
	$scope.doChange = function() {
		if (!$("#trsPwd").val()) {
			$scope.AlertErr("交易密码不能为空");
			return;
		}
		if ($("#trsPwd").val().length < 6) {
			$scope.AlertErr("交易密码格式不正确");
			return;
		}
		// $scope.pwdbox控制密码框显隐
		$scope.pwdbox = false;
		$remote.post("GenToken.do", {}, function(data) {
			$scope._tokenName = data;
			var params = {
				"_tokenName" : $scope._tokenName, //返回的验证码
				"AcNo" : $scope.msgInfo.AcctNo, //帐号
				"TrsPassword" : $scope.uuid = $("#trsPwd").attr("sf_uuid"), //密码
				//"uuidTrsPassword":$scope.uuid=$("#trsPwd").attr("sf_uuid"),
				"RelationState" : $scope.msgInfo.RelationState //目前的短信提醒状态
			};
			$remote.post("MessageAdvice.do", params, function(data) {
				$remote.post("MessageNotifyPre.do", {}, function(data) {
					$scope.msgInfo = data.json;
				});
			});
		});
	};
}]);
