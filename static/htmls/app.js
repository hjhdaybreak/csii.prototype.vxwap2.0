ibsapp.register.controller("appCtrl", ['$scope', '$remote', 'someService', 'someFactory', 'someProvider',

    //服务学习
    // function ($scope, someService, someFactory, someProvider) {
    //     someService.getData().then(function (data) {
    //         console.log("-----------someService---------")
    //         console.log(data)
    //     })
    //     someFactory.getData().then(function (data) {
    //         console.log("-----------someFactory----------")
    //         console.log(data)
    //     })
    //     someProvider.getData().then(function (data) {
    //         console.log("-----------someProvider---------")
    //         console.log(someProvider)
    //         console.log(data)
    //     })
    // }

    //指令学习
    function ($scope, $remote) {
        $scope.obj = "string";
        $scope.startup = function () {
        };
        $scope.show = function () {
            console.log("show function called")
        }
        $scope.dataList = ["a", "b", "c"];
        $scope.parentFn = function (item) {
            console.log("fn in parent scope");
            console.log(item);
        };
    }
])
;
