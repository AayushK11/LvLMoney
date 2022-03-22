import React from "react";
import "./donutChart.css";

import Chart from "react-apexcharts";

export const DonutChart = ({ est_return, invst_amount }) => {
  const options = {
    labels: ["Invested Amount", "Expected Return"],
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: true,
      },
      style: {
        colors: ["#fff", "#212529"],
      },
    },
    legend: {
      position: "bottom",
    },
    colors: ["#0d6efd", "#D6DF21"],
  };

  return (
    <Chart options={options} series={[invst_amount, est_return]} type="donut" />
  );
};
