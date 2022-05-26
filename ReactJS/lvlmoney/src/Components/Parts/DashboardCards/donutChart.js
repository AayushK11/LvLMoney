import React from "react";
import "./donutChart.css";

import Chart from "react-apexcharts";

export const DonutChart = ({ est_return, invst_amount }) => {
  const options = {
    labels: ["Invested Amount", "Expected Return"],
    chart: {
      type: "donut",
    },
    dropShadow: {
      enabled: false,
     
    },
    stroke: {
      show: true,
      width: 3, 
      colors: ["#212230"],
  },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
      
      style: {
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 'bold',
        colors: ["#fff", "#33354f"],
      },
    
    
    },
    legend: {
      position: "bottom",
      fontSize: '16px',
      fontFamily: 'Helvetica, Arial',
      fontWeight: 400,
      labels: {
        
        useSeriesColors: true,
      },
      markers: {
        width: 16,
        height: 16,
       
    },
    },
    colors: ["#0d6efd", "#ffcd4c"],
  };

  return (
    <Chart options={options} series={[invst_amount, est_return]} type="donut" />
  );
};
