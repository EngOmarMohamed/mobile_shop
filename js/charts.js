$(document).ready(function () {
    $(document).on("click", ".showMobile",
        showMobile
    )
    function showMobile() {
        $(this).siblings().css("background-color", "");
        $(this).css("background-color", "yellow");
        var mobID = $(this).attr("id");
        var allMobilesInfo = angular.fromJson(localStorage.getItem('mobileList'));
        for (var i = 0; i < allMobilesInfo.length; i++) {
            if (allMobilesInfo[i].id == mobID) {
                var mobileInfo = allMobilesInfo[i]
                $("#mobileInfo").html("<h1>Mobile Info:</h1><div><label>Model:</label> " + mobileInfo.model + "</div> <div> <label>Brand: </label> " + mobileInfo.brand + " </div> <div> <label>Memory: </label> " + mobileInfo.memory + " </div> <div> <label>Year:</label>" + mobileInfo.year + "</div>");
            }
        }
    }


    //Bar Chart for manfufacture year
    var width = 200, height = 200;
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var yearObj = {};
    var yearArray = [];
    var allMobilesInfo = angular.fromJson(localStorage.getItem('mobileList'));
    for (var i = 0; i < allMobilesInfo.length; i++) {
        yearObj[allMobilesInfo[i].year] = (yearObj[allMobilesInfo[i].year] || 0) + 1;
    }

    for (i in yearObj) {
        var sortObj = {};
        sortObj["x"] = i;
        sortObj["y"] = yearObj[i];
        yearArray.push(sortObj);
    }

    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var yScale = d3.scale.linear()
        .range([height, 0]);

    xScale.domain(yearArray.map(function (d) {
        return d.x;
    }));
    yScale.domain([0, d3.max(yearArray, function (d) {
        return d.y;
    })]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(d3.max(yearArray, function (d) {
            return d.y;
        }));

    var svg = d3.select("#barChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll(".bar")
        .data(yearArray)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return xScale(d.x);
        })
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.y);
        })
        .attr("height", function (d) {
            return height - yScale(d.y);
        });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("count");




    //Donut Chart for Brand

    var brandObj = {};
    var brandArray = [];
    var allMobilesInfo = angular.fromJson(localStorage.getItem('mobileList'));
    for (var i = 0; i < allMobilesInfo.length; i++) {
        brandObj[allMobilesInfo[i].brand] = (brandObj[allMobilesInfo[i].brand] || 0) + 1;
    }

    for (i in brandObj) {
        var sortObj = {};
        sortObj["x"] = i;
        sortObj["y"] = brandObj[i];
        brandArray.push(sortObj);
    }


    var pie = d3.layout.pie()
        .value(function (d) {
            return d.y
        })
        .sort(null)
        .padAngle(.03);

    var width = 300
    var height = 300;

    var outerRadius = Math.min(width, height) / 2;
    var innerRadius = 100;

    var color = d3.scale.category10();

    var arc = d3.svg.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    var svg = d3.select("#donutChart")
        .append("svg")
        .attr({
            width: width,
            height: height,
            class: 'shadow'
        }).append('g')
        .attr({
            transform: 'translate(' + width / 2 + ',' + height / 2 + ')'
        });
    var path = svg.selectAll('path')
        .data(pie(brandArray))
        .enter()
        .append('path')
        .attr({
            d: arc,
            fill: function (d, i) {
                return color(d.data.x);
            }
        });


    (function () {
        var text = svg.selectAll('text')
            .data(pie(brandArray))
            .enter()
            .append("text")
            .transition()
            .duration(200)
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".4em")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.data.y;
            })
            .style({
                fill: '#fff',
                'font-size': '10px'
            });

        var legendRectSize = 20;
        var legendSpacing = 7;
        var legendHeight = legendRectSize + legendSpacing;


        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr({
                class: 'legend',
                transform: function (d, i) {
                    return 'translate(-35,' + ((i * legendHeight) - 65) + ')';
                }
            });
        legend.append('rect')
            .attr({
                width: legendRectSize,
                height: legendRectSize,
                rx: 20,
                ry: 20
            })
            .style({
                fill: color,
                stroke: color
            });

        legend.append('text')
            .attr({
                x: 30,
                y: 15
            })
            .text(function (d) {
                if (d) {
                    return d;
                } else {
                    return "other";
                }
            }).style({
            fill: '#929DAF',
            'font-size': '14px'
        });
    })();

});