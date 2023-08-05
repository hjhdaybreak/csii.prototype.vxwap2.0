/*
	我的消息列表
 */
ibsapp.register.controller("MyNewsCtrl", ['$scope', '$remote',
    function ($scope, $remote) {
        $scope.init = function () {
        	$remote.post("NoticeQry.do", {}, function(data) {
			$scope.List = data.List;
		});
        };
        $scope.tonews_detial = function (row){
        	$scope.detailInfo = row;
        	setTimeout(function(){
			$scope.goto("#2");
		},300);
        };
    }
]);