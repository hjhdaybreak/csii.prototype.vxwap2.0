/**
 *实名认证
 */
ibsapp.register.controller("NameAuthCtrl", ["$scope", "$remote", "$takePhoto",
function($scope, $remote, $takePhoto) {
	$scope.init = function() {
		$scope.positiveImg = $takePhoto("positiveImg", "positiveImgBox", '1');
		$scope.oppositeImg = $takePhoto("oppositeImg", "oppositeImgBox", '1');
		$scope.handImg = $takePhoto("handImg", "handImgBox", '1');
		$scope.qryAuth();
	};
	$scope.qryAuth = function() {//查询是否进行过实名认证
		$remote.post("QryRealNameAuthResult.do", {}, function(data) {
			$scope.authFlag = data.UploadIdentity;
			$scope.AuthTime = data.AuthTime ? data.AuthTime : '';
			$scope.RejectType = data.RejectType ? data.RejectType : '';
		});
	};
	$scope.doAuth = function() {//实名认证
		var frontImg = $scope.positiveImg.getList();
		var backImg = $scope.oppositeImg.getList();
		var handImg = $scope.handImg.getList();
		if (!frontImg) {
			$scope.AlertErr("请上传正面照");
			return;
		}
		if (!backImg) {
			$scope.AlertErr("请上传反面照");
			return;
		}
		if (!handImg) {
			$scope.AlertErr("请上传手持证件照");
			return;
		}
		var params = {
			"IdentityFrontString" : frontImg,
			"IdentityBackString" : backImg,
			"PhotoString" : handImg
		};
		$remote.post("RealNameAuth.do", params, function(data) {
			//$(".titleFixTopDef").hide();
			//$(".authResult").show();
			$scope.reAuthFlag = false;
			$scope.authFlag = data.UploadIdentity;
			$scope.AuthTime = data.AuthTime ? data.AuthTime : '';
			$scope.RejectType = data.RejectType ? data.RejectType : '';
			$scope.reAuthFlag = false;
		});
	};
	//重新认证
	$scope.reAuth = function() {
		$scope.reAuthFlag = true;
		$scope.positiveImg.clear(); 
		$("#positiveImgBox").attr("src","images/photo1.png");
	    $scope.oppositeImg.clear(); 
	    $("#oppositeImgBox").attr("src","images/photo2.png");
	    $scope.handImg.clear(); 
	    $("#handImgBox").attr("src","images/photo3.png");
	};
}]);
