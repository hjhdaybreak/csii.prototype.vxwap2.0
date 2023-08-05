VXTest03Ctrl.$inject['$scope'];

function VXTest03Ctrl($scope) {
    $scope.startup = function () {
        $scope.helloword = "你好,科蓝";
        $scope.flag = true;
    };
}
