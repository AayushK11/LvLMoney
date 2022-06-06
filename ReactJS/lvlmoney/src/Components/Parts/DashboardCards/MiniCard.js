import React from "react";
import "./MiniCard.css";

import Chart from "react-apexcharts";

export const MiniCard = ( { minititle, price, pricechange, percentchange, imgsrc } ) =>
{
  
  const series = [
    {
      data: minititle === "SENSEX"?(percentchange <0 ? [86,90,65,54,34,56] : [15,41,45,73,69,50]): minititle ==="BANKNIFTY" ? (percentchange <0 ? [80,69,42,46,10,27] : [40,30,45,65,69,42]) : (percentchange <0 ? [83,63,37,51,20,44] : [10,40,31,70,69,42])
    }
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
    colors: [(percentchange  >0 ?'#198754':'#EA412D')],
    
  }
  
  return (
  
      <div className="col col-sm-6 col-lg-3 col-xl-3 col-xxl-3 d-flex text-white">
        <div className="card flex-fill bg-dark mt-2">
          <div className="card-body py-4">
            <div className="d-flex align-items-start">
              <div className="flex-grow-1">
                <h4 className="mb-2">{minititle}</h4>
                <p className="mb-2">{price}</p>
                <div className="mb-0">
                  <span className={percentchange > 0? "badge text-success":"badge text-danger" }>{pricechange}</span>
                  <span className={percentchange > 0? "badge text-success":"badge text-danger" }> {percentchange} </span>
                </div>
              </div>
              <div className="col-6 align-self-end text-end">
              <img src={imgsrc} alt="" className="img-fluid illustration-img"></img>
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
