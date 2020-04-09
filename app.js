//Set up chart
var svgWidth = 960;
var svgHeight = 620;

var margin = {
    top: 25,
    right: 35,
    bottom: 150,
    left: 100
};

//Calculate chart height and width
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Append a div classed chart to the scatter element
var chart = d3.select("#scatter").append("div").classed("chart", true);

//Append a svg and group
var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Name Parameters
var poundsXaxis = "Pounds";
var dateYaxis = "Date";

//Function Updating Scale/Axis When Clicked
function xScale(data, poundsXaxis) {
    //create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[poundsXaxis]) * 0.8,
            d3.max(data, d => d[poundsXaxis]) * 1.2])
        .range([0, width]);

    return xLinearScale;
}

function yScale(data, dateYaxis) {
    //create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[dateYaxis]) * 0.8,
            d3.max(data, d => d[dateYaxis]) * 1.2])
        .range([height, 0]);

    return yLinearScale;
}

function renderAxesX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

function renderAxesY(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

//Function updating circlesGroup transitiong to new circles 
function renderCircles(circlesGroup, newXScale, poundsXaxis, newYScale, dateYaxis) {

    circlesGroup.transition()
        .duration(800)
        .attr("cx", data => newXScale(data[poundsXaxis]))
        .attr("cy", data => newYScale(data[dateYaxis]));

    return circlesGroup;
}

function renderText(textGroup, newXScale, poundsXaxis, newYScale, dateYaxis) {

    textGroup.transition()
        .duration(800)
        .attr("x", d => newXScale(d[poundsXaxis]))
        .attr("y", d => newYScale(d[dateYaxis]));

    return textGroup;
}
//X-axis values for tooltips
function styleX(value, poundsXaxis) {

    if (poundsXaxis === 'Pounds') {
        return `${value}%`;
    }

    else if (poundsXaxis === 'Date') {
        return `$${value}`;
    }
    //age (number)
    else {
        return `${value}`;
    }
}

// Update circlesGroup with ToolTip
function updateToolTip(poundsXaxis, dateYaxis, circlesGroup) {

    if (poundsXaxis === 'Pounds') {
        var xLabel = "Pounds:";
    }
    
    else if (poundsXaxis === 'Date') {
        var xLabel = "Date:";
    }
    
    else {
        var xLabel = "Month:";
    }

    if (dateYaxis === 'port') {
        var yLabel = "Port:"
    }

    else if (dateYaxis === 'years') {
        var yLabel = "Years:"
    }
   
    else {
        var yLabel = "Grain:"
    }

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            return (`${d.state}<br>${xLabel} ${styleX(d[poundsXaxis], poundsXaxis)}<br>${yLabel} ${d[dateYaxis]}%`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide);

    return circlesGroup;
}

//Import data from the grain.csv file
d3.csv("Grain_Inspections.csv").then(function(data) {
  console.log(data)

    //Parse the data
    //Format the data and convert
    data.forEach(function(data) {
        data.Date = +data.Date;
        data.Grain = +data.Grain;
        data.Carrier_Name = +data.Carrier_Name;
        data.Destination = +data.Destination;
        data.FGIS_Reg = +data.FGIS_Reg;
        data.MT = +data.MT;
        data.Pounds = +data.Pounds;
    });

    //Create Scales
    var xLinearScale = xScale(data, poundsXaxis);
    var yLinearScale = yScale(data, dateYaxis);

    //Create Axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append the axes to the chartGroup
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    //Append Circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xLinearScale(d[poundsXaxis]))
        .attr("cy", d => yLinearScale(d[dateYaxis]))
        .attr("r", 12)
        .attr("opacity", ".5");

    //Append Text
    var textGroup = chartGroup.selectAll(".stateText")
        .data(data)
        .enter()
        .append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d[poundsXaxis]))
        .attr("y", d => yLinearScale(d[dateYaxis]))
        .attr("dy", 3)
        .attr("font-size", "10px")
        .text(function(d){return d.abbr});

    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20 + margin.top})`);

    var PoundsLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "Pounds")
        .text("Pounds");

    var Carrier_NameLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "Carrier")
        .text("Carrier")

    var DestinationLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "Destination")
        .text("Destination")

    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${0 - margin.left/4}, ${(height/2)})`);

    var DateLabel = yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 0 - 20)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "Date")
        .text("Date");

    var YearLabel = yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 0 - 40)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "Year")
        .text("Year");

    var GrainLabel = yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 0 - 60)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "Grain")
        .text("Grain");

    var circlesGroup = updateToolTip(poundsXaxis, dateYaxis, circlesGroup);

    //x axis labels event listener
    xLabelsGroup.selectAll("text")
        .on("click", function() {
            //get value of selection
            var value = d3.select(this).attr("value");

            //check if value is same as current axis
            if (value != poundsXaxis) {

                //replace poundsXaxis with value
                poundsXaxis = value;

                //update x scale for new data
                xLinearScale = xScale(data, poundsXaxis);

                //update x axis with transition
                xAxis = renderAxesX(xLinearScale, xAxis);

                //update circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, poundsXaxis, yLinearScale, dateYaxis);

                //update text with new x values
                textGroup = renderText(textGroup, xLinearScale, poundsXaxis, yLinearScale, dateYaxis);

                //update tooltips with new info
                circlesGroup = updateToolTip(poundsXaxis, dateYaxis, circlesGroup);

                //change classes to change bold text
                if (poundsXaxis === "date") {
                    PoundsLabel.classed("active", true).classed("inactive", false);
                    Carrier_NameLabel.classed("active", false).classed("inactive", true);
                    DestinationLabel.classed("active", false).classed("inactive", true);
                }
                else if (poundsXaxis === "carrier") {
                    PoundsLabel.classed("active", false).classed("inactive", true);
                    Carrier_NameLabel.classed("active", true).classed("inactive", false);
                    DestinationLabel.classed("active", false).classed("inactive", true);
                }
                else {
                    PoundsLabel.classed("active", false).classed("inactive", true);
                    Carrier_NameLabel.classed("active", false).classed("inactive", true);
                    DestinationLabel.classed("active", true).classed("inactive", false);
                }
            }
        });

    yLabelsGroup.selectAll("text")
    .on("click", function() {
        
        var value = d3.select(this).attr("value");

        //check if value is same as current axis
        if (value != dateYaxis) {
            dateYaxis = value;
            yLinearScale = yScale(data, dateYaxis);
            yAxis = renderAxesY(yLinearScale, yAxis);
            circlesGroup = renderCircles(circlesGroup, xLinearScale, poundsXaxis, yLinearScale, dateYaxis);
            textGroup = renderText(textGroup, xLinearScale, poundsXaxis, yLinearScale, dateYaxis)
            circlesGroup = updateToolTip(poundsXaxis, dateYaxis, circlesGroup);

            //change classes to change bold text
            if (dateYaxis === "Destination") {
                GrainLabel.classed("active", true).classed("inactive", false);
                YearLabel.classed("active", false).classed("inactive", true);
                DateLabel.classed("active", false).classed("inactive", true);
            }
            else if (dateYaxis === "Year") {
                GrainLabel.classed("active", false).classed("inactive", true);
                YearLabel.classed("active", true).classed("inactive", false);
                PoundsLabel.classed("active", false).classed("inactive", true);
            }
            else {
                GrainLabel.classed("active", false).classed("inactive", true);
                YearLabel.classed("active", false).classed("inactive", true);
                DateLabel.classed("active", true).classed("inactive", false);
            }
        }
    });
});