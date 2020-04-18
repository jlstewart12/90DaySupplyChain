console.log(`Compdata=${Compdata}`)
//console.log(`data.${data.type}`)
//let url = "http://localhost:5000/usdaSupplies";
//render (url);
function makeplot() {
  console.log(Compdata);
  
  function processData(allRows){
    console.log(allRows);
    let x = []
    let y = []
    
    
    //for (var i=0; i< Object.keys(allRows).length; i++){
    x = Object.values(allRows.Commodity);
    y = Object.values(allRows.Tenklbs); 
    
  
    
    console.log( 'X',x, 'Y',y);
    makePlotly( x, y);
  }
  
  function makePlotly( x, y){
    var plotDiv = document.getElementById("plot");
    var layout = {
        title: 'January 2020 Commodity Supply',
        yaxis:{
          title: '10000 lbs Per Unit'
        },
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
    
    Plotly.newPlot('myDiv1', traces, layout);
    
      //{title: 'Supply Chain');
      // create the function for the initial data rendering

  
  };
  processData(Compdata);
}

makeplot();
