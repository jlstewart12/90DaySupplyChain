function makeplot() {
    Plotly.d3.csv("grain_export.csv", function(data){ processData(data) } );
  
  };
  
  function processData(allRows) {
  
    console.log(allRows);
    var x = [], y = [];
  
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['Grain'] );
      y.push( row['Date'] );
    }
    console.log( 'X',x, 'Y',y);
    makePlotly( x, y);
  }
  
  function makePlotly( x, y){
    
  
    
  };
   

var trace1 = {
  x: ['Commodity'],
  y: ['Tenklbs'],
  name: 'Month',
  type: 'bar'
};

var trace2 = {
  x: ['Commodity'],
  y: ['Tenklbs'],
  name: 'Region',
  type: 'bar'
};

var data = [trace1, trace2];

var layout = {
    title: '90 Day Supply Chain',
    xaxis: {tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }},
    yaxis: {
      title: '10000 per unit',
      titlefont: {
        size: 16,
        color: 'rgb(107, 107, 107)'
      },
      tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }
    },
    legend: {
      x: 0,
      y: 1.0,
      bgcolor: 'rgba(255, 255, 255, 0)',
      bordercolor: 'rgba(255, 255, 255, 0)'
    },
    barmode: 'group',
    bargap: 0.15,
    bargroupgap: 0.1
  };
Plotly.newPlot('myDiv', data, layout);
makeplot();