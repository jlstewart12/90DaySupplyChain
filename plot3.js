//var Region = ({ x.Region})
//var Commodity = ({ x.Commodity})
//var Tenklbs = ({ x.Tenklbs })
//var Month = ({ x.Month })
//var Year = ({ x.Year })


function makeplot() {
   Plotly.d3.csv("data.csv", function(data){ processData(data) } );
  
  };
  function processData(allRows){
    console.log(allRows);

    var x = [], y = [];
  
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['Commodity'] );
      y.push( row['Tenklbs'] );
    }
    console.log( 'X',x, 'Y',y);
    makePlotly( x, y);
  }
  
  function makePlotly( x, y){
    var plotDiv = document.getElementById("plot");
    var layout = {
        title: 'Supply Chain',
        xaxis: {
          tickangle: -45
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
    var traces = [{
      x: x,
      y: y,
      name: 'Month',
      type: 'bar',
      textposition: 'auto',
      hoverinfo: 'Commodity',
      marker: {
        color: 'rgb(0, 255, 51)',
        opacity: 0.6,
        line: {
          color: 'rgb(255, 0, 102)',
          width: 1.5
        }
    }  
    
    
    }];
    
    Plotly.newPlot('myDiv', traces, layout);
    
      //{title: 'Supply Chain');
  
  };
makeplot();