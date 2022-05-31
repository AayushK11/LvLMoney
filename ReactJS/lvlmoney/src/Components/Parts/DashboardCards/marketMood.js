import React from "react";
import Chart from "react-apexcharts";


export const MarketMood = ( { marketmood_data } ) =>
{
 
  const MMioptions = {
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -130,
        endAngle: 130,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120,
          },
          value: {
            offsetY: 0,
            fontSize: "22px",
            color: "#00C9FF",
            formatter: function (val) {
              return val ;
            },
          },
        },
      },
    },
    fill: {
      
      colors: [(marketmood_data <20 ? "#47d147" : marketmood_data <30 ? "#00b33c" : marketmood_data <50 ? "#ffcc00" : marketmood_data < 70 ? "#ff8c1a " : marketmood_data <80 ? "#ff3300" : "#ff0000")],
    },
    stroke: {
      dashArray: 0,
    },
    
  
    labels: [(marketmood_data <20 ? "High extreme fear" : marketmood_data <30 ? "Extreme Fear" : marketmood_data < 50 ? "Fear" : marketmood_data < 70 ? "Greed " : marketmood_data <80 ? "Extreme greed" : "High extreme greed")],
    colors:[(marketmood_data <20 ? "#47d147" : marketmood_data <30 ? "#00b33c" : marketmood_data < 50 ? "#ffcc00" : marketmood_data < 70 ? "#ff8c1a " : marketmood_data <80 ? "#ff3300" : "#ff0000")],
    
  };

  return (
    <Chart
      options={MMioptions}
      series={[marketmood_data]}
      // series={[51.82]}
      type="radialBar"
      height={ 350 }
      
    />
 
  );
};
