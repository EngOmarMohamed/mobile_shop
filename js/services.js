angular.module("MyApp")
    .factory("Mob_Service", ['$filter', function ($filter) {
        return {
            "list": function () {
                //localStorage.removeItem('mobileList')
                return angular.fromJson(localStorage.getItem('mobileList'));

            },
            "add": function (mobile) {

                var oldMobiles = angular.fromJson(localStorage.getItem('mobileList')) || [];

                if (oldMobiles.length !== 0) {

                    var oldMobilesLength = oldMobiles.length - 1;

                    var lastID = oldMobiles[oldMobilesLength].id;

                    id = lastID + 1;

                } else {
                    id = 1;
                }
                mobile.id = id;

                oldMobiles.push(mobile);

                localStorage.setItem("mobileList", angular.toJson(oldMobiles));
                alert("the mobile is added successfully");

            },
        }
    }]);