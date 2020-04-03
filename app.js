// set parameters for SVG
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 10,
  right: 40,
  bottom: 90,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create SVG wrapper and append a group to hold the chart 
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// set initial param
var comXaxis = "commodity";
var quarterYaxis = "quarter";
// console.log(comXaxis)
// console.log(quarterYaxis)

// function used for updating x-scale var upon click on axis label
function xScale(data, comXaxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[comXaxis]) * 0.8,
        d3.max(data, d => d[comXaxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  };
  
// function used for updating x-scale var upon click on axis label
function yScale(data, quarterYaxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[quarterYaxis]) * 0.8,
        d3.max(data, d => d[quarterYaxis]) * 1.2
      ])
      .range([height, 0]);
  
    return yLinearScale;
  
  };

  // update xAxis var when label is clicked
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  };
  
  // update yAxis var when label is clicked
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
  
  // update circles group with transitions
  function renderCircles(circlesGroup, newXScale, comXaxis, newYScale, quarterYaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[comXaxis]))
      .attr("cy", d => newYScale(d[quarterYaxis]));
  
    return circlesGroup;
  }  
  // update circles group with transitions
  function renderLabels(cLabels, newXScale, comXaxis, newYScale, quarterYaxis) {
  
    cLabels.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[comXaxis]))
      .attr("y", d => newYScale(d[quarterYaxis]));
  
    return cLabels;
  }
  
  // update circles group with new tooltip
  function updateToolTip(circlesGroup, comXaxis, quarterYaxis) {
  
    if (comXaxis === "commodity") {
      var xlabel = "In commodity (%): ";
    }
    else if (comXaxis === "month") {
        var xlabel = "month: ";
    }
    else {
      var xlabel = "month: ";
    };  

    if (quarterYaxis === "quarter") {
      var ylabel = " quarter (%): ";
    }
    else if (comXaxis === "region") {
        var ylabel = "region(%): ";
    }
    else {
      var ylabel = "10K LBS (%): ";
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(d => {
        return (`${d.state} (${d.abbr})<br>${ylabel}${d[quarterYaxis]}<br>${xlabel}${d[comXaxis]}`);
      });
  
    circlesGroup.call(toolTip);


    circlesGroup
    // mouseover event - show tooltip
        .on("mouseover", function(data) {
      toolTip.show(data);
        })
      // onmouseout event - hide tooltip
        .on("mouseout", function(data, index) {
        toolTip.hide(data);
        });
  
    return circlesGroup;
  };



  // Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function(transportData, err) {
    if (err) throw err;
  
    // parse data
    transportData.forEach(data => {
      data.commodity = parseFloat(data.commodity);
      data.month = parseFloat(data.month);
      data.year = parseFloat(data.year);
      data.quarter = parseFloat(data.quarter);
      data.LBS = parseFloat(data.LBS);
      data.region = parseFloat(data.region);
    });
  
    // xLinearScale function above csv import
    var xLinearScale = xScale(transportData, comXaxis);    
    // yLinearScale function above csv import
    var yLinearScale = yScale(transportData, quarterYaxis);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    // append y axis
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);

    // append initial circles
    var gGroup = chartGroup.selectAll("g")
        .data(transportData)
        .enter()
        .append("g")
        .classed("circles", true);
    
    var circlesGroup = gGroup.append("circle")
        .data(transportData)
      .attr("cx", d => xLinearScale(d[comXaxis]))
      .attr("cy", d => yLinearScale(d[quarterYaxis]))
      .attr("r", 20)
      .attr("fill", "purple")
      .attr("opacity", ".5");
  
    // label within circle
    var cLabels = chartGroup.selectAll(".circles")
     .append("text")
     .text( d => d.abbr)
     .attr("text-anchor", "middle")
     .attr("alignment-baseline", "middle")
     .attr("font-size",".8em")
     .attr("style","stroke:white;")
     .attr("x", d => xLinearScale(d[comXaxis]))  
     .attr("y", d => yLinearScale(d[quarterYaxis]));

    // Create group for x-axis labels
    var xLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    var commodityLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 15)
      .attr("value", "commodity") // value to grab for event listener
      .classed("active", true)
      .text("In commodity (%)");
  
    var monthLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 35)
      .attr("value", "month") // value to grab for event listener
      .classed("inactive", true)
      .text("month (Median)");
      
    var yearLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 55)
      .attr("value", "year") // value to grab for event listener
      .classed("inactive", true)
      .text("Household year (Median)");

    // Create group for y-axis labels
    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)")

    var quarterLabel = yLabelsGroup.append("text")
      .attr("x", 0 - (height/2))
      .attr("y", 0 - (margin.left/3))
      .attr("value", "quarter") // value to grab for event listener
      .classed("active", true)
      .text("Lacks quarter (%)");    
      
    var regionLabel = yLabelsGroup.append("text")
      .attr("x", 0 - (height/2))
      .attr("y", -20 - (margin.left/3))
      .attr("value", "region") // value to grab for event listener
      .classed("inactive", true)
      .text("Obese (%)");   

    var LBSLabel = yLabelsGroup.append("text")
      .attr("x", 0 - (height/2))
      .attr("y", -40 - (margin.left/3))
      .attr("value", "LBS") // value to grab for event listener
      .classed("inactive", true)
      .text("Smokers (%)");
  
    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(circlesGroup, comXaxis, quarterYaxis);
  
    // x axis labels event listener
    xLabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== comXaxis) {
  
          // replaces comXaxis with value
          comXaxis = value;
  
          // console.log(comXaxis)
  
          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(transportData, comXaxis);
  
          // updates x axis with transition
          xAxis = renderXAxes(xLinearScale, xAxis);
  
          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, comXaxis,  yLinearScale, quarterYaxis);
  
          // updates tooltips with new info
          circlesGroup = updateToolTip(circlesGroup, comXaxis, quarterYaxis);

          // update labels on circles
          cLabels = renderLabels(cLabels, xLinearScale, comXaxis, yLinearScale, quarterYaxis);
  
          // changes classes to change bold text
          if (comXaxis === "year") {
            yearLabel
              .classed("active", true)
              .classed("inactive", false);
            monthLabel
              .classed("active", false)
              .classed("inactive", true);
            commodityLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (comXaxis === "month") {
            yearLabel
              .classed("active", false)
              .classed("inactive", true);
            monthLabel
              .classed("active", true)
              .classed("inactive", false);
            commodityLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            yearLabel
              .classed("active", false)
              .classed("inactive", true);
            monthLabel
              .classed("active", false)
              .classed("inactive", true);
            commodityLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
    // y axis labels event listener
    yLabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== quarterYaxis) {
  
          // replaces comXaxis with value
          quarterYaxis = value;
  
          // console.log(quarterYaxis)
  
          // functions here found above csv import
          // updates y scale for new data
          yLinearScale = yScale(transportData, quarterYaxis);
  
          // updates y axis with transition
          yAxis = renderYAxes(yLinearScale, yAxis);
  
          // updates circles with new y values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, comXaxis,  yLinearScale, quarterYaxis);
  
          // updates tooltips with new info
          circlesGroup = updateToolTip(circlesGroup, quarterYaxis);
          
          // update labels on circles
          cLabels = renderLabels(cLabels, xLinearScale, comXaxis, yLinearScale, quarterYaxis);
  
          // changes classes to change bold text
          if (quarterYaxis === "LBS") {
            LBSLabel
              .classed("active", true)
              .classed("inactive", false);
            regionLabel
              .classed("active", false)
              .classed("inactive", true);
            quarterLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (quarterYaxis === "region") {
            LBSLabel
              .classed("active", false)
              .classed("inactive", true);
            regionLabel
              .classed("active", true)
              .classed("inactive", false);
            quarterLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            LBSLabel
              .classed("active", false)
              .classed("inactive", true);
            regionLabel
              .classed("active", false)
              .classed("inactive", true);
            quarterLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });

  }).catch(function(error) {
    console.log(error);
  });