angular.module("MyApp")
    .factory("Mob_Service", ['$filter', function ($filter) {
        return {
            "list": function () {
                return angular.fromJson(localStorage.getItem('mobileList'));
            },
            "add": function (mobile) {
                //Add Mobile Data to Localstorage
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
                $(':input','#add_form')
                    .not(':button, :submit, :reset, :hidden')
                    .val('')
                    .removeAttr('checked')
                    .removeAttr('selected');
                alert("the mobile is added successfully");

            },
        }
    }]);