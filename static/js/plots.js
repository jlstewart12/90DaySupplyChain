    var ctx = document.getElementById("chart").getContext("2d");

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels : xlabels,
            datasets: [{
            label: '2016',  
            fillColor: '#f0f2ff, 0.2',
            strokeColor: '#f0f2ff, 1',
            pointColor: '#f0f2ff, 1',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: '#f0f2ff, 1',
            bezierCurve : false,
            data: ([28690980, 29028065, 28547641, 27837463, 26854667, 26207531, 25501212, 25073953, 24582984, 25023154, 24944400, 24629428, 24414953, 24738665, 25298322, 27822954, 28279869, 28674095, 30393628, 31435905, 33124912, 41487165, 35957635, 37074760, 37874708, 38735846, 39337849, 39989494, 39459517, 40307105, 42681189, 43367405, 44468442, 44028612, 88303552, 43570074, 43233670, 43573247, 45591932, 45257162, 44836515, 44727776, 44941828, 44004909, 43706997, 44189114, 43512158, 43218615, 44550338, 44924074, 44185073, 42246831]),
          }, {
            label: '2017',
            fillColor: '#bed7e8, 0.2',
            strokeColor: '#bed7e8, 1',
            pointColor: '#bed7e8, 1',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: '#bed7e8, 1',
            bezierCurve : false,
            data: ([41391969, 41219425, 41663579, 41627273, 40437038, 40565081, 39834803, 38323133, 37141521, 36622517, 36876081, 36540355, 36400511, 35785173, 34883876, 34342294, 33791789, 33039286, 32343032, 31740072, 31467552, 39642995, 30587251, 29659901, 28741933, 27719064, 27468311, 28711445, 28642048, 27517418, 27194195, 27870952, 28475454, 29302087, 33694057, 31243781, 32245468, 33945490, 33554249, 34953569, 35555726, 36247069, 36031499, 37612187, 37341484, 36769182, 35306762, 35653856, 36452789, 37768782, 38266329, 36962661])
        }, {
            label: '2018',
            fillColor: '#71abd9, 0.2',
            strokeColor: '#71abd9, 1',
            pointColor: '#71abd9, 1',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: '#71abd9, 1',
            bezierCurve : false,
            data: ([35368221, 36810880, 37270499, 37145661, 37327004, 37873218, 37804205, 38280078, 40818446, 42404722, 42818210, 42767946, 43131364, 43920136, 45120710, 44063722, 44015465, 42917168, 42095893, 40807911, 40126916, 40922546, 39626624, 37841844, 38615300, 37776955, 36467746, 36637898, 37038692, 36469195, 36106292, 36731428, 37208347, 36380426, 36231674, 71704296, 36055068, 36610392, 37556826, 36329146, 34830335, 33084339, 32040485, 30982359, 30073201, 29333751, 29268103, 29168748, 29203645, 32013924, 34763837, 34494232, 32669886])
            }, {
            label: '2019',
            fillColor: '#3d7ec0, 0.2',
            strokeColor: '#3d7ec0, 1',
            pointColor: '#3d7ec0, 1',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: '#3d7ec0, 1',
            bezierCurve : false,
            data : ([33107892, 33545898, 33983904, 34421910, 34859916, 35611481, 35999346, 36082047, 36857657, 36409673, 35790154, 36978737, 35853892, 35573292, 35192347, 34256161, 32751792, 32186077, 31380986, 30827112, 29856976, 36313280, 28464422, 28141714, 27958254, 26394436, 25554189, 25194629, 24290394, 23405465, 22483378, 21946008, 21962926, 21229616, 39950855, 23205719, 23280186, 24276413, 25131493, 25397515, 24390362, 23615349, 24135295, 23840652, 23795188, 23536190, 22730133, 22954309, 24869753, 25148444, 24457037, 23142666])
            }, {
            label: '2020',
            fillColor: '#f98d27, 0.2',
            strokeColor: '#f98d27, 1',
            pointColor: '#f98d27, 1',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: '#f98d27, 1',
            bezierCurve : false,
            data : [(23273396, 23989856, 24355599, 24263357, 24669914, 24474743, 24413680, 23970760, 24502361, 24845493, 26905055, 27330809)]
            }]
      },

    //  // get bar chart canvas
    //  var mychart = document.getElementById("plot").getContext("2d");

    //    steps = 13
    //    max = {{max}}
    //    min = {{min}}

    //  // draw bar chart
    //  new Chart(mychart).Line(Data, {
    //    scaleOverride: true,
    //    scaleSteps: steps,
    //    scaleStepWidth: Math.ceil(max / steps),
    //    scaleStartValue: 0,
    //    scaleShowVerticalLines: true,
    //    scaleShowGridLines : true,
    //    barShowStroke : true,
    //    scaleShowLabels: true
    //    }
    //  );

    options: {
        responsive: false,
        scales: {
            yAxes: [{
                stacked: true,
            }]
        },
        animation: {
            duration: 750,
        },
            },
    });