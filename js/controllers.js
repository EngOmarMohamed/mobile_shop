angular.module("MyApp")
    .controller("MainCtrl", ["Mob_Service", function (Mob_Service) {
        var self = this;
        self.mobile = {
            "id": "",
            "model": "",
            "brand": "",
            "year": "",
            "memory": ""
        };
        self.submit = function () {
            Mob_Service.add(self.mobile);
        };

        self.listData = function () {
            return Mob_Service.list();
        }
        self.list = self.listData();

    }]);
