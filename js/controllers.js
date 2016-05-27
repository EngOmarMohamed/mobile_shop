//var mobileInfo = {};
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
        //self.mobileInfo = {
        //    "model": "ss",
        //    "brand": "ff",
        //    "year": "ff",
        //    "memory": "gg"
        //};
        self.submit = function () {
            Mob_Service.add(self.mobile);
        };

        self.listData = function () {
            return Mob_Service.list();
        }
        self.list = self.listData();

        //self.setX = function (id) {
        //    //console.log(id);
        //    //return id;
        //    //console.log(self.varia);
        //    mobileInfo = Mob_Service.show(id);
        //};

    }]);


            //console.log(mobileInfo);
