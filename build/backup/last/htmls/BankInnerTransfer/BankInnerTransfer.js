BankInnerTransferCtrl.$inject = ['$scope']

function BankInnerTransferCtrl($scope) {
    $scope.startup = function () {
        console.log(12323)
    };
    $scope.doPre = function () {
        $scope.goto("#2");
    };
    $scope.doConfirm = function () {
        $scope.goto("#3");
    };
}