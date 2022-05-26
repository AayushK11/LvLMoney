import Chart from "react-apexcharts";
import React from "react";

export const ForecastChart = ( { fc_prevC,fc_day,fc_midweek,fc_week,fc_month,fc_m1,fc_m2,fc_m3 } ) =>
{
  const options = {
        
    chart: {
      height: 328,
      type: 'line',
      zoom: {
        enabled: false
      },
      dropShadow: {
        enabled: false,
      },
    },
    forecastDataPoints: {
      count: 0
    },
           
    stroke: {
      curve: 'straight',
      width: 2
    },
    title: {
      text: 'Forecast',
      align: 'left',
      offsetY: 25,
      offsetX: 20,
      style: {
        fontSize: '18px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        color: '#fff'
      },
    },
    subtitle: {
      text: 'Statistics',
      offsetY: 55,
      offsetX: 20
    },
    // markers: {
    //   size: 6,
    //   strokeWidth: 0,
    //   hover: {
    //     size: 9
    //   }
    // },
    grid: {
      show: false,
      padding: {
        bottom: 0
      },
              
    },
    labels: [ 'Previous Close', 'day', 'Week', '', 'Month' ],
    xaxis: {
      tooltip: {
        enabled: false
      }
    },
          
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20,
      labels: {
        useSeriesColors: true,
      },
              
    },
    
         
  };
  const series = [ {
    name: "Day",
    data: [ fc_prevC, fc_day ]
  },
  {
    name: "week",
    data: [ fc_prevC, fc_midweek, fc_week ]
  },
  {
    name: "Month",
    data: [ fc_prevC, fc_m1,fc_m2, fc_m3, fc_month ]
  }
    
  ];
  
  return (
    <Chart options={ options } series={ series }  type="line" />
    );
  };