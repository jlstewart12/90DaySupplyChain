
    // var xlabels = [{% for item in xlabels %}
    // "{{item}}", {% endfor %}];
    
    // var xlabels = {{ week | tojson }};
    // console.log(xlabels);

    // var canvas = document.getElementById("chart");

    // const myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels : [
    //             {% for item in week %}
    //             "{{ item }}",
    //             {% endfor %}],

    //         datasets: [{
    //         label: '2016',  
    //         fillColor: '#f0f2ff, 0.2',
    //         strokeColor: '#f0f2ff, 1',
    //         pointColor: '#f0f2ff, 1',
    //         pointStrokeColor: '#fff',
    //         pointHighlightFill: '#fff',
    //         pointHighlightStroke: '#f0f2ff, 1',
    //         bezierCurve : false,
    //         data: [
    //         {% for item in y16Values %}
    //            {{ item }},
    //           {% endfor %}]
    //       }, {
    //         label: '2017',
    //         fillColor: '#bed7e8, 0.2',
    //         strokeColor: '#bed7e8, 1',
    //         pointColor: '#bed7e8, 1',
    //         pointStrokeColor: '#fff',
    //         pointHighlightFill: '#fff',
    //         pointHighlightStroke: '#bed7e8, 1',
    //         bezierCurve : false,
    //         data: [
    //         {% for item in y17Values %}
    //            {{ item }},
    //           {% endfor %}]
    //       }, {
    //         label: '2018',
    //         fillColor: '#71abd9, 0.2',
    //         strokeColor: '#71abd9, 1',
    //         pointColor: '#71abd9, 1',
    //         pointStrokeColor: '#fff',
    //         pointHighlightFill: '#fff',
    //         pointHighlightStroke: '#71abd9, 1',
    //         bezierCurve : false,
    //         data: [
    //           {% for item in y18Values %}
    //              {{ item }},
    //             {% endfor %}]
    //         }, {
    //         label: '2019',
    //         fillColor: '#3d7ec0, 0.2',
    //         strokeColor: '#3d7ec0, 1',
    //         pointColor: '#3d7ec0, 1',
    //         pointStrokeColor: '#fff',
    //         pointHighlightFill: '#fff',
    //         pointHighlightStroke: '#3d7ec0, 1',
    //         bezierCurve : false,
    //         data : [
    //           {% for item in y19Values %}
    //              {{ item }},
    //             {% endfor %}]
    //         }, {
    //         label: '2020',
    //         fillColor: '#f98d27, 0.2',
    //         strokeColor: '#f98d27, 1',
    //         pointColor: '#f98d27, 1',
    //         pointStrokeColor: '#fff',
    //         pointHighlightFill: '#fff',
    //         pointHighlightStroke: '#f98d27, 1',
    //         bezierCurve : false,
    //         data : [
    //           {% for item in y20Values %}
    //              {{ item }},
    //             {% endfor %}]
    //         }]
    //   },

    // //  // get bar chart canvas
    // //  var mychart = document.getElementById("plot").getContext("2d");

    // //    steps = 13
    // //    max = {{max}}
    // //    min = {{min}}

    // //  // draw bar chart
    // //  new Chart(mychart).Line(Data, {
    // //    scaleOverride: true,
    // //    scaleSteps: steps,
    // //    scaleStepWidth: Math.ceil(max / steps),
    // //    scaleStartValue: 0,
    // //    scaleShowVerticalLines: true,
    // //    scaleShowGridLines : true,
    // //    barShowStroke : true,
    // //    scaleShowLabels: true
    // //    }
    // //  );