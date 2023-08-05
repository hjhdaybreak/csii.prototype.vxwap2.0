/**
 *主页
 */
ibsapp.register.controller("RealNameAuthenticateCtrl", ['$scope', '$remote', '$timeout',
    function($scope, $remote, $timeout) {
        $scope.init = function() {
           $scope.cardNo="6217711300173307";
           $scope.certType="01";
           $scope.certNo="340102198212062039";
           $scope.usrName="张三";
           $scope.cardPhone="18515067890";
        };
        $scope.doSubmit=function(){
            var params={
            	cardNo:$scope.cardNo,
                certType:$scope.certType,
                certNo:$scope.certNo,
                usrName:$scope.usrName,
                cardPhone:$scope.cardPhone
            }
            $remote.post("",params,function(data){
                $("#signature").val();
                $("#authenticateF").submit();
            });
        }
    }
]);
