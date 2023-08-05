ibsapp.service('someService', ['$http', '$q', function ($http, $q) {
    this.getData = function () {
        const d = $q.defer();
        $http.post("/local/service.do").success(function (response) {
            d.resolve(response);
        }).error(function () {
            d.reject("error");
        });
        return d.promise;
    };
}]);

ibsapp.factory('someFactory', ['$http', '$q', function ($http, $q) {
    return {
        getData: function () {
            const d = $q.defer();
            $http.post("/local/factory.do").success(function (response) {
                d.resolve(response);
            }).error(function () {
                d.reject("error");
            });
            return d.promise;
        }
    }
}]);

ibsapp.provider('someProvider', function () {
    let name = "";
    this.setName = function (newName) {
        name = newName;
    };
    this.$get = ['$http', '$q', function ($http, $q) {
        return {
            getData: function () {
                var d = $q.defer();
                $http.post("/local/provider.do").success(function (response) {
                    d.resolve(response);
                }).error(function () {
                    d.reject("error");
                });
                return d.promise;
            },
            "name": name
        }
    }];
});