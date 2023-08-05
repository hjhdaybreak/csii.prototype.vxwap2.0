BankInnerTransferCtrl.$inject = ['$scope', '$remote']

function BankInnerTransferCtrl($scope, $remote) {
    $scope.init = function () {
    };
    $scope.doPre = function () {

        let params = {
            amount: $scope.Amount
        };
        $remote.post("test.do", params, function (data) {
            $scope.goto("#2");
        })
    };
}