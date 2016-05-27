angular.module("MyApp", []);

$(document).ready(function () {
    $(document).on("click", ".showMobile",
        showMobile
    )
    function showMobile() {
        $(this).siblings().css("background-color","");
        $(this).css("background-color","yellow");
        var mobID = $(this).attr("id");
        var allMobilesInfo = angular.fromJson(localStorage.getItem('mobileList'));
        for (var i = 0; i < allMobilesInfo.length; i++) {
            if (allMobilesInfo[i].id == mobID) {
                var mobileInfo = allMobilesInfo[i]
                $("#mobileInfo").html("<h1>Mobile Info:</h1><div><label>Model:</label> " + mobileInfo.model + "</div> <div> <label>Brand: </label> " + mobileInfo.brand + " </div> <div> <label>Memory: </label> " + mobileInfo.memory + " </div> <div> <label>Year:</label>" + mobileInfo.year + "</div>");
            }
        }
    }

});