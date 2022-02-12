import React from "react";
import "./MiniCard.css";

import Chart from "react-apexcharts";

export const MiniCard = ({ minititle, price, pricechange, percentchange, imgsrc }) => {
  const series = [
    {
      name: "series1",
      data: [31, 40, 10, 51, 42,69,80],
    },
  ]
  const options = {
    chart: {
      height: 35,
      type: "area",
      sparkline: {
        enabled: true,
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
      
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy ",
      },
    },
    colors: ['#198754'],
    
  }
  
  return (
  
      <div class="col col-sm-6 col-xxl-3 d-flex text-white">
        <div class="card flex-fill bg-dark">
          <div class="card-body py-4">
            <div class="d-flex align-items-start">
              <div class="flex-grow-1">
                <h4 class="mb-2">{minititle}</h4>
                <p class="mb-2">{price}</p>
                <div class="mb-0">
                  <span class="badge text-success">{pricechange}</span>
                  <span class="badge "> {percentchange} </span>
                </div>
              </div>
              <div class="col-6 align-self-end text-end">
              <img src={imgsrc} alt="" class="img-fluid illustration-img"></img>
              <Chart
                options={options}
                series={series}
                type="area"
                height={50}
              />
          </div>
            </div>
          </div>
        </div>
      </div>
  );
};
