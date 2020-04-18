     all_data = all_data.replace(/&#39;/g, '"');
     all_data = all_data.replace(/&#34;/g, '\\"');
     all_data = all_data.replace(/None/g, '""');
     /*while(all_data.indexOf('ObjectId(') > -1) {
         all_data = all_data.replace('ObjectId(', '');
     }
     while(all_data.indexOf('),') > -1) {
        all_data = all_data.replace('),', ',');
    }*/
    all_data = all_data.replace(/ObjectId\(/g, '');
    all_data = all_data.replace(/\),/g, ',');
    //console.log(all_data);
     all_data = JSON.parse(all_data);
     var destination=[];
     for(var i=0;i<all_data.length;i++){
         destination.push(all_data[i].Destination);
     }
     destination=destination.filter(Destination_filter);
     function Destination_filter(value,index,self) {
         return self.indexOf(value)===index;
     }
     console.log(destination);
     $(function(){
         $('.datepicker').datepicker({
              format: 'm/d/yy',
              assumeNearbyYear: true,
              autoclose: true,
              orientation: 'bottom left',
              todayHighlight: true,
              keyboardNavigation: false
        }).change(function (e) {
             $('#Destination_per_date_Grain').html("");
             var datepicker=$('.datepicker').val();
             Date_element(datepicker);

         })
     });

     function Date_element(date){
         var SOYBEANS_total_pound=0;
         var SOYBEANS_total_MT=0;
         var WHEAT_total_pound=0;
         var WHEAT_total_MT=0;
         var CORN_total_pound=0;
         var CORN_total_MT=0;
         var SORGHUM_total_pound=0;
         var SORGHUM_total_MT=0;
         var Grain_data=['SOYBEANS','WHEAT','CORN','SORGHUM'];
         for(var i=0;i<all_data.length;i++){
            if(all_data[i].Date==date && all_data[i].Grain==Grain_data[0]){
                SOYBEANS_total_pound+=parseInt(all_data[i].Pounds);
                SOYBEANS_total_MT+=parseInt(all_data[i].MT);
            }else if(all_data[i].Date==date && all_data[i].Grain==Grain_data[1]){
                WHEAT_total_pound+=parseInt(all_data[i].Pounds);
                WHEAT_total_MT+=parseInt(all_data[i].MT);
            }else if(all_data[i].Date==date && all_data[i].Grain==Grain_data[2]){
                CORN_total_pound+=parseInt(all_data[i].Pounds);
                CORN_total_MT+=parseInt(all_data[i].MT);
            }else if(all_data[i].Date==date && all_data[i].Grain==Grain_data[3]){
                SORGHUM_total_pound+=parseInt(all_data[i].Pounds);
                SORGHUM_total_MT+=parseInt(all_data[i].MT);
            }else{
                var p=0;
            }
         }
         var total_pound=[SOYBEANS_total_pound,WHEAT_total_pound,CORN_total_pound,SORGHUM_total_pound];
         var total_MT=[SOYBEANS_total_MT,WHEAT_total_MT,CORN_total_MT,SORGHUM_total_MT];

         Total_data_per_day(total_pound,total_MT,date,Grain_data);
     }

     function Total_data_per_day(total_pound,total_MT,date,Grain_data){
         console.log(total_pound,total_MT)
         Highcharts.chart('Grain_all_data_per_day', {
            chart: {
                type: 'column',
            },
            title: {
                text: date+"  Total chart",
            },
            xAxis: {
                categories: Grain_data
            },
            yAxis: {
                min: 0,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            exporting: {
                enabled: false
            },
            legend: {
                align: 'right',
                x: -25,
                verticalAlign: 'top',
                y: 30,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    point: {
                        events: {
                            click: function (e) {
                                var Grainname = e.point.category;
                                Destination_per_date_Grain(Grainname,date);
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Pound',
                data: total_pound
            }, {
                name: 'MT',
                data: total_MT
            }]
        });
     }
     function Destination_per_date_Grain(Grain,date){
         var destination_pound=[];
         var destination_MT=[];
         var virtual_destination=[];
         for(var i=0;i<destination.length;i++){
             var pound=0;
             var MT=0;
             for(var j=0;j<all_data.length;j++){
                 if(all_data[j].Grain==Grain && all_data[j].Date==date && all_data[j].Destination==destination[i]){
                     pound+=parseInt(all_data[j].Pounds);
                     MT+=parseInt(all_data[j].MT);
                 }
             }
             if(pound!=0 && MT!=0){
                 virtual_destination.push(destination[i]);
                 destination_pound.push(pound);
                 destination_MT.push(MT);
             }

         }
         console.log("Destination"+destination_pound);
         Highcharts.chart('Destination_per_date_Grain', {
            chart: {
                type: 'column',
            },
            title: {
                text: date+"  Destination Chart",
            },
            xAxis: {
                categories: virtual_destination
            },
            yAxis: {
                min: 0,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            exporting: {
                enabled: false
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    point: {
                        events: {
                            click: function (e) {
                                var Grainname = e.point.category;
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Pound',
                data: destination_pound
            }, {
                name: 'MT',
                data: destination_MT
            }]
        });

     }