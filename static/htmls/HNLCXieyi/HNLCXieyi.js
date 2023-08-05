/**
 *行内理财协议
 */
ibsapp.register.controller("HNLCXieyiCtrl", ['$scope', '$remote', '$timeout', '$stateParams',
    function($scope, $remote, $timeout, $stateParams) {

        $scope.init = function() {
            $("#texthtml").html('');

            //$scope.$root.AppendBuyProductCode = $scope.AppendBuyProductCode;
            var mydata = {
                "ProductCode": $scope.ProductCode,
                "XieYiType": $scope.textType
            };

            $remote.post("ProfolioXieYi.do", mydata, function(data) {
                if (data && data.text) {
                    var text = data.text;
                    text = text.replace(/@@/g, "\"");
                    $("#texthtml").html(text);
                    $("table").attr("width", "90%");
                    $("table").css("margin-left", "10px");
                    $("td").attr("width", "");
                    $("td").attr("height", "");
                    $("td").css("width", "auto");
                    $("td").css("padding", "0px 0px");
                    $("td").css("height", "auto");
                    $("td").attr("valign", "center");
                    $("td p span").css("word-break", "break-all");
                }

            });

        }

    }
]);
